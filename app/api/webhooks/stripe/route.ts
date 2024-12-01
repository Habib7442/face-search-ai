import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    console.log('Webhook received');
    const body = await req.text();
    const signature = headers().get('stripe-signature')!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      console.log('Event type:', event.type);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      console.log('Session metadata:', session.metadata);
      
      const { userId, planId, creditsToAdd } = session.metadata;
      console.log('Extracted data:', { userId, planId, creditsToAdd });

      if (!userId || !planId || !creditsToAdd) {
        console.error('Missing required metadata:', { userId, planId, creditsToAdd });
        throw new Error('Missing required metadata');
      }

      const cookieStore = await cookies();
      const supabase = createRouteHandlerClient({ 
        cookies: () => cookieStore 
      });

      console.log('Checking existing credits for user:', userId);
      
      // First, check if user exists in user_credits table
      const { data: existingCredits, error: checkError } = await supabase
        .from('user_credits')
        .select('*')  // Select all fields to see full record
        .eq('user_id', userId)
        .single();

      console.log('Existing credits query result:', { existingCredits, checkError });

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing credits:', checkError);
        throw checkError;
      }

      const currentCredits = existingCredits?.credits_remaining || 0;
      const newTotalCredits = currentCredits + parseInt(creditsToAdd);

      console.log('Credits calculation:', {
        currentCredits,
        creditsToAdd,
        newTotalCredits,
        userId
      });

      // Try inserting first if user doesn't exist
      if (!existingCredits) {
        console.log('Attempting to create new user_credits record');
        const { error: insertError } = await supabase
          .from('user_credits')
          .insert([{
            user_id: userId,
            credits_remaining: parseInt(creditsToAdd),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

        if (insertError) {
          console.error('Error inserting new credits:', insertError);
          throw insertError;
        }
      } else {
        // Update existing record
        console.log('Attempting to update existing user_credits record');
        const { error: updateError } = await supabase
          .from('user_credits')
          .update({
            credits_remaining: newTotalCredits,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);

        if (updateError) {
          console.error('Error updating credits:', updateError);
          throw updateError;
        }
      }

      // Verify the update
      const { data: verifyCredits, error: verifyError } = await supabase
        .from('user_credits')
        .select('credits_remaining')
        .eq('user_id', userId)
        .single();

      console.log('Verification of credits update:', {
        verifyCredits,
        verifyError
      });

      // Update subscription status
      console.log('Updating subscription status');
      const { error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .upsert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          started_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (subscriptionError) {
        console.error('Error updating subscription:', subscriptionError);
        throw subscriptionError;
      }

      console.log(`Successfully completed all operations for user ${userId}:`, {
        planId,
        newTotalCredits,
        finalCredits: verifyCredits?.credits_remaining
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { 
        error: 'Webhook handler failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
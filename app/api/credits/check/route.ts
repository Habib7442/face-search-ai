import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get cookie store and await it
    const cookieStore = await cookies();
    
    // Create Supabase client with awaited cookie store
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore 
    });
    
    // Check if user exists in credits table
    const { data: userCredits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is the "no rows returned" error
      throw fetchError;
    }

    // If user doesn't exist, create entry with default 3 credits
    if (!userCredits) {
      const { data: newUserCredits, error: insertError } = await supabase
        .from('user_credits')
        .insert([{ 
          user_id: userId, 
          credits_remaining: 3,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (insertError) throw insertError;
      
      return NextResponse.json(newUserCredits);
    }

    return NextResponse.json(userCredits);
  } catch (error) {
    console.error('Error checking credits:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message }, 
      { status: 500 }
    );
  }
}

// Mark the route as dynamic for cookies
export const dynamic = 'force-dynamic';
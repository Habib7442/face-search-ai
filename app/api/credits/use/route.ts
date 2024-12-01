// app/api/credits/use/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Get current credits
    const { data: userCredits } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!userCredits) {
      return NextResponse.json({ error: 'User credits not found' }, { status: 404 });
    }

    if (!userCredits.is_unlimited && userCredits.credits_remaining <= 0) {
      return NextResponse.json({ error: 'No credits remaining' }, { status: 403 });
    }

    // If not unlimited, decrease credits
    if (!userCredits.is_unlimited) {
      const { error } = await supabase
        .from('user_credits')
        .update({ credits_remaining: userCredits.credits_remaining - 1 })
        .eq('user_id', userId);

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error using credit:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
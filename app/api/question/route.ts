import { NextResponse } from 'next/server';
import { generateQuestion } from '@/lib/claude';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { category, difficulty } = await request.json();
    
    if (!category || !difficulty) {
      return NextResponse.json(
        { error: 'Category and difficulty are required' },
        { status: 400 }
      );
    }
    
    try {
      const question = await generateQuestion(category, difficulty);
      return NextResponse.json(question);
    } catch (genError) {
      console.error('Question generation error:', genError);
      return NextResponse.json(
        { error: 'Failed to generate question. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate question' },
      { status: 500 }
    );
  }
}
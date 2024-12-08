import Anthropic from '@anthropic-ai/sdk';

export async function generateQuestion(category: string, difficulty: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  try {
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const anthropic = new Anthropic({
      apiKey,
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Generate a single trivia question for the category "${category}" at ${difficulty} difficulty level.

Return only a JSON object with these exact fields:
{
  "question": "the question text",
  "answer": "the correct answer",
  "explanation": "brief explanation of the answer"
}

Make sure the question is challenging but appropriate for the ${difficulty} difficulty level.`
      }],
      temperature: 0.8,
    });

    const content = response.content[0].text;
    try {
      const parsed = JSON.parse(content);
      if (!parsed.question || !parsed.answer || !parsed.explanation) {
        throw new Error('Invalid response format');
      }
      return parsed;
    } catch (parseError) {
      console.error('Error parsing Claude response:', parseError);
      throw new Error('Failed to parse question data');
    }
  } catch (error) {
    console.error('Error generating question:', error);
    throw error;
  }
}
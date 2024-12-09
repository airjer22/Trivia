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

    // Map difficulty to age range
    const difficultyMap = {
      easy: "under 10 years old",
      hard: "10-15 years old",
      expert: "15-19 years old"
    };

    const ageRange = difficultyMap[difficulty as keyof typeof difficultyMap];

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Generate a single trivia question for the category "${category}" appropriate for students ${ageRange}.

The question should be engaging and educational, matching the cognitive and knowledge level of ${ageRange} students.

Return only a JSON object with these exact fields:
{
  "question": "the question text",
  "answer": "the correct answer",
  "explanation": "brief explanation of the answer"
}

Guidelines for age-appropriate questions:
- Under 10: Simple vocabulary, concrete concepts, familiar topics
- 10-15: More complex concepts, requires some critical thinking
- 15-19: Advanced topics, requires deeper understanding and analysis`
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

export interface StoryResponse {
  brief: string;
  story: string;
  faq: string[];
  audio_url?: string;
  video_url?: string;
}

export interface ChatResponse {
  answer: string;
}

export const mockStoryData: StoryResponse = {
  brief: "Experience the fall of the Berlin Wall through the eyes of those who witnessed history unfold on November 9, 1989.",
  story: "On a cold November night in 1989, thousands of East Germans gathered at the Berlin Wall after a surprising announcement. The border crossings were opening. What started as confusion turned into jubilation as people from both sides climbed the wall, celebrating the end of 28 years of division. Families reunited, strangers embraced, and the sound of hammers striking concrete echoed through the night as pieces of the wall became symbols of freedom. This moment marked the beginning of the end for the Cold War and the reunification of Germany.",
  faq: [
    "Why was the wall built?",
    "How did people escape East Berlin?",
    "What happened after the wall fell?",
    "How did this affect the Cold War?",
  ],
  video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
};

export const fetchStory = async (topic: string): Promise<StoryResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return mock data for any topic
  return {
    ...mockStoryData,
    brief: `Explore the fascinating story of ${topic} through an immersive historical journey.`,
    story: `Discover the remarkable events surrounding ${topic}. Through vivid storytelling and historical context, you'll gain a deeper understanding of how this moment shaped our world. This is a journey through time that brings history to life in ways you've never experienced before.`,
  };
};

export const fetchChatAnswer = async (
  storyContext: string,
  question: string
): Promise<ChatResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    answer: `That's a great question about "${question}". Based on the historical context, here's what we know: This was a pivotal moment that changed the course of history. The events were shaped by complex social, political, and economic factors that had been building for years. Understanding this helps us appreciate the significance of these moments in shaping our modern world.`,
  };
};

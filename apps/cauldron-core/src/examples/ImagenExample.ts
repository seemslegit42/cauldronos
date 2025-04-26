import { GeminiService } from '../ai/services/GeminiService';

async function generateAppAsset() {
  const geminiService = new GeminiService();

  try {
    // Generate a logo
    const logoImage = await geminiService.generateImage(
      "A modern, minimalist tech company logo with cyberpunk elements",
      {
        size: 'square',
        quality: 'hd'
      }
    );

    // Generate a banner
    const bannerImage = await geminiService.generateImage(
      "A wide banner showing futuristic technology interface",
      {
        size: 'landscape',
        quality: 'standard'
      }
    );

    return {
      logo: logoImage,
      banner: bannerImage
    };
  } catch (error) {
    console.error('Failed to generate assets:', error);
    throw error;
  }
}

export default generateAppAsset;
import { useImageGeneration } from '../hooks/useImageGeneration';

export const AssetGenerator = () => {
  const { generateImage, isLoading, error } = useImageGeneration();

  const handleGenerateAsset = async () => {
    try {
      const image = await generateImage(
        "A modern app icon with gradient colors",
        { size: 'square', quality: 'hd' }
      );
      // Handle the generated image
    } catch (err) {
      // Handle error
    }
  };

  return (
    <div>
      <button 
        onClick={handleGenerateAsset}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Asset'}
      </button>
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};
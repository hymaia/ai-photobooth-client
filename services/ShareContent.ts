import dataURItoBlob from "./DataUriToBlob";

interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

export default async function shareContent(imageB64: string, text: string): Promise<void> {
  if (navigator.share) {
    const blob = dataURItoBlob(imageB64);
    const file = new File([blob], 'fileName.png', { type: blob.type });
    try {
      await navigator.share({
        title: text,
        text: text,
        files: [file],
      })
      console.log('Shared successfully!');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    console.error('Web Share API is not supported on this browser.');
  }
}

import dataURItoBlob from "./DataUriToBlob";

export default function downloadB64Image(base64String: string, fileName: string) {
  const blob = dataURItoBlob(base64String);

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  link.click();

  URL.revokeObjectURL(link.href);
}

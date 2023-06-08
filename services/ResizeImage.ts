import Resizer from "./Resizer";

export default function resizeImage(file): Promise<Blob> {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      512,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri as Blob);
      },
      "base64"
    );
  });
}

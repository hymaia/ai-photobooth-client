export default async function createPayload(
  photo: string,
  prompt: string
) {
  return {
    "content": photo,
    prompt
  };
}

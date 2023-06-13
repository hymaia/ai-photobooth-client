export default async function createPayload(
  photo: string,
  body = {}
) {
  return {
    "content": photo
  };
}

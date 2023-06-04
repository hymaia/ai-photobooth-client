import { View, Image, Button, Platform } from "react-native";

function dataURItoBlob(dataURI) {
  let byteString: string;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = decodeURI(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

export default function createFormData(
  photo: { type: string; uri: string; fileName: string },
  body = {}
) {
  const data = new FormData();
  let uriParts = photo.uri.split(".");
  let fileType = uriParts[uriParts.length - 1];

  if (Platform.OS === "web") {
    data.append("photo", dataURItoBlob(photo.uri));
  } else {
    const payload = {
      uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    };
    data.append("photo", dataURItoBlob(photo.uri));
  }

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
}

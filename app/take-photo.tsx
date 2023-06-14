import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import IconButton from "../components/IconButton";
import ImageViewer from "../components/ImageViewer";
import createPayload from "../services/CreatePayload";
import axios from "axios";
import Carousel from "../components/Carousel";
import resizeImage from "../services/ResizeImage";
import dataURItoBlob from "../services/DataUriToBlob";
import Constants from "expo-constants";
import downloadB64Image from "../services/DownloadB64Image";
import shareContent from "../services/ShareContent";
import { LinearGradient } from "expo-linear-gradient";
import InternalLink from "../components/InternalLink";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Page() {
  const [isImageConfirmed, setIsImageConfirmed] = useState(false);
  const [selectedB64Image, setSelectedB64Image] = useState(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadResponseData, setUploadResponseData] = useState<{
    file_name: string;
    generated_images: string;
  } | null>(null);
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState<
    number | null
  >(null);
  // TODO: Handle Error

  const onReset = () => {
    setIsLoading(false);
    setUploadResponseData(null);
    setIsImageConfirmed(false);
    setSelectedCarouselIndex(null);
  };

  const onSaveImage = () => {
    if (uploadResponseData?.generated_images) {
      downloadB64Image(
        uploadResponseData.generated_images,
        uploadResponseData.file_name ?? "no-name"
      );
    }
  };

  const onShareImageAsync = async () => {
    if (uploadResponseData?.generated_images) {
      await shareContent(uploadResponseData.generated_images, "Test");
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const blob = dataURItoBlob(result.assets[0].uri);
      const resizedImage = await resizeImage(blob);
      setSelectedB64Image(resizedImage);
    } else {
      alert("You did not select any image.");
    }
  };

  const confirmImageAsync = async () => {
    setIsImageConfirmed(true);
    await handleUploadPhotoAsync();
  };

  const handleUploadPhotoAsync = async () => {
    const uploadUrl = Constants.expoConfig.extra.uploadUrl;
    const formData = await createPayload(selectedB64Image, prompt ?? "");
    setIsLoading(true);
    const response = await axios.post(`${uploadUrl}`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    setIsLoading(false);
    setUploadResponseData(response.data);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["transparent", "#0A2C40"]}
        style={styles.gradientContainer}
        locations={[0.15, 0.8]}
      >
        <InternalLink href="/">Accueil</InternalLink>
        <View style={styles.imageAndPromptContainer}>
          <View collapsable={false}>
            {isImageConfirmed ? (
              <>
                {isLoading ? LoadingSpinner() : null}
                {uploadResponseData ? (
                  <Carousel
                    images={
                      uploadResponseData?.generated_images
                        ? [
                            {
                              fileName: uploadResponseData?.file_name,
                              image: uploadResponseData.generated_images,
                            },
                          ]
                        : []
                    }
                    onSelectIndex={setSelectedCarouselIndex}
                  />
                ) : null}
              </>
            ) : selectedB64Image ? (
              <>
                <ImageViewer selectedImage={selectedB64Image} />
                <TextInput
                  multiline
                  style={styles.input}
                  onChangeText={(value) => setPrompt(value)}
                  placeholderTextColor="#C7C7C7"
                  placeholder="Your prompt..."
                />
              </>
            ) : null}
          </View>
        </View>
        {isImageConfirmed ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImage} />
              <IconButton
                icon="share"
                label="Share"
                onPress={onShareImageAsync}
              />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickImageAsync}
            />
            <Button label="Use this photo" onPress={confirmImageAsync} />
          </View>
        )}
        <StatusBar style="auto" />
      </LinearGradient>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00D5E0",
  },
  gradientContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    justifyContent: "space-between",
  },
  activityIndicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    height: 320,
  },
  imageAndPromptContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    width: "100%",
    backgroundColor: "blue",
  },
  image: {
    width: 320,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsContainer: {
    flex: 1,
    alignItems: "center",
  },
  optionsRow: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    columnGap: 24,
  },
  input: {
    height: 80,
    width: 320,
    marginTop: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

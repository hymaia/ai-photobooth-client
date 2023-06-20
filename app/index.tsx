import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useMemo, useState } from "react";
import createPayload from "../services/CreatePayload";
import axios from "axios";
import resizeImage from "../services/ResizeImage";
import dataURItoBlob from "../services/DataUriToBlob";
import Constants from "expo-constants";
import LoadingSpinner from "../components/molecules/LoadingSpinner";
import HomePage from "../components/organisms/HomePage";
import ChoosePromptPage from "../components/organisms/ChoosePromptPage";
import { LinearGradient } from "expo-linear-gradient";
import HymadayHeader from "../svgs/HymadayHeader";
import GeneratedImageCarouselPage from "../components/organisms/GeneratedImageCarouselPage";
import trackWithMixpanel from "../services/TrackWithMixpanel";

type PageState =
  | "Home"
  | "ImageSelected"
  | "UploadingImage"
  | "GenerationCompleted";

export default function Page() {
  const [isImageConfirmed, setIsImageConfirmed] = useState(false);
  const [selectedB64Image, setSelectedB64Image] = useState(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadResponseData, setUploadResponseData] = useState<{
    generated_images: { fileName: string, data: string }[];
  } | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  function calculatePageState(
    isImageConfirmed: boolean,
    selectedB64Image: any
  ): PageState {
    if (!isImageConfirmed && !selectedB64Image) {
      return "Home";
    }
    if (isLoading) {
      return "UploadingImage";
    }
    if (isImageConfirmed && uploadResponseData != null) {
      return "GenerationCompleted";
    }
    if (selectedB64Image != null) {
      return "ImageSelected";
    }
  }

  const pageState = useMemo<PageState>(
    () => calculatePageState(isImageConfirmed, selectedB64Image),
    [isImageConfirmed, selectedB64Image, isLoading, uploadResponseData]
  );

  const reset = () => {
    setIsLoading(false);
    setUploadResponseData(null);
    setIsImageConfirmed(false);
    setSelectedB64Image(null);
    setPrompt(null);
    setError(null);
  };

  const pickImageAsync = async () => {
    trackWithMixpanel("PICK_IMAGE_STARTED")

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
    trackWithMixpanel("IMAGE_GENERATION_REQUESTED")

    setIsImageConfirmed(true);
    await handleUploadPhotoAsync();
  };

  const handleUploadPhotoAsync = async () => {
    const uploadUrl = Constants.expoConfig.extra.uploadUrl;
    const formData = await createPayload(selectedB64Image, prompt ?? "");
    setIsLoading(true);
    try {
      const response = await axios.post(`${uploadUrl}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setUploadResponseData(response.data);
    } catch (e: unknown) {
      setError(e);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.outerContainer}>
      {selectedB64Image == null ? <HymadayHeader /> : null}

      <LinearGradient
        colors={["transparent", "#0A2C40"]}
        style={styles.mainContainer}
        locations={[0.15, 0.8]}
      >
        {pageState === "Home" && (
          <HomePage onTakeAPicturePress={pickImageAsync} />
        )}
        {pageState === "ImageSelected" && (
          <ChoosePromptPage
            selectedB64Image={selectedB64Image}
            setPrompt={setPrompt}
            confirmImage={confirmImageAsync}
            retakeImage={pickImageAsync}
            error={error}
            reset={reset}
          />
        )}
        {pageState === "UploadingImage" && LoadingSpinner()}
        {pageState === "GenerationCompleted" && (
          <GeneratedImageCarouselPage
            uploadResponseData={uploadResponseData}
            reset={reset}
          />
        )}
      </LinearGradient>
      <StatusBar style="auto" />
    </View>
  );
}

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#00D5E0",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    justifyContent: "flex-start",
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

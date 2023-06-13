import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import IconButton from "./components/IconButton";
import ImageViewer from "./components/ImageViewer";
import createFormData from "./services/CreateFormData";
import axios from "axios";
import Carousel from "./components/Carousel";
import resizeImage from "./services/ResizeImage";
import dataURItoBlob from "./services/DataUriToBlob";
import Constants from "expo-constants";
import downloadB64Image from "./services/DownloadB64Image";

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedB64Image, setSelectedB64Image] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    file_name: string;
    generated_images: string;
  } | null>(null);
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState<
    number | null
  >(null);
  // TODO: Handle Error

  const onReset = () => {
    setIsLoading(false);
    setResult(null);
    setShowAppOptions(false);
    setSelectedCarouselIndex(null);
  };

  const onSaveImageAsync = async () => {};

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
    setShowAppOptions(true);
    await handleUploadPhotoAsync();
  };

  const handleUploadPhotoAsync = async () => {
    const uploadUrl = Constants.expoConfig.extra.uploadUrl;
    const formData = await createFormData(selectedB64Image, { userId: "123" });
    setIsLoading(true);
    const response = await axios.post(`${uploadUrl}`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    setIsLoading(false);
    setResult(response.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View collapsable={false}>
          {showAppOptions ? (
            <>
              {isLoading ? (
                <View style={styles.activityIndicatorContainer}>
                  <ActivityIndicator size="large" color="#fff" />
                </View>
              ) : null}
              {result ? (
                <Carousel
                  images={
                    result?.generated_images
                      ? [
                          {
                            fileName: result?.file_name,
                            image: result.generated_images,
                          },
                        ]
                      : []
                  }
                  onSelectIndex={setSelectedCarouselIndex}
                />
              ) : null}
            </>
          ) : (
            <View style={styles.hero}>
              {selectedB64Image ? (
                <ImageViewer selectedImage={selectedB64Image} />
              ) : (
                <Text>HymaBooth</Text>
              )}
            </View>
          )}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
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
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    height: 320,
  },
  hero: {
    flex: 1,
    alignItems: "center",
    marginBottom: 40,
  },
  scrollViewContainer: {
    width: "100%",
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  imageContainer: {
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
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
});

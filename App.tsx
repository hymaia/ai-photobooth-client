import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView, Text, Pressable } from "react-native";
import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import createFormData from "./services/CreateFormData";
import axios from "axios";
import Carousel from "./components/Carousel";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ photos: string[] } | null>(null);
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
      setSelectedImage(result.assets[0]);
      setShowAppOptions(true);
      handleUploadPhotoAsync(result.assets[0]);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleUploadPhotoAsync = async (image: any) => {
    const SERVER_URL = "http://localhost:3000";
    const formData = createFormData(image, { userId: "123" });
    setIsLoading(true);
    const response = await axios.post(`${SERVER_URL}/api/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      transformRequest: (formData) => formData,
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
              {isLoading ? "Is Loading" : null}
              {result ? (
                <Carousel
                  images={result?.photos ?? []}
                  onSelectIndex={setSelectedCarouselIndex}
                />
              ) : null}
            </>
          ) : (
            <View style={styles.hero}>
              <Text>HymaBooth</Text>
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
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});

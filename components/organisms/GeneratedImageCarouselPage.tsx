import { StyleSheet, View } from "react-native";
import Carousel from "../molecules/Carousel";
import IconButton from "../molecules/IconButton";
import downloadB64Image from "../../services/DownloadB64Image";
import shareContent from "../../services/ShareContent";
import Button from "../molecules/Button";
import { useState } from "react";

export default function GeneratedImageCarouselPage({
  uploadResponseData,
  reset,
}: {
  uploadResponseData: {
    generated_images: { fileName: string; data: string }[];
  };
  reset: () => void;
}) {
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState<
    number | null
  >(null);

  const onSaveImage = () => {
    const index = selectedCarouselIndex ?? 0;
    if (uploadResponseData?.generated_images) {
      downloadB64Image(
        uploadResponseData.generated_images[index].data,
        uploadResponseData.generated_images[index].fileName
      );
    }
  };

  const onShareImage = () => {
    const index = selectedCarouselIndex ?? 0;
    if (uploadResponseData?.generated_images) {
      shareContent(
        uploadResponseData.generated_images[index].data,
        "Today at the #HymaDay"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Button theme="white" icon="home" onPress={reset} label="Home" />
      <Carousel
        images={
          uploadResponseData?.generated_images.map(({ fileName, data }) => ({
            fileName,
            image: data,
          })) ?? []
        }
        onSelectIndex={setSelectedCarouselIndex}
      />
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="refresh" label="Reset" onPress={reset} />
          <IconButton icon="save-alt" label="Save" onPress={onSaveImage} />
          <IconButton icon="share" label="Share" onPress={onShareImage} />
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionsContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  optionsRow: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    columnGap: 24,
  },
});

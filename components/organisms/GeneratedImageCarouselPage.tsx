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
    file_name: string;
    generated_images: string;
  };
  reset: () => void;
}) {
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState<
    number | null
  >(null);

  const onSaveImage = () => {
    console.log("save img")
    if (uploadResponseData?.generated_images) {
      downloadB64Image(
        uploadResponseData.generated_images,
        uploadResponseData.file_name ?? "no-name"
      );
    }
  };

  const onShareImage = () => {
    console.log(uploadResponseData?.generated_images);
    if (uploadResponseData?.generated_images) {
      console.log(uploadResponseData?.generated_images);
      shareContent(uploadResponseData.generated_images, "Today at the #HymaDay");
    }
  };

  return (
    <View style={styles.container}>
      <Button theme="white" icon="home" onPress={reset} label="Home" />
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
        onSelectIndex={(setSelectedCarouselIndex)}
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
    paddingVertical: 24
  },
  optionsRow: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    columnGap: 24,
  },
});

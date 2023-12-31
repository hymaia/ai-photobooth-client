import { useState } from "react";
import { StyleSheet, Image, View, Pressable, ScrollView } from "react-native";

export default function Carousel({
  images,
  onSelectIndex,
}: {
  images: { fileName: string | null; image: string }[];
  onSelectIndex: (index: number) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.carousel}>
          {images.map((image, index) => (
            <Pressable
              key={image.fileName ?? "no-filename"}
              onPress={() => {
                setSelectedIndex(index);
                onSelectIndex(index);
              }}
            >
              <View style={{ width: 320 }}>
                <Image
                  source={{ uri: image.image }}
                  style={[
                    styles.image,
                    { borderWidth: index === selectedIndex ? 3 : 0 },
                  ]}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { },
  carousel: {
    display: "flex",
    flexDirection: "row",
    columnGap: 16,
    paddingHorizontal: 16,
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 16,
    borderColor: "#fff",
  },
});

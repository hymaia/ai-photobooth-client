import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { A } from "@expo/html-elements";

export default function Page() {
  const [result, setResult] = useState<{
    file_name: string;
    generated_images: string;
  } | null>(null);
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState<
    number | null
  >(null);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#00D5E0", "transparent"]}
        style={styles.buttonContainer}
        locations={[0.15, 0.8]}
      >
        <A href="https://google.com">Go to Google</A>
        <A href="https://google.com">Go to Google</A>
        <Link href="/take-photo">AI Photobooth</Link>
        <View style={styles.socialButtons}>Other Buttons</View>
      </LinearGradient>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A2C40",
  },
  buttonContainer: {
    paddingTop: 58,
    flex: 1,
    alignItems: "center",
    rowGap: 28,
  },
  socialButtons: {
    marginTop: 80,
  },
});

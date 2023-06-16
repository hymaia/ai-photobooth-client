import { StyleSheet, TextInput, View, Text } from "react-native";
import ImageViewer from "../molecules/ImageViewer";
import Button from "../molecules/Button";

export default function ChoosePromptPage({
  selectedB64Image,
  setPrompt,
  confirmImage,
  retakeImage,
  error,
  reset,
}: {
  selectedB64Image: any | null;
  setPrompt: (prompt: string) => void;
  confirmImage: () => void;
  retakeImage: () => void;
  error: unknown | null;
  reset: () => void;
}) {
  return (
    <View style={styles.container}>
      <Button theme="white" icon="home" onPress={reset} label="Home" />
      <ImageViewer selectedImage={selectedB64Image} />
      <TextInput
        multiline
        style={styles.input}
        onChangeText={(value) => setPrompt(value)}
        placeholderTextColor="#C7C7C7"
        placeholder="Your prompt..."
      />
      <View style={styles.buttonContainer}>
        <Button theme="pink" label="Use this photo" onPress={confirmImage} />
        {error && (
          <Text style={styles.errorMessage}>Oops! An error has occurred!</Text>
        )}
        <Button theme="white" label="Retake photo" onPress={retakeImage} />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  input: {
    height: 80,
    width: 320,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    rowGap: 16,
  },
  buttonContainer: {
    paddingBottom: 24,
    rowGap: 8,
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
  },
});

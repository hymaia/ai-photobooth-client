import { View, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";


export default function LoadingSpinner() {
  return <View style={styles.activityIndicatorContainer}>
    <ActivityIndicator size="large" color="#fff" />
  </View>;
}

export const styles = StyleSheet.create({
  activityIndicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    height: 320,
  },
});
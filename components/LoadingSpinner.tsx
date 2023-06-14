import { View, ActivityIndicator } from "react-native";
import { styles } from "../app/take-photo";

export default function LoadingSpinner() {
  return <View style={styles.activityIndicatorContainer}>
    <ActivityIndicator size="large" color="#fff" />
  </View>;
}

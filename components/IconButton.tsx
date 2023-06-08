import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function IconButton({ icon, label, onPress }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <View style={styles.circleButtonContainer}>
        <MaterialIcons name={icon} size={24} color="#25292e" />
      </View>
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  circleButtonContainer: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: "#ffd33d",
    backgroundColor: "white",
    borderRadius: 32,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function IconButton({ icon, label, onPress }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <View style={styles.circleButtonContainer}>
        <MaterialIcons name={icon} size={28} color="#25292e" />
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
    backgroundColor: "white",
    borderRadius: 16,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 8,
  },
});

import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type ButtonTheme = "pink" | "white" | "bordered-white";

export default function Button({
  label,
  theme,
  onPress,
  icon,
}: {
  label: string;
  theme?: ButtonTheme;
  onPress?: any;
  icon?: string | null;
}) {
  const backgroundColor = (() => {
    switch (theme) {
      case "bordered-white":
        return "transparent";
      case "pink":
        return "#FE86A4";
      case "white":
        return "white";
    }
  })();

  const foregroundColor = (() => {
    switch (theme) {
      case "bordered-white":
        return "white";
      case "pink":
        return "#002C41";
      case "white":
        return "#002C41";
    }
  })();

  return (
    <View
      style={[
        styles.buttonContainer,
      ]}
    >
      <Pressable
        style={[styles.button, { backgroundColor }]}
        onPress={onPress}
      >
        {icon && (
          <FontAwesome
            name={icon as any}
            size={24}
            color={foregroundColor}
            style={styles.buttonIcon}
          />
        )}
        <Text style={[styles.buttonLabel, { color: foregroundColor }]}>{label}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "'Open Sans', sans-serif"
  },
});

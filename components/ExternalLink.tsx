import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { A } from "@expo/html-elements";

interface ExternalLinkProps {
  href?: string;
  theme?: "clear";
  width?: number;
  icon?: string;
}

export default function ExternalLink({
  theme,
  href,
  width,
  icon,
  children,
}: React.PropsWithChildren<ExternalLinkProps>) {
  if (theme === "clear") {
    return (
      <A href={href} target="_blank" style={[styles.buttonContainer, { width: width }]}>
        <View style={styles.button}>
          {icon ? (
            <FontAwesome
              name={icon as any}
              size={18}
              color="#002C41"
              style={styles.buttonIcon}
            />
          ) : null}
          <Text style={[styles.buttonLabel, { color: "#002C41" }]}>
            {children}
          </Text>
        </View>
      </A>
    );
  }

  return (
    <A
      href={href}
      target="_blank"
      style={[styles.buttonContainer, { width: width }]}
    >
      <View style={[styles.button, { backgroundColor: "#ffffff" }]}>
        <Text style={[styles.buttonLabel, { color: "#002C41" }]}>
          {children}
        </Text>
      </View>
    </A>
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
    fontWeight: "bold"
  },
});

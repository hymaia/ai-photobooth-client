import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { A } from "@expo/html-elements";

type ExternalLinkTheme = "clear" | "bordered-white";

interface ExternalLinkProps {
  href?: string;
  theme?: ExternalLinkTheme;
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

  const border = (() => {
    switch (theme) {
      case "bordered-white":
        return {
          borderColor: "white",
          borderWidth: 4
        };
      default:
        return undefined;
    }
  })();

  return (
    <A
      href={href}
      target="_blank"
      style={[styles.buttonContainer, { width: width }]}
    >
      <View style={[styles.button, border]}>
        {icon ? (
          <FontAwesome
            name={icon as any}
            size={18}
            color="#fff"
            style={styles.buttonIcon}
          />
        ) : null}
        <Text style={[styles.buttonLabel, { color: "#fff" }]}>
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
    fontWeight: "bold",
    fontFamily: "'Open Sans', sans-serif",
  },
});

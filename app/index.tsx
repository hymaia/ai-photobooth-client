import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import HymadayHeader from "../svgs/HymadayHeader";
import LinkedInLogo from "../svgs/LinkedInLogo";
import YouTubeLogo from "../svgs/YouTubeLogo";
import ExternalLink from "../components/ExternalLink";
import InternalLink from "../components/InternalLink";

export default function Page() {
  return (
    <View style={styles.container}>
      <HymadayHeader />
      <LinearGradient
        colors={["transparent", "#0A2C40"]}
        style={styles.buttonContainer}
        locations={[0.15, 0.8]}
      >
        <ExternalLink href="https://google.com">
          Programme
        </ExternalLink>
        <ExternalLink href="https://google.com">
          Feedback
        </ExternalLink>
        <InternalLink href="/take-photo">AI Photobooth</InternalLink>
        <View style={styles.socialButtons}>
          <ExternalLink theme="clear" width={64} href="https://linkedin.com/company/hymaia/">
            <LinkedInLogo />
          </ExternalLink>
          <ExternalLink theme="clear" width={64} href="https://www.youtube.com/@hymaia">
            <YouTubeLogo />
          </ExternalLink>
        </View>
      </LinearGradient>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  navigationButton: {
    flex: 1,
    backgroundColor: "#00D5E0",
  },
  container: {
    flex: 1,
    backgroundColor: "#00D5E0",
  },
  buttonContainer: {
    paddingTop: 58,
    flex: 1,
    alignItems: "center",
    rowGap: 28,
  },
  socialButtons: {
    marginTop: 80,
    flex: 1,
    flexDirection: "row",
    columnGap: 16,
  },
});

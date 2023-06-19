import { StyleSheet, View, Text } from "react-native";
import React from "react";
import LinkedInLogo from "../../svgs/LinkedInLogo";
import YouTubeLogo from "../../svgs/YouTubeLogo";
import ExternalLink from "../molecules/ExternalLink";
import Button from "../molecules/Button";
import AppLogo from "../../svgs/AppLogo";
import FeedbackLogo from "../../svgs/FeedbackLogo";
import ProgrammeLogo from "../../svgs/ProgrammeLogo";
import PartnersLogo from "../../svgs/PartnersLogo";
import Constants from "expo-constants";

export default function HomePage({
  onTakeAPicturePress,
}: {
  onTakeAPicturePress: () => void;
}) {
  const faqUrl = Constants.expoConfig.extra.faqUrl;
  const programmeUrl = Constants.expoConfig.extra.programmeUrl;
  const feedbackUrl = Constants.expoConfig.extra.feedbackUrl;
  
  return (
    <View style={styles.container}>
      <PartnersLogo />
      <AppLogo />
      <View style={styles.mainButtonsContainer}>
        <Button
          theme="pink"
          onPress={onTakeAPicturePress}
          label="Take a Picture"
        />
        <ExternalLink
          theme="bordered-white"
          href={faqUrl}
        >
          FAQ
        </ExternalLink>
      </View>
      <View style={styles.socialButtons}>
        <ExternalLink
          theme="clear"
          width={57}
          href={programmeUrl}
        >
          <View style={styles.socialButton}>
            <ProgrammeLogo />
            <Text>Programme</Text>
          </View>
        </ExternalLink>
        <ExternalLink
          theme="clear"
          width={57}
          href={feedbackUrl}
        >
          <View style={styles.socialButton}>
            <FeedbackLogo />
            <Text>Feedback</Text>
          </View>
        </ExternalLink>
        <ExternalLink
          theme="clear"
          width={57}
          href="https://www.linkedin.com/company/hymaia?follow=true"
        >
          <View style={styles.socialButton}>
            <LinkedInLogo />
            <Text>LinkedIn</Text>
          </View>
        </ExternalLink>
        <ExternalLink
          theme="clear"
          width={57}
          href="https://www.youtube.com/@hymaia/?sub_confirmation=1"
        >
          <View style={styles.socialButton}>
            <YouTubeLogo />
            <Text>YouTube</Text>
          </View>
        </ExternalLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainButtonsContainer: {
    rowGap: 8,
  },
  socialButtons: {
    flexDirection: "row",
    columnGap: 0,
    paddingVertical: 24,
  },
  socialButton: {
    alignItems: "center",
    fontSize: 14,
    rowGap: 4,
    fontWeight: "600",
  },
});

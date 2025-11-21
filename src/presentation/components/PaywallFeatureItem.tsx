/**
 * Paywall Feature Item Component
 * Single Responsibility: Display a single feature in the features list
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { normalizeIconName } from "./utils/iconMapper";

interface PaywallFeatureItemProps {
  icon: string;
  text: string;
}

export const PaywallFeatureItem: React.FC<PaywallFeatureItemProps> = ({
  icon,
  text,
}) => {
  const tokens = useAppDesignTokens();
  const normalizedIcon = normalizeIconName(icon);

  /* eslint-disable-next-line no-console */
  if (__DEV__) {
    /* eslint-disable-next-line no-console */
    console.log(
      `[PaywallFeatureItem] Icon normalization: "${icon}" -> "${normalizedIcon}"`
    );
  }

  return (
    <View style={styles.featureItem}>
      <AtomicIcon
        name={normalizedIcon}
        customSize={20}
        customColor={tokens.colors.primary}
        style={styles.featureIcon}
      />
      <AtomicText
        type="bodyMedium"
        style={[styles.featureText, { color: tokens.colors.text }]}
      >
        {text}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
    color: "#000000",
  },
});


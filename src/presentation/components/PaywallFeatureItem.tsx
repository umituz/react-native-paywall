/**
 * Paywall Feature Item Component
 * Displays a single feature in the features list
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";

interface PaywallFeatureItemProps {
  icon: string;
  text: string;
}

export const PaywallFeatureItem: React.FC<PaywallFeatureItemProps> = ({
  icon,
  text,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.featureItem}>
      <AtomicIcon
        name={icon}
        size={20}
        customColor={tokens.colors.primary}
        style={styles.featureIcon}
      />
      <AtomicText
        variant="body"
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


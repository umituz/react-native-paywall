/**
 * Paywall Feature Item Component
 * Single Responsibility: Display a single feature in the features list
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";

interface PaywallFeatureItemProps {
  icon: string;
  text: string;
}

export const PaywallFeatureItem: React.FC<PaywallFeatureItemProps> = React.memo(
  ({ icon, text }) => {
    const tokens = useAppDesignTokens();

    // Icon name should already be PascalCase (e.g., "Sparkles", "Image", "Wand")
    // If not, convert first letter to uppercase
    const iconName = useMemo(() => {
      if (!icon) return "Circle";
      // If already PascalCase, return as is
      if (/^[A-Z]/.test(icon)) {
        return icon;
      }
      // Convert first letter to uppercase
      return icon.charAt(0).toUpperCase() + icon.slice(1);
    }, [icon]);

    return (
      <View style={styles.featureItem}>
        <AtomicIcon
          name={iconName}
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
  },
);

PaywallFeatureItem.displayName = "PaywallFeatureItem";

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
  },
});

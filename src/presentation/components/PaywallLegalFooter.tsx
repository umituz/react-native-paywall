/**
 * Paywall Legal Footer Component
 * Single Responsibility: Display legal links and terms for App Store compliance
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { LegalLinks } from "@umituz/react-native-legal";

interface PaywallLegalFooterProps {
  termsText?: string;
}

export const PaywallLegalFooter: React.FC<PaywallLegalFooterProps> = React.memo(
  ({ termsText }) => {
    const tokens = useAppDesignTokens();
    const { t } = useLocalization();

    const displayTermsText =
      termsText ||
      t(
        "paywall.terms",
        "Payment will be charged to your account. Subscription automatically renews unless cancelled.",
      );

    return (
      <View style={styles.container}>
        <AtomicText
          type="labelSmall"
          style={[styles.termsText, { color: tokens.colors.textTertiary }]}
        >
          {displayTermsText}
        </AtomicText>
        <LegalLinks style={styles.legalLinks} />
      </View>
    );
  },
);

PaywallLegalFooter.displayName = "PaywallLegalFooter";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  termsText: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  legalLinks: {
    marginTop: 4,
  },
});

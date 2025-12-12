/**
 * Paywall Screen
 * Full screen paywall with Credits and Subscription tabs
 */

import React, { useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { PurchasesPackage } from "react-native-purchases";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { usePaywall } from "../hooks/usePaywall";
import { PaywallHeader } from "../components/PaywallHeader";
import { PaywallTabBar } from "../components/PaywallTabBar";
import { CreditsTabContent } from "../components/CreditsTabContent";
import { SubscriptionTabContent } from "../components/SubscriptionTabContent";
import type { PaywallTabType } from "../../domain/entities/PaywallTab";
import type { CreditsPackage } from "../../domain/entities/CreditsPackage";

interface PaywallScreenProps {
  initialTab?: PaywallTabType;
  creditsPackages?: CreditsPackage[];
  subscriptionPackages?: PurchasesPackage[];
  currentCredits?: number;
  requiredCredits?: number;
  onCreditsPurchase?: (packageId: string) => Promise<void>;
  onSubscriptionPurchase?: (pkg: PurchasesPackage) => Promise<void>;
  subscriptionFeatures?: Array<{ icon: string; text: string }>;
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
}

export const PaywallScreen: React.FC<PaywallScreenProps> = ({
  initialTab = "credits",
  creditsPackages = [],
  subscriptionPackages = [],
  currentCredits = 0,
  requiredCredits,
  onCreditsPurchase,
  onSubscriptionPurchase,
  subscriptionFeatures = [],
  isLoading = false,
  title,
  subtitle,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const navigation = useNavigation();

  const {
    activeTab,
    selectedCreditsPackageId,
    selectedSubscriptionPkg,
    handleTabChange,
    handleCreditsPackageSelect,
    handleSubscriptionPackageSelect,
    handleCreditsPurchase,
    handleSubscriptionPurchase,
  } = usePaywall({
    initialTab,
    onCreditsPurchase,
    onSubscriptionPurchase,
  });

  const displayTitle = title || t("paywall.title", "Get Premium");
  const displaySubtitle = subtitle || t("paywall.subtitle", "");

  useEffect(() => {
    if (__DEV__) {
      console.log("[PaywallScreen] Mounted with initialTab:", initialTab);
    }
  }, [initialTab]);

  const handleClose = useCallback(() => {
    if (__DEV__) {
      console.log("[PaywallScreen] Close button pressed");
    }
    navigation.goBack();
  }, [navigation]);

  return (
    <View
      style={[styles.container, { backgroundColor: tokens.colors.background }]}
    >
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <PaywallHeader
          title={displayTitle}
          subtitle={displaySubtitle}
          onClose={handleClose}
        />

        <PaywallTabBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          creditsLabel={t("paywall.tabs.credits", "Credits")}
          subscriptionLabel={t("paywall.tabs.subscription", "Subscription")}
        />

        {activeTab === "credits" ? (
          <CreditsTabContent
            packages={creditsPackages}
            selectedPackageId={selectedCreditsPackageId}
            onSelectPackage={handleCreditsPackageSelect}
            onPurchase={handleCreditsPurchase}
            currentCredits={currentCredits}
            requiredCredits={requiredCredits}
            isLoading={isLoading}
            purchaseButtonText={t("paywall.purchase", "Purchase")}
          />
        ) : (
          <SubscriptionTabContent
            packages={subscriptionPackages}
            selectedPackage={selectedSubscriptionPkg}
            onSelectPackage={handleSubscriptionPackageSelect}
            onPurchase={handleSubscriptionPurchase}
            features={subscriptionFeatures}
            isLoading={isLoading}
            purchaseButtonText={t("paywall.subscribe", "Subscribe")}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

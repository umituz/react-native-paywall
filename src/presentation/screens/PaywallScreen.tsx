/**
 * Paywall Screen
 * Full screen paywall with Credits and Subscription tabs
 */

import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { PurchasesPackage } from "react-native-purchases";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
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

  const [activeTab, setActiveTab] = useState<PaywallTabType>(initialTab);
  const [selectedCreditsPackageId, setSelectedCreditsPackageId] = useState<
    string | null
  >(null);
  const [selectedSubscriptionPkg, setSelectedSubscriptionPkg] =
    useState<PurchasesPackage | null>(null);

  const displayTitle = title || t("paywall.title", "Get Premium");
  const displaySubtitle = subtitle || t("paywall.subtitle", "");

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreditsPurchase = useCallback(async () => {
    if (!selectedCreditsPackageId || !onCreditsPurchase) return;
    await onCreditsPurchase(selectedCreditsPackageId);
  }, [selectedCreditsPackageId, onCreditsPurchase]);

  const handleSubscriptionPurchase = useCallback(async () => {
    if (!selectedSubscriptionPkg || !onSubscriptionPurchase) return;
    await onSubscriptionPurchase(selectedSubscriptionPkg);
  }, [selectedSubscriptionPkg, onSubscriptionPurchase]);

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
          onTabChange={setActiveTab}
          creditsLabel={t("paywall.tabs.credits", "Credits")}
          subscriptionLabel={t("paywall.tabs.subscription", "Subscription")}
        />

        {activeTab === "credits" ? (
          <CreditsTabContent
            packages={creditsPackages}
            selectedPackageId={selectedCreditsPackageId}
            onSelectPackage={setSelectedCreditsPackageId}
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
            onSelectPackage={setSelectedSubscriptionPkg}
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

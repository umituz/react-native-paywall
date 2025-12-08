/**
 * Paywall Modal Component
 * Single Responsibility: Display paywall with Credits and Subscription tabs
 */

import React, { useState, useCallback } from "react";
import { View, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import type { PurchasesPackage } from "react-native-purchases";
import { PaywallHeader } from "./PaywallHeader";
import { PaywallTabBar } from "./PaywallTabBar";
import { CreditsTabContent } from "./CreditsTabContent";
import { SubscriptionTabContent } from "./SubscriptionTabContent";
import type { PaywallTabType } from "../../domain/entities/PaywallTab";
import type { CreditsPackage } from "../../domain/entities/CreditsPackage";

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  initialTab?: PaywallTabType;
  creditsPackages: CreditsPackage[];
  subscriptionPackages: PurchasesPackage[];
  currentCredits: number;
  requiredCredits?: number;
  onCreditsPurchase: (packageId: string) => Promise<void>;
  onSubscriptionPurchase: (pkg: PurchasesPackage) => Promise<void>;
  subscriptionFeatures?: Array<{ icon: string; text: string }>;
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = React.memo(
  ({
    visible,
    onClose,
    initialTab = "credits",
    creditsPackages,
    subscriptionPackages,
    currentCredits,
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

    const [activeTab, setActiveTab] = useState<PaywallTabType>(initialTab);
    const [selectedCreditsPackageId, setSelectedCreditsPackageId] = useState<
      string | null
    >(null);
    const [selectedSubscriptionPkg, setSelectedSubscriptionPkg] =
      useState<PurchasesPackage | null>(null);

    const displayTitle = title || t("paywall.title", "Get Premium");
    const displaySubtitle = subtitle || t("paywall.subtitle", "");

    const handleCreditsPurchase = useCallback(async () => {
      if (!selectedCreditsPackageId) return;
      await onCreditsPurchase(selectedCreditsPackageId);
    }, [selectedCreditsPackageId, onCreditsPurchase]);

    const handleSubscriptionPurchase = useCallback(async () => {
      if (!selectedSubscriptionPkg) return;
      await onSubscriptionPurchase(selectedSubscriptionPkg);
    }, [selectedSubscriptionPkg, onSubscriptionPurchase]);

    if (!visible) return null;

    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={onClose}
          />
          <View
            style={[styles.content, { backgroundColor: tokens.colors.surface }]}
          >
            <SafeAreaView edges={["top"]} style={styles.safeArea}>
              <PaywallHeader
                title={displayTitle}
                subtitle={displaySubtitle}
                onClose={onClose}
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
        </View>
      </Modal>
    );
  },
);

PaywallModal.displayName = "PaywallModal";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

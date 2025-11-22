/**
 * Credits Paywall Modal Component
 * Single Responsibility: Display credits purchase modal
 */

import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AtomicText,
  AtomicButton,
  AtomicIcon,
} from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { CreditsPackageCard } from "./CreditsPackageCard";
import { PaywallFeaturesList } from "./PaywallFeaturesList";
import type { CreditsPackage } from "../../domain/entities/CreditsPackage";

interface CreditsPaywallModalProps {
  visible: boolean;
  packages: CreditsPackage[];
  currentCredits: number;
  requiredCredits: number;
  features: Array<{ icon: string; text: string }>;
  onClose: () => void;
  onPurchase: (packageId: string) => Promise<void>;
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
}

export const CreditsPaywallModal: React.FC<CreditsPaywallModalProps> =
  React.memo(
    ({
      visible,
      packages,
      currentCredits,
      requiredCredits,
      features,
      onClose,
      onPurchase,
      isLoading = false,
      title,
      subtitle,
    }) => {
      const tokens = useAppDesignTokens();
      const { t } = useLocalization();
      const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
        null,
      );

      const displayTitle = useMemo(
        () => title || t("paywall.title", "Get More Credits"),
        [title, t],
      );

      const displaySubtitle = useMemo(
        () =>
          subtitle ||
          t(
            "paywall.subtitle",
            `You need ${requiredCredits} credits. You have ${currentCredits}.`,
          ),
        [subtitle, requiredCredits, currentCredits, t],
      );

      const featuresTitle = useMemo(
        () => t("paywall.features", "Premium Features"),
        [t],
      );

      const packagesTitle = useMemo(
        () => t("paywall.packages", "Choose a Package"),
        [t],
      );

      const handlePurchase = useCallback(async () => {
        if (!selectedPackageId || isLoading) {
          return;
        }
        try {
          await onPurchase(selectedPackageId);
        } catch (error) {
          // Error is handled by parent component
          // Don't close modal on error
        }
      }, [selectedPackageId, isLoading, onPurchase]);

      const handleSelectPackage = useCallback(
        (packageId: string) => {
          setSelectedPackageId(packageId);
        },
        [],
      );

      if (!visible) {
        return null;
      }

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
              style={[
                styles.content,
                { backgroundColor: tokens.colors.surface },
              ]}
            >
              <SafeAreaView edges={["top"]} style={styles.safeAreaTop}>
                <View style={styles.header}>
                  <AtomicText
                    type="headlineLarge"
                    style={[styles.title, { color: tokens.colors.textPrimary }]}
                  >
                    {displayTitle}
                  </AtomicText>
                  <TouchableOpacity
                    onPress={onClose}
                    style={[
                      styles.closeButton,
                      { backgroundColor: tokens.colors.borderLight },
                    ]}
                  >
                    <AtomicIcon name="X" size="md" color="secondary" />
                  </TouchableOpacity>
                </View>
              </SafeAreaView>

              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <AtomicText
                  type="bodyMedium"
                  style={[
                    styles.subtitle,
                    { color: tokens.colors.textSecondary },
                  ]}
                >
                  {displaySubtitle}
                </AtomicText>

                {/* Features Section - Top */}
                <View
                  style={[
                    styles.featuresSection,
                    { backgroundColor: tokens.colors.backgroundSecondary },
                  ]}
                >
                  <AtomicText
                    type="titleMedium"
                    style={[
                      styles.sectionTitle,
                      { color: tokens.colors.textPrimary },
                    ]}
                  >
                    {featuresTitle}
                  </AtomicText>
                  <PaywallFeaturesList
                    features={features}
                    containerStyle={styles.featuresContainer}
                    gap={16}
                  />
                </View>

                {/* Packages Section - Bottom */}
                <View style={styles.packagesSection}>
                  <AtomicText
                    type="titleMedium"
                    style={[
                      styles.sectionTitle,
                      { color: tokens.colors.textPrimary },
                    ]}
                  >
                    {packagesTitle}
                  </AtomicText>
                  <View style={styles.packagesContainer}>
                    {packages.map((pkg) => (
                      <CreditsPackageCard
                        key={pkg.id}
                        package={pkg}
                        isSelected={selectedPackageId === pkg.id}
                        onSelect={() => handleSelectPackage(pkg.id)}
                      />
                    ))}
                  </View>
                </View>
              </ScrollView>

              <SafeAreaView edges={["bottom"]} style={styles.footer}>
                <AtomicButton
                  title={
                    isLoading
                      ? t("paywall.processing", "Processing...")
                      : t("paywall.purchase", "Purchase")
                  }
                  onPress={handlePurchase}
                  disabled={!selectedPackageId || isLoading}
                  style={styles.purchaseButton}
                />
              </SafeAreaView>
            </View>
          </View>
        </Modal>
      );
    },
  );

CreditsPaywallModal.displayName = "CreditsPaywallModal";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
    flex: 1,
  },
  safeAreaTop: {
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontWeight: "700",
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
  },
  featuresSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  packagesSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: 16,
  },
  featuresContainer: {
    marginBottom: 0,
  },
  packagesContainer: {
    gap: 12,
  },
  footer: {
    padding: 24,
    paddingTop: 16,
  },
  purchaseButton: {
    marginBottom: 0,
  },
});

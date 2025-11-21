/**
 * Credits Paywall Modal Component
 * Single Responsibility: Display credits purchase modal
 */

import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AtomicText, AtomicButton, AtomicIcon } from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { CreditsPackageCard } from "./CreditsPackageCard";
import { PaywallFeaturesList } from "./PaywallFeaturesList";
import type { CreditsPackage } from "../../domain/entities/CreditsPackage";

interface CreditsPaywallModalProps {
  /** Whether modal is visible */
  visible: boolean;

  /** Available credit packages */
  packages: CreditsPackage[];

  /** Current credit balance */
  currentCredits: number;

  /** Required credits to access feature */
  requiredCredits: number;

  /** Features list */
  features: Array<{ icon: string; text: string }>;

  /** Callback when modal is closed */
  onClose: () => void;

  /** Callback when package is purchased */
  onPurchase: (packageId: string) => Promise<void>;

  /** Whether purchase is loading */
  isLoading?: boolean;

  /** Title text */
  title?: string;

  /** Subtitle text */
  subtitle?: string;
}

export const CreditsPaywallModal: React.FC<CreditsPaywallModalProps> = ({
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

  const selectedPackage = packages.find((pkg) => pkg.id === selectedPackageId);
  const displayTitle = title || t("paywall.title") || "Get More Credits";
  const displaySubtitle =
    subtitle ||
    t("paywall.subtitle") ||
    `You need ${requiredCredits} credits. You have ${currentCredits}.`;

  const handlePurchase = async () => {
    if (!selectedPackageId) {
      return;
    }
    await onPurchase(selectedPackageId);
  };

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
          style={[styles.content, { backgroundColor: tokens.colors.surface }]}
        >
          <SafeAreaView edges={["top"]} style={styles.safeAreaTop}>
            <View style={styles.header}>
              <AtomicText
                type="headlineLarge"
                style={[styles.title, { color: tokens.colors.textPrimary }]}
              >
                {displayTitle}
              </AtomicText>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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
              style={[styles.subtitle, { color: tokens.colors.textSecondary }]}
            >
              {displaySubtitle}
            </AtomicText>

            <View style={styles.packagesContainer}>
              {packages.map((pkg) => (
                <CreditsPackageCard
                  key={pkg.id}
                  package={pkg}
                  isSelected={selectedPackageId === pkg.id}
                  onSelect={() => setSelectedPackageId(pkg.id)}
                />
              ))}
            </View>

            <PaywallFeaturesList
              features={features}
              containerStyle={styles.featuresContainer}
            />
          </ScrollView>

          <View style={styles.footer}>
            <AtomicButton
              title={
                isLoading
                  ? t("paywall.processing") || "Processing..."
                  : t("paywall.purchase") || "Purchase"
              }
              onPress={handlePurchase}
              disabled={!selectedPackageId || isLoading}
              style={styles.purchaseButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  packagesContainer: {
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 32,
    backgroundColor: "transparent",
  },
  purchaseButton: {
    marginBottom: 0,
  },
});


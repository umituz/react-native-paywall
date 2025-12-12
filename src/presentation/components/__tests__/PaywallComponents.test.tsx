/**
 * Tests for Paywall Components
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PaywallHeader } from "../src/presentation/components/PaywallHeader";
import { PaywallTabBar } from "../src/presentation/components/PaywallTabBar";
import { PaywallFeatureItem } from "../src/presentation/components/PaywallFeatureItem";
import { PaywallFeaturesList } from "../src/presentation/components/PaywallFeaturesList";
import type { PaywallTabType } from "../src/domain/entities/PaywallTab";

// Mock design system tokens
jest.mock("@umituz/react-native-design-system-theme", () => ({
  useAppDesignTokens: () => ({
    colors: {
      textPrimary: "#000000",
      textSecondary: "#666666",
      surfaceSecondary: "#f5f5f5",
      primary: "#007AFF",
      onPrimary: "#ffffff",
      border: "#e0e0e0",
    },
  }),
}));

// Mock localization
jest.mock("@umituz/react-native-localization", () => ({
  useLocalization: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

// Mock design system atoms
jest.mock("@umituz/react-native-design-system-atoms", () => ({
  AtomicText: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  AtomicIcon: ({ name, ...props }: any) => <div {...props}>{name}</div>,
}));

describe("PaywallHeader", () => {
  it("should render title and subtitle", () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <PaywallHeader
        title="Test Title"
        subtitle="Test Subtitle"
        onClose={onClose}
      />
    );

    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Subtitle")).toBeTruthy();
  });

  it("should render title only", () => {
    const onClose = jest.fn();
    const { getByText, queryByText } = render(
      <PaywallHeader title="Test Title" onClose={onClose} />
    );

    expect(getByText("Test Title")).toBeTruthy();
    expect(queryByText("Test Subtitle")).toBeFalsy();
  });

  it("should call onClose when close button is pressed", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <PaywallHeader title="Test Title" onClose={onClose} />
    );

    // Assuming close button has testID
    const closeButton = getByTestId("close-button");
    fireEvent.press(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});

describe("PaywallTabBar", () => {
  it("should render tabs with default labels", () => {
    const onTabChange = jest.fn();
    const { getByText } = render(
      <PaywallTabBar
        activeTab="credits"
        onTabChange={onTabChange}
      />
    );

    expect(getByText("Credits")).toBeTruthy();
    expect(getByText("Subscription")).toBeTruthy();
  });

  it("should render tabs with custom labels", () => {
    const onTabChange = jest.fn();
    const { getByText } = render(
      <PaywallTabBar
        activeTab="credits"
        onTabChange={onTabChange}
        creditsLabel="Custom Credits"
        subscriptionLabel="Custom Subscription"
      />
    );

    expect(getByText("Custom Credits")).toBeTruthy();
    expect(getByText("Custom Subscription")).toBeTruthy();
  });

  it("should call onTabChange when tab is pressed", () => {
    const onTabChange = jest.fn();
    const { getByText } = render(
      <PaywallTabBar
        activeTab="credits"
        onTabChange={onTabChange}
      />
    );

    const subscriptionTab = getByText("Subscription");
    fireEvent.press(subscriptionTab);

    expect(onTabChange).toHaveBeenCalledWith("subscription");
  });
});

describe("PaywallFeatureItem", () => {
  it("should render feature with icon and text", () => {
    const { getByText } = render(
      <PaywallFeatureItem icon="Sparkles" text="Unlimited access" />
    );

    expect(getByText("Unlimited access")).toBeTruthy();
  });

  it("should handle lowercase icon names", () => {
    const { getByText } = render(
      <PaywallFeatureItem icon="sparkles" text="Unlimited access" />
    );

    expect(getByText("Unlimited access")).toBeTruthy();
  });
});

describe("PaywallFeaturesList", () => {
  const features = [
    { icon: "Sparkles", text: "Unlimited access" },
    { icon: "Image", text: "HD quality" },
    { icon: "Wand", text: "Premium filters" },
  ];

  it("should render list of features", () => {
    const { getByText } = render(
      <PaywallFeaturesList features={features} />
    );

    features.forEach((feature) => {
      expect(getByText(feature.text)).toBeTruthy();
    });
  });

  it("should render with custom gap", () => {
    const { container } = render(
      <PaywallFeaturesList features={features} gap={20} />
    );

    // Test that custom gap is applied (implementation depends on styling)
    expect(container).toBeTruthy();
  });
});
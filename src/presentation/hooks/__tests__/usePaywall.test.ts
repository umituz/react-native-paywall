/**
 * Tests for Paywall Hook
 */

import { renderHook, act } from "@testing-library/react-native";
import { usePaywall } from "../src/presentation/hooks/usePaywall";
import type { PurchasesPackage } from "react-native-purchases";

describe("usePaywall", () => {
  const mockCreditsPurchase = jest.fn();
  const mockSubscriptionPurchase = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePaywall());

    expect(result.current.activeTab).toBe("credits");
    expect(result.current.selectedCreditsPackageId).toBeNull();
    expect(result.current.selectedSubscriptionPkg).toBeNull();
  });

  it("should initialize with custom initial tab", () => {
    const { result } = renderHook(() =>
      usePaywall({ initialTab: "subscription" })
    );

    expect(result.current.activeTab).toBe("subscription");
  });

  it("should handle tab change", () => {
    const { result } = renderHook(() => usePaywall());

    act(() => {
      result.current.handleTabChange("subscription");
    });

    expect(result.current.activeTab).toBe("subscription");
  });

  it("should handle credits package selection", () => {
    const { result } = renderHook(() => usePaywall());

    act(() => {
      result.current.handleCreditsPackageSelect("test-package-id");
    });

    expect(result.current.selectedCreditsPackageId).toBe("test-package-id");
  });

  it("should handle subscription package selection", () => {
    const { result } = renderHook(() => usePaywall());
    const mockPackage: PurchasesPackage = {
      product: {
        identifier: "test-subscription",
        price: 9.99,
        currencyCode: "USD",
        title: "Test Subscription",
        description: "Test Description",
      },
    } as PurchasesPackage;

    act(() => {
      result.current.handleSubscriptionPackageSelect(mockPackage);
    });

    expect(result.current.selectedSubscriptionPkg).toBe(mockPackage);
  });

  it("should handle credits purchase", async () => {
    mockCreditsPurchase.mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      usePaywall({ onCreditsPurchase: mockCreditsPurchase })
    );

    act(() => {
      result.current.handleCreditsPackageSelect("test-package-id");
    });

    await act(async () => {
      await result.current.handleCreditsPurchase();
    });

    expect(mockCreditsPurchase).toHaveBeenCalledWith("test-package-id");
  });

  it("should reset selection", () => {
    const { result } = renderHook(() => usePaywall());

    act(() => {
      result.current.handleCreditsPackageSelect("test-package-id");
    });

    expect(result.current.selectedCreditsPackageId).toBe("test-package-id");

    act(() => {
      result.current.resetSelection();
    });

    expect(result.current.selectedCreditsPackageId).toBeNull();
  });
});
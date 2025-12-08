# @umituz/react-native-paywall

Paywall components and screens for React Native apps with subscription management.

Built with **SOLID**, **DRY**, and **KISS** principles.

## Installation

```bash
npm install @umituz/react-native-paywall
```

## Peer Dependencies

- `react` >= 18.2.0
- `react-native` >= 0.74.0
- `@umituz/react-native-design-system` *
- `@umituz/react-native-design-system-theme` *
- `@umituz/react-native-localization` *
- `@umituz/react-native-auth` *
- `@umituz/react-native-subscription` *
- `react-native-purchases` >= 9.0.0

## Features

- ✅ Domain-Driven Design (DDD) architecture
- ✅ SOLID principles
- ✅ DRY (Don't Repeat Yourself)
- ✅ KISS (Keep It Simple, Stupid)
- ✅ Guest mode support
- ✅ RevenueCat integration
- ✅ Customizable features list
- ✅ Legal links integration

## Usage

### PaywallScreen

```typescript
import { PaywallScreen } from '@umituz/react-native-paywall';
import type { PurchasesPackage } from 'react-native-purchases';

const features = [
  { icon: 'Check', text: 'Unlimited Decks' },
  { icon: 'Check', text: 'Unlimited Cards' },
  { icon: 'Check', text: 'Unlimited Study Sessions' },
];

<PaywallScreen
  packages={packages}
  selectedPackage={selectedPackage}
  onPackageSelect={setSelectedPackage}
  onPurchase={handlePurchase}
  features={features}
  isGuest={isGuest}
  onSignIn={handleSignIn}
/>
```

### PaywallContent

```typescript
import { PaywallContent } from '@umituz/react-native-paywall';

<PaywallContent
  packages={packages}
  selectedPackage={selectedPackage}
  onPackageSelect={setSelectedPackage}
  onPurchase={handlePurchase}
  features={features}
  isGuest={isGuest}
  onSignIn={handleSignIn}
/>
```

## License

MIT


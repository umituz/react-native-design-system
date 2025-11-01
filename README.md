# @umituz/react-native-design-system

Universal design system for React Native apps following Domain-Driven Design (DDD) architecture with Material Design 3 components.

## ✨ Features

- 🎨 **Material Design 3** - Modern, accessible UI components
- ⚛️ **Atomic Design** - Organized component hierarchy (Atoms → Molecules → Organisms)
- 🏗️ **DDD Architecture** - Clean domain-driven structure
- 🌓 **Theme Support** - Built-in light/dark mode
- 📱 **Responsive** - Adaptive layouts for phones and tablets
- ♿ **Accessible** - WCAG AA compliant components
- 🎭 **Animations** - Smooth React Native Reanimated animations
- 📦 **Zero Config** - Works out of the box

## 📦 Installation

```bash
npm install @umituz/react-native-design-system
```

### Peer Dependencies

```bash
npm install react@18.3.1 react-native@0.76.3 react-native-paper@^5.12.5 react-native-reanimated@~3.10.1
```

## 🚀 Usage

```typescript
import {
  AtomicButton,
  AtomicText,
  AtomicInput,
  ScreenLayout,
  useAppDesignTokens,
} from '@umituz/react-native-design-system';

const MyScreen = () => {
  const tokens = useAppDesignTokens();

  return (
    <ScreenLayout>
      <AtomicText type="headingLarge">Welcome</AtomicText>
      <AtomicInput
        label="Email"
        placeholder="Enter your email"
      />
      <AtomicButton
        variant="primary"
        onPress={() => console.log('Pressed')}
      >
        Submit
      </AtomicButton>
    </ScreenLayout>
  );
};
```

## 🧩 Components

### Atoms (Primitive UI Components)
- `AtomicButton` - Material Design 3 buttons with variants
- `AtomicText` - Typography with MD3 type scale
- `AtomicInput` - Text inputs with validation
- `AtomicCard` - Container cards
- `AtomicIcon` - Icon components
- `AtomicSwitch` - Toggle switches
- `AtomicBadge` - Status badges
- `AtomicProgress` - Progress indicators
- And 15+ more...

### Molecules (Composite Components)
- `FormField` - Input with label and error
- `ListItem` - Standard list item
- `SearchBar` - Search input with icon
- `EmptyState` - Empty state placeholder
- `ScreenHeader` - Screen title header
- And more...

### Organisms (Complex Patterns)
- `ScreenLayout` - Screen wrapper with safe area
- `AppHeader` - Application header
- `FormContainer` - Form layout container

## 🎨 Design Tokens

```typescript
import { useAppDesignTokens } from '@umituz/react-native-design-system';

const tokens = useAppDesignTokens();

// Colors
tokens.colors.primary
tokens.colors.secondary
tokens.colors.background
tokens.colors.textPrimary

// Spacing
tokens.spacing.xs  // 4
tokens.spacing.sm  // 8
tokens.spacing.md  // 16
tokens.spacing.lg  // 24
tokens.spacing.xl  // 32

// Typography
tokens.typography.headingLarge
tokens.typography.bodyMedium
tokens.typography.caption
```

## 📱 Responsive Utilities

```typescript
import { useResponsive } from '@umituz/react-native-design-system';

const responsive = useResponsive();

// Device detection
responsive.isSmallPhone
responsive.isTablet
responsive.isLandscape

// Responsive values (pre-calculated)
responsive.logoSize
responsive.inputHeight
responsive.horizontalPadding
```

## 🌓 Theme Integration

This package works seamlessly with `@umituz/react-native-theme`:

```typescript
import { ThemeProvider } from '@umituz/react-native-theme';
import { ScreenLayout } from '@umituz/react-native-design-system';

const App = () => (
  <ThemeProvider>
    <ScreenLayout>
      {/* Your app */}
    </ScreenLayout>
  </ThemeProvider>
);
```

## 📖 Documentation

Full documentation: [Coming Soon]

## 🤝 Contributing

Contributions welcome! This is the universal design system used across 100+ React Native apps.

## 📄 License

MIT © Umit Uz

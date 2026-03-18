---
name: setup-react-native-design-system
description: Sets up comprehensive design system for React Native apps with UI components, theme, typography, and utilities. Triggers on: Setup design system, install design system, DesignSystemProvider, theme setup, UI components, useAppDesignTokens, sub-path imports, atomic design.
---

# Setup React Native Design System

Comprehensive setup for `@umituz/react-native-design-system` - Universal design system with atoms, molecules, organisms, and utilities.

## Overview

This skill handles everything needed to integrate a complete design system into your React Native or Expo app:
- Package installation and updates
- DesignSystemProvider setup
- UI component library (atoms, molecules, organisms)
- Theme system with design tokens
- Typography system
- Responsive utilities
- Safe area handling
- Utility hooks (infinite scroll, offline, UUID, etc.)

## ⚠️ CRITICAL: Sub-Path Imports

**NEVER import from the main package:**

```typescript
// ❌ WRONG - Don't do this!
import { DesignSystemProvider } from '@umituz/react-native-design-system';
```

**ALWAYS use sub-path imports:**

```typescript
// ✅ CORRECT - Use sub-paths!
import { DesignSystemProvider } from '@umituz/react-native-design-system/theme';
import { AtomicButton } from '@umituz/react-native-design-system/components/atoms';
import { useInfiniteScroll } from '@umituz/react-native-design-system/hooks';
```

## Quick Start

Just say: **"Setup design system in my app"** and this skill will handle everything.

**What's Included:**
- 30+ atomic components (Button, Input, Card, etc.)
- Molecule components (FormField, ListItem, etc.)
- Organism components (Navbar, BottomSheet, etc.)
- Theme system with light/dark modes
- Typography scale
- Spacing and layout utilities
- Responsive design helpers
- Infinite scroll hook
- Offline support
- UUID generation
- Image manipulation utilities

## When to Use

Invoke this skill when you need to:
- Install @umituz/react-native-design-system
- Set up design system provider
- Add UI component library
- Configure theme and design tokens
- Implement responsive design
- Add utility hooks (infinite scroll, offline, etc.)
- Set up typography system

## Step 1: Analyze the Project

### Check package.json

```bash
cat package.json | grep "@umituz/react-native-design-system"
npm list @umituz/react-native-design-system
```

### Detect Project Type

```bash
cat app.json | grep -q "expo" && echo "Expo" || echo "Bare RN"
```

## Step 2: Install Package

### Install or Update

```bash
npm install @umituz/react-native-design-system@latest
```

### Install Required Peer Dependencies

This package requires several dependencies:

```bash
# Expo modules (for Expo projects)
npx expo install expo-font expo-asset expo-haptics expo-clipboard expo-device expo-network expo-secure-store

# React Native modules
npm install react-native-gesture-handler react-native-safe-area-context react-native-svg

# State management
npm install @tanstack/react-query zustand

# Optional (if using portals)
npm install @gorhom/portal
```

## Step 3: Set Up DesignSystemProvider

### ⚠️ IMPORTANT: Use Sub-Path Imports!

In your app entry point (`app/_layout.tsx` or `App.tsx`):

```typescript
import { DesignSystemProvider } from '@umituz/react-native-design-system/theme';

export default function RootLayout() {
  return (
    <DesignSystemProvider
      theme="light" // or "dark" or "system"
      customTheme={{
        // Optional: Override design tokens
        colors: {
          primary: '#5B7CFA',
          secondary: '#8B5CF6',
        },
        typography: {
          // Custom typography scale
        },
      }}
    >
      <Stack>{/* your screens */}</Stack>
    </DesignSystemProvider>
  );
}
```

### Check If Already Configured

```bash
grep -r "DesignSystemProvider" app/ App.tsx 2>/dev/null
```

## Step 4: Use Design Tokens

### Access Theme Tokens

```typescript
import { useAppDesignTokens } from '@umituz/react-native-design-system';

export function MyComponent() {
  const tokens = useAppDesignTokens();

  return (
    <View style={{ backgroundColor: tokens.colors.background }}>
      <Text style={{ color: tokens.colors.text, fontSize: tokens.typography.sizes.large }}>
        Themed Component
      </Text>
    </View>
  );
}
```

### Token Structure

```typescript
interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    // ... more colors
  };
  typography: {
    sizes: {
      small: number;
      medium: number;
      large: number;
      // ... more sizes
    };
    weights: {
      regular: number;
      medium: number;
      bold: number;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}
```

## Step 5: Use UI Components

### Atomic Components

```typescript
import { AtomicButton } from '@umituz/react-native-design-system/components/atoms';
import { AtomicInput } from '@umituz/react-native-design-system/components/atoms';
import { AtomicCard } from '@umituz/react-native-design-system/components/atoms';

export function FormScreen() {
  return (
    <AtomicCard padding="md">
      <AtomicInput placeholder="Enter text" />
      <AtomicButton variant="primary" onPress={() => {}}>
        Submit
      </AtomicButton>
    </AtomicCard>
  );
}
```

### Available Atomic Components

- AtomicButton - Button with variants (primary, secondary, ghost, etc.)
- AtomicInput - Text input with validation states
- AtomicCard - Card container with padding/shadow
- AtomicText - Text with typography scale
- AtomicBadge - Badge component
- AtomicDivider - Divider/separator
- AtomicSpinner - Loading spinner
- And many more...

### Molecule Components

```typescript
import { FormField } from '@umituz/react-native-design-system/components/molecules';
import { ListItem } from '@umituz/react-native-design-system/components/molecules';

export function SettingsScreen() {
  return (
    <>
      <FormField
        label="Email"
        placeholder="user@example.com"
        keyboardType="email-address"
      />

      <ListItem
        title="Notifications"
        subtitle="Manage push notifications"
        showChevron
        onPress={() => {}}
      />
    </>
  );
}
```

### Organism Components

```typescript
import { Navbar } from '@umituz/react-native-design-system/components/organisms';
import { BottomSheet } from '@umituz/react-native-design-system/components/organisms';

export function MainScreen() {
  return (
    <>
      <Navbar
        title="My App"
        showBackButton
        onBackPress={() => {}}
      />

      <BottomSheet
        visible={true}
        onClose={() => {}}
      >
        <Text>Bottom sheet content</Text>
      </BottomSheet>
    </>
  );
}
```

## Step 6: Use Utility Hooks

### Infinite Scroll

```typescript
import { useInfiniteScroll } from '@umituz/react-native-design-system/hooks';

export function FeedScreen() {
  const {
    data,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    refresh,
  } = useInfiniteScroll({
    fetchData: async (page) => {
      const response = await api.fetchItems(page);
      return response.items;
    },
    pageSize: 20,
  });

  return (
    <FlatList
      data={data}
      onEndReached={() => loadMore()}
      onEndReachedThreshold={0.5}
      refreshing={isLoading}
      onRefresh={() => refresh()}
      renderItem={({ item }) => <ItemCard item={item} />}
    />
  );
}
```

### Offline Support

```typescript
import { useOffline } from '@umituz/react-native-design-system/hooks';

export function DataScreen() {
  const { isOnline, isOffline } = useOffline();

  useEffect(() => {
    if (isOffline) {
      Alert.alert('Offline', 'You are currently offline');
    }
  }, [isOffline]);

  return (
    <View>
      <Text>Connection: {isOnline ? 'Online' : 'Offline'}</Text>
    </View>
  );
}
```

### UUID Generation

```typescript
import { generateUUID } from '@umituz/react-native-design-system/utils';

export function CreateItemScreen() {
  const handleCreate = () => {
    const itemId = generateUUID();
    console.log('New item ID:', itemId); // e.g., "550e8400-e29b-41d4-a716-446655440000"
  };

  return <Button title="Create Item" onPress={handleCreate} />;
}
```

### Image Manipulation

```typescript
import { ImageManipulationUtils } from '@umituz/react-native-design-system/utils';

export function ImageEditorScreen() {
  const processImage = async (imageUri: string) => {
    const processedUri = await ImageManipulationUtils.cropAndResize({
      uri: imageUri,
      width: 800,
      height: 600,
      crop: { x: 100, y: 100, width: 400, height: 300 },
    });

    return processedUri;
  };

  return <Button title="Process Image" onPress={() => processImage(imageUri)} />;
}
```

## Step 7: Responsive Design

### Use Responsive Utilities

```typescript
import { useResponsive } from '@umituz/react-native-design-system/hooks';

export function ResponsiveComponent() {
  const { width, height, isTablet, isDesktop } = useResponsive();

  return (
    <View style={{
      paddingHorizontal: isTablet ? 32 : 16,
    }}>
      <Text>
        Screen: {width}x{height}
        {isTablet && ' (Tablet)'}
        {isDesktop && ' (Desktop)'}
      </Text>
    </View>
  );
}
```

### Safe Area Handling

```typescript
import { useSafeArea } from '@umituz/react-native-design-system/hooks';

export function SafeComponent() {
  const { safeAreaInsets } = useSafeArea();

  return (
    <View style={{
      paddingTop: safeAreaInsets.top,
      paddingBottom: safeAreaInsets.bottom,
    }}>
      <Text>Safe area content</Text>
    </View>
  );
}
```

## Step 8: Typography System

### Use Typography Scale

```typescript
import { Typography } from '@umituz/react-native-design-system/typography';

export function TextComponent() {
  return (
    <View>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="body">Body text</Typography>
      <Typography variant="caption">Caption text</Typography>
    </View>
  );
}
```

### Custom Text Styles

```typescript
import { Text } from '@umituz/react-native-design-system/components/atoms';

export function CustomText() {
  return (
    <Text
      typography="h1"
      color="primary"
      weight="bold"
    >
      Custom styled text
    </Text>
  );
}
```

## Step 9: Theme Customization

### Create Custom Theme

```typescript
import { DesignSystemProvider } from '@umituz/react-native-design-system/theme';

const customTheme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#F7F7F7',
    surface: '#FFFFFF',
    text: '#2D3436',
  },
  typography: {
    fontFamily: 'CustomFont',
    sizes: {
      h1: 32,
      h2: 28,
      h3: 24,
      body: 16,
      caption: 12,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
};

export default function RootLayout() {
  return (
    <DesignSystemProvider theme="custom" customTheme={customTheme}>
      <Stack>{/* your screens */}</Stack>
    </DesignSystemProvider>
  );
}
```

## Step 10: Native Setup (Bare React Native)

### iOS Setup

```bash
cd ios && pod install && cd ..
```

### Android Setup

No additional setup needed.

## Step 11: Verify Setup

### Run the App

```bash
npx expo start
# or
npx react-native run-ios
```

### Verification Checklist

- ✅ Package installed
- ✅ All dependencies installed
- ✅ DesignSystemProvider wraps app
- ✅ Using sub-path imports (NOT barrel imports!)
- ✅ Components render correctly
- ✅ Theme tokens accessible
- ✅ Responsive utilities work
- ✅ Hooks work (infinite scroll, offline, etc.)

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using barrel imports | ALWAYS use sub-path imports! |
| Forgetting peer dependencies | Install all Expo modules and RN modules |
| Provider not wrapping app | DesignSystemProvider must wrap entire app |
| Wrong theme structure | Follow customTheme interface |
| Missing safe area | Use useSafeArea hook |
| Not using responsive utilities | Use useResponsive for tablet/desktop |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Module not found"** | Check you're using sub-path imports, not barrel imports |
| **"DesignSystemProvider not found"** | Import from '@umituz/react-native-design-system/theme' |
| **Components not rendering** | Check all peer dependencies are installed |
| **Theme not applying** | Ensure DesignSystemProvider wraps the component tree |
| **Font not loading** | Wait for expo-font to load before rendering |
| **Safe area not working** | Use useSafeArea hook or SafeAreaView component |

## Import Reference

### Correct Sub-Path Imports

```typescript
// Provider
import { DesignSystemProvider } from '@umituz/react-native-design-system/theme';

// Hooks
import { useAppDesignTokens } from '@umituz/react-native-design-system/hooks';
import { useInfiniteScroll } from '@umituz/react-native-design-system/hooks';
import { useOffline } from '@umituz/react-native-design-system/hooks';
import { useResponsive } from '@umituz/react-native-design-system/hooks';
import { useSafeArea } from '@umituz/react-native-design-system/hooks';

// Components - Atoms
import { AtomicButton } from '@umituz/react-native-design-system/components/atoms';
import { AtomicInput } from '@umituz/react-native-design-system/components/atoms';
import { AtomicCard } from '@umituz/react-native-design-system/components/atoms';

// Components - Molecules
import { FormField } from '@umituz/react-native-design-system/components/molecules';
import { ListItem } from '@umituz/react-native-design-system/components/molecules';

// Components - Organisms
import { Navbar } from '@umituz/react-native-design-system/components/organisms';
import { BottomSheet } from '@umituz/react-native-design-system/components/organisms';

// Utils
import { generateUUID } from '@umituz/react-native-design-system/utils';
import { ImageManipulationUtils } from '@umituz/react-native-design-system/utils';

// Typography
import { Typography } from '@umituz/react-native-design-system/typography';
```

---

## Offline Network Management

### Overview

The design system includes comprehensive offline/network connectivity management through `expo-network` and custom hooks.

### Installation

| Requirement | Description |
|-------------|-------------|
| Design System | `@umituz/react-native-design-system` - includes offline functionality |
| Native Dependency | `expo-network` - required for native network detection |

```bash
npx expo install expo-network
```

### useOffline Hook

Network state hook for detecting connectivity changes.

#### Import

```typescript
import { useOffline } from '@umituz/react-native-design-system/hooks';
```

#### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `isOnline` | `boolean` | Device has network connection |
| `isOffline` | `boolean` | Device has no network connection |
| `isConnected` | `boolean` | Alias for isOnline |
| `isInternetReachable` | `boolean \| null` | Can reach internet servers |
| `connectionType` | `string` | Network type (wifi, cellular, none, unknown) |
| `lastOnlineAt` | `Date \| null` | When device was last online |
| `connectionQuality` | `string` | Network quality assessment |

#### Usage Example

```typescript
import { useOffline } from '@umituz/react-native-design-system/hooks';
import { Alert } from 'react-native';

export function DataScreen() {
  const { isOnline, isOffline, connectionType } = useOffline();

  useEffect(() => {
    if (isOffline) {
      Alert.alert('Offline', 'You are currently offline');
    }
  }, [isOffline]);

  return (
    <View>
      <Text>Connection: {isOnline ? 'Online' : 'Offline'}</Text>
      <Text>Type: {connectionType}</Text>
    </View>
  );
}
```

### OfflineBanner Component

Shows offline status banner when network is unavailable.

#### Import

```typescript
import { OfflineBanner } from '@umituz/react-native-design-system/components/organisms';
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `visible` | `boolean` | Yes | Show/hide banner |
| `message` | `string` | No | Custom message (default: "No internet connection") |
| `backgroundColor` | `string` | No | Custom background color |
| `position` | `"top" \| "bottom"` | No | Banner position (default: "top") |

#### Usage Example

```typescript
import { OfflineBanner } from '@umituz/react-native-design-system/components/organisms';
import { useOffline } from '@umituz/react-native-design-system/hooks';

export function AppNavigator() {
  const { isOffline } = useOffline();

  return (
    <>
      <OfflineBanner visible={isOffline} />
      <Stack.Navigator>{/* screens */}</Stack.Navigator>
    </>
  );
}
```

### Best Practices

| Practice | Description |
|----------|-------------|
| **Check Before API Calls** | Use `isOnline` before network requests |
| **Graceful Degradation** | Show offline UI when disconnected |
| **Translations** | Store network messages in locale files |
| **Background Listeners** | Use smart snapshot suspend strategy for Firestore queries when offline |

### Complete Example: Offline-Aware Screen

```typescript
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AtomicText } from '@umituz/react-native-design-system/components/atoms';
import { useOffline } from '@umituz/react-native-design-system/hooks';
import { OfflineBanner } from '@umituz/react-native-design-system/components/organisms';
import { useTranslation } from 'react-i18next';

export function FeedScreen() {
  const { t } = useTranslation();
  const { isOnline, isOffline } = useOffline();
  const { data, isLoading, error } = useFetchData();

  // Show offline banner when disconnected
  if (isOffline) {
    return (
      <>
        <OfflineBanner
          visible={true}
          message={t('offline.noConnection')}
        />
        {/* Show cached data */}
        <CachedContent data={data} />
      </>
    );
  }

  // Online - show live data
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <AtomicText typography="body">Error: {error.message}</AtomicText>;
  }

  return <LiveContent data={data} />;
}
```

### Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| **"Cannot find native module 'ExpoNetwork'"** | Missing dependency | `npx expo install expo-network` |
| **Network state not updating** | Not initialized | Check DesignSystemProvider wraps app |
| **No permissions** | App lacks network permissions | Check iOS/Android network permissions |

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using custom network detection | Use `useOffline()` hook from design system |
| Direct `NetInfo` imports | Use design system abstractions |
| `Platform.OS` for network checks | Use cross-platform `useOffline()` hook |
| Not showing offline UI | Add `OfflineBanner` component to navigation |
| Making API calls when offline | Check `isOnline` before requests |

---

After setup, provide:

1. ✅ Package version installed
2. ✅ Dependencies added
3. ✅ DesignSystemProvider location (with sub-path import!)
4. ✅ Theme configuration
5. ✅ Components imported correctly
6. ✅ Hooks working
7. ✅ Verification status

---

**Compatible with:** @umituz/react-native-design-system@latest
**Platforms:** React Native (Expo & Bare)
**Dependencies:** expo-*, react-native-gesture-handler, react-native-safe-area-context, react-native-svg, @tanstack/react-query, zustand
**IMPORTANT:** Always use sub-path imports, never barrel imports!

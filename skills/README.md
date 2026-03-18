# React Native Design System Skills

Claude Code skills for `@umituz/react-native-design-system` - Comprehensive UI component library.

## Installation

```bash
npx skills add /Users/umituz/Desktop/github/umituz/apps/mobile/npm-packages/react-native-design-system/skills/SKILL.md -g
```

## Usage

Say: **"Setup design system in my app"**

## ⚠️ CRITICAL: Sub-Path Imports Required

**NEVER use barrel imports:**
```typescript
// ❌ WRONG
import { DesignSystemProvider } from '@umituz/react-native-design-system';
```

**ALWAYS use sub-path imports:**
```typescript
// ✅ CORRECT
import { DesignSystemProvider } from '@umituz/react-native-design-system/theme';
import { AtomicButton } from '@umituz/react-native-design-system/components/atoms';
import { useInfiniteScroll } from '@umituz/react-native-design-system/hooks';
```

## Features

### Component Library
- **30+ Atomic Components** - Button, Input, Card, Text, Badge, etc.
- **Molecule Components** - FormField, ListItem, etc.
- **Organism Components** - Navbar, BottomSheet, etc.

### Theming
- Light/dark/system themes
- Custom theme support
- Design tokens (colors, typography, spacing)

### Utilities
- Infinite scroll hook
- Offline support
- UUID generation
- Image manipulation
- Responsive design helpers
- Safe area handling

## Dependencies

**Required:**
- expo-font, expo-asset, expo-haptics, expo-clipboard
- expo-device, expo-network, expo-secure-store
- react-native-gesture-handler
- react-native-safe-area-context
- react-native-svg
- @tanstack/react-query, zustand

**Optional:**
- @gorhom/portal (if using portals)

## Component Examples

```typescript
// Provider
import { DesignSystemProvider } from '@umituz/react-native-design-system/theme';

// Components
import { AtomicButton } from '@umituz/react-native-design-system/components/atoms';
import { FormField } from '@umituz/react-native-design-system/components/molecules';
import { Navbar } from '@umituz/react-native-design-system/components/organisms';

// Hooks
import { useInfiniteScroll } from '@umituz/react-native-design-system/hooks';
import { useAppDesignTokens } from '@umituz/react-native-design-system/hooks';

// Utils
import { generateUUID } from '@umituz/react-native-design-system/utils';
```

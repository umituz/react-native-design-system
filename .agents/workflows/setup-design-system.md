---
description: Sets up or updates the @umituz/react-native-design-system package in a React Native app with its components and tokens.
---

# Design System Setup Skill

When this workflow/skill is invoked, follow these explicit instructions to configure `@umituz/react-native-design-system`.

## Step 1: Check and Update `package.json`
- Analyze the project's `package.json`.
- Check if `@umituz/react-native-design-system` exists.
  - If missing: Install with `npm install @umituz/react-native-design-system`.
  - If outdated: Update it to the latest version.

## Step 2: Install Required Peer Dependencies
The design system heavily relies on Expo modules, Gesture Handler, and core UI dependencies. Check & install missing peer dependencies (use `npx expo install` for Expo packages):
- `expo-font`, `expo-asset`, `expo-haptics`, `expo-clipboard`, `expo-device`, `expo-network`, `expo-secure-store`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
- `react-native-svg`
- `@gorhom/portal` (if used in app)
- `@tanstack/react-query` & `zustand`

// turbo
## Step 3: Native Setup (If bare React Native)
If the project structure indicates an iOS build folder is present, run:
```bash
cd ios && pod install
```

## Step 4: Setup Initialization & Boilerplate
- Locate the main entry point (e.g., `App.tsx`, `app/_layout.tsx`, or a primary wrapper).
- Wrap the app with `DesignSystemProvider`.
- **CRITICAL NOTE:** DO NOT use barrel imports (direct `@umituz/react-native-design-system`). Use sub-path imports instead.
  ```typescript
  import { DesignSystemProvider } from '@umituz/react-native-design-system/theme';

  // Inside App Root
  <DesignSystemProvider>
    {children}
  </DesignSystemProvider>
  ```
- If fonts need to be loaded, ensure the app's loading phase properly waits for `expo-font` before rendering the main UI.

## Step 5: Summary
Output what was done: the packages updated, peer dependencies installed, and files modified to inject the `DesignSystemProvider`.

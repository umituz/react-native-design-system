# React Native Design System - Components

This React Native Design System provides a comprehensive component library based on Atomic Design principles. All components are fully customizable, theme-aware, and accessible.

## 📦 Table of Contents

- [Atoms](#atoms)
- [Molecules](#molecules)
- [Organisms](#organisms)
- [Layouts](#layouts)

## ⚛️ Atoms

Atoms are the most basic building blocks of the design system. They serve a single purpose and are simple components.

### Input & Button

- **[Button](src/atoms/button/README.md)** - Button component with 6 variants
- **[AtomicInput](src/atoms/input/README.md)** - Feature-rich input component
- **[AtomicTextArea](src/atoms/AtomicTextArea.README.md)** - Multi-line text input
- **[AtomicPicker](src/atoms/picker/README.md)** - Modal selection component
- **[AtomicDatePicker](src/atoms/AtomicDatePicker.README.md)** - Date/time picker

### Display & Content

- **[AtomicText](src/atoms/AtomicText.README.md)** - Theme-aware text component
- **[AtomicIcon](src/atoms/AtomicIcon.README.md)** - Ionicons wrapper
- **[AtomicImage](src/atoms/AtomicImage.README.md)** - Optimized image component
- **[AtomicCard](src/atoms/AtomicCard.README.md)** - Simple card container

### Interactive Elements

- **[AtomicChip](src/atoms/chip/README.md)** - Label/filter component
- **[AtomicBadge](src/atoms/AtomicBadge.README.md)** - Badge component
- **[AtomicSwitch](src/atoms/AtomicSwitch.README.md)** - Toggle switch
- **[AtomicTouchable](src/atoms/AtomicTouchable.README.md)** - Touchable wrapper

### Feedback & Loading

- **[AtomicSpinner](src/atoms/AtomicSpinner.README.md)** - Loading indicator
- **[AtomicProgress](src/atoms/AtomicProgress.README.md)** - Progress bar
- **[AtomicSkeleton](src/atoms/skeleton/AtomicSkeleton.README.md)** - Skeleton loading placeholder

### Action Buttons

- **[AtomicFab](src/atoms/AtomicFab.README.md)** - Floating action button

### User Interface

- **[AtomicAvatar](src/atoms/AtomicAvatar.README.md)** - User profile avatar
- **[EmptyState](src/atoms/EmptyState.README.md)** - Empty state display

### Effects

- **[GlassView](src/atoms/GlassView/README.md)** - Glassmorphism effect

## 🧪 Molecules

Molecules are more complex components formed by combining multiple atoms.

### Form Components

- **[FormField](src/molecules/FormField.README.md)** - Form field (label + input + error)
- **[FormContainer](src/organisms/FormContainer.README.md)** - Form container

### Navigation & Search

- **[SearchBar](src/molecules/SearchBar/README.md)** - Search bar component
- **[ListItem](src/molecules/ListItem.README.md)** - List item component

### Modals & Overlays

- **[BaseModal](src/molecules/BaseModal.README.md)** - Base modal component
- **[ConfirmationModal](src/molecules/ConfirmationModal.README.md)** - Confirmation modal
- **[BottomSheet](src/molecules/bottom-sheet/README.md)** - Bottom sheet

### Alerts & Notifications

- **[AlertBanner](src/molecules/alerts/README.md)** - Banner alert
- **[AlertToast](src/molecules/alerts/README.md)** - Toast notification
- **[AlertInline](src/molecules/alerts/README.md)** - Inline alert
- **[AlertModal](src/molecules/alerts/README.md)** - Modal alert
- **[AlertContainer](src/molecules/alerts/README.md)** - Alert container provider

### Cards & Media

- **[MediaCard](src/molecules/media-card/README.md)** - Media card component
- **[GlowingCard](src/molecules/GlowingCard/README.md)** - Glowing neon effect card
- **[Avatar](src/molecules/avatar/README.md)** - User avatar
- **[AvatarGroup](src/molecules/avatar/AvatarGroup/README.md)** - Avatar group

### Lists & Data

- **[List](src/molecules/List/README.md)** - List component
- **[StepProgress](src/molecules/StepProgress/README.md)** - Step progress indicator
- **[StepHeader](src/molecules/StepHeader/README.md)** - Step header

### Advanced Components

- **[AtomicCalendar](src/molecules/calendar/README.md)** - Calendar component
- **[TabsNavigator](src/molecules/navigation/README.md)** - Tab navigation
- **[StackNavigator](src/molecules/navigation/README.md)** - Stack navigation
- **[EmojiPicker](src/molecules/emoji/README.md)** - Emoji picker
- **[Countdown](src/molecules/countdown/README.md)** - Countdown timer
- **[SwipeActionButton](src/molecules/swipe-actions/README.md)** - Swipe action buttons
- **[Divider](src/molecules/Divider/README.md)** - Visual divider

### Utility

- **[IconContainer](src/molecules/IconContainer.README.md)** - Icon container
- **[SplashScreen](src/molecules/splash/README.md)** - Splash screen

## 🏢 Organisms

Organisms are complex UI patterns formed by combining molecules and atoms.

- **[FormContainer](src/organisms/FormContainer.README.md)** - Full-featured form container

## 📐 Layouts

Layout components manage page layouts and containers.

- **[ScreenLayout](src/layouts/ScreenLayout/README.md)** - Screen layout wrapper
- **[AppHeader](src/layouts/AppHeader/README.md)** - Application header
- **[ScreenHeader](src/layouts/ScreenHeader/README.md)** - Screen header
- **[Grid](src/layouts/Grid/README.md)** - Grid layout
- **[Container](src/layouts/Container/README.md)** - Container component
- **[FormLayout](src/layouts/FormLayout/README.md)** - Form layout

## 🚀 Quick Start

### Installation

```bash
npm install react-native-design-system
# or
yarn add react-native-design-system
```

### Basic Usage

```tsx
import { Button, FormField } from 'react-native-design-system';

function MyScreen() {
  return (
    <>
      <FormField
        label="Email"
        placeholder="example@email.com"
        keyboardType="email-address"
      />

      <Button
        title="Submit"
        onPress={() => console.log('Submitted')}
      />
    </>
  );
}
```

### Theme Provider

```tsx
import { DesignSystemProvider } from 'react-native-design-system';

function App() {
  return (
    <DesignSystemProvider>
      <MyScreen />
    </DesignSystemProvider>
  );
}
```

## 🎨 Theme Customization

All components work seamlessly with the theme system:

```tsx
import { useAppDesignTokens } from 'react-native-design-system';

function MyComponent() {
  const tokens = useAppDesignTokens();

  return (
    <View style={{ backgroundColor: tokens.colors.primary }}>
      <Text style={{ color: tokens.colors.onPrimary }}>
        Theme Aware
      </Text>
    </View>
  );
}
```

## 📖 Component Documentation

Each component has its own comprehensive README with:

- **Strategy** - Purpose, when to use, when NOT to use
- **Rules** - Required behaviors with MUST/ALWAYS/NEVER
- **Forbidden** - ❌ Anti-patterns with code examples
- **Best Practices** - ✅ DO / ❌ DON'T comparisons
- **AI Coding Guidelines** - AI-specific instructions
- **Common Patterns** - Essential implementation patterns
- **Props Reference** - Minimal props table
- **Accessibility** - Screen reader and touch target support
- **Performance Tips** - Optimization guidelines

## ♿ Accessibility

All components provide full accessibility support:

- ✅ Screen reader support
- ✅ Touch target sizes (min 44x44pt)
- ✅ Semantic roles
- ✅ Keyboard navigation (web)
- ✅ Test ID support

## 📱 Platform Support

- ✅ iOS (full support)
- ✅ Android (full support)
- ⚠️ Web (most components)

## 🔧 Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Run tests
npm test

# Build
npm run build
```

## 🤝 Contributing

We welcome contributions! Before submitting a pull request:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Resources

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)
- [Material Design 3](https://m3.material.io/)

---

**Note:** For detailed documentation of each component, refer to its individual README file.

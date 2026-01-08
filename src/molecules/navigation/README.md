# Navigation System

React Native Design System, React Navigation ile entegre çalışan hazır navigator bileşenleri sunar. Tema bilinci ve özelleştirilebilir navigasyon çözümleri sağlar.

## Navigation Bileşenleri

- **TabsNavigator** - Bottom tab navigasyonu
- **StackNavigator** - Stack tabanlı navigasyon
- **FabButton** - Navigation ile entegre FAB

## Kurulum

```tsx
import {
  TabsNavigator,
  StackNavigator
} from 'react-native-design-system';
```

## TabsNavigator

Bottom tab navigasyonu için kullanılır. Material Design 3 uyumlu, tema bilinci bir tab bar sağlar.

### Temel Kullanım

```tsx
import { TabsNavigator } from 'react-native-design-system';
import { HomeScreen } from './HomeScreen';
import { ProfileScreen } from './ProfileScreen';
import { SettingsScreen } from './SettingsScreen';

export const MainTabs = () => {
  const tabConfig = {
    id: 'main-tabs',
    initialRouteName: 'Home',
    screens: [
      {
        name: 'Home',
        component: HomeScreen,
        options: {
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: 'home-outline',
        },
      },
      {
        name: 'Profile',
        component: ProfileScreen,
        options: {
          tabBarLabel: 'Profil',
          tabBarIcon: 'person-outline',
        },
      },
      {
        name: 'Settings',
        component: SettingsScreen,
        options: {
          tabBarLabel: 'Ayarlar',
          tabBarIcon: 'settings-outline',
        },
      },
    ],
  };

  return <TabsNavigator config={tabConfig} />;
};
```

### Badge Gösterimi

```tsx
const tabConfig = {
  id: 'main-tabs',
  initialRouteName: 'Home',
  screens: [
    {
      name: 'Home',
      component: HomeScreen,
      options: {
        tabBarLabel: 'Ana Sayfa',
        tabBarIcon: 'home-outline',
        tabBarBadge: 3, // Badge sayısı
      },
    },
    // ...
  ],
};
```

### Gizli Tab

```tsx
screens: [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      tabBarLabel: 'Ana Sayfa',
      tabBarIcon: 'home-outline',
    },
  },
  {
    name: 'Admin',
    component: AdminScreen,
    visible: false, // Gizli tab
  },
]
```

### Custom Screen Options

```tsx
const tabConfig = {
  id: 'main-tabs',
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
  },
  screens: [
    // ...
  ],
};
```

## StackNavigator

Screen'ler arası geçiş için kullanılır. Push/pop animasyonları ve header yönetimi sağlar.

### Temel Kullanım

```tsx
import { StackNavigator } from 'react-native-design-system';
import { HomeScreen } from './HomeScreen';
import { DetailsScreen } from './DetailsScreen';

export const AppStack = () => {
  const stackConfig = {
    id: 'app-stack',
    initialRouteName: 'Home',
    screens: [
      {
        name: 'Home',
        component: HomeScreen,
        options: {
          title: 'Ana Sayfa',
          headerShown: true,
        },
      },
      {
        name: 'Details',
        component: DetailsScreen,
        options: {
          title: 'Detaylar',
        },
      },
    ],
  };

  return <StackNavigator config={stackConfig} />;
};
```

### Header Gizle

```tsx
screens: [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
]
```

### Custom Header

```tsx
screens: [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      headerTitle: () => <CustomHeader />,
      headerStyle: {
        backgroundColor: '#6366f1',
      },
      headerTintColor: '#ffffff',
    },
  },
]
```

### Header Right

```tsx
screens: [
  {
    name: 'Profile',
    component: ProfileScreen,
    options: {
      title: 'Profil',
      headerRight: () => (
        <Pressable onPress={handleSettings}>
          <AtomicIcon name="settings-outline" size="md" />
        </Pressable>
      ),
    },
  },
]
```

## Örnek Kullanımlar

### Ana Navigasyon Yapısı

```tsx
export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
};

const Stacks = () => {
  return (
    <TabsNavigator config={mainTabConfig} />
  );
};
```

### İç içe Navigasyon

```tsx
export const NestedNavigation = () => {
  return (
    <TabsNavigator config={mainTabConfig}>
      {/* Her tab içinde kendi stack'i olabilir */}
    </TabsNavigator>
  );
};
```

### Auth Flow

```tsx
export const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
```

### Modal Stack

```tsx
export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};
```

## Konfigürasyon

### TabScreenConfig

```typescript
interface TabScreenConfig {
  name: string;              // Screen adı (zorunlu)
  component: React.ComponentType; // Component (zorunlu)
  options?: {
    tabBarLabel?: string;   // Tab label
    tabBarIcon?: string;     // İkon ismi (Ionicons)
    tabBarBadge?: string | number; // Badge
    title?: string;          // Header başlığı
    headerShown?: boolean;  // Header göster/gizle
  };
  visible?: boolean;        // Görünürlük
}
```

### StackScreenConfig

```typescript
interface StackScreenConfig {
  name: string;
  component: React.ComponentType;
  options?: {
    title?: string;
    headerShown?: boolean;
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;
    headerStyle?: any;
    headerTitleStyle?: any;
    headerTintColor?: string;
  };
}
```

## Best Practices

### 1. Navigasyon Yapısı

```tsx
// Ana tab navigasyonu
<TabsNavigator config={mainTabs} />

// Her tab içinde stack
<StackNavigator config={homeStack} />
```

### 2. Screen Options

```tsx
// Header göster
options: { headerShown: true }

// Header gizle
options: { headerShown: false }

// Custom başlık
options: { title: 'Başlık' }
```

### 3. İkon Seçimi

```tsx
// İkon isimleri (Ionicons)
options: {
  tabBarIcon: 'home-outline',
}
```

## Erişilebilirlik

Navigation bileşenleri, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Tab label anonsu
- ✅ Focus management
- ✅ Keyboard navigation
- ✅ Semantic anlamlar

## Performans İpuçları

1. **Lazy Loading**: Screen'leri lazy load edin
2. **Memoization**: Screen options'ı memo edin
3. **Unmount**: Kullanılmayan screen'leri unmount edin

## İlgili Bileşenler

- [`AtomicFab`](../../atoms/AtomicFab/README.md) - Floating action button
- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - İkon bileşeni
- [`BaseModal`](../BaseModal/README.md) - Modal bileşeni

## React Navigation Dokümantasyonu

Detaylı bilgi için:
- [Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)
- [Stack Navigator](https://reactnavigation.org/docs/stack-navigator/)

## Lisans

MIT

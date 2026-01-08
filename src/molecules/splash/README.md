# SplashScreen

SplashScreen, uygulama başlatılırken gösterilen açılış ekranı bileşenidir. Logo, uygulama adı, slogan ve yükleme göstergesi içerir. Theme-aware renk desteği ve zaman aşımı kontrolü sunar.

## Özellikler

- 🎨 **Theme-Aware**: Tema bilinci renkler
- 🎨 **Theme-Aware**: Tema bilinci renkler
- ⏱️ **Timeout Kontrolü**: Maksimum süre ve timeout callback
- 🖼️ **Logo/İkon**: Uygulama logosu gösterimi
- 📝 **App Name & Tagline**: Uygulama adı ve sloganı
- ⏳ **Loading Indicator**: Otomatik yükleme göstergesi
- 🎭 **Özelleştirilebilir**: Renkler, stil, süre
- ♿ **Erişilebilir**: Screen reader desteği

## Kurulum

```tsx
import { SplashScreen, useSplashFlow } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { SplashScreen, useSplashFlow } from 'react-native-design-system';

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const { isInitialized } = useSplashFlow({ duration: 2000 });

  if (!isInitialized) {
    return (
      <SplashScreen
        appName="Uygulamam"
        tagline="Hoş geldiniz"
        visible={!isReady}
        onReady={() => setIsReady(true)}
      />
    );
  }

  return <MainApp />;
};
```

## Basit Splash

```tsx
<SplashScreen
  appName="My App"
  tagline="Harika bir uygulama"
  visible={true}
/>
```

## Logo ile

```tsx
<SplashScreen
  icon={require('../assets/logo.png')}
  appName="My App"
  tagline="Hoş geldiniz"
  visible={true}
/>
```

## Custom Renkler

```tsx
<SplashScreen
  appName="My App"
  tagline="Welcome"
  colors={{
    background: '#1a1a1a',
    text: '#ffffff',
    iconPlaceholder: '#ffffff30',
  }}
  visible={true}
/>
```



## Zaman Aşımı

```tsx
<SplashScreen
  appName="My App"
  tagline="Yükleniyor..."
  maxDuration={5000}
  onTimeout={() => {
    console.log('Splash timeout - showing error');
    // Handle timeout
  }}
  visible={true}
/>
```

## useSplashFlow Hook

### Temel Kullanım

```tsx
import { useSplashFlow } from 'react-native-design-system';

export const App = () => {
  const { isInitialized } = useSplashFlow({ duration: 2000 });

  if (!isInitialized) {
    return <SplashScreen appName="My App" visible />;
  }

  return <MainApp />;
};
```

### Custom Süre

```tsx
const { isInitialized } = useSplashFlow({
  duration: 3000, // 3 saniye
});
```

### DeviceEventEmitter Dinleme

```tsx
import { DeviceEventEmitter } from 'react-native';

useEffect(() => {
  const subscription = DeviceEventEmitter.addListener(
    'splash-ready',
    () => {
      console.log('Splash is ready!');
      navigation.replace('Main');
    }
  );

  return () => subscription.remove();
}, []);
```

## Örnek Kullanımlar

### Temel App Boot

```tsx
export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isInitialized } = useSplashFlow({ duration: 1500 });

  useEffect(() => {
    async function prepare() {
      try {
        // Preload assets
        await SplashScreen.preventAutoHideAsync();
        // Load fonts, images, etc.
        await loadAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady || !isInitialized) {
    return (
      <SplashScreen
        icon={require('./assets/logo.png')}
        appName="My App"
        tagline="Yükleniyor..."
        visible
      />
    );
  }

  return <Navigation />;
};
```

### Auth Flow ile

```tsx
export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const { isInitialized } = useSplashFlow();

  useEffect(() => {
    // Check auth state
    checkAuthState().then((userData) => {
      setUser(userData);
      setIsReady(true);
    });
  }, []);

  if (!isInitialized || !isReady) {
    return (
      <SplashScreen
        appName="My App"
        tagline="Giriş yapılıyor..."
        visible
      />
    );
  }

  return user ? <AuthenticatedApp /> : <AuthStack />;
};
```

### Remote Config ile

```tsx
export const App = () => {
  const [config, setConfig] = useState(null);
  const { isInitialized } = useSplashFlow({ duration: 2000 });

  useEffect(() => {
    // Fetch remote config
    fetchRemoteConfig().then((remoteConfig) => {
      setConfig(remoteConfig);
    });
  }, []);

  if (!isInitialized || !config) {
    return (
      <SplashScreen
        icon={require('./assets/logo.png')}
        appName="My App"
        tagline="Ayarlar yükleniyor..."
        maxDuration={5000}
        onTimeout={() => {
          // Fallback to default config
          setConfig(getDefaultConfig());
        }}
        visible
      />
    );
  }

  return <MainApp config={config} />;
};
```

### Animasyonlu Splash

```tsx
export const AnimatedSplash = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const { isInitialized } = useSplashFlow({ duration: 2000 });

  useEffect(() => {
    if (isInitialized) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Hide splash after animation
        setTimeout(() => {
          navigation.replace('Home');
        }, 1000);
      });
    }
  }, [isInitialized]);

  return (
    <SplashScreen
      appName="My App"
      tagline="Welcome"
      visible={!isInitialized}
    />
  );
};
```

### Multi-Stage Loading

```tsx
export const MultiStageSplash = () => {
  const [loadingStage, setLoadingStage] = useState({
    assets: false,
    auth: false,
    config: false,
  });
  const { isInitialized } = useSplashFlow({ duration: 1500 });

  const allReady = Object.values(loadingStage).every(Boolean);

  const getTagline = () => {
    if (!loadingStage.assets) return 'Varlıklar yükleniyor...';
    if (!loadingStage.auth) return 'Giriş yapılıyor...';
    if (!loadingStage.config) return 'Ayarlar alınıyor...';
    return 'Hazır!';
  };

  if (!isInitialized || !allReady) {
    return (
      <SplashScreen
        appName="My App"
        tagline={getTagline()}
        visible
      />
    );
  }

  return <MainApp />;
};
```

### Debug Modu

```tsx
export const DebugSplash = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const { isInitialized } = useSplashFlow({ duration: 1000 });

  useEffect(() => {
    if (__DEV__) {
      console.log('[Splash] Initializing...');
      // Collect debug info
      setDebugInfo({
        version: '1.0.0',
        env: 'development',
        timestamp: Date.now(),
      });
    }
  }, []);

  return (
    <SplashScreen
      appName="My App"
      tagline={__DEV__ ? `Debug v${debugInfo.version}` : 'Welcome'}
      maxDuration={3000}
      onTimeout={() => {
        if (__DEV__) {
          console.error('[Splash] Initialization timeout!');
        }
      }}
      visible={!isInitialized}
    />
  );
};
```

## Props

### SplashScreenProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `icon` | `ImageSourcePropType` | - | Logo/ikon |
| `appName` | `string` | - | Uygulama adı |
| `tagline` | `string` | - | Slogan |
| `colors` | `SplashColors` | - | Custom renkler |

| `visible` | `boolean` | `true` | Görünürlük |
| `maxDuration` | `number` | - | Maksimum süre (ms) |
| `onTimeout` | `() => void` | - | Timeout callback |
| `onReady` | `() => void` | - | Ready callback |
| `style` | `ViewStyle` | - | Özel stil |

### SplashColors

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `background` | `string` | `tokens.colors.backgroundPrimary` | Arka plan rengi |
| `text` | `string` | `tokens.colors.textPrimary` | Metin rengi |
| `iconPlaceholder` | `string` | `text + 30% opacity` | İkon placeholder rengi |

### useSplashFlow Options

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `duration` | `number` | `1500` | Splash süresi (ms) |

## Best Practices

### 1. Süre Ayarı

```tsx
// Kısa
useSplashFlow({ duration: 1000 })

// Orta (önerilen)
useSplashFlow({ duration: 2000 })

// Uzun
useSplashFlow({ duration: 3000 })
```

### 2. Timeout Kullanımı

```tsx
<SplashScreen
  maxDuration={5000}
  onTimeout={() => {
    // Fallback behavior
    navigation.replace('Error');
  }}
/>
```

### 3. Asset Preloading

```tsx
useEffect(() => {
  async function load() {
    await Asset.loadAsync(require('./assets/logo.png'));
    await Font.loadAsync({ font: require('./assets/font.ttf') });
    setAssetsLoaded(true);
  }
  load();
}, []);
```

### 4. Theme Awareness

```tsx
// Theme-aware colors (önerilen)
<SplashScreen appName="App" />

// Custom colors
<SplashScreen
  colors={{
    background: '#1a1a1a',
    text: '#ffffff',
  }}
/>
```

## Erişilebilirlik

SplashScreen, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Accessibility label
- ✅ Loading state anonsu
- ✅ Timeout bildirimi (DEV modunda)

## Performans İpuçları

1. **Preload Assets**: Splash'ta asset'leri preload edin
2. **Optimize**: Logo boyutunu optimize edin
3. **Timeout**: Maksimum süre belirleyin
4. **Async**: Asenkron işlemleri paralel yapın
5. **Minimal**: Gereksiz component'lerden kaçının

## İlgili Bileşenler

- [`AtomicSpinner`](../../atoms/AtomicSpinner/README.md) - Yükleme göstergesi
- [`AtomicText`](../../atoms/AtomicText/README.md) - Metin bileşeni
- [`BaseModal`](../BaseModal/README.md) - Modal bileşeni

## Lisans

MIT

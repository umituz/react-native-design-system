# GlassView

GlassView, glassmorphism efekti oluşturmak için Expo BlurView wrapper'ıdır. Otomatik olarak tema moduna göre uyum sağlar.

## Özellikler

- 🌟 **Glassmorphism**: Modern cam efekti
- 🎨 **Tema Bilinci**: Otomatik tema uyumu
- 💧 **Blur Efekti**: Bulanık arka plan
- ⚙️ **Ayarılabilir Yoğunluk**: 0-100 arası
- 🌓 **Light/Dark Mod**: Otomatik tint
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { GlassView } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { GlassView } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Arka plan resmi veya içerik */}
      <Image
        source={{ uri: 'https://example.com/image.jpg' }}
        style={{ ...StyleSheet.absoluteFillObject }}
      />

      {/* GlassView overlay */}
      <GlassView style={{ flex: 1 }}>
        <Text style={{ padding: 24 }}>
          Glassmorphism Efekti
        </Text>
      </GlassView>
    </View>
  );
};
```

## Basic Glass Effect

```tsx
<GlassView style={{ padding: 24, borderRadius: 16 }}>
  <Text>Cam Efekti</Text>
</GlassView>
```

## Blur Intensity

```tsx
<View style={{ gap: 16 }}>
  {/* Hafif blur */}
  <GlassView intensity={30} style={{ padding: 24 }}>
    <Text>Hafif Blur</Text>
  </GlassView>

  {/* Orta blur (Varsayılan) */}
  <GlassView intensity={50} style={{ padding: 24 }}>
    <Text>Orta Blur</Text>
  </GlassView>

  {/* Güçlü blur */}
  <GlassView intensity={80} style={{ padding: 24 }}>
    <Text>Güçlü Blur</Text>
  </GlassView>

  {/* Maksimum blur */}
  <GlassView intensity={100} style={{ padding: 24 }}>
    <Text>Maksimum Blur</Text>
  </GlassView>
</View>
```

## Custom Tint

```tsx
<View style={{ gap: 16 }}>
  {/* Light tint */}
  <GlassView tint="light" style={{ padding: 24 }}>
    <Text>Light Tint</Text>
  </GlassView>

  {/* Dark tint */}
  <GlassView tint="dark" style={{ padding: 24 }}>
    <Text>Dark Tint</Text>
  </GlassView>

  {/* Default tint (otomatik) */}
  <GlassView style={{ padding: 24 }}>
    <Text>Otomatik Tint</Text>
  </GlassView>
</View>
```

## Örnek Kullanımlar

### Navigation Bar

```tsx
export const GlassNavbar = () => {
  return (
    <GlassView
      intensity={50}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>Logo</Text>

      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Pressable>
          <AtomicIcon name="home" />
        </Pressable>
        <Pressable>
          <AtomicIcon name="search" />
        </Pressable>
        <Pressable>
          <AtomicIcon name="person" />
        </Pressable>
      </View>
    </GlassView>
  );
};
```

### Modal Overlay

```tsx
export const GlassModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <GlassView
        intensity={80}
        tint="dark"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 24,
            width: '100%',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
            Modal Başlığı
          </Text>

          <Text style={{ marginBottom: 24 }}>
            Modal içeriği buraya gelecek.
          </Text>

          <Button title="Kapat" onPress={onClose} />
        </View>
      </GlassView>
    </Modal>
  );
};
```

### Card Overlay

```tsx
export const GlassCard = ({ title, description, image }) => {
  return (
    <View style={{ borderRadius: 16, overflow: 'hidden', height: 200 }}>
      {/* Arka plan resmi */}
      <Image
        source={{ uri: image }}
        style={{ ...StyleSheet.absoluteFillObject }}
        resizeMode="cover"
      />

      {/* Glass overlay */}
      <GlassView
        intensity={60}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
          {title}
        </Text>

        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', marginTop: 4 }}>
          {description}
        </Text>
      </GlassView>
    </View>
  );
};
```

### Tab Bar

```tsx
export const GlassTabBar = ({ state, descriptors, navigation }) => {
  return (
    <GlassView
      intensity={50}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isFocused ? 1 : 0.6,
            }}
          >
            <AtomicIcon
              name={options.tabBarIcon || 'circle'}
              color={isFocused ? 'primary' : 'textSecondary'}
            />
            <Text style={{ fontSize: 12, marginTop: 4 }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </GlassView>
  );
};
```

### Floating Action Button

```tsx
export const GlassFAB = ({ icon, onPress }) => {
  return (
    <GlassView
      intensity={70}
      style={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
      }}
    >
      <Pressable onPress={onPress} style={{ padding: 16 }}>
        <AtomicIcon name={icon} size="lg" />
      </Pressable>
    </GlassView>
  );
};
```

### Header

```tsx
export const GlassHeader = ({ title, right }) => {
  return (
    <GlassView
      intensity={50}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        paddingTop: 44,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Pressable>
        <AtomicIcon name="arrow-back" />
      </Pressable>

      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {title}
      </Text>

      {right || <View style={{ width: 24 }} />}
    </GlassView>
  );
};
```

### Bottom Sheet

```tsx
export const GlassBottomSheet = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable
        style={{ flex: 1 }}
        onPress={onClose}
      >
        <GlassView
          intensity={80}
          tint="dark"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
          }}
        >
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: 2,
              alignSelf: 'center',
              marginBottom: 24,
            }}
          />

          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
            Bottom Sheet
          </Text>

          <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            İçerik buraya gelecek.
          </Text>
        </GlassView>
      </Pressable>
    </Modal>
  );
};
```

### Popup Menu

```tsx
export const GlassPopupMenu = ({ visible, onClose, options }) => {
  if (!visible) return null;

  return (
    <Pressable
      style={{ ...StyleSheet.absoluteFillObject }}
      onPress={onClose}
    >
      <GlassView
        intensity={80}
        style={{
          position: 'absolute',
          top: 60,
          right: 16,
          borderRadius: 12,
          padding: 8,
          minWidth: 200,
        }}
      >
        {options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => {
              option.onPress();
              onClose();
            }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AtomicIcon name={option.icon} size="sm" />
              <Text style={{ marginLeft: 12 }}>{option.label}</Text>
            </View>
          </Pressable>
        ))}
      </GlassView>
    </Pressable>
  );
};
```

## Props

### GlassViewProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `children` | `ReactNode` | - | İçerik |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |
| `intensity` | `number` | `50` | Blur yoğunluğu (0-100) |
| `tint` | `'light' \| 'dark'` | Otomatik | Renk tonu |
| `experimentalBlurMethod` | `'dimezisBlurView' \| 'none'` | - | Deneysel blur yöntemi |

## Best Practices

### 1. Intensity Seçimi

```tsx
// Hafif blur - arka plan görünebilir
<GlassView intensity={30}>

// Orta blur - iyi denge
<GlassView intensity={50}>

// Güçlü blur - içerik odaklı
<GlassView intensity={80}>
```

### 2. Tint Kullanımı

```tsx
// Light tema - açık arka planlar
<GlassView tint="light">

// Dark tema - koyu arka planlar
<GlassView tint="dark">

// Otomatik - tema moduna göre
<GlassView> // Otomatik
```

### 3. Performans

```tsx
// Düşük intensity daha performanslıdır
<GlassView intensity={30}>

// Sabit boyut kullanın
<GlassView style={{ width: 200, height: 100 }}>

// Overflow hidden kullanın
<GlassView style={{ overflow: 'hidden' }}>
```

## Erişilebilirlik

GlassView, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Contrast ratio
- ✅ Semantic meaning

## Performans İpuçları

1. **Intensity**: Daha düşük değerler daha performanslıdır
2. **Static Size**: Sabit boyut kullanın
3. **Limited Usage**: Gerektiğinde kullanın
4. **Test**: Farklı cihazlarda test edin

## Platform Desteği

- ✅ iOS (tam destek)
- ✅ Android (tam destek)
- ⚠️ Web (kısmi destek)

## İlgili Bileşenler

- [`BaseModal`](../../molecules/BaseModal/README.md) - Modal bileşeni
- [`AtomicCard`](../AtomicCard.README.md) - Kart bileşeni
- [`GlowingCard`](../../molecules/GlowingCard/README.md) - Parlak kart

## Lisans

MIT

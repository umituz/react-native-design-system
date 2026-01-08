# AtomicIcon

AtomicIcon, React Native için tema bilinci yüksek bir ikon bileşenidir. Ionicons kütüphanesini kullanır ve tema ile tam entegre çalışır.

## Özellikler

- 🎨 **Tema Bilinci**: Semantic renkler desteği
- 📏 **Semantic Size**: xs, sm, md, lg, xl boyutları
- 🎭 **Background Desteği**: Dairesel arka plan
- 🖼️ **Custom SVG**: Özel SVG path desteği
- ✅ **Validation**: Geçersiz ikon kontrolü
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { AtomicIcon } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { AtomicIcon } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16, flexDirection: 'row', gap: 16 }}>
      <AtomicIcon name="heart-outline" />
      <AtomicIcon name="star" />
      <AtomicIcon name="settings" />
    </View>
  );
};
```

## Boyutlar

```tsx
<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
  {/* Extra Small */}
  <AtomicIcon name="home" size="xs" />

  {/* Small */}
  <AtomicIcon name="home" size="sm" />

  {/* Medium (Varsayılan) */}
  <AtomicIcon name="home" size="md" />

  {/* Large */}
  <AtomicIcon name="home" size="lg" />

  {/* Extra Large */}
  <AtomicIcon name="home" size="xl" />

  {/* Custom Size */}
  <AtomicIcon name="home" customSize={32} />
</View>
```

## Semantic Renkler

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <AtomicIcon name="checkmark-circle" size="lg" color="success" />
  <AtomicIcon name="warning" size="lg" color="warning" />
  <AtomicIcon name="close-circle" size="lg" color="error" />
  <AtomicIcon name="information-circle" size="lg" color="info" />
  <AtomicIcon name="heart" size="lg" color="primary" />
  <AtomicIcon name="star" size="lg" color="secondary" />
</View>
```

## Custom Renkler

```tsx
<AtomicIcon
  name="favorite"
  size="lg"
  customColor="#FF6B6B"
/>
```

## Background ile Kullanım

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <AtomicIcon
    name="home"
    size="md"
    withBackground
  />

  <AtomicIcon
    name="settings"
    size="md"
    withBackground
    backgroundColor="#E3F2FD"
  />

  <AtomicIcon
    name="favorite"
    size="lg"
    withBackground
    color="error"
  />
</View>
```

## Custom SVG

```tsx
<AtomicIcon
  size="md"
  svgPath="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
  svgViewBox="0 0 24 24"
  customColor="#6366f1"
/>
```

## Örnek Kullanımlar

### Navigation Icons

```tsx
<TabBar>
  <TabIcon icon="home-outline" label="Home" />
  <TabIcon icon="search-outline" label="Search" />
  <TabIcon icon="person-outline" label="Profile" />
</TabBar>
```

### Action Buttons

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <AtomicIcon
    name="call-outline"
    size="lg"
    color="success"
    withBackground
  />

  <AtomicIcon
    name="mail-outline"
    size="lg"
    color="primary"
    withBackground
  />

  <AtomicIcon
    name="videocam-outline"
    size="lg"
    color="secondary"
    withBackground
  />
</View>
```

### Status Icons

```tsx
<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
  <AtomicIcon name="checkmark-circle" size="sm" color="success" />
  <AtomicText>Online</AtomicText>
</View>

<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
  <AtomicIcon name="time" size="sm" color="warning" />
  <AtomicText>Away</AtomicText>
</View>

<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
  <AtomicIcon name="close-circle" size="sm" color="error" />
  <AtomicText>Offline</AtomicText>
</View>
```

## Props

### AtomicIconProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `name` | `IconName` | - | İkon ismi (Ionicons) |
| `size` | `IconSize` | `'md'` | Semantic boyut |
| `customSize` | `number` | - | Özel boyut (px) |
| `color` | `IconColor` | - | Semantic renk |
| `customColor` | `string` | - | Özel renk |
| `svgPath` | `string` | - | Custom SVG path |
| `svgViewBox` | `string` | `'0 0 24 24'` | SVG viewBox |
| `withBackground` | `boolean` | `false` | Dairesel arka plan |
| `backgroundColor` | `string` | - | Arka plan rengi |
| `accessibilityLabel` | `string` | - | Erişilebilirlik etiketi |
| `testID` | `string` | - | Test ID'si |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |

### IconSize

```typescript
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

### IconColor

```typescript
type IconColor =
  | 'primary'           // Ana tema rengi
  | 'secondary'         // İkincil tema rengi
  | 'success'           // Başarı rengi
  | 'warning'           // Uyarı rengi
  | 'error'             // Hata rengi
  | 'info'              // Bilgi rengi
  | 'onSurface'         // Yüzey üzerindeki metin
  | 'surfaceVariant'    // Yüzey variant rengi
  | 'onPrimary'         // Ana renk üzerindeki metin
  | 'onSecondary'       // İkincil renk üzerindeki metin
  | 'textInverse'       // Ters metin rengi
  | 'textPrimary'       // Birincil metin rengi
  | 'textSecondary'     // İkincil metin rengi
  | 'textTertiary'      // Üçüncül metin rengi
  | 'onSurfaceVariant'; // Yüzey variant üzerindeki metin
```

## Icon Name Listesi

Ionicons kütüphanesinden popüler ikonlar:

### Navigation
- `home`, `home-outline`
- `search`, `search-outline`
- `settings`, `settings-outline`
- `menu`, `menu-outline`
- `arrow-back`, `arrow-forward`
- `chevron-back`, `chevron-forward`

### Action
- `add`, `add-outline`
- `checkmark`, `checkmark-circle`
- `close`, `close-circle`
- `trash`, `trash-outline`
- `create`, `create-outline`
- `heart`, `heart-outline`

### Communication
- `mail`, `mail-outline`
- `call`, `call-outline`
- `chatbubbles`, `chatbubbles-outline`
- `videocam`, `videocam-outline`

### Media
- `image`, `image-outline`
- `musical-note`, `musical-notes`
- `camera`, `camera-outline`
- `mic`, `mic-outline`

### Status
- `checkmark-circle`, `checkmark-circle-outline`
- `warning`, `warning-outline`
- `information-circle`, `information-circle-outline`
- `close-circle`, `close-circle-outline`

Daha fazla ikon için: [Ionicons Documentation](https://ionic.io/ionicons)

## Best Practices

### 1. Size Kullanımı

```tsx
// Küçük alanlar için
<AtomicIcon name="checkmark" size="xs" />

// Normal kullanım
<AtomicIcon name="checkmark" size="md" />

// Vurgu için
<AtomicIcon name="checkmark" size="xl" />
```

### 2. Renk Seçimi

```tsx
// Ana aksiyon
<AtomicIcon name="add" color="primary" />

// Başarı durumu
<AtomicIcon name="checkmark" color="success" />

// Hata durumu
<AtomicIcon name="warning" color="error" />

// Bilgi durumu
<AtomicIcon name="info" color="info" />
```

### 3. Background Kullanımı

```tsx
// Buton ikonları
<AtomicIcon
  name="add"
  withBackground
  color="primary"
/>

// Avatar ikonları
<AtomicIcon
  name="person"
  size="lg"
  withBackground
  backgroundColor="#E3F2FD"
/>
```

## Erişilebilirlik

AtomicIcon, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Accessibility label
- ✅ Semantic anlamlar
- ✅ Test ID desteği

## Validation

Geçersiz ikon isimleri otomatik olarak fallback'e yönlendirilir:

```tsx
// Geçersiz ikon - console warning gösterir
<AtomicIcon name="invalid-icon" />
// → "help-circle-outline" gösterir
```

## Performans İpuçları

1. **React.memo**: AtomicIcon zaten `React.memo` ile sarılmış
2. **Static Names**: İkon isimlerini değişmez olarak tanımlayın
3. **Avoid Re-renders**: Parent component'te stabilization kullanın

## İlgili Bileşenler

- [`AtomicButton`](../button/README.md) - Buton bileşeni
- [`AtomicChip`](../chip/README.md) - Chip bileşeni
- [`AtomicInput`](../input/README.md) - Input bileşeni

## Lisans

MIT

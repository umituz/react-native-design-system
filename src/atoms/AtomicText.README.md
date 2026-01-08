# AtomicText

AtomicText, React Native için tema bilinci yüksek, responsive ve özelleştirilebilir bir metin bileşenidir. Material Design 3 tipografi kurallarına uygun olarak tasarlanmıştır.

## Özellikler

- 📝 **Typography System**: Material Design 3 tipografi
- 🎨 **Tema Bilinci**: Otomatik renk uyumu
- 📱 **Responsive**: Otomatik font boyutu
- ⚙️ **Kolay Özelleştirme**: Convenience props
- 🎯 **Semantic Colors**: Anlamlı renk seçenekleri
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { AtomicText } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { AtomicText } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicText>Merhaba Dünya!</AtomicText>
    </View>
  );
};
```

## Typography Types

```tsx
<View style={{ gap: 8 }}>
  {/* Display */}
  <AtomicText type="displayLarge">Display Large</AtomicText>
  <AtomicText type="displayMedium">Display Medium</AtomicText>
  <AtomicText type="displaySmall">Display Small</AtomicText>

  {/* Headline */}
  <AtomicText type="headlineLarge">Headline Large</AtomicText>
  <AtomicText type="headlineMedium">Headline Medium</AtomicText>
  <AtomicText type="headlineSmall">Headline Small</AtomicText>

  {/* Title */}
  <AtomicText type="titleLarge">Title Large</AtomicText>
  <AtomicText type="titleMedium">Title Medium</AtomicText>
  <AtomicText type="titleSmall">Title Small</AtomicText>

  {/* Label */}
  <AtomicText type="labelLarge">Label Large</AtomicText>
  <AtomicText type="labelMedium">Label Medium</AtomicText>
  <AtomicText type="labelSmall">Label Small</AtomicText>

  {/* Body */}
  <AtomicText type="bodyLarge">Body Large</AtomicText>
  <AtomicText type="bodyMedium">Body Medium</AtomicText>
  <AtomicText type="bodySmall">Body Small</AtomicText>
</View>
```

## Semantic Colors

```tsx
<View style={{ gap: 8 }}>
  <AtomicText color="primary">Primary Renk</AtomicText>
  <AtomicText color="secondary">Secondary Renk</AtomicText>
  <AtomicText color="success">Success Renk</AtomicText>
  <AtomicText color="warning">Warning Renk</AtomicText>
  <AtomicText color="error">Error Renk</AtomicText>
  <AtomicText color="info">Info Renk</AtomicText>

  {/* Text colors */}
  <AtomicText color="textPrimary">Primary Text</AtomicText>
  <AtomicText color="textSecondary">Secondary Text</AtomicText>
  <AtomicText color="textTertiary">Tertiary Text</AtomicText>
</View>
```

## Text Alignment

```tsx
<View style={{ gap: 16 }}>
  <AtomicText align="left">Sola Hizalı</AtomicText>
  <AtomicText align="center">Ortalanmış</AtomicText>
  <AtomicText align="right">Sağa Hizalı</AtomicText>
  <AtomicText align="justify">İki yana yaslı</AtomicText>
</View>
```

## Font Weight

```tsx
<View style={{ gap: 8 }}>
  <AtomicText fontWeight="100">Thin (100)</AtomicText>
  <AtomicText fontWeight="300">Light (300)</AtomicText>
  <AtomicText fontWeight="400">Regular (400)</AtomicText>
  <AtomicText fontWeight="500">Medium (500)</AtomicText>
  <AtomicText fontWeight="600">Semi Bold (600)</AtomicText>
  <AtomicText fontWeight="700">Bold (700)</AtomicText>
  <AtomicText fontWeight="900">Black (900)</AtomicText>
</View>
```

## Spacing

```tsx
<View>
  <AtomicText type="titleLarge" marginBottom="sm">
    Başlık
  </AtomicText>

  <AtomicText marginTop="sm" marginBottom="md">
    Açıklama metni
  </AtomicText>

  <AtomicText marginTop="lg">
    Daha fazla içerik
  </AtomicText>
</View>
```

## Custom Colors

```tsx
<AtomicText color="#6366f1">Custom Renk</AtomicText>
<AtomicText color="rgb(99, 102, 241)">RGB Renk</AtomicText>
<AtomicText color="rgba(99, 102, 241, 0.5)">RGBA Renk</AtomicText>
```

## Custom Style

```tsx
<AtomicText
  type="bodyLarge"
  style={{
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    letterSpacing: 1,
    lineHeight: 28,
  }}
>
  Özel Stilli Metin
</AtomicText>
```

## Örnek Kullanımlar

### Sayfa Başlığı

```tsx
export const PageHeader = ({ title, subtitle }) => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="headlineLarge" marginBottom="sm">
        {title}
      </AtomicText>

      {subtitle && (
        <AtomicText type="bodyLarge" color="textSecondary">
          {subtitle}
        </AtomicText>
      )}
    </View>
  );
};
```

### Kart İçeriği

```tsx
export const CardContent = ({ title, description }) => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="titleLarge" marginBottom="xs">
        {title}
      </AtomicText>

      <AtomicText type="bodyMedium" color="textSecondary">
        {description}
      </AtomicText>
    </View>
  );
};
```

### Form Label

```tsx
export const FormLabel = ({ label, required }) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
      <AtomicText type="labelLarge" color="textPrimary">
        {label}
      </AtomicText>

      {required && (
        <AtomicText type="labelLarge" color="error">
          *
        </AtomicText>
      )}
    </View>
  );
};
```

### Error Message

```tsx
export const ErrorMessage = ({ message }) => {
  return (
    <AtomicText
      type="bodySmall"
      color="error"
      marginTop="xs"
    >
      {message}
    </AtomicText>
  );
};
```

### Success Message

```tsx
export const SuccessMessage = ({ message }) => {
  return (
    <AtomicText
      type="bodyMedium"
      color="success"
      align="center"
    >
      {message}
    </AtomicText>
  );
};
```

### List Item

```tsx
export const ListItem = ({ title, subtitle, timestamp }) => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="bodyLarge" fontWeight="600">
        {title}
      </AtomicText>

      {subtitle && (
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          marginTop="xs"
        >
          {subtitle}
        </AtomicText>
      )}

      {timestamp && (
        <AtomicText
          type="bodySmall"
          color="textTertiary"
          marginTop="xs"
        >
          {timestamp}
        </AtomicText>
      )}
    </View>
  );
};
```

### Pricing Card

```tsx
export const PricingCard = ({ plan, price, features }) => {
  return (
    <View style={{ padding: 24, alignItems: 'center' }}>
      <AtomicText type="headlineSmall" marginBottom="md">
        {plan}
      </AtomicText>

      <AtomicText
        type="displayLarge"
        color="primary"
        fontWeight="700"
        marginBottom="md"
      >
        ${price}
        <AtomicText type="titleMedium">/ay</AtomicText>
      </AtomicText>

      {features.map((feature, index) => (
        <AtomicText
          key={index}
          type="bodyMedium"
          align="center"
          marginTop="sm"
        >
          {feature}
        </AtomicText>
      ))}
    </View>
  );
};
```

### Blog Post

```tsx
export const BlogPost = ({ title, author, date, content }) => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="headlineMedium" marginBottom="sm">
        {title}
      </AtomicText>

      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <AtomicText type="bodySmall" color="textSecondary">
          {author}
        </AtomicText>
        <AtomicText type="bodySmall" color="textTertiary">
          • {date}
        </AtomicText>
      </View>

      <AtomicText type="bodyMedium" lineHeight={24}>
        {content}
      </AtomicText>
    </View>
  );
};
```

## Props

### AtomicTextProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `type` | `TextStyleVariant` | `'bodyMedium'` | Tipografi stili |
| `color` | `ColorVariant \| string` | `'textPrimary'` | Metin rengi |
| `align` | `TextStyle['textAlign']` | - | Metin hizalaması |
| `fontWeight` | `TextStyle['fontWeight']` | - | Font kalınlığı |
| `marginTop` | `keyof Spacing` | - | Üst boşluk |
| `marginBottom` | `keyof Spacing` | - | Alt boşluk |
| `children` | `ReactNode` | - **(Zorunlu)** | İçerik |
| `style` | `StyleProp<TextStyle>` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

### TextStyleVariant

```typescript
type TextStyleVariant =
  // Display
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  // Headline
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  // Title
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  // Label
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  // Body
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall';
```

### ColorVariant

```typescript
type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'textPrimary'
  | 'textSecondary'
  | 'textTertiary'
  | 'onPrimary'
  | 'onSecondary'
  | 'onSurface';
```

## Best Practices

### 1. Type Hiyerarşisi

```tsx
// Ana başlık
<AtomicText type="headlineLarge">{title}</AtomicText>

// Alt başlık
<AtomicText type="titleLarge">{subtitle}</AtomicText>

// Gövde metni
<AtomicText type="bodyMedium">{content}</AtomicText>

// Yardımcı metin
<AtomicText type="bodySmall">{helper}</AtomicText>
```

### 2. Renk Kullanımı

```tsx
// Ana içerik
<AtomicText color="textPrimary">

// İkincil içerik
<AtomicText color="textSecondary">

// Hata mesajı
<AtomicText color="error">

// Link
<AtomicText color="primary">
```

### 3. Spacing

```tsx
// Convenience props kullanın
<AtomicText type="titleLarge" marginBottom="md">
  Başlık
</AtomicText>

<AtomicText marginTop="sm">
  İçerik
</AtomicText>
```

## Erişilebilirlik

AtomicText, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Semantic anlamlar
- ✅ Contrast ratio
- ✅ Font scaling desteği

## Performans İpuçları

1. **Avoid Re-renders**: `type` ve `color` props'unu stabilize edin
2. **Memoization**: Uzun metinleri `React.memo` ile sarın
3. **Custom Style**: Inline stil yerine StyleSheet kullanın

## İlgili Bileşenler

- [`AtomicButton`](../button/README.md) - Buton bileşeni
- [`FormField`](../../molecules/FormField/README.md) - Form alanı
- [`AtomicInput`](../input/README.md) - Input bileşeni

## Lisans

MIT

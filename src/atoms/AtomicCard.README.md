# AtomicCard

AtomicCard, React Native için basit ve özelleştirilebilir bir kart container bileşenidir. Material Design 3 prensiplerine uygun olarak tasarlanmıştır.

## Özellikler

- 🎨 **3 Variant**: Elevated, Outlined, Filled
- 📦 **4 Padding Seçeneği**: None, Small, Medium, Large
- 👆 **Pressable**: Tıklanabilir kart desteği
- 🎯 **Flexible**: İçerik için esnek yapı
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { AtomicCard } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { AtomicCard } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicCard>
        <Text>Bu bir kart içeriği</Text>
      </AtomicCard>
    </View>
  );
};
```

## Variant'lar

```tsx
<View style={{ gap: 16 }}>
  {/* Elevated (Varsayılan) */}
  <AtomicCard variant="elevated">
    <Text>Elevated Card - Gölge efekti</Text>
  </AtomicCard>

  {/* Outlined */}
  <AtomicCard variant="outlined">
    <Text>Outlined Card - Çerçeve efekti</Text>
  </AtomicCard>

  {/* Filled */}
  <AtomicCard variant="filled">
    <Text>Filled Card - Dolgu efekti</Text>
  </AtomicCard>
</View>
```

## Padding Seçenekleri

```tsx
<View style={{ gap: 16 }}>
  {/* No Padding */}
  <AtomicCard padding="none">
    <Text>Padding yok</Text>
  </AtomicCard>

  {/* Small */}
  <AtomicCard padding="sm">
    <Text>Small padding</Text>
  </AtomicCard>

  {/* Medium (Varsayılan) */}
  <AtomicCard padding="md">
    <Text>Medium padding</Text>
  </AtomicCard>

  {/* Large */}
  <AtomicCard padding="lg">
    <Text>Large padding</Text>
  </AtomicCard>
</View>
```

## Pressable Card

```tsx
<AtomicCard
  onPress={() => console.log('Kart tıklandı!')}
  padding="md"
>
  <Text>Tıklanabilir Kart</Text>
  <Text>Tıklamayı dene</Text>
</AtomicCard>
```

## Örnek Kullanımlar

### Profil Kartı

```tsx
<AtomicCard variant="elevated" padding="md">
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ahmet Yılmaz</Text>
    <Text style={{ color: 'gray' }}>Frontend Developer</Text>
  </View>
</AtomicCard>
```

### Ürün Kartı

```tsx
<AtomicCard
  variant="outlined"
  padding="md"
  onPress={() => navigate('ProductDetail')}
>
  <Text style={{ fontSize: 16, fontWeight: '600' }}>Ürün Adı</Text>
  <Text style={{ marginTop: 8 }}>Ürün açıklaması</Text>
  <Text style={{ marginTop: 16, fontSize: 18, fontWeight: 'bold' }}>$99.99</Text>
</AtomicCard>
```

### Bilgi Kartı

```tsx
<AtomicCard variant="filled" padding="lg">
  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
    Önemli Bilgi
  </Text>
  <Text style={{ lineHeight: 22 }}>
    Bu kart önemli bilgileri içermektedir.
    Lütfen dikkatlice okuyunuz.
  </Text>
</AtomicCard>
```

### Liste Elemanı

```tsx
{items.map((item) => (
  <AtomicCard
    key={item.id}
    variant="outlined"
    padding="sm"
    onPress={() => handleItemPress(item)}
    style={{ marginBottom: 12 }}
  >
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>{item.title}</Text>
      <Text>{item.date}</Text>
    </View>
  </AtomicCard>
))}
```

## Props

### AtomicCardProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `children` | `ReactNode` | - **(Zorunlu)** | Kart içeriği |
| `variant` | `AtomicCardVariant` | `'elevated'` | Kart görünüm stili |
| `padding` | `AtomicCardPadding` | `'md'` | İç boşluk miktarı |
| `onPress` | `(event: GestureResponderEvent) => void` | - | Tıklama olayı |
| `disabled` | `boolean` | `false` | Devre dışı |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

### AtomicCardVariant

```typescript
type AtomicCardVariant =
  | 'elevated'  // Gölge efekti (varsayılan)
  | 'outlined'  // Çerçeve efekti
  | 'filled';   // Dolgu efekti
```

### AtomicCardPadding

```typescript
type AtomicCardPadding =
  | 'none'  // İç boşluk yok
  | 'sm'    // Küçük iç boşluk
  | 'md'    // Orta iç boşluk (varsayılan)
  | 'lg';   // Büyük iç boşluk
```

## Stil Özelleştirme

```tsx
<AtomicCard
  variant="elevated"
  padding="md"
  style={{
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }}
>
  <Text>Özel Stilli Kart</Text>
</AtomicCard>
```

## Best Practices

### 1. Variant Seçimi

```tsx
// Ana içerik için elevated
<AtomicCard variant="elevated">
  <ImportantContent />
</AtomicCard>

// Liste elemanları için outlined
<FlatList
  data={items}
  renderItem={({ item }) => (
    <AtomicCard variant="outlined" padding="sm">
      {item.content}
    </AtomicCard>
  )}
/>

// Arka plan için filled
<AtomicCard variant="filled">
  <BackgroundContent />
</AtomicCard>
```

### 2. Padding Kullanımı

```tsx
// Yoğun içerik için az padding
<AtomicCard padding="sm">
  <DenseContent />
</AtomicCard>

// Boş içerik için fazla padding
<AtomicCard padding="lg">
  <SparseContent />
</AtomicCard>
```

### 3. Pressable Kullanım

```tsx
// Tıklanabilir öğeler
<AtomicCard
  onPress={handlePress}
  style={{ marginBottom: 8 }}
>
  <CardHeader />
  <CardContent />
  <CardFooter />
</AtomicCard>
```

## Erişilebilirlik

AtomicCard, tam erişilebilirlik desteği sunar:

- ✅ Touch uygun boyut
- ✅ Screen reader desteği
- ✅ Disabled state anonsu
- ✅ Test ID desteği

## Performans İpuçları

1. **FlatList ile Kullanım**: Listelerde `key` prop'unu kullanın
2. **Inline Styles**: Mümkün olduğunca theme kullanın
3. **Re-renders**: Kart içeriğini `React.memo` ile sarın

## İlgili Bileşenler

- [`MediaCard`](../../molecules/media-card/README.md) - Medya kartı
- [`GlowingCard`](../../molecules/GlowingCard/README.md) - Parlak kart
- [`FormField`](../../molecules/FormField/README.md) - Form alanı

## Örnek Proje

```tsx
import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { AtomicCard } from 'react-native-design-system';

export const CardGallery = () => {
  return (
    <ScrollView style={{ padding: 16 }}>
      {/* Basit Kart */}
      <AtomicCard variant="elevated" padding="md" style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Basit Kart
        </Text>
        <Text style={{ marginTop: 8 }}>
          Bu basit bir kart örneğidir.
        </Text>
      </AtomicCard>

      {/* Tıklanabilir Kart */}
      <AtomicCard
        variant="outlined"
        padding="md"
        onPress={() => console.log('Tıklandı!')}
        style={{ marginBottom: 16 }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Tıklanabilir Kart
        </Text>
        <Text style={{ marginTop: 8, color: '#6366f1' }}>
          Tıkla ve gör
        </Text>
      </AtomicCard>

      {/* Filled Kart */}
      <AtomicCard variant="filled" padding="lg" style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Filled Kart
        </Text>
        <Text style={{ marginTop: 8, lineHeight: 22 }}>
          Bu kartın dolgu efekti vardır.
        </Text>
      </AtomicCard>
    </ScrollView>
  );
};
```

## Lisans

MIT

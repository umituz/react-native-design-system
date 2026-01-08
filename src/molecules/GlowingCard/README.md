# GlowingCard

GlowingCard, neon benzeri parlama efekti ile özel bir kart bileşenidir. Özellikle vurgulanması gereken öğeler için idealdir.

## Özellikler

- ✨ **Neon Glow Efekti**: Parlama gölgesi efekti
- 🎨 **Özelleştirilebilir Renk**: İstediğiniz renk
- 💡 **Ayarlabilir Yoğunluk**: 0-1 arası yoğunluk
- 👆 **Pressable**: Tıklanabilir kart desteği
- 🎯 **Çerçeve**: Renkli çerçeve
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { GlowingCard } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { GlowingCard } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <GlowingCard>
        <Text style={{ padding: 24 }}>Parlak Kart</Text>
      </GlowingCard>
    </View>
  );
};
```

## Basic Glow

```tsx
<GlowingCard>
  <View style={{ padding: 24 }}>
    <Text>Varsayılan parlama efekti</Text>
  </View>
</GlowingCard>
```

## Custom Glow Color

```tsx
<GlowingCard glowColor="#6366f1">
  <View style={{ padding: 24 }}>
    <Text>İndigo parlama</Text>
  </View>
</GlowingCard>

<GlowingCard glowColor="#10b981">
  <View style={{ padding: 24 }}>
    <Text>Yeşil parlama</Text>
  </View>
</GlowingCard>

<GlowingCard glowColor="#f59e0b">
  <View style={{ padding: 24 }}>
    <Text>Turuncu parlama</Text>
  </View>
</GlowingCard>
```

## Intensity

```tsx
<View style={{ gap: 16 }}>
  {/* Hafif parlama */}
  <GlowingCard intensity={0.3}>
    <View style={{ padding: 24 }}>
      <Text>Hafif Parlama</Text>
    </View>
  </GlowingCard>

  {/* Orta parlama */}
  <GlowingCard intensity={0.6}>
    <View style={{ padding: 24 }}>
      <Text>Orta Parlama</Text>
    </View>
  </GlowingCard>

  {/* Tam parlama (Varsayılan) */}
  <GlowingCard intensity={1.0}>
    <View style={{ padding: 24 }}>
      <Text>Tam Parlama</Text>
    </View>
  </GlowingCard>
</View>
```

## Pressable

```tsx
<GlowingCard
  glowColor="#6366f1"
  onPress={() => console.log('Tıklandı!')}
>
  <View style={{ padding: 24 }}>
    <Text>Tıklanabilir Parlak Kart</Text>
  </View>
</GlowingCard>
```

## Custom Style

```tsx
<GlowingCard
  glowColor="#ec4899"
  intensity={0.8}
  style={{
    padding: 32,
    backgroundColor: '#1e1e1e',
  }}
>
  <Text style={{ color: '#ffffff' }}>
    Özel Stilli Parlak Kart
  </Text>
</GlowingCard>
```

## Örnek Kullanımlar

### Öne Çıkan Kart

```tsx
export const FeaturedCard = () => {
  return (
    <GlowingCard glowColor="#6366f1" intensity={0.8}>
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <AtomicIcon name="star" size="lg" color="#6366f1" />
          <Text style={{ marginLeft: 8, fontWeight: '600' }}>
            Öne Çıkan
          </Text>
        </View>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          Özel İçerik
        </Text>

        <Text style={{ color: 'gray' }}>
          Bu içerik özellikle vurgulanmıştır.
        </Text>
      </View>
    </GlowingCard>
  );
};
```

### Premium Ürün Kartı

```tsx
export const PremiumCard = ({ product }) => {
  return (
    <GlowingCard
      glowColor="#f59e0b"
      intensity={0.9}
      onPress={() => navigate('ProductDetail', { id: product.id })}
    >
      <View style={{ padding: 24 }}>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <AtomicIcon name="diamond" size="xl" color="#f59e0b" />
          <Text style={{ marginTop: 8, fontWeight: '600', color: '#f59e0b' }}>
            Premium
          </Text>
        </View>

        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
          {product.name}
        </Text>

        <Text style={{ marginTop: 8, textAlign: 'center', color: 'gray' }}>
          {product.description}
        </Text>

        <Text style={{ marginTop: 16, fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          ${product.price}
        </Text>
      </View>
    </GlowingCard>
  );
};
```

### Başarı Kartı

```tsx
export const SuccessCard = ({ achievement }) => {
  return (
    <GlowingCard glowColor="#10b981" intensity={0.7}>
      <View style={{ padding: 24, alignItems: 'center' }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#d4edda',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <AtomicIcon name="trophy" size="xl" color="#10b981" />
        </View>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          Başarı!
        </Text>

        <Text style={{ textAlign: 'center', color: 'gray' }}>
          {achievement.title}
        </Text>

        <Text style={{ marginTop: 8, textAlign: 'center', fontSize: 14 }}>
          {achievement.description}
        </Text>
      </View>
    </GlowingCard>
  );
};
```

### Uyarı Kartı

```tsx
export const WarningCard = () => {
  return (
    <GlowingCard glowColor="#f59e0b" intensity={0.8}>
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AtomicIcon name="warning" size="lg" color="#f59e0b" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>
              Dikkat
            </Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>
              Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?
            </Text>
          </View>
        </View>
      </View>
    </GlowingCard>
  );
};
```

### Hata Kartı

```tsx
export const ErrorCard = ({ error }) => {
  return (
    <GlowingCard glowColor="#ef4444" intensity={0.7}>
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AtomicIcon name="close-circle" size="lg" color="#ef4444" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>
              Hata Oluştu
            </Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>
              {error.message}
            </Text>
          </View>
        </View>
      </View>
    </GlowingCard>
  );
};
```

### Bilgi Kartı

```tsx
export const InfoCard = () => {
  return (
    <GlowingCard glowColor="#3b82f6" intensity={0.6}>
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AtomicIcon name="information-circle" size="lg" color="#3b82f6" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>
              Bilgi
            </Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>
              Bu özellik premium kullanıcılar için geçerlidir.
            </Text>
          </View>
        </View>
      </View>
    </GlowingCard>
  );
};
```

### Kullanıcı Profil Kartı

```tsx
export const ProfileCard = ({ user }) => {
  return (
    <GlowingCard
      glowColor="#8b5cf6"
      intensity={0.7}
      onPress={() => navigate('Profile', { id: user.id })}
    >
      <View style={{ padding: 24, alignItems: 'center' }}>
        <Image
          source={{ uri: user.avatar }}
          style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 16 }}
        />

        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {user.name}
        </Text>

        <Text style={{ color: 'gray', marginBottom: 16 }}>
          @{user.username}
        </Text>

        <View style={{ flexDirection: 'row', gap: 24 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {user.posts}
            </Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>Gönderi</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {user.followers}
            </Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>Takipçi</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {user.following}
            </Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>Takip</Text>
          </View>
        </View>
      </View>
    </GlowingCard>
  );
};
```

## Props

### GlowingCardProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `children` | `ReactNode` | - **(Zorunlu)** | Kart içeriği |
| `glowColor` | `string` | Primary color | Parlama rengi |
| `intensity` | `number` | `1` | Parlama yoğunluğu (0-1) |
| `onPress` | `(event: GestureResponderEvent) => void` | - | Tıklama olayı |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

## Stil Özelleştirme

```tsx
<GlowingCard
  glowColor="#ec4899"
  intensity={0.8}
  style={{
    padding: 32,
    backgroundColor: '#1e1e1e',
    borderWidth: 2,
  }}
>
  {/* İçerik */}
</GlowingCard>
```

## Best Practices

### 1. Renk Seçimi

```tsx
// Marka rengi
<GlowingCard glowColor="#6366f1">

// Başarı durumu
<GlowingCard glowColor="#10b981">

// Hata durumu
<GlowingCard glowColor="#ef4444">

// Uyarı durumu
<GlowingCard glowColor="#f59e0b">
```

### 2. Yoğunluk

```tsx
// Hafif vurgu
<GlowingCard intensity={0.3}>

// Orta vurgu
<GlowingCard intensity={0.6}>

// Güçlü vurgu
<GlowingCard intensity={1.0}>
```

### 3. Pressable Kullanımı

```tsx
// İnteraktif kart
<GlowingCard
  glowColor="#6366f1"
  onPress={handlePress}
>
  {/* Tıklama efekti ile */}
</GlowingCard>
```

## Erişilebilirlik

GlowingCard, tam erişilebilirlik desteği sunar:

- ✅ Touch uygun boyut
- ✅ Screen reader desteği
- ✅ Test ID desteği
- ✅ Press state feedback

## Performans İpuçları

1. **Shadow Performance**: Çok sayıda kart kullanırken dikkatli olun
2. **Intensity**: Düşük yoğunluk daha performanslıdır
3. **Re-renders**: Gereksiz re-render'lardan kaçının

## İlgili Bileşenler

- [`AtomicCard`](../../atoms/AtomicCard.README.md) - Basit kart bileşeni
- [`GlassView`](../../atoms/GlassView/README.md) - Glassmorphism efekti
- [`MediaCard`](../media-card/README.md) - Medya kartı

## Lisans

MIT

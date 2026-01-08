# AtomicSkeleton

AtomicSkeleton, içerik yüklenirken gösterilen placeholder bileşenidir. Farklı pattern'ler ile liste, kart veya custom skeleton yüklemeleri sağlar.

## Özellikler

- 📋 **Pattern'ler**: List, Card, Avatar, Text, Custom
- 🔢 **Çoklu Render**: Count parametresi ile tekrar
- 🎨 **Tema Bilinci**: Otomatik renk uyumu
- ⚙️ **Özelleştirilebilir**: Custom skeleton yapılandırması
- ♿ **Erişilebilir**: Screen reader için gizli

## Kurulum

```tsx
import { AtomicSkeleton } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { AtomicSkeleton } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicSkeleton pattern="list" count={3} />
    </View>
  );
};
```

## List Pattern

```tsx
{/* 3 liste öğesi */}
<AtomicSkeleton pattern="list" count={3} />

{/* 5 liste öğesi */}
<AtomicSkeleton pattern="list" count={5} />
```

## Card Pattern

```tsx
{/* 1 kart */}
<AtomicSkeleton pattern="card" />

{/* 3 kart */}
<AtomicSkeleton pattern="card" count={3} />
```

## Avatar Pattern

```tsx
<AtomicSkeleton pattern="avatar" count={5} />
```

## Text Pattern

```tsx
<AtomicSkeleton pattern="text" count={3} />
```

## Custom Pattern

```tsx
<AtomicSkeleton
  pattern="custom"
  custom={[
    { width: '100%', height: 200, borderRadius: 12 },
    { width: '80%', height: 20, borderRadius: 4, marginBottom: 12 },
    { width: '60%', height: 20, borderRadius: 4 },
  ]}
/>
```

## Örnek Kullanımlar

### Liste Yükleniyor

```tsx
export const ListSkeleton = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicSkeleton pattern="list" count={5} />
    </View>
  );
};
```

### Kart Yükleniyor

```tsx
export const CardSkeleton = () => {
  return (
    <View style={{ padding: 16 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
        <AtomicSkeleton pattern="card" count={6} />
      </View>
    </View>
  );
};
```

### Profil Yükleniyor

```tsx
export const ProfileSkeleton = () => {
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <AtomicSkeleton
        pattern="custom"
        custom={[
          { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
          { width: 200, height: 24, borderRadius: 4, marginBottom: 8 },
          { width: 150, height: 16, borderRadius: 4 },
        ]}
      />
    </View>
  );
};
```

### Detay Yükleniyor

```tsx
export const DetailSkeleton = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicSkeleton
        pattern="custom"
        custom={[
          { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
          { width: '60%', height: 28, borderRadius: 4, marginBottom: 12 },
          { width: '100%', height: 16, borderRadius: 4, marginBottom: 8 },
          { width: '100%', height: 16, borderRadius: 4, marginBottom: 8 },
          { width: '80%', height: 16, borderRadius: 4, marginBottom: 24 },
          { width: 120, height: 40, borderRadius: 8 },
        ]}
      />
    </View>
  );
};
```

### Feed Yükleniyor

```tsx
export const FeedSkeleton = () => {
  return (
    <View style={{ padding: 16 }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <View key={index} style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#e0e0e0', marginRight: 12 }} />
            <View>
              <View style={{ width: 120, height: 16, borderRadius: 4, marginBottom: 4, backgroundColor: '#e0e0e0' }} />
              <View style={{ width: 80, height: 12, borderRadius: 4, backgroundColor: '#f0f0f0' }} />
            </View>
          </View>
          <View style={{ width: '100%', height: 200, borderRadius: 12, marginBottom: 12, backgroundColor: '#e0e0e0' }} />
          <View style={{ width: '100%', height: 16, borderRadius: 4, marginBottom: 8, backgroundColor: '#e0e0e0' }} />
          <View style={{ width: '80%', height: 16, borderRadius: 4, backgroundColor: '#f0f0f0' }} />
        </View>
      ))}
    </View>
  );
};
```

### Tablo Yükleniyor

```tsx
export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <View style={{ padding: 16 }}>
      {/* Başlık */}
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={{ flex: 1, marginRight: 8 }}>
            <View style={{ width: '100%', height: 20, borderRadius: 4, backgroundColor: '#e0e0e0' }} />
          </View>
        ))}
      </View>

      {/* Satırlar */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row', marginBottom: 8 }}>
          {[1, 2, 3, 4].map((_, colIndex) => (
            <View key={colIndex} style={{ flex: 1, marginRight: 8 }}>
              <View style={{ width: '100%', height: 16, borderRadius: 4, backgroundColor: '#f0f0f0' }} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
```

### Arama Sonucu Yükleniyor

```tsx
export const SearchResultsSkeleton = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicSkeleton pattern="list" count={3} />

      <View style={{ alignItems: 'center', marginTop: 24 }}>
        <AtomicSkeleton
          pattern="custom"
          custom={[
            { width: 80, height: 16, borderRadius: 4, marginBottom: 8 },
            { width: 120, height: 12, borderRadius: 4 },
          ]}
        />
      </View>
    </View>
  );
};
```

### Form Yükleniyor

```tsx
export const FormSkeleton = () => {
  return (
    <View style={{ padding: 16 }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={{ marginBottom: 24 }}>
          <View style={{ width: 100, height: 16, borderRadius: 4, marginBottom: 8, backgroundColor: '#e0e0e0' }} />
          <View style={{ width: '100%', height: 48, borderRadius: 8, backgroundColor: '#f0f0f0' }} />
        </View>
      ))}

      <View style={{ width: 120, height: 48, borderRadius: 8, backgroundColor: '#e0e0e0' }} />
    </View>
  );
};
```

## Props

### AtomicSkeletonProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `pattern` | `SkeletonPattern` | `'list'` | Skeleton pattern'i |
| `custom` | `SkeletonConfig[]` | - | Custom yapılandırma |
| `count` | `number` | `1` | Skeleton sayısı |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

### SkeletonPattern

```typescript
type SkeletonPattern =
  | 'list'    // Liste öğesi
  | 'card'    // Kart
  | 'avatar'  // Avatar
  | 'text'    // Metin
  | 'custom'; // Özel
```

### SkeletonConfig

```typescript
interface SkeletonConfig {
  width: number | string;    // Genişlik
  height?: number;            // Yükseklik
  borderRadius?: number;      // Köşe yarıçapı
  marginBottom?: number;      // Alt boşluk
}
```

## Best Practices

### 1. Pattern Seçimi

```tsx
// Liste için
<AtomicSkeleton pattern="list" />

// Kart için
<AtomicSkeleton pattern="card" />

// Avatar için
<AtomicSkeleton pattern="avatar" />
```

### 2. Count Kullanımı

```tsx
// Uzun liste
<AtomicSkeleton pattern="list" count={10} />

// Kısa liste
<AtomicSkeleton pattern="list" count={3} />
```

### 3. Custom Skeleton

```tsx
// Özel tasarım
<AtomicSkeleton
  pattern="custom"
  custom={[
    { width: '100%', height: 200, borderRadius: 12 },
    { width: '80%', height: 20, borderRadius: 4 },
  ]}
/>
```

## Erişilebilirlik

AtomicSkeleton, tam erişilebilirlik desteği sunar:

- ✅ Screen reader'da gizli
- ✅ Loading state anonsu
- ✅ Accessibility özellikleri

## Performans İpuçları

1. **Minimal Count**: Gerektiği kadar skeleton gösterin
2. **Simple Patterns**: Basit pattern'ler daha performanslıdır
3. **Unload**: Veri geldiğinde skeleton'ı kaldırın

## İlgili Bileşenler

- [`AtomicSpinner`](../AtomicSpinner/README.md) - Spinner yükleniyor
- [`EmptyState`](../EmptyState/README.md) - Boş durum
- [`AtomicProgress`](../AtomicProgress/README.md) - İlerleme çubuğu

## Lisans

MIT

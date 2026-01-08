# AtomicProgress

AtomicProgress, ilerleme durumu göstermek için kullanılan bir bileşendir. Dosya yükleme, görev tamamlanma veya form dolumu gibi durumlarda kullanılır.

## Özellikler

- 📊 **0-100 Arası**: Yüzde bazlı ilerleme
- 🎨 **Özelleştirilebilir**: Renk, boyut, şekil
- 📝 **Metin Desteği**: Yüzde veya değer gösterimi
- 🔲 **2 Şekil**: Rounded veya Square
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { AtomicProgress } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { AtomicProgress } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicProgress value={50} />
    </View>
  );
};
```

## Basic Progress

```tsx
{/* 0% */}
<AtomicProgress value={0} />

{/* 50% */}
<AtomicProgress value={50} />

{/* 100% */}
<AtomicProgress value={100} />
```

## Yükseklik

```tsx
<View style={{ gap: 16 }}>
  <AtomicProgress value={50} height={4} />
  <AtomicProgress value={50} height={8} />
  <AtomicProgress value={50} height={12} />
  <AtomicProgress value={50} height={16} />
</View>
```

## Genişlik

```tsx
<View style={{ gap: 16 }}>
  <AtomicProgress value={50} width="100%" />
  <AtomicProgress value={50} width="80%" />
  <AtomicProgress value={50} width={200} />
</View>
```

## Custom Renk

```tsx
<View style={{ gap: 16 }}>
  <AtomicProgress value={50} color="#6366f1" />
  <AtomicProgress value={50} color="#10b981" />
  <AtomicProgress value={50} color="#f59e0b" />
  <AtomicProgress value={50} color="#ef4444" />
</View>
```

## Şekil

```tsx
<View style={{ gap: 16 }}>
  <AtomicProgress value={50} shape="rounded" />
  <AtomicProgress value={50} shape="square" />
</View>
```

## Percentage Text

```tsx
<AtomicProgress
  value={75}
  showPercentage
  height={24}
/>
```

## Value Text

```tsx
<AtomicProgress
  value={75}
  showValue
  height={24}
/>
```

## Custom Background

```tsx
<AtomicProgress
  value={50}
  color="#6366f1"
  backgroundColor="#e0e7ff"
/>
```

## Örnek Kullanımlar

### Dosya Yükleme

```tsx
export const FileUploadProgress = ({ progress }) => {
  return (
    <View style={{ padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <AtomicText type="bodyMedium">Yükleniyor...</AtomicText>
        <AtomicText type="bodyMedium" color="primary">
          %{progress}
        </AtomicText>
      </View>

      <AtomicProgress
        value={progress}
        height={8}
        color="#6366f1"
        showPercentage
      />
    </View>
  );
};
```

### Görev İlerlemesi

```tsx
export const TaskProgress = ({ completed, total }) => {
  const percentage = (completed / total) * 100;

  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="bodyMedium" style={{ marginBottom: 8 }}>
        {completed} / {total} görev tamamlandı
      </AtomicText>

      <AtomicProgress
        value={percentage}
        height={12}
        color="#10b981"
      />
    </View>
  );
};
```

### Form Tamamlama

```tsx
export const FormCompletionProgress = ({ completedSteps, totalSteps }) => {
  const percentage = (completedSteps / totalSteps) * 100;

  return (
    <View style={{ padding: 16, backgroundColor: '#f8f9fa', borderRadius: 8 }}>
      <AtomicText type="labelLarge" color="textSecondary" style={{ marginBottom: 8 }}>
        Form İlerlemesi
      </AtomicText>

      <AtomicProgress
        value={percentage}
        height={8}
        color="#6366f1"
        showPercentage
      />

      <AtomicText type="bodySmall" color="textTertiary" style={{ marginTop: 8 }}>
        {completedSteps} / {totalSteps} adım tamamlandı
      </AtomicText>
    </View>
  );
};
```

### Başarı Durumu

```tsx
export const AchievementProgress = ({ current, target }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <View style={{ padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <AtomicText type="bodyMedium" fontWeight="600">
          Başarı İlerlemesi
        </AtomicText>
        <AtomicText type="bodyMedium" color="success">
          {current} / {target}
        </AtomicText>
      </View>

      <AtomicProgress
        value={percentage}
        height={16}
        color="#10b981"
        backgroundColor="#d4edda"
        showPercentage
      />
    </View>
  );
};
```

### İndirme İlerlemesi

```tsx
export const DownloadProgress = ({ downloaded, total, filename }) => {
  const percentage = (downloaded / total) * 100;
  const downloadedMB = (downloaded / 1024 / 1024).toFixed(2);
  const totalMB = (total / 1024 / 1024).toFixed(2);

  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="bodyMedium" fontWeight="600" style={{ marginBottom: 4 }}>
        {filename}
      </AtomicText>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <AtomicText type="bodySmall" color="textSecondary">
          {downloadedMB} MB / {totalMB} MB
        </AtomicText>
        <AtomicText type="bodySmall" color="primary">
          %{Math.round(percentage)}
        </AtomicText>
      </View>

      <AtomicProgress
        value={percentage}
        height={6}
        color="#6366f1"
      />
    </View>
  );
};
```

### Okuma İlerlemesi

```tsx
export const ReadingProgress = ({ currentPage, totalPages }) => {
  const percentage = (currentPage / totalPages) * 100;

  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="labelLarge" color="textSecondary" style={{ marginBottom: 8 }}>
        Okuma İlerlemesi
      </AtomicText>

      <AtomicProgress
        value={percentage}
        height={8}
        color="#8b5cf6"
        showPercentage
      />

      <AtomicText type="bodySmall" color="textTertiary" style={{ marginTop: 8 }}>
        Sayfa {currentPage} / {totalPages}
      </AtomicText>
    </View>
  );
};
```

### Video İlerlemesi

```tsx
export const VideoProgress = ({ currentTime, duration }) => {
  const percentage = (currentTime / duration) * 100;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ padding: 8 }}>
      <AtomicProgress
        value={percentage}
        height={4}
        color="#ef4444"
        backgroundColor="#374151"
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
        <AtomicText type="bodySmall" color="textSecondary">
          {formatTime(currentTime)}
        </AtomicText>
        <AtomicText type="bodySmall" color="textSecondary">
          {formatTime(duration)}
        </AtomicText>
      </View>
    </View>
  );
};
```

## Props

### AtomicProgressProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `value` | `number` | - **(Zorunlu)** | İlerleme değeri (0-100) |
| `height` | `number` | `8` | İlerleme çubuğu yüksekliği |
| `width` | `number \| string` | `'100%'` | Genişlik |
| `color` | `string` | - | İlerleme rengi |
| `backgroundColor` | `string` | - | Arka plan rengi |
| `shape` | `'rounded' \| 'square'` | `'rounded'` | Şekil |
| `showPercentage` | `boolean` | `false` | Yüzde göster |
| `showValue` | `boolean` | `false` | Değer göster |
| `textColor` | `string` | - | Metin rengi |
| `style` | `ViewStyle` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

## Best Practices

### 1. Yükseklik Seçimi

```tsx
// İnce
<AtomicProgress height={4} />

// Normal
<AtomicProgress height={8} />

// Kalın
<AtomicProgress height={16} />
```

### 2. Renk Seçimi

```tsx
// Başarı (yeşil)
<AtomicProgress color="#10b981" />

// İlerleme (mavi)
<AtomicProgress color="#6366f1" />

// Uyarı (turuncu)
<AtomicProgress color="#f59e0b" />

// Hata (kırmızı)
<AtomicProgress color="#ef4444" />
```

### 3. Metin Gösterimi

```tsx
// Yüzde
<AtomicProgress showPercentage height={24} />

// Değer
<AtomicProgress showValue height={24} />

// Metinsiz
<AtomicProgress />
```

## Erişilebilirlik

AtomicProgress, tam erişilebilirlik desteği sunar:

- ✅ Progress bar role
- ✅ Accessibility label
- ✅ Accessibility value (min, max, now)
- ✅ Screen reader desteği

## Performans İpuçları

1. **Value Clamping**: Değer otomatik olarak 0-100 arası sınırlanır
2. **Avoid Re-renders**: `value` prop'unu stabilize edin
3. **Animation**: İlerleme animasyonu için Animated.Value kullanın

## İlgili Bileşenler

- [`AtomicSpinner`](./AtomicSpinner/README.md) - Yükleme göstergesi
- [`AtomicSkeleton`](./skeleton/AtomicSkeleton/README.md) - Skeleton loading
- [`EmptyState`](./EmptyState/README.md) - Boş durum

## Lisans

MIT

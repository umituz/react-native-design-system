# AtomicSpinner

AtomicSpinner, React Native için çok yönlü bir yükleme göstergesi bileşenidir. ActivityIndicator wrapper'ı olarak çalışır ve geniş özelleştirme seçenekleri sunar.

## Özellikler

- ⏳ **4 Size**: Small, Medium, Large, Extra Large
- 🎨 **6 Renk**: Primary, Secondary, Success, Error, Warning, White
- 📝 **Metin Desteği**: Yükleme metni gösterimi
- 🖼️ **Overlay**: Tam ekran overlay desteği
- 📦 **Full Container**: Parent container'ı doldurma
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { AtomicSpinner } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { AtomicSpinner } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicSpinner />
    </View>
  );
};
```

## Boyutlar

```tsx
<View style={{ gap: 16 }}>
  {/* Small */}
  <AtomicSpinner size="sm" />

  {/* Medium (Varsayılan) */}
  <AtomicSpinner size="md" />

  {/* Large */}
  <AtomicSpinner size="lg" />

  {/* Extra Large */}
  <AtomicSpinner size="xl" />
</View>
```

## Renkler

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <AtomicSpinner color="primary" />
  <AtomicSpinner color="secondary" />
  <AtomicSpinner color="success" />
  <AtomicSpinner color="warning" />
  <AtomicSpinner color="error" />
  <AtomicSpinner color="white" />
</View>
```

## Custom Renk

```tsx
<AtomicSpinner color="#6366f1" />
<AtomicSpinner color="rgb(99, 102, 241)" />
```

## Metin ile

```tsx
{/* Metin aşağıda (varsayılan) */}
<AtomicSpinner
  text="Yükleniyor..."
  textPosition="bottom"
/>

{/* Metin sağda */}
<AtomicSpinner
  text="Yükleniyor..."
  textPosition="right"
/>
```

## Full Container

```tsx
<View style={{ height: 200 }}>
  <AtomicSpinner fullContainer />
</View>
```

## Overlay

```tsx
<View style={{ height: 200 }}>
  {/* Overlay varsayılan renk */}
  <AtomicSpinner overlay text="Yükleniyor..." />

  {/* Custom overlay rengi */}
  <AtomicSpinner
    overlay
    overlayColor="rgba(0, 0, 0, 0.7)"
    text="Lütfen bekleyin..."
    color="white"
  />
</View>
```

## Custom Size

```tsx
<AtomicSpinner size={32} />
<AtomicSpinner size={48} />
<AtomicSpinner size={64} />
```

## Örnek Kullanımlar

### Sayfa Yükleniyor

```tsx
export const PageLoading = () => {
  return (
    <View style={{ flex: 1 }}>
      <AtomicSpinner
        fullContainer
        size="lg"
        text="Sayfa yükleniyor..."
      />
    </View>
  );
};
```

### Button Loading

```tsx
export const LoadingButton = ({ loading, onPress, children }) => {
  return (
    <Pressable onPress={onPress} disabled={loading}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <>
            <AtomicSpinner size="sm" color="white" />
            <AtomicText style={{ marginLeft: 8 }}>Yükleniyor...</AtomicText>
          </>
        ) : (
          children
        )}
      </View>
    </Pressable>
  );
};
```

### Veri Çekme

```tsx
export const DataLoading = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AtomicSpinner
          size="lg"
          text="Veriler çekiliyor..."
        />
      </View>
    );
  }

  return children;
};
```

### Form Submit

```tsx
export const FormLoading = ({ isSubmitting }) => {
  return (
    <View style={{ padding: 24 }}>
      {isSubmitting ? (
        <View style={{ alignItems: 'center' }}>
          <AtomicSpinner
            size="md"
            text="Form gönderiliyor..."
            textPosition="bottom"
          />
        </View>
      ) : (
        <AtomicText>Form hazır</AtomicText>
      )}
    </View>
  );
};
```

### İçerik Yenileme

```tsx
export const RefreshContent = ({ isRefreshing }) => {
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      {isRefreshing && (
        <AtomicSpinner
          size="sm"
          text="Yenileniyor..."
          textPosition="right"
        />
      )}
    </View>
  );
};
```

### Modal Loading

```tsx
export const LoadingModal = ({ visible }) => {
  return (
    <Modal visible={visible} transparent>
      <AtomicSpinner
        overlay
        overlayColor="rgba(0, 0, 0, 0.7)"
        size="lg"
        text="Lütfen bekleyin..."
        color="white"
      />
    </Modal>
  );
};
```

### Liste Yükleme

```tsx
export const ListLoading = () => {
  return (
    <View style={{ padding: 24 }}>
      <AtomicSpinner
        size="md"
        text="Öğeler yükleniyor..."
      />
    </View>
  );
};
```

### Görsel Yükleme

```tsx
export const ImageLoading = ({ isLoading, children }) => {
  return (
    <View style={{ width: 200, height: 200 }}>
      {isLoading ? (
        <AtomicSpinner
          fullContainer
          text="Görsel yükleniyor..."
          color="primary"
        />
      ) : (
        children
      )}
    </View>
  );
};
```

### Async Operasyon

```tsx
export const AsyncOperation = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      await performAsyncOperation();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View>
      {isProcessing ? (
        <AtomicSpinner
          size="md"
          text="İşleniyor..."
          textPosition="right"
        />
      ) : (
        <Button title="İşle" onPress={handleProcess} />
      )}
    </View>
  );
};
```

### Infinity Scroll Yükleme

```tsx
export const InfiniteScrollLoading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={{ padding: 16 }}>
      <AtomicSpinner
        size="sm"
        text="Daha fazla yükleniyor..."
        textPosition="right"
      />
    </View>
  );
};
```

## Props

### AtomicSpinnerProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `size` | `SpinnerSize \| number` | `'md'` | Spinner boyutu |
| `color` | `SpinnerColor \| string` | `'primary'` | Spinner rengi |
| `text` | `string` | - | Yükleme metni |
| `textPosition` | `'bottom' \| 'right'` | `'bottom'` | Metin konumu |
| `fullContainer` | `boolean` | `false` | Container'ı doldur |
| `overlay` | `boolean` | `false` | Overlay göster |
| `overlayColor` | `string` | `'rgba(0, 0, 0, 0.5)'` | Overlay rengi |
| `style` | `ViewStyle \| ViewStyle[]` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

### SpinnerSize

```typescript
type SpinnerSize =
  | 'sm'  // Small (16px)
  | 'md'  // Medium (24px, varsayılan)
  | 'lg'  // Large (36px)
  | 'xl'; // Extra Large (48px)
```

### SpinnerColor

```typescript
type SpinnerColor =
  | 'primary'    // Ana renk
  | 'secondary'  // İkincil renk
  | 'success'    // Başarı rengi
  | 'error'      // Hata rengi
  | 'warning'    // Uyarı rengi
  | 'white';     // Beyaz
```

## Best Practices

### 1. Boyut Seçimi

```tsx
// Küçük alanlar için
<AtomicSpinner size="sm" />

// Normal kullanım
<AtomicSpinner size="md" />

// Vurgu için
<AtomicSpinner size="lg" />

// Tam ekran
<AtomicSpinner size="xl" fullContainer />
```

### 2. Overlay Kullanımı

```tsx
// Tam ekran yükleme
<AtomicSpinner overlay text="Yükleniyor..." />

// Custom overlay
<AtomicSpinner
  overlay
  overlayColor="rgba(255, 255, 255, 0.9)"
  color="primary"
/>
```

### 3. Metin Kullanımı

```tsx
// Açıklayıcı metin
<AtomicSpinner text="Veriler yükleniyor..." />

// Kısa metin
<AtomicSpinner text="Yükleniyor..." />

// Sağda metin (horizontal layout)
<AtomicSpinner
  text="İşleniyor..."
  textPosition="right"
/>
```

## Erişilebilirlik

AtomicSpinner, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Accessibility label
- ✅ Progress bar role
- ✅ Live region anonsu
- ✅ Test ID desteği

## Performans İpuçları

1. **Conditional Rendering**: Gereksiz render'lardan kaçının
2. **Size Selection**: Uygun boyutu seçin
3. **Avoid Re-renders**: Spinner'ı stabilize edin

## İlgili Bileşenler

- [`AtomicProgress`](./AtomicProgress/README.md) - İlerleme çubuğu
- [`AtomicSkeleton`](./skeleton/AtomicSkeleton/README.md) - Skeleton loading
- [`EmptyState`](./EmptyState/README.md) - Boş durum

## Lisans

MIT

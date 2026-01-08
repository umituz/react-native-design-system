# AtomicButton

AtomicButton, React Native için güçlü ve özelleştirilebilir bir buton bileşenidir. Material Design 3 prensiplerine uygun olarak tasarlanmış ve tamamen özelleştirilebilir.

## Özellikler

- ✨ **6 Variant**: Primary, Secondary, Tertiary, Surface, Outline, Ghost
- 📏 **3 Size**: Small, Medium, Large
- 🎨 **Tam Özelleştirilebilir**: Stil ve metin özelleştirmesi
- 🔄 **Loading State**: Yükleme durumu
- 🎭 **İkon Desteği**: Sol veya sağ ikon
- 📐 **Full Width**: Tam genişlik desteği
- ♿ **Erişilebilirlik**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { AtomicButton } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { AtomicButton } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicButton
        title="Buton"
        onPress={() => console.log('Tıklandı!')}
      />
    </View>
  );
};
```

## Variant'lar

```tsx
<View style={{ gap: 12 }}>
  {/* Primary */}
  <AtomicButton
    variant="primary"
    title="Primary"
    onPress={() => {}}
  />

  {/* Secondary */}
  <AtomicButton
    variant="secondary"
    title="Secondary"
    onPress={() => {}}
  />

  {/* Tertiary */}
  <AtomicButton
    variant="tertiary"
    title="Tertiary"
    onPress={() => {}}
  />

  {/* Surface */}
  <AtomicButton
    variant="surface"
    title="Surface"
    onPress={() => {}}
  />

  {/* Outline */}
  <AtomicButton
    variant="outline"
    title="Outline"
    onPress={() => {}}
  />

  {/* Ghost */}
  <AtomicButton
    variant="ghost"
    title="Ghost"
    onPress={() => {}}
  />
</View>
```

## Boyutlar

```tsx
<View style={{ gap: 12 }}>
  {/* Small */}
  <AtomicButton
    size="sm"
    title="Small"
    onPress={() => {}}
  />

  {/* Medium (Varsayılan) */}
  <AtomicButton
    size="md"
    title="Medium"
    onPress={() => {}}
  />

  {/* Large */}
  <AtomicButton
    size="lg"
    title="Large"
    onPress={() => {}}
  />
</View>
```

## İkonlu Butonlar

```tsx
<View style={{ gap: 12 }}>
  {/* Sol İkon */}
  <AtomicButton
    title="Devam Et"
    icon="arrow-forward-outline"
    iconPosition="left"
    onPress={() => {}}
  />

  {/* Sağ İkon */}
  <AtomicButton
    title="Geri"
    icon="arrow-back-outline"
    iconPosition="right"
    onPress={() => {}}
  />

  {/* Sadece İkon */}
  <AtomicButton
    icon="add-outline"
    onPress={() => {}}
  />
</View>
```

## Loading State

```tsx
<AtomicButton
  title="Yükleniyor"
  loading
  onPress={() => {}}
/>
```

## Disabled State

```tsx
<AtomicButton
  title="Devre Dışı"
  disabled
  onPress={() => {}}
/>
```

## Full Width

```tsx
<AtomicButton
  title="Tam Genişlik"
  fullWidth
  onPress={() => {}}
/>
```

## Örnek Kullanımlar

### Form Gönderme

```tsx
<AtomicButton
  variant="primary"
  size="lg"
  title="Gönder"
  loading={isSubmitting}
  onPress={handleSubmit}
/>
```

### Silme İşlemi

```tsx
<AtomicButton
  variant="outline"
  title="Sil"
  icon="trash-outline"
  onPress={handleDelete}
/>
```

### İptal

```tsx
<AtomicButton
  variant="ghost"
  title="İptal"
  onPress={handleCancel}
/>
```

### İkon Butonları

```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  <AtomicButton
    variant="surface"
    icon="add-outline"
    onPress={() => {}}
  />

  <AtomicButton
    variant="surface"
    icon="create-outline"
    onPress={() => {}}
  />

  <AtomicButton
    variant="surface"
    icon="trash-outline"
    onPress={() => {}}
  />
</View>
```

## Props

### AtomicButtonProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `title` | `string` | - | Buton metni |
| `children` | `ReactNode` | - | Alternatif içerik |
| `onPress` | `() => void` | - **(Zorunlu)** | Tıklama olayı |
| `variant` | `ButtonVariant` | `'primary'` | Buton görünüm stili |
| `size` | `ButtonSize` | `'md'` | Buton boyutu |
| `disabled` | `boolean` | `false` | Devre dışı |
| `loading` | `boolean` | `false` | Yükleme durumu |
| `icon` | `string` | - | İkon ismi (Ionicons) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | İkon konumu |
| `fullWidth` | `boolean` | `false` | Tam genişlik |
| `style` | `StyleProp<ViewStyle>` | - | Container stil |
| `textStyle` | `StyleProp<TextStyle>` | - | Metin stil |
| `activeOpacity` | `number` | `0.8` | Opaklık |
| `testID` | `string` | - | Test ID'si |

### ButtonVariant

```typescript
type ButtonVariant =
  | 'primary'    // Ana buton
  | 'secondary'  // İkincil buton
  | 'tertiary'   // Üçüncül buton
  | 'surface'    // Yüzey butonu
  | 'outline'    // Çerçeveli buton
  | 'ghost';     // Hayalet buton
```

### ButtonSize

```typescript
type ButtonSize = 'sm' | 'md' | 'lg';
```

## Stil Özelleştirme

```tsx
<AtomicButton
  title="Özel Buton"
  onPress={() => {}}
  style={{
    backgroundColor: '#6366f1',
    borderRadius: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  }}
  textStyle={{
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  }}
/>
```

## Best Practices

### 1. Buton Hiyerarşisi

```tsx
// Ana eylem
<AtomicButton variant="primary" title="Kaydet" onPress={save} />

// İkincil eylem
<AtomicButton variant="secondary" title="İptal" onPress={cancel} />

// Tehlikeli eylem
<AtomicButton variant="outline" title="Sil" onPress={delete} />
```

### 2. İkon Kullanımı

```tsx
// İlerle - sağ ikon
<AtomicButton
  title="İlerle"
  icon="arrow-forward"
  iconPosition="right"
  onPress={next}
/>

// Geri - sol ikon
<AtomicButton
  title="Geri"
  icon="arrow-back"
  iconPosition="left"
  onPress={back}
/>
```

### 3. Loading State

```tsx
<AtomicButton
  title="Gönder"
  loading={isLoading}
  onPress={handleSubmit}
  disabled={isLoading}
/>
```

## Erişilebilirlik

AtomicButton, tam erişilebilirlik desteği sunar:

- ✅ Touch uygun boyut (minimum 44x44)
- ✅ Screen reader desteği
- ✅ Disabled state anonsu
- ✅ Test ID desteği

## Performans İpuçları

1. **React.memo**: AtomicButton zaten `React.memo` ile sarılmış
2. **Inline Styles**: Inline stil kullanmaktan kaçının, bunun yerine theme kullanın
3. **Re-renders**: Prop'ları stabilize edin (useCallback, useMemo)

## İlgili Bileşenler

- [`AtomicIcon`](../AtomicIcon/README.md) - İkon bileşeni
- [`AtomicSpinner`](../AtomicSpinner/README.md) - Yükleme göstergesi
- [`AtomicText`](../AtomicText/README.md) - Metin bileşeni

## Lisans

MIT

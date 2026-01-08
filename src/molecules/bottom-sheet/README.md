# BottomSheet

BottomSheet, ekranın altından açılan modal benzeri bir bileşendir. Filtreleme, seçim veya ekranda kalıcı aksiyonlar için idealdir.

## Özellikler

- 📱 **4 Preset**: Small, Medium, Large, Full
- 🎯 **Snap Points**: Birden fazla yükseklik noktası
- 👆 **Gesture**: Kaydırma ile kapatma
- 🎨 **Özelleştirilebilir**: Renk ve stil
- 🔝 **Safe Area**: Safe area desteği
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { BottomSheet } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { BottomSheet } from 'react-native-design-system';

export const BasicExample = () => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Bottom Sheet Aç" onPress={openSheet} />

      <BottomSheet
        ref={bottomSheetRef}
        preset="medium"
      >
        <View style={{ padding: 24 }}>
          <AtomicText>Bottom Sheet İçeriği</AtomicText>
        </View>
      </BottomSheet>
    </View>
  );
};
```

## Preset Yükseklikler

```tsx
<View style={{ gap: 16 }}>
  {/* Small - %35 */}
  <BottomSheet ref={ref1} preset="small">
    <SmallContent />
  </BottomSheet>

  {/* Medium - %60 (Varsayılan) */}
  <BottomSheet ref={ref2} preset="medium">
    <MediumContent />
  </BottomSheet>

  {/* Large - %85 */}
  <BottomSheet ref={ref3} preset="large">
    <LargeContent />
  </BottomSheet>

  {/* Full - %100 */}
  <BottomSheet ref={ref4} preset="full">
    <FullContent />
  </BottomSheet>
</View>
```

## Custom Snap Points

```tsx
<BottomSheet
  ref={bottomSheetRef}
  snapPoints={['25%', '50%', '75%']}
  initialIndex={1}
>
  <Content />
</BottomSheet>
```

## Custom Background Color

```tsx
<BottomSheet
  ref={bottomSheetRef}
  backgroundColor="#f8f9fa"
>
  <Content />
</BottomSheet>
```

## OnChange Callback

```tsx
const [sheetIndex, setSheetIndex] = useState(-1);

<BottomSheet
  ref={bottomSheetRef}
  onChange={(index) => setSheetIndex(index)}
>
  <Content />
</BottomSheet>
```

## OnClose Callback

```tsx
<BottomSheet
  ref={bottomSheetRef}
  onClose={() => console.log('Sheet closed')}
>
  <Content />
</BottomSheet>
```

## Örnek Kullanımlar

### Seçim Bottom Sheet

```tsx
export const SelectionBottomSheet = ({ ref, options, onSelect }) => {
  return (
    <BottomSheet ref={ref} preset="small">
      <View style={{ padding: 24 }}>
        <AtomicText type="titleLarge" style={{ marginBottom: 16 }}>
          Seçim Yapın
        </AtomicText>

        {options.map((option) => (
          <Pressable
            key={option.id}
            style={{ padding: 16 }}
            onPress={() => {
              onSelect(option);
              ref.current?.close();
            }}
          >
            <AtomicText type="bodyLarge">{option.label}</AtomicText>
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  );
};
```

### Paylaşım Bottom Sheet

```tsx
export const ShareBottomSheet = ({ ref, item, onShare }) => {
  const shareOptions = [
    { id: 'copy', icon: 'copy-outline', label: 'Linki Kopyala' },
    { id: 'whatsapp', icon: 'logo-whatsapp', label: 'WhatsApp' },
    { id: 'twitter', icon: 'logo-twitter', label: 'Twitter' },
    { id: 'facebook', icon: 'logo-facebook', label: 'Facebook' },
  ];

  return (
    <BottomSheet ref={ref} preset="small">
      <View style={{ padding: 24 }}>
        <AtomicText type="titleLarge" style={{ marginBottom: 16 }}>
          Paylaş
        </AtomicText>

        {shareOptions.map((option) => (
          <Pressable
            key={option.id}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
            onPress={() => onShare(option.id)}
          >
            <AtomicIcon name={option.icon} size="lg" style={{ marginRight: 16 }} />
            <AtomicText type="bodyLarge">{option.label}</AtomicText>
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  );
};
```

### Filtre Bottom Sheet

```tsx
export const FilterBottomSheet = ({ ref, filters, onApply }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  return (
    <BottomSheet ref={ref} preset="large">
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
          <AtomicText type="titleLarge">Filtrele</AtomicText>
          <Pressable onPress={() => ref.current?.close()}>
            <AtomicIcon name="close" size="md" />
          </Pressable>
        </View>

        {/* Filtre seçenekleri */}
        <FilterOptions
          filters={localFilters}
          onChange={setLocalFilters}
        />

        <View style={{ flexDirection: 'row', gap: 16, marginTop: 24 }}>
          <Button
            title="Temizle"
            mode="outlined"
            style={{ flex: 1 }}
            onPress={() => setLocalFilters({})}
          />
          <Button
            title="Uygula"
            mode="contained"
            style={{ flex: 1 }}
            onPress={() => onApply(localFilters)}
          />
        </View>
      </View>
    </BottomSheet>
  );
};
```

### Ayarlar Bottom Sheet

```tsx
export const SettingsBottomSheet = ({ ref }) => {
  return (
    <BottomSheet ref={ref} preset="medium">
      <View style={{ padding: 24 }}>
        <AtomicText type="titleLarge" style={{ marginBottom: 24 }}>
          Ayarlar
        </AtomicText>

        <SettingItem icon="notifications-outline" label="Bildirimler" />
        <SettingItem icon="moon-outline" label="Karanlık Mod" />
        <SettingItem icon="globe-outline" label="Dil" />
        <SettingItem icon="information-circle-outline" label="Hakkında" />
      </View>
    </BottomSheet>
  );
};
```

### Eylem Bottom Sheet

```tsx
export const ActionBottomSheet = ({ ref, item, onAction }) => {
  const actions = [
    { id: 'edit', icon: 'create-outline', label: 'Düzenle', color: 'primary' },
    { id: 'share', icon: 'share-outline', label: 'Paylaş', color: 'primary' },
    { id: 'archive', icon: 'archive-outline', label: 'Arşivle', color: 'primary' },
    { id: 'delete', icon: 'trash-outline', label: 'Sil', color: 'error' },
  ];

  return (
    <BottomSheet ref={ref} preset="small">
      <View style={{ padding: 8 }}>
        {actions.map((action) => (
          <Pressable
            key={action.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#e0e0e0',
            }}
            onPress={() => onAction(action.id)}
          >
            <AtomicIcon
              name={action.icon}
              size="md"
              color={action.color}
              style={{ marginRight: 16 }}
            />
            <AtomicText
              type="bodyLarge"
              color={action.color}
            >
              {action.label}
            </AtomicText>
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  );
};
```

## Ref Methods

### BottomSheetRef

```typescript
interface BottomSheetRef {
  snapToIndex(index: number): void;    // Index'e git
  snapToPosition(): void;               // En üste git
  expand(): void;                       // Genişlet
  collapse(): void;                     // Daralt
  close(): void;                        // Kapat
}
```

### Kullanım

```tsx
const ref = useRef<BottomSheetRef>(null);

// Aç
ref.current?.expand();

// Kapat
ref.current?.close();

// Snap point'e git
ref.current?.snapToIndex(1);
```

## Props

### BottomSheetProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `children` | `ReactNode` | - **(Zorunlu)** | Sheet içeriği |
| `preset` | `BottomSheetPreset` | `'medium'` | Yükseklik preset'i |
| `snapPoints` | `(number \| string)[]` | - | Custom snap points |
| `initialIndex` | `number` | - | Başlangıç index'i |
| `backgroundColor` | `string` | - | Arka plan rengi |
| `onChange` | `(index: number) => void` | - | Değişiklik callback'i |
| `onClose` | `() => void` | - | Kapatma callback'i |

### BottomSheetPreset

```typescript
type BottomSheetPreset =
  | 'small'   // %35
  | 'medium'  // %60 (varsayılan)
  | 'large'   // %85
  | 'full';   // %100
```

## Best Practices

### 1. Preset Seçimi

```tsx
// Kısa içerik için
<BottomSheet preset="small" />

// Orta içerik için
<BottomSheet preset="medium" />

// Uzun içerik için
<BottomSheet preset="large" />

// Tam ekran için
<BottomSheet preset="full" />
```

### 2. Snap Points

```tsx
// Birden fazla nokta
<BottomSheet
  snapPoints={['25%', '50%', '75%']}
  initialIndex={1}
/>
```

### 3. Kapatma

```tsx
// Manuel kapatma
ref.current?.close();

// Overlay tıklama ile otomatik
<BottomSheet onClose={handleClose} />
```

## Erişilebilirlik

BottomSheet, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Touch uygun boyut
- ✅ Escape key (web)
- ✅ Focus trap
- ✅ Accessibility label

## Performans İpuçları

1. **Lazy Loading**: İçeriği lazy load edin
2. **Unmount**: Kapatıldığında unmount edin
3. **Memoization**: İçeriği memo edin

## İlgili Bileşenler

- [`BaseModal`](../BaseModal/README.md) - Modal bileşeni
- [`FilterBottomSheet`](./FilterBottomSheet/README.md) - Filtre sheet'i
- [`AtomicButton`](../../atoms/button/README.md) - Buton bileşeni

## Lisans

MIT

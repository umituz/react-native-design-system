# AtomicChip

AtomicChip, React Native için küçük, etiket benzeri bileşenlerdir. Kategorileri, durumları veya seçilebilir öğeleri göstermek için idealdir.

## Özellikler

- 🎨 **3 Variant**: Filled, Outlined, Ghost
- 📏 **3 Size**: Small, Medium, Large
- 🌈 **7 Renk**: Primary, Secondary, Success, Warning, Error, Info, Surface
- 🎭 **İkon Desteği**: Leading ve trailing ikonlar
- 👆 **Clickble**: Tıklanabilir chip'ler
- ✅ **Selected**: Seçim durumu
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { AtomicChip } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { AtomicChip } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16, flexDirection: 'row', gap: 8 }}>
      <AtomicChip>React Native</AtomicChip>
      <AtomicChip>TypeScript</AtomicChip>
      <AtomicChip>Material Design</AtomicChip>
    </View>
  );
};
```

## Variant'lar

```tsx
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  {/* Filled (Varsayılan) */}
  <AtomicChip variant="filled">Filled</AtomicChip>

  {/* Outlined */}
  <AtomicChip variant="outlined">Outlined</AtomicChip>

  {/* Ghost */}
  <AtomicChip variant="ghost">Ghost</AtomicChip>
</View>
```

## Renkler

```tsx
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <AtomicChip color="primary">Primary</AtomicChip>
  <AtomicChip color="secondary">Secondary</AtomicChip>
  <AtomicChip color="success">Success</AtomicChip>
  <AtomicChip color="warning">Warning</AtomicChip>
  <AtomicChip color="error">Error</AtomicChip>
  <AtomicChip color="info">Info</AtomicChip>
  <AtomicChip color="surface">Surface</AtomicChip>
</View>
```

## Boyutlar

```tsx
<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
  {/* Small */}
  <AtomicChip size="sm">Small</AtomicChip>

  {/* Medium (Varsayılan) */}
  <AtomicChip size="md">Medium</AtomicChip>

  {/* Large */}
  <AtomicChip size="lg">Large</AtomicChip>
</View>
```

## İkonlu Chip'ler

```tsx
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  {/* Leading Icon */}
  <AtomicChip
    leadingIcon="checkmark-circle"
    color="success"
  >
    Onaylandı
  </AtomicChip>

  {/* Trailing Icon */}
  <AtomicChip
    trailingIcon="close-outline"
    color="error"
  >
    İptal
  </AtomicChip>

  {/* Both Icons */}
  <AtomicChip
    leadingIcon="person-outline"
    trailingIcon="chevron-down"
  >
    Kullanıcı
  </AtomicChip>
</View>
```

## Tıklanabilir Chip'ler

```tsx
const [selected, setSelected] = useState(false);

<AtomicChip
  clickable
  selected={selected}
  onPress={() => setSelected(!selected)}
>
  Seçilebilir Chip
</AtomicChip>
```

## Custom Renkler

```tsx
<AtomicChip
  variant="filled"
  backgroundColor="#6366f1"
  textColor="#ffffff"
  borderColor="#6366f1"
>
  Custom Color
</AtomicChip>
```

## Örnek Kullanımlar

### Kategori Etiketleri

```tsx
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <AtomicChip size="sm" variant="outlined">React Native</AtomicChip>
  <AtomicChip size="sm" variant="outlined">TypeScript</AtomicChip>
  <AtomicChip size="sm" variant="outlined">Node.js</AtomicChip>
  <AtomicChip size="sm" variant="outlined">GraphQL</AtomicChip>
</View>
```

### Durum Göstergeleri

```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  <AtomicChip
    color="success"
    leadingIcon="checkmark-circle"
    size="sm"
  >
    Aktif
  </AtomicChip>

  <AtomicChip
    color="warning"
    leadingIcon="time"
    size="sm"
  >
    Beklemede
  </AtomicChip>

  <AtomicChip
    color="error"
    leadingIcon="close-circle"
    size="sm"
  >
    İptal
  </AtomicChip>
</View>
```

### Filtre Seçimi

```tsx
const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

const filters = ['Tümü', 'Aktif', 'Pasif', 'Beklemede'];

<View style={{ flexDirection: 'row', gap: 8 }}>
  {filters.map((filter) => (
    <AtomicChip
      key={filter}
      clickable
      selected={selectedFilters.includes(filter)}
      onPress={() => {
        if (selectedFilters.includes(filter)) {
          setSelectedFilters(selectedFilters.filter(f => f !== filter));
        } else {
          setSelectedFilters([...selectedFilters, filter]);
        }
      }}
      color="primary"
    >
      {filter}
    </AtomicChip>
  ))}
</View>
```

### Yetenek Etiketleri

```tsx
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <AtomicChip
    leadingIcon="code-slash"
    color="info"
    size="sm"
  >
    React
  </AtomicChip>

  <AtomicChip
    leadingIcon="logo-javascript"
    color="warning"
    size="sm"
  >
    JavaScript
  </AtomicChip>

  <AtomicChip
    leadingIcon="logo-python"
    color="success"
    size="sm"
  >
    Python
  </AtomicChip>
</View>
```

### Silinebilir Etiketler

```tsx
const [tags, setTags] = useState(['React', 'TypeScript', 'Node.js']);

<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  {tags.map((tag, index) => (
    <AtomicChip
      key={index}
      trailingIcon="close"
      clickable
      onPress={() => setTags(tags.filter((_, i) => i !== index))}
      variant="outlined"
    >
      {tag}
    </AtomicChip>
  ))}
</View>
```

## Props

### AtomicChipProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `children` | `ReactNode` | - **(Zorunlu)** | Chip içeriği |
| `variant` | `ChipVariant` | `'filled'` | Chip görünüm stili |
| `size` | `ChipSize` | `'md'` | Chip boyutu |
| `color` | `ChipColor` | `'primary'` | Semantic renk |
| `backgroundColor` | `string` | - | Custom arka plan rengi |
| `textColor` | `string` | - | Custom metin rengi |
| `borderColor` | `string` | - | Custom çerçeve rengi |
| `leadingIcon` | `string` | - | Sol ikon ismi |
| `trailingIcon` | `string` | - | Sağ ikon ismi |
| `clickable` | `boolean` | `false` | Tıklanabilir |
| `onPress` | `() => void` | - | Tıklama olayı |
| `selected` | `boolean` | `false` | Seçili durumu |
| `disabled` | `boolean` | `false` | Devre dışı |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |
| `activeOpacity` | `number` | `0.7` | Tıklama opaklığı |
| `testID` | `string` | - | Test ID'si |

### ChipVariant

```typescript
type ChipVariant =
  | 'filled'   // Dolgu (varsayılan)
  | 'outlined' // Çerçeveli
  | 'ghost';   // Hayalet
```

### ChipSize

```typescript
type ChipSize = 'sm' | 'md' | 'lg';
```

### ChipColor

```typescript
type ChipColor =
  | 'primary'    // Ana renk
  | 'secondary'  // İkincil renk
  | 'success'    // Başarı rengi
  | 'warning'    // Uyarı rengi
  | 'error'      // Hata rengi
  | 'info'       // Bilgi rengi
  | 'surface';   // Yüzey rengi
```

## Best Practices

### 1. Variant Seçimi

```tsx
// Ana etiketler için filled
<AtomicChip variant="filled">React Native</AtomicChip>

// Liste elemanları için outlined
<AtomicChip variant="outlined">TypeScript</AtomicChip>

// Arka plan için ghost
<AtomicChip variant="ghost">Node.js</AtomicChip>
```

### 2. Renk Kullanımı

```tsx
// Başarı durumu
<AtomicChip color="success">Başarılı</AtomicChip>

// Hata durumu
<AtomicChip color="error">Hatalı</AtomicChip>

// Uyarı durumu
<AtomicChip color="warning">Uyarı</AtomicChip>
```

### 3. Boyut Seçimi

```tsx
// Yoğun içerik için
<AtomicChip size="sm">Small</AtomicChip>

// Normal kullanım
<AtomicChip size="md">Medium</AtomicChip>

// Vurgu için
<AtomicChip size="lg">Large</AtomicChip>
```

## Erişilebilirlik

AtomicChip, tam erişilebilirlik desteği sunar:

- ✅ Touch uygun boyut
- ✅ Screen reader desteği
- ✅ Selected state anonsu
- ✅ Test ID desteği

## Performans İpuçları

1. **React.memo**: AtomicChip zaten `React.memo` ile sarılmış
2. **Listelerde Kullanım**: `key` prop'unu kullanmayı unutmayın
3. **OnPress Stabilization**: `onPress` callback'ini `useCallback` ile sarın

## İlgili Bileşenler

- [`AtomicPicker`](../picker/README.md) - Seçim bileşeni
- [`AtomicButton`](../button/README.md) - Buton bileşeni
- [`FormField`](../../molecules/FormField/README.md) - Form alanı

## Lisans

MIT

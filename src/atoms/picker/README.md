# AtomicPicker

AtomicPicker, React Native için güçlü ve özelleştirilebilir bir seçim/dropdown bileşenidir. Tek ve çoklu seçim destekler, modal arayüz ile çalışır.

## Özellikler

- ✨ **Single & Multi-Select**: Tek ve çoklu seçim desteği
- 🔍 **Searchable**: Arama/filtreleme özelliği
- 🎨 **Tam Özelleştirilebilir**: Tema ve stil desteği
- 📱 **Modal Display**: Full-screen modal (mobile)
- 🎭 **İkon Desteği**: Seçenekler için ikonlar
- ✅ **Clearable**: Seçimi temizleme
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği
- 📝 **Form Ready**: react-hook-form entegrasyonu hazır

## Kurulum

```tsx
import { AtomicPicker } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { AtomicPicker } from 'react-native-design-system';

export const BasicExample = () => {
  const [value, setValue] = useState('birthday');

  return (
    <View style={{ padding: 16 }}>
      <AtomicPicker
        value={value}
        onChange={setValue}
        options={[
          { label: 'Doğum Günü', value: 'birthday' },
          { label: 'Düğün', value: 'wedding' },
          { label: 'Kurumsal Etkinlik', value: 'corporate' },
        ]}
        label="Etkinlik Türü"
        placeholder="Seçim yapın"
      />
    </View>
  );
};
```

## Single Select

```tsx
const [partyType, setPartyType] = useState('birthday');

<AtomicPicker
  value={partyType}
  onChange={setPartyType}
  options={[
    { label: 'Doğum Günü', value: 'birthday', icon: 'cake' },
    { label: 'Düğün', value: 'wedding', icon: 'heart' },
    { label: 'Kurumsal Etkinlik', value: 'corporate', icon: 'briefcase' },
  ]}
  label="Parti Türü"
  placeholder="Parti türünü seçin"
/>
```

## Multi Select

```tsx
const [guests, setGuests] = useState<string[]>([]);

<AtomicPicker
  value={guests}
  onChange={setGuests}
  multiple
  options={[
    { label: 'Ahmet Yılmaz', value: 'ahmet' },
    { label: 'Ayşe Demir', value: 'ayse' },
    { label: 'Mehmet Kaya', value: 'mehmet' },
  ]}
  label="Davetliler"
  placeholder="Davetli seçin"
  modalTitle="Davetli Seçin"
/>
```

## Searchable Picker

```tsx
<AtomicPicker
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={countries} // Uzun liste
  label="Ülke"
  placeholder="Ülke seçin"
  searchable
  searchPlaceholder="Ülke ara..."
/>
```

## Clearable

```tsx
<AtomicPicker
  value={status}
  onChange={setStatus}
  options={statusOptions}
  label="Durum"
  placeholder="Durum seçin"
  clearable
/>
```

## Error State

```tsx
<AtomicPicker
  value={category}
  onChange={setCategory}
  options={categories}
  label="Kategori"
  placeholder="Kategori seçin"
  error="Bu alan zorunludur"
/>
```

## Disabled State

```tsx
<AtomicPicker
  value={role}
  onChange={setRole}
  options={roles}
  label="Rol"
  placeholder="Rol seçin"
  disabled
/>
```

## Sizes

```tsx
<View style={{ gap: 16 }}>
  {/* Small */}
  <AtomicPicker
    size="sm"
    value={value}
    onChange={setValue}
    options={options}
    label="Small"
  />

  {/* Medium (Varsayılan) */}
  <AtomicPicker
    size="md"
    value={value}
    onChange={setValue}
    options={options}
    label="Medium"
  />

  {/* Large */}
  <AtomicPicker
    size="lg"
    value={value}
    onChange={setValue}
    options={options}
    label="Large"
  />
</View>
```

## Auto Close

```tsx
// Single select için otomatik kapanma
<AtomicPicker
  value={singleValue}
  onChange={setSingleValue}
  options={options}
  autoClose // Varsayılan: true
/>

// Multi select için açık kalarak seçim yapma
<AtomicPicker
  value={multiValue}
  onChange={setMultiValue}
  options={options}
  multiple
  autoClose={false}
/>
```

## Örnek Kullanımlar

### Kullanıcı Rolü Seçimi

```tsx
const [role, setRole] = useState('user');

<AtomicPicker
  value={role}
  onChange={setRole}
  options={[
    { label: 'Admin', value: 'admin', icon: 'shield-checkmark' },
    { label: 'Moderatör', value: 'moderator', icon: 'person' },
    { label: 'Kullanıcı', value: 'user', icon: 'person-outline' },
  ]}
  label="Rol"
  placeholder="Rol seçin"
  searchable={false}
/>
```

### Ürün Kategorileri

```tsx
const [categories, setCategories] = useState<string[]>([]);

<AtomicPicker
  value={categories}
  onChange={setCategories}
  multiple
  options={productCategories}
  label="Kategoriler"
  placeholder="Kategori seçin"
  modalTitle="Kategori Seçin"
  searchable
  searchPlaceholder="Kategori ara..."
  emptyMessage="Kategori bulunamadı"
/>
```

### Şehir Seçimi (Searchable)

```tsx
const [city, setCity] = useState('');

<AtomicPicker
  value={city}
  onChange={setCity}
  options={turkishCities}
  label="Şehir"
  placeholder="Şehir seçin"
  searchable
  searchPlaceholder="Şehir ara..."
  clearable
/>
```

### Öncelik Seçimi

```tsx
const [priority, setPriority] = useState('medium');

<AtomicPicker
  value={priority}
  onChange={setPriority}
  options={[
    { label: 'Düşük', value: 'low', icon: 'arrow-down' },
    { label: 'Orta', value: 'medium', icon: 'remove' },
    { label: 'Yüksek', value: 'high', icon: 'arrow-up' },
    { label: 'Acil', value: 'urgent', icon: 'warning' },
  ]}
  label="Öncelik"
  placeholder="Öncelik seçin"
/>
```

## Props

### AtomicPickerProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `value` | `string \| string[]` | - **(Zorunlu)** | Seçili değer(ler) |
| `onChange` | `(value: any) => void` | - **(Zorunlu)** | Değişiklik olayı |
| `options` | `PickerOption[]` | - **(Zorunlu)** | Seçenek listesi |
| `label` | `string` | - | Etiket metni |
| `placeholder` | `string` | - | Placeholder metni |
| `error` | `string` | - | Hata mesajı |
| `disabled` | `boolean` | `false` | Devre dışı |
| `multiple` | `boolean` | `false` | Çoklu seçim |
| `searchable` | `boolean` | `false` | Arama özelliği |
| `clearable` | `boolean` | `false` | Temizleme butonu |
| `autoClose` | `boolean` | `true` | Otomatik kapanma |
| `size` | `PickerSize` | `'md'` | Boyut |
| `modalTitle` | `string` | - | Modal başlığı |
| `emptyMessage` | `string` | - | Boş liste mesajı |
| `searchPlaceholder` | `string` | - | Arama placeholder'ı |
| `clearAccessibilityLabel` | `string` | - | Temizleme erişilebilirlik etiketi |
| `closeAccessibilityLabel` | `string` | - | Kapatma erişilebilirlik etiketi |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |
| `labelStyle` | `StyleProp<TextStyle>` | - | Etiket stili |
| `testID` | `string` | - | Test ID'si |

### PickerOption

```typescript
interface PickerOption {
  label: string;      // Görüntülenecek metin
  value: any;         // Değer
  icon?: string;      // İkon ismi (opsiyonel)
}
```

### PickerSize

```typescript
type PickerSize = 'sm' | 'md' | 'lg';
```

## react-hook-form Entegrasyonu

```tsx
import { useForm, Controller } from 'react-hook-form';

function MyForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      country: 'turkey',
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Controller
      control={control}
      name="country"
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <AtomicPicker
          value={value}
          onChange={onChange}
          options={countries}
          label="Ülke"
          placeholder="Ülke seçin"
          error={error?.message}
        />
      )}
    />
  );
}
```

## Best Practices

### 1. Option Yapısı

```tsx
// İyi - İkonlu seçenekler
const options = [
  { label: 'Admin', value: 'admin', icon: 'shield' },
  { label: 'User', value: 'user', icon: 'person' },
];

// İyi - Basit seçenekler
const options = [
  { label: 'Evet', value: 'yes' },
  { label: 'Hayır', value: 'no' },
];
```

### 2. Multi-Select Kullanımı

```tsx
// AutoClose false - birden fazla seçim yapılabilir
<AtomicPicker
  multiple
  autoClose={false}
  // ...
/>
```

### 3. Searchable Kullanımı

```tsx
// Uzun listelerde searchable kullanın
<AtomicPicker
  options={longList} // 50+ seçenek
  searchable
  // ...
/>
```

## Erişilebilirlik

AtomicPicker, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Keyboard navigation
- ✅ Accessibility label desteği
- ✅ Test ID desteği

## Performans İpuçları

1. **Uzun Listeler**: `searchable` özelliğini kullanın
2. **Multi-Select**: `autoClose={false}` kullanarak UX'i iyileştirin
3. **Re-renders**: `onChange` callback'ini stabilize edin

## İlgili Bileşenler

- [`FormField`](../../molecules/FormField/README.md) - Form alanı
- [`AtomicInput`](../input/README.md) - Input bileşeni
- [`AtomicChip`](../chip/README.md) - Chip bileşeni (seçili değerleri göstermek için)

## Lisans

MIT

# AtomicInput

AtomicInput, React Native için güçlü ve özelleştirilebilir bir metin girişi bileşenidir. Material Design 3 prensiplerine uygun olarak tasarlanmış ve tamamen özelleştirilebilir.

## Özellikler

- ✨ **Pure React Native**: Harici bağımlılık yok (Paper yok)
- 🎨 **3 Variant**: Outlined, Filled, Flat
- 📱 **3 Size**: Small, Medium, Large
- 🎯 **Durumlar**: Default, Error, Success, Disabled, Focused
- 🔒 **Password Toggle**: Göster/gizle özelliği
- 🔢 **Character Counter**: Karakter sayacı
- 🎭 **İkon Desteği**: Leading ve trailing ikonlar
- ♿ **Erişilebilirlik**: Tam erişilebilirlik desteği
- ⌨️ **Klavye Türleri**: Farklı klavye türleri desteği
- 📝 **Multi-line**: Çok satırlı metin girişi

## Kurulum

```tsx
import { AtomicInput } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { AtomicInput } from 'react-native-design-system';

export const BasicExample = () => {
  const [value, setValue] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <AtomicInput
        label="E-posta"
        value={value}
        onChangeText={setValue}
        placeholder="ornek@email.com"
        keyboardType="email-address"
      />
    </View>
  );
};
```

## Variant'lar

```tsx
<View style={{ gap: 16 }}>
  {/* Outlined (Varsayılan) */}
  <AtomicInput
    variant="outlined"
    label="Outlined Input"
    placeholder="Outlined variant"
  />

  {/* Filled */}
  <AtomicInput
    variant="filled"
    label="Filled Input"
    placeholder="Filled variant"
  />

  {/* Flat */}
  <AtomicInput
    variant="flat"
    label="Flat Input"
    placeholder="Flat variant"
  />
</View>
```

## Boyutlar

```tsx
<View style={{ gap: 16 }}>
  {/* Small */}
  <AtomicInput
    size="sm"
    label="Small Input"
    placeholder="Small size"
  />

  {/* Medium (Varsayılan) */}
  <AtomicInput
    size="md"
    label="Medium Input"
    placeholder="Medium size"
  />

  {/* Large */}
  <AtomicInput
    size="lg"
    label="Large Input"
    placeholder="Large size"
  />
</View>
```

## Durumlar

```tsx
<View style={{ gap: 16 }}>
  {/* Default */}
  <AtomicInput
    state="default"
    label="Default"
    placeholder="Default state"
  />

  {/* Error */}
  <AtomicInput
    state="error"
    label="Error State"
    placeholder="Error state"
    helperText="Bu alan hatalı"
  />

  {/* Success */}
  <AtomicInput
    state="success"
    label="Success State"
    placeholder="Success state"
    helperText="Başarılı"
  />

  {/* Disabled */}
  <AtomicInput
    state="disabled"
    label="Disabled"
    placeholder="Disabled state"
    value="Değer girilemez"
    disabled
  />
</View>
```

## Password Input

```tsx
<AtomicInput
  label="Şifre"
  placeholder="Şifrenizi girin"
  secureTextEntry
  showPasswordToggle
/>
```

## İkonlar

```tsx
<View style={{ gap: 16 }}>
  {/* Leading Icon */}
  <AtomicInput
    label="Kullanıcı Adı"
    placeholder="Kullanıcı adınız"
    leadingIcon="person-outline"
  />

  {/* Trailing Icon */}
  <AtomicInput
    label="Arama"
    placeholder="Arama yapın"
    trailingIcon="search-outline"
    onTrailingIconPress={() => console.log('Arama')}
  />

  {/* Both Icons */}
  <AtomicInput
    label="Email"
    placeholder="Email adresiniz"
    leadingIcon="mail-outline"
    trailingIcon="close-circle-outline"
    onTrailingIconPress={() => console.log('Temizle')}
  />
</View>
```

## Character Counter

```tsx
<AtomicInput
  label="Bio"
  placeholder="Kendinizi tanıtın"
  maxLength={150}
  showCharacterCount
  multiline
  numberOfLines={4}
/>
```

## Form Örneği

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { AtomicInput } from 'react-native-design-system';

export const FormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <AtomicInput
        label="Ad Soyad"
        value={formData.name}
        onChangeText={handleInputChange('name')}
        placeholder="Adınız ve soyadınız"
        leadingIcon="person-outline"
        state="default"
      />

      <AtomicInput
        label="E-posta"
        value={formData.email}
        onChangeText={handleInputChange('email')}
        placeholder="ornek@email.com"
        keyboardType="email-address"
        leadingIcon="mail-outline"
        autoCapitalize="none"
      />

      <AtomicInput
        label="Şifre"
        value={formData.password}
        onChangeText={handleInputChange('password')}
        placeholder="En az 8 karakter"
        secureTextEntry
        showPasswordToggle
        leadingIcon="lock-closed-outline"
        maxLength={20}
        showCharacterCount
      />

      <AtomicInput
        label="Hakkınızda"
        value={formData.bio}
        onChangeText={handleInputChange('bio')}
        placeholder="Kendinizden bahsedin"
        multiline
        numberOfLines={4}
        maxLength={200}
        showCharacterCount
      />

      <Button title="Gönder" onPress={() => console.log(formData)} />
    </View>
  );
};
```

## Props

### AtomicInputProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `variant` | `'outlined' \| 'filled' \| 'flat'` | `'outlined'` | Input görünüm stili |
| `state` | `'default' \| 'error' \| 'success' \| 'disabled'` | `'default'` | Input durumu |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input boyutu |
| `label` | `string` | - | Input etiketi |
| `value` | `string` | `''` | Input değeri |
| `onChangeText` | `(text: string) => void` | - | Değişiklik olayı |
| `placeholder` | `string` | - | Placeholder metni |
| `helperText` | `string` | - | Yardımcı metin |
| `leadingIcon` | `string` | - | Sol ikon ismi (Ionicons) |
| `trailingIcon` | `string` | - | Sağ ikon ismi (Ionicons) |
| `onTrailingIconPress` | `() => void` | - | Sağ ikon tıklama olayı |
| `showPasswordToggle` | `boolean` | `false` | Şifre göster/gizle butonu |
| `secureTextEntry` | `boolean` | `false` | Şifre girişi |
| `maxLength` | `number` | - | Maksimum karakter sayısı |
| `showCharacterCount` | `boolean` | `false` | Karakter sayacı göster |
| `keyboardType` | `KeyboardType` | `'default'` | Klavye türü |
| `returnKeyType` | `ReturnKeyType` | - | Return tuşu türü |
| `onSubmitEditing` | `() => void` | - | Submit olayı |
| `blurOnSubmit` | `boolean` | - | Submit'te blur |
| `autoFocus` | `boolean` | - | Otomatik odak |
| `autoCapitalize` | `AutoCapitalize` | `'sentences'` | Otomatik büyük harf |
| `autoCorrect` | `boolean` | `true` | Otomatik düzeltme |
| `disabled` | `boolean` | `false` | Devre dışı |
| `multiline` | `boolean` | `false` | Çok satırlı |
| `numberOfLines` | `number` | - | Satır sayısı |
| `style` | `StyleProp<ViewStyle>` | - | Container stil |
| `inputStyle` | `StyleProp<TextStyle>` | - | Input stil |
| `testID` | `string` | - | Test ID'si |
| `onBlur` | `() => void` | - | Blur olayı |
| `onFocus` | `() => void` | - | Focus olayı |

## Stil Özelleştirme

```tsx
<AtomicInput
  label="Özel Stilli Input"
  placeholder="Özel stil"
  style={{
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  }}
  inputStyle={{
    fontSize: 16,
    fontWeight: '600',
  }}
/>
```

## Erişilebilirlik

AtomicInput, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Focus management
- ✅ Error state anonsu
- ✅ Label ilişkilendirmesi
- ✅ Test ID desteği

## Önemli Notlar

1. **Ionicons Kullanımı**: İkon isimleri Ionicons kütüphanesinden gelir
2. **State Management**: `value` ve `onChangeText` kullanarak controlled component olarak kullanın
3. **Form Validasyonu**: `FormField` molecule bileşeni ile birlikte kullanılması önerilir
4. **Performance**: Uzun listelerde `key` prop'unu kullanmayı unutmayın

## İlgili Bileşenler

- [`FormField`](../../molecules/FormField/README.md) - Form input bileşeni
- [`AtomicTextArea`](../AtomicTextArea/README.md) - Çok satırlı metin girişi
- [`AtomicButton`](../button/README.md) - Form butonu

## Lisans

MIT

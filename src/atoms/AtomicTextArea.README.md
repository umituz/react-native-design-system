# AtomicTextArea

AtomicTextArea, çok satırlı metin girişi için optimize edilmiş bir bileşendir. AtomicInput ile tutarlıdır ancak uzun metinler için özel olarak tasarlanmıştır.

## Özellikler

- 📝 **Multiline**: Çok satırlı metin girişi
- 🏷️ **Label Desteği**: Etiket gösterimi
- ❌ **Error State**: Hata durumu
- ℹ️ **Helper Text**: Yardımcı metin
- 🔢 **Character Counter**: Karakter sayacı
- ⚙️ **Özelleştirilebilir**: Satır sayısı, min yükseklik
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { AtomicTextArea } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { AtomicTextArea } from 'react-native-design-system';

export const BasicExample = () => {
  const [value, setValue] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <AtomicTextArea
        label="Açıklama"
        value={value}
        onChangeText={setValue}
        placeholder="Açıklamanızı girin..."
        rows={4}
      />
    </View>
  );
};
```

## Basic TextArea

```tsx
<AtomicTextArea
  value={value}
  onChangeText={setValue}
  placeholder="Metninizi buraya yazın..."
/>
```

## Label ile

```tsx
<AtomicTextArea
  label="Hakkımda"
  value={value}
  onChangeText={setValue}
  placeholder="Kendinizden bahsedin"
/>
```

## Satır Sayısı

```tsx
<View style={{ gap: 16 }}>
  {/* 2 satır */}
  <AtomicTextArea
    rows={2}
    placeholder="Kısa metin"
  />

  {/* 4 satır (varsayılan) */}
  <AtomicTextArea
    rows={4}
    placeholder="Normal metin"
  />

  {/* 8 satır */}
  <AtomicTextArea
    rows={8}
    placeholder="Uzun metin"
  />
</View>
```

## Character Limit

```tsx
<AtomicTextArea
  value={value}
  onChangeText={setValue}
  maxLength={200}
  placeholder="En az 200 karakter"
/>
```

## Error State

```tsx
<AtomicTextArea
  label="Açıklama"
  value={value}
  onChangeText={setValue}
  errorText="Bu alan zorunludur"
/>
```

## Helper Text

```tsx
<AtomicTextArea
  label="Ürün Açıklaması"
  value={value}
  onChangeText={setValue}
  helperText="Ürününüzü detaylı açıklayın"
  placeholder="Ürün özellikleri, kullanım alanları vb."
/>
```

## Disabled

```tsx
<AtomicTextArea
  label="Notlar"
  value="Bu alan düzenlenemez"
  disabled
/>
```

## Min Height

```tsx
<AtomicTextArea
  value={value}
  onChangeText={setValue}
  minHeight={120}
  placeholder="Min 120px yükseklik"
/>
```

## Örnek Kullanımlar

### Form Alanı

```tsx
export const ProductForm = () => {
  const [description, setDescription] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <AtomicTextArea
        label="Ürün Açıklaması"
        value={description}
        onChangeText={setDescription}
        placeholder="Ürününüzü detaylı açıklayın..."
        rows={6}
        maxLength={500}
        helperText="En az 50 karakter"
      />
    </View>
  );
};
```

### Yorum Formu

```tsx
export const CommentForm = () => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (comment.length < 10) {
      setError('Yorum en az 10 karakter olmalıdır');
      return;
    }
    // Submit logic
  };

  return (
    <View style={{ padding: 16 }}>
      <AtomicTextArea
        label="Yorumunuz"
        value={comment}
        onChangeText={setComment}
        placeholder=" düşüncelerinizi paylaşın..."
        rows={5}
        maxLength={500}
        errorText={error}
      />

      <Button title="Gönder" onPress={handleSubmit} />
    </View>
  );
};
```

### Not Alma

```tsx
export const NotesForm = () => {
  const [notes, setNotes] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <AtomicTextArea
        label="Notlar"
        value={notes}
        onChangeText={setNotes}
        placeholder="Notlarınızı buraya yazın..."
        rows={10}
        helperText="Kişisel notlarınız"
      />
    </View>
  );
};
```

### Bio Formu

```tsx
export const BioForm = () => {
  const [bio, setBio] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <AtomicTextArea
        label="Hakkımda"
        value={bio}
        onChangeText={setBio}
        placeholder="Kendinizden bahsedin..."
        rows={4}
        maxLength={150}
        helperText="Maksimum 150 karakter"
      />

      {bio.length > 0 && (
        <AtomicText type="bodySmall" color="textSecondary">
          {bio.length}/150 karakter
        </AtomicText>
      )}
    </View>
  );
};
```

### Geri Bildirim

```tsx
export const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <AtomicTextArea
        label="Geri Bildirim"
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Deneyiminiz hakkında bilgi verin..."
        rows={6}
        maxLength={1000}
        helperText="Geribildiriminiz bizim için değerli"
      />
    </View>
  );
};
```

## Props

### AtomicTextAreaProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `label` | `string` | - | Etiket metni |
| `value` | `string` | - | Textarea değeri |
| `onChangeText` | `(text: string) => void` | - | Değişiklik olayı |
| `placeholder` | `string` | - | Placeholder metni |
| `helperText` | `string` | - | Yardımcı metin |
| `errorText` | `string` | - | Hata mesajı |
| `maxLength` | `number` | - | Maksimum karakter |
| `numberOfLines` | `number` | - | Satır sayısı (alternatif) |
| `rows` | `number` | `4` | Satır sayısı |
| `minHeight` | `number` | - | Minimum yükseklik |
| `disabled` | `boolean` | `false` | Devre dışı |
| `autoFocus` | `boolean` | - | Otomatik odak |
| `returnKeyType` | `ReturnKeyType` | - | Return tuşu |
| `onSubmitEditing` | `() => void` | - | Submit olayı |
| `blurOnSubmit` | `boolean` | - | Submit'te blur |
| `style` | `StyleProp<ViewStyle>` | - | Container stil |
| `inputStyle` | `StyleProp<TextStyle>` | - | Input stil |
| `testID` | `string` | - | Test ID'si |

## Best Practices

### 1. Satır Sayısı

```tsx
// Kısa metinler için
<AtomicTextArea rows={2} />

// Normal kullanım
<AtomicTextArea rows={4} />

// Uzun metinler için
<AtomicTextArea rows={8} />
```

### 2. Character Limit

```tsx
// Kısa limit
<AtomicTextArea maxLength={100} />

// Orta limit
<AtomicTextArea maxLength={500} />

// Uzun limit
<AtomicTextArea maxLength={1000} />
```

### 3. Helper Text

```tsx
// Kullanıcıya rehberlik edin
<AtomicTextArea
  helperText="En az 50 karakter"
/>
```

## Erişilebilirlik

AtomicTextArea, tam erişilebilirlik desteği sunar:

- ✅ Label ilişkilendirmesi
- ✅ Error state anonsu
- ✅ Character counter
- ✅ Screen reader desteği

## İlgili Bileşenler

- [`AtomicInput`](./input/README.md) - Tek satırlı input
- [`FormField`](../../molecules/FormField/README.md) - Form alanı
- [`AtomicText`](./AtomicText/README.md) - Metin bileşeni

## Lisans

MIT

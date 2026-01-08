# FormField

FormField, form alanları için tam özellikli bir molekül bileşenidir. `AtomicInput` ile birlikte etiket, hata mesajı ve yardımcı metin sunar.

## Özellikler

- 🏷️ **Label Entegrasyonu**: Otomatik etiket oluşturma
- ❌ **Error Handling**: Hata mesajı gösterimi
- ℹ️ **Helper Text**: Yardımcı metin desteği
- ⭐ **Required Indicator**: Zorunlu alan işareti
- 🎨 **Tam Özelleştirilebilir**: Stil ve tema desteği
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { FormField } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { FormField } from 'react-native-design-system';

export const BasicExample = () => {
  const [email, setEmail] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <FormField
        label="E-posta"
        value={email}
        onChangeText={setEmail}
        placeholder="ornek@email.com"
        keyboardType="email-address"
      />
    </View>
  );
};
```

## Zorunlu Alan

```tsx
<FormField
  label="Ad Soyad"
  required
  value={name}
  onChangeText={setName}
  placeholder="Adınız ve soyadınız"
/>
```

## Hata Durumu

```tsx
<FormField
  label="E-posta"
  value={email}
  onChangeText={setEmail}
  placeholder="ornek@email.com"
  error="Geçerli bir e-posta adresi girin"
  state="error"
/>
```

## Helper Text

```tsx
<FormField
  label="Şifre"
  value={password}
  onChangeText={setPassword}
  placeholder="Şifreniz"
  secureTextEntry
  helperText="En az 8 karakter olmalıdır"
/>
```

## İkonlu Form Field

```tsx
<FormField
  label="Kullanıcı Adı"
  value={username}
  onChangeText={setUsername}
  placeholder="Kullanıcı adınız"
  leadingIcon="person-outline"
/>
```

## Password Field

```tsx
<FormField
  label="Şifre"
  value={password}
  onChangeText={setPassword}
  placeholder="Şifreniz"
  secureTextEntry
  showPasswordToggle
  helperText="En az 8 karakter, 1 büyük harf ve 1 rakam"
  required
/>
```

## Custom Required Indicator

```tsx
<FormField
  label="Telefon"
  value={phone}
  onChangeText={setPhone}
  placeholder="+90 555 123 4567"
  required
  requiredIndicator=" *"
  keyboardType="phone-pad"
/>
```

## Örnek Kullanımlar

### Kayıt Formu

```tsx
import React, { useState } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { FormField } from 'react-native-design-system';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Ad soyad zorunludur';
    }

    if (!formData.email) {
      newErrors.email = 'E-posta zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre zorunludur';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Şifre en az 8 karakter olmalıdır';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <FormField
        label="Ad Soyad"
        value={formData.name}
        onChangeText={handleInputChange('name')}
        placeholder="Adınız ve soyadınız"
        error={errors.name}
        required
      />

      <FormField
        label="E-posta"
        value={formData.email}
        onChangeText={handleInputChange('email')}
        placeholder="ornek@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        helperText="Size ulaşmak için kullanacağız"
        required
      />

      <FormField
        label="Şifre"
        value={formData.password}
        onChangeText={handleInputChange('password')}
        placeholder="En az 8 karakter"
        secureTextEntry
        showPasswordToggle
        error={errors.password}
        helperText="En az 8 karakter, 1 büyük harf ve 1 rakam"
        required
      />

      <FormField
        label="Şifre Tekrar"
        value={formData.confirmPassword}
        onChangeText={handleInputChange('confirmPassword')}
        placeholder="Şifrenizi tekrar girin"
        secureTextEntry
        showPasswordToggle
        error={errors.confirmPassword}
        required
      />

      <Button title="Kayıt Ol" onPress={handleSubmit} />
    </ScrollView>
  );
};
```

### Giriş Formu

```tsx
export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }
    // Login logic
  };

  return (
    <View style={{ padding: 16 }}>
      <FormField
        label="E-posta"
        value={email}
        onChangeText={setEmail}
        placeholder="ornek@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormField
        label="Şifre"
        value={password}
        onChangeText={setPassword}
        placeholder="Şifreniz"
        secureTextEntry
        showPasswordToggle
      />

      {error ? (
        <AtomicText color="error" style={{ marginBottom: 16 }}>
          {error}
        </AtomicText>
      ) : null}

      <Button title="Giriş Yap" onPress={handleLogin} />
    </View>
  );
};
```

### Profil Formu

```tsx
export const ProfileForm = () => {
  const [profile, setProfile] = useState({
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    bio: '',
  });

  return (
    <ScrollView style={{ padding: 16 }}>
      <FormField
        label="Ad"
        value={profile.firstName}
        onChangeText={(text) => setProfile({ ...profile, firstName: text })}
        placeholder="Adınız"
        required
      />

      <FormField
        label="Soyad"
        value={profile.lastName}
        onChangeText={(text) => setProfile({ ...profile, lastName: text })}
        placeholder="Soyadınız"
        required
      />

      <FormField
        label="E-posta"
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
        placeholder="ornek@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        leadingIcon="mail-outline"
        required
      />

      <FormField
        label="Telefon"
        value={profile.phone}
        onChangeText={(text) => setProfile({ ...profile, phone: text })}
        placeholder="+90 555 123 4567"
        keyboardType="phone-pad"
        leadingIcon="call-outline"
      />

      <FormField
        label="Hakkımda"
        value={profile.bio}
        onChangeText={(text) => setProfile({ ...profile, bio: text })}
        placeholder="Kendinizden bahsedin"
        multiline
        numberOfLines={4}
        maxLength={200}
        showCharacterCount
      />
    </ScrollView>
  );
};
```

## Props

### FormFieldProps

`FormField`, `AtomicInputProps`'ın tüm props'larını alır ve aşağıdakileri ekler:

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `label` | `string` | - | Alan etiketi |
| `error` | `string` | - | Hata mesajı |
| `helperText` | `string` | - | Yardımcı metin |
| `required` | `boolean` | `false` | Zorunlu alan |
| `requiredIndicator` | `string` | `' *'` | Zorunlu alan işareti |
| `containerStyle` | `ViewStyle` | - | Container stili |
| `style` | `ViewStyle` | - | Container stili (alias) |

## Stil Özelleştirme

```tsx
<FormField
  label="Özel Alan"
  value={value}
  onChangeText={setValue}
  containerStyle={{
    marginBottom: 24,
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
  }}
/>
```

## Best Practices

### 1. Error Handling

```tsx
// Hataları state'de tutun
const [errors, setErrors] = useState({});

// Form submit'da validate edin
const validate = () => {
  const newErrors = {};
  if (!email) newErrors.email = 'Bu alan zorunludur';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Form field'da gösterin
<FormField
  error={errors.email}
  // ...
/>
```

### 2. Helper Text Kullanımı

```tsx
// Kullanıcıya rehberlik edin
<FormField
  label="Şifre"
  helperText="En az 8 karakter, 1 büyük harf ve 1 rakam içermelidir"
  // ...
/>
```

### 3. Required Fields

```tsx
// Zorunlu alanları işaretleyin
<FormField
  label="E-posta"
  required
  // ...
/>
```

## Erişilebilirlik

FormField, tam erişilebilirlik desteği sunar:

- ✅ Label ilişkilendirmesi
- ✅ Error state anonsu
- ✅ Required field göstergesi
- ✅ Screen reader desteği

## Form Validasyon Örneği

```tsx
const useFormValidation = (schema) => {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    Object.keys(schema).forEach((key) => {
      const rules = schema[key];
      const value = data[key];

      if (rules.required && !value) {
        newErrors[key] = `${rules.label} zorunludur`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[key] = rules.message || 'Geçersiz değer';
      } else if (rules.minLength && value.length < rules.minLength) {
        newErrors[key] = `${rules.label} en az ${rules.minLength} karakter olmalıdır`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

// Kullanım
const { errors, validate } = useFormValidation({
  email: {
    required: true,
    label: 'E-posta',
    pattern: /\S+@\S+\.\S+/,
    message: 'Geçerli bir e-posta adresi girin',
  },
  password: {
    required: true,
    label: 'Şifre',
    minLength: 8,
  },
});
```

## İlgili Bileşenler

- [`AtomicInput`](../atoms/input/README.md) - Input bileşeni
- [`AtomicButton`](../atoms/button/README.md) - Form butonu
- [`BaseModal`](./BaseModal/README.md) - Modal form

## Lisans

MIT

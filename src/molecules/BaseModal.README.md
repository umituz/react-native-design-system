# BaseModal

BaseModal, React Native için genel amaçlı bir modal bileşenidir. Responsive tasarım ile çalışır ve tüm modal türleri için tutarlı bir taban sağlar.

## Özellikler

- 📱 **Responsive**: Cihaz boyutuna göre uyum
- 🎨 **Tema Bilinci**: Tam tema entegrasyonu
- ⬛ **Backdrop**: Opak arka plan
- ❌ **Dismiss**: Backdrop tıklama ile kapatma
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği
- 🔄 **Fade Animation**: Yumuşak animasyon

## Kurulum

```tsx
import { BaseModal } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { BaseModal } from 'react-native-design-system';

export const BasicExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ padding: 16 }}>
      <Button title="Modalı Aç" onPress={() => setVisible(true)} />

      <BaseModal
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <View style={{ padding: 24 }}>
          <Text>Modal İçeriği</Text>
        </View>
      </BaseModal>
    </View>
  );
};
```

## Basic Modal

```tsx
const [visible, setVisible] = useState(false);

<BaseModal
  visible={visible}
  onClose={() => setVisible(false)}
>
  <View style={{ padding: 24 }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
      Başlık
    </Text>
    <Text style={{ marginTop: 16 }}>
      Modal içeriği buraya gelecek.
    </Text>
  </View>
</BaseModal>
```

## Disable Backdrop Dismiss

```tsx
<BaseModal
  visible={visible}
  onClose={() => setVisible(false)}
  dismissOnBackdrop={false}
>
  {/* Kullanıcı kapama butonuna basmalı */}
</BaseModal>
```

## Custom Content Style

```tsx
<BaseModal
  visible={visible}
  onClose={() => setVisible(false)}
  contentStyle={{
    backgroundColor: '#f5f5f5',
    padding: 32,
  }}
>
  <Text>Özel Stil</Text>
</BaseModal>
```

## Örnek Kullanımlar

### Onay Modalı

```tsx
export const ConfirmationModal = ({ visible, onClose, onConfirm }) => {
  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={{ padding: 24, alignItems: 'center' }}>
        <AtomicIcon
          name="warning"
          size="xl"
          color="warning"
          style={{ marginBottom: 16 }}
        />

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          Emin misiniz?
        </Text>

        <Text style={{ textAlign: 'center', color: 'gray', marginBottom: 24 }}>
          Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?
        </Text>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button title="İptal" onPress={onClose} />
          <Button title="Evet, Eminim" onPress={onConfirm} />
        </View>
      </View>
    </BaseModal>
  );
};
```

### Form Modalı

```tsx
export const FormModal = ({ visible, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = () => {
    console.log(formData);
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>
          Yeni Kullanıcı
        </Text>

        <FormField
          label="Ad Soyad"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Adınız ve soyadınız"
          style={{ marginBottom: 16 }}
        />

        <FormField
          label="E-posta"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="ornek@email.com"
          keyboardType="email-address"
          style={{ marginBottom: 24 }}
        />

        <Button title="Kaydet" onPress={handleSubmit} />
      </View>
    </BaseModal>
  );
};
```

### Bilgi Modalı

```tsx
export const InfoModal = ({ visible, onClose, title, message }) => {
  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={{ padding: 24, alignItems: 'center' }}>
        <AtomicIcon
          name="information-circle"
          size="xl"
          color="info"
          style={{ marginBottom: 16 }}
        />

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          {title}
        </Text>

        <Text style={{ textAlign: 'center', color: 'gray', marginBottom: 24 }}>
          {message}
        </Text>

        <Button title="Tamam" onPress={onClose} />
      </View>
    </BaseModal>
  );
};
```

### Başarı Modalı

```tsx
export const SuccessModal = ({ visible, onClose, message }) => {
  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={{ padding: 24, alignItems: 'center' }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#d4edda',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <AtomicIcon name="checkmark" size="xl" color="success" />
        </View>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          Başarılı!
        </Text>

        <Text style={{ textAlign: 'center', color: 'gray', marginBottom: 24 }}>
          {message}
        </Text>

        <Button title="Tamam" onPress={onClose} />
      </View>
    </BaseModal>
  );
};
```

### Hata Modalı

```tsx
export const ErrorModal = ({ visible, onClose, error }) => {
  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={{ padding: 24, alignItems: 'center' }}>
        <AtomicIcon
          name="close-circle"
          size="xl"
          color="error"
          style={{ marginBottom: 16 }}
        />

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          Hata Oluştu
        </Text>

        <Text style={{ textAlign: 'center', color: 'gray', marginBottom: 24 }}>
          {error}
        </Text>

        <Button title="Tamam" onPress={onClose} />
      </View>
    </BaseModal>
  );
};
```

### Resim Önizleme Modalı

```tsx
export const ImagePreviewModal = ({ visible, onClose, imageUri }) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      contentStyle={{
        backgroundColor: 'transparent',
        borderWidth: 0,
      }}
    >
      <Pressable onPress={onClose} style={{ flex: 1 }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </Pressable>
    </BaseModal>
  );
};
```

### Detay Modalı

```tsx
export const DetailModal = ({ visible, onClose, item }) => {
  if (!item) return null;

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {item.title}
          </Text>
          <Pressable onPress={onClose}>
            <AtomicIcon name="close" size="md" />
          </Pressable>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={{ color: 'gray', marginBottom: 8 }}>
            Açıklama
          </Text>
          <Text>{item.description}</Text>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={{ color: 'gray', marginBottom: 8 }}>
            Detaylar
          </Text>
          {item.details.map((detail, index) => (
            <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Text style={{ fontWeight: '600', width: 120 }}>
                {detail.label}:
              </Text>
              <Text style={{ flex: 1 }}>{detail.value}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 24 }}>
          <Button title="Kapat" onPress={onClose} />
        </View>
      </View>
    </BaseModal>
  );
};
```

## Props

### BaseModalProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `visible` | `boolean` | - **(Zorunlu)** | Modal görünürlüğü |
| `onClose` | `() => void` | - **(Zorunlu)** | Kapatma callback'i |
| `children` | `ReactNode` | - **(Zorunlu)** | Modal içeriği |
| `dismissOnBackdrop` | `boolean` | `true` | Backdrop tıklama ile kapatma |
| `contentStyle` | `ViewStyle` | - | İçerik stili |
| `testID` | `string` | `'base-modal'` | Test ID'si |

## Best Practices

### 1. Kapatma Kontrolü

```tsx
// Önemli işlemler için backdrop dismiss'i kapatın
<BaseModal
  visible={visible}
  onClose={onClose}
  dismissOnBackdrop={false}
>
  <Text>İşlemi tamamlamalısınız</Text>
  <Button title="Tamam" onPress={onComplete} />
</BaseModal>
```

### 2. State Yönetimi

```tsx
// Modal state'ini parent'ta tutun
const [modalState, setModalState] = useState({
  visible: false,
  data: null,
});

const openModal = (data) => {
  setModalState({ visible: true, data });
};

const closeModal = () => {
  setModalState({ visible: false, data: null });
};
```

### 3. İçerik Scroll

```tsx
// Uzun içerik için ScrollView kullanın
<BaseModal visible={visible} onClose={onClose}>
  <ScrollView style={{ padding: 24 }}>
    {/* Uzun içerik */}
  </ScrollView>
</BaseModal>
```

### 4. Klavye Desteği

```tsx
// Input'larda klavye sorunlarını önleyin
<BaseModal visible={visible} onClose={onClose}>
  <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
    <View style={{ padding: 24 }}>
      <FormField label="Ad" />
      <FormField label="E-posta" />
    </View>
  </KeyboardAvoidingView>
</BaseModal>
```

## Erişilebilirlik

BaseModal, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Focus trap
- ✅ Escape key desteği (web)
- ✅ Test ID desteği

## Performans İpuçları

1. **Conditional Rendering**: Modal görünür değilse render etmeyin
2. **Memoization**: İçerik component'lerini memo edin
3. **Lazy Loading**: Ağır içerikleri lazy load edin

## İlgili Bileşenler

- [`ConfirmationModal`](./confirmation-modal/README.md) - Onay modalı
- [`BottomSheet`](./bottom-sheet/README.md) - Alt sheet modal
- [`FormField`](./FormField/README.md) - Form alanı

## Lisans

MIT

# ConfirmationModal

ConfirmationModal, kritik işlemlerden önce kullanıcı onayı almak için kullanılan modal bileşenidir. Silme, kaydetme veya önemli değişiklikler için idealdir.

## Özellikler

- ✅ **Onay Dialog'u**: Kritik işlemler için onay
- 🎨 **Variant'lar**: Default, Danger, Warning, Info
- 🎭 **İkon Desteği**: Görsel ikon gösterimi
- ⬛ **Backdrop**: Opsiyonel backdrop
- 🎯 **Customizable**: Buton metinleri ve stil
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { ConfirmationModal } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { ConfirmationModal } from 'react-native-design-system';

export const BasicExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Modalı Aç" onPress={() => setVisible(true)} />

      <ConfirmationModal
        visible={visible}
        title="Emin misiniz?"
        message="Bu işlem geri alınamaz"
        confirmText="Onayla"
        cancelText="İptal"
        onConfirm={() => {
          console.log('Onaylandı');
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
};
```

## Variant'lar

```tsx
{/* Default (Info) */}
<ConfirmationModal
  visible={visible}
  variant="default"
  title="Bilgilendirme"
  message="Devam etmek istiyor musunuz?"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>

{/* Danger */}
<ConfirmationModal
  visible={visible}
  variant="danger"
  title="Öğeyi Sil"
  message="Bu öğeyi silmek istediğinizden emin misiniz?"
  confirmText="Sil"
  cancelText="İptal"
  onConfirm={handleDelete}
  onCancel={handleCancel}
/>

{/* Warning */}
<ConfirmationModal
  visible={visible}
  variant="warning"
  title="Uyarı"
  message="Bu işlem veri kaybına neden olabilir"
  confirmText="Devam Et"
  cancelText="Geri Dön"
  onConfirm={handleProceed}
  onCancel={handleCancel}
/>
```

## İkonlu

```tsx
<ConfirmationModal
  visible={visible}
  variant="danger"
  icon="warning"
  title="Dikkat"
  message="Bu işlem geri alınamaz"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

## Backdrop Gizle

```tsx
<ConfirmationModal
  visible={visible}
  showBackdrop={false}
  title="Modal"
  message="Backdrop yok"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

## Backdrop Dismissible Değil

```tsx
<ConfirmationModal
  visible={visible}
  backdropDismissible={false}
  title="Onay Gerekli"
  message="Lütfen onaylayın"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

## Örnek Kullanımlar

### Silme Onayı

```tsx
export const DeleteConfirmation = ({ item, onDelete }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button title="Sil" onPress={() => setVisible(true)} />

      <ConfirmationModal
        visible={visible}
        variant="danger"
        icon="trash-outline"
        title="Öğeyi Sil"
        message={`${item.title} öğesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        confirmText="Sil"
        cancelText="İptal"
        onConfirm={() => {
          onDelete(item.id);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};
```

### Çıkış Onayı

```tsx
export const LogoutConfirmation = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button title="Çıkış Yap" onPress={() => setVisible(true)} />

      <ConfirmationModal
        visible={visible}
        variant="warning"
        icon="log-out-outline"
        title="Çıkış Yap"
        message="Oturumunuzu sonlandırmak istediğinizden emin misiniz?"
        confirmText="Çıkış"
        cancelText="İptal"
        onConfirm={() => {
          logout();
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};
```

### Değişiklik Kaydetme

```tsx
export const UnsavedChangesModal = ({ onSave, onDiscard }) => {
  const [visible, setVisible] = useState(false);

  return (
    <ConfirmationModal
      visible={visible}
      variant="warning"
      icon="save-outline"
      title="Kaydedilmemiş Değişiklikler"
      message="Yaptığınız değişiklikleri kaydetmediniz. Ne yapmak istersiniz?"
      confirmText="Kaydet"
      cancelText="İptal"
      onConfirm={() => {
        onSave();
        setVisible(false);
      }}
      onCancel={() => {
        onDiscard();
        setVisible(false);
      }}
    />
  );
};
```

### Formu Terk Etme

```tsx
export const LeaveFormModal = () => {
  return (
    <ConfirmationModal
      visible={visible}
      icon="warning"
      title="Formu Terk Et"
      message="Girdiğiniz bilgiler kaybolacak. Emin misiniz?"
      confirmText="Terk Et"
      cancelText="Formda Kal"
      onConfirm={() => navigation.goBack()}
      onCancel={() => setVisible(false)}
    />
  );
};
```

### İptal Edilebilir İşlem

```tsx
export const CancelOperationModal = ({ operation }) => {
  return (
    <ConfirmationModal
      visible={visible}
      variant="warning"
      icon="close-circle-outline"
      title="İşlem İptal Edilsin"
      message="Bu işlemi iptal etmek istediğinizden emin misiniz?"
      confirmText="İptal Et"
      cancelText="Devam Et"
      onConfirm={() => {
        cancelOperation();
        setVisible(false);
      }}
      onCancel={() => setVisible(false)}
    />
  );
};
```

### Abonelik İptali

```tsx
export const CancelSubscriptionModal = () => {
  return (
    <ConfirmationModal
      visible={visible}
      variant="danger"
      icon="alert-circle-outline"
      title="Aboneliği İptal Et"
      message="Aboneliğinizi iptal ederseniz tüm özelliklere erişimi kaybedeceksiniz. Devam etmek istiyor musunuz?"
      confirmText="İptal Et"
      cancelText="Geri Dön"
      onConfirm={handleCancelSubscription}
      onCancel={() => setVisible(false)}
    />
  );
};
```

### Kullanıcı Silme

```tsx
export const DeleteAccountModal = () => {
  return (
    <ConfirmationModal
      visible={visible}
      variant="danger"
      icon="person-remove-outline"
      title="Hesabı Sil"
      message="Hesabınızı silmek istediğinizden emin misiniz? Tüm verileriniz kalıcı olarak silinecek ve bu işlem geri alınamaz."
      confirmText="Hesabı Sil"
      cancelText="Vazgeç"
      onConfirm={handleDeleteAccount}
      onCancel={() => setVisible(false)}
    />
  );
};
```

## Props

### ConfirmationModalProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `visible` | `boolean` | - **(Zorunlu)** | Modal görünürlüğü |
| `title` | `string` | - | Modal başlığı |
| `message` | `string` | - | Modal mesajı |
| `variant` | `'default' \| 'danger' \| 'warning' \| 'info'` | `'default'` | Modal variant'ı |
| `confirmText` | `string` | `'Confirm'` | Onay butonu metni |
| `cancelText` | `string` | `'Cancel'` | İptal butonu metni |
| `icon` | `string` | - | İkon ismi |
| `onConfirm` | `() => void` | - | Onay callback'i |
| `onCancel` | `() => void` | - | İptal callback'i |
| `showBackdrop` | `boolean` | `true` | Backdrop göster |
| `backdropDismissible` | `boolean` | `true` | Backdrop tıklama ile kapat |
| `style` | `ViewStyle` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

## Best Practices

### 1. Variant Seçimi

```tsx
// Kritik/Silme işlemleri
variant="danger"

// Uyarılar
variant="warning"

// Bilgilendirme
variant="default" veya "info"
```

### 2. Açık Mesaj

```tsx
// İyi
message="Bu öğeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."

// Kötü
message="Emin misiniz?"
```

### 3. Buton Metinleri

```tsx
// Açık ve eylem odaklı
confirmText="Öğeyi Sil"
cancelText="İptal"
```

## Erişilebilirlik

ConfirmationModal, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Focus trap
- ✅ Keyboard navigation
- ✅ Semantic role
- ✅ Escape key desteği

## İlgili Bileşenler

- [`BaseModal`](../BaseModal/README.md) - Base modal
- [`AlertModal`](./alerts/README.md) - Alert modal
- [`AtomicButton`](../../atoms/button/README.md) - Buton bileşeni

## Lisans

MIT

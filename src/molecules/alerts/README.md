# Alert System

React Native Design System, farklı durumlarda kullanılmak üzere kapsamlı bir alert sistemi sunar. Her alert türü farklı kullanım senaryoları için optimize edilmiştir.

## Alert Türleri

- **AlertBanner** - Sayfanın üstünde kalıcı uyarı
- **AlertToast** - Geçici bildirim mesajları
- **AlertInline** - Form içinde satır içi uyarı
- **AlertModal** - Modal onay dialog'u
- **AlertContainer** - Alert yönetim container'ı

## Kurulum

```tsx
import {
  AlertBanner,
  AlertToast,
  AlertInline,
  AlertModal,
  AlertContainer
} from 'react-native-design-system';
```

## AlertBanner

Sayfa üstünde kalıcı uyarı göstermek için kullanılır.

### Temel Kullanım

```tsx
<AlertBanner
  variant="info"
  title="Bilgilendirme"
  message="Bu özellik yakında kullanıma sunulacak"
/>
```

### Variant'lar

```tsx
<View style={{ gap: 8 }}>
  <AlertBanner variant="info" title="Bilgi" message="Bilgilendirme mesajı" />
  <AlertBanner variant="success" title="Başarılı" message="İşlem başarılı" />
  <AlertBanner variant="warning" title="Uyarı" message="Dikkat edilmesi gereken durum" />
  <AlertBanner variant="error" title="Hata" message="Bir hata oluştu" />
</View>
```

### Kapatılabilir

```tsx
<AlertBanner
  variant="info"
  title="Güncelleme Mevcut"
  message="Yeni bir sürüm mevcut"
  dismissible
  onDismiss={() => console.log('Kapatıldı')}
/>
```

### Action Button

```tsx
<AlertBanner
  variant="warning"
  title="Oturum Sona Erecek"
  message="Oturumunuz 5 dakika içinde sona erecek"
  actionLabel="Uzat"
  onAction={() => console.log('Uzatıldı')}
/>
```

## AlertToast

Geçici bildirimler için kullanılır. Otomatik olarak kapanır.

### Temel Kullanım

```tsx
import { useAlert } from 'react-native-design-system';

export const MyComponent = () => {
  const { showToast } = useAlert();

  const handleSuccess = () => {
    showToast({
      variant: 'success',
      title: 'Başarılı',
      message: 'İşlem tamamlandı',
    });
  };

  return (
    <Button title="Gönder" onPress={handleSuccess} />
  );
};
```

### Variant'lar

```tsx
// Success
showToast({
  variant: 'success',
  title: 'Kaydedildi',
  message: 'Değişiklikleriniz kaydedildi',
});

// Error
showToast({
  variant: 'error',
  title: 'Hata',
  message: 'İşlem başarısız',
});

// Info
showToast({
  variant: 'info',
  title: 'Bilgi',
  message: 'Yeni özellik eklendi',
});

// Warning
showToast({
  variant: 'warning',
  title: 'Uyarı',
  message: 'Lütfen kontrol edin',
});
```

### Custom Süre

```tsx
showToast({
  variant: 'info',
  title: 'Mesaj',
  message: '5 saniye gösterilecek',
  duration: 5000,
});
```

## AlertInline

Form içinde satır içi uyarı için kullanılır.

### Temel Kullanım

```tsx
<AlertInline
  variant="error"
  message="Bu alan zorunludur"
/>
```

### Form ile

```tsx
<View>
  <FormField
    label="E-posta"
    value={email}
    onChangeText={setEmail}
    error={emailError}
  />

  {emailError && (
    <AlertInline
      variant="error"
      message="Geçerli bir e-posta adresi girin"
    />
  )}
</View>
```

## AlertModal

Kritik onay dialog'ları için kullanılır.

### Temel Kullanım

```tsx
import { useAlert } from 'react-native-design-system';

export const DeleteConfirmation = () => {
  const { showAlert } = useAlert();

  const handleDelete = () => {
    showAlert({
      variant: 'error',
      title: 'Öğeyi Sil',
      message: 'Bu öğeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
      confirmLabel: 'Sil',
      cancelLabel: 'İptal',
      onConfirm: () => {
        // Silme işlemi
      },
    });
  };

  return (
    <Button title="Sil" onPress={handleDelete} />
  );
};
```

### Variant'lar

```tsx
// Error
showAlert({
  variant: 'error',
  title: 'Emin misiniz?',
  message: 'Bu işlem geri alınamaz',
  onConfirm: handleConfirm,
});

// Warning
showAlert({
  variant: 'warning',
  title: 'Uyarı',
  message: 'Devam etmek istiyor musunuz?',
  onConfirm: handleConfirm,
});

// Info
showAlert({
  variant: 'info',
  title: 'Bilgi',
  message='Detaylı bilgi',
  onConfirm: handleConfirm,
});
```

## AlertContainer

Alert sistemini yönetmek için kullanılır.

### Provider

```tsx
import { AlertContainer } from 'react-native-design-system';

export const App = () => {
  return (
    <AlertContainer>
      <MyApp />
    </AlertContainer>
  );
};
```

### Hook Kullanımı

```tsx
import { useAlert } from 'react-native-design-system';

export const MyComponent = () => {
  const { showToast, showAlert, showBanner } = useAlert();

  // Toast göster
  const handleSuccess = () => {
    showToast({
      variant: 'success',
      title: 'Başarılı',
      message: 'İşlem tamamlandı',
    });
  };

  // Alert göster
  const handleConfirm = () => {
    showAlert({
      variant: 'warning',
      title: 'Onay',
      message: 'Emin misiniz?',
      onConfirm: () => console.log('Onaylandı'),
    });
  };

  return (
    <View>
      <Button title="Başarılı" onPress={handleSuccess} />
      <Button title="Onay" onPress={handleConfirm} />
    </View>
  );
};
```

## Örnek Kullanımlar

### Form Hataları

```tsx
export const LoginForm = () => {
  const { showToast } = useAlert();

  const handleSubmit = () => {
    if (!email) {
      showToast({
        variant: 'error',
        title: 'Hata',
        message: 'E-posta alanı zorunludur',
      });
      return;
    }

    // Form submit
  };
};
```

### API Hataları

```tsx
export const DataLoader = () => {
  const { showToast } = useAlert();

  const loadData = async () => {
    try {
      const data = await fetchData();
      showToast({
        variant: 'success',
        title: 'Başarılı',
        message: 'Veriler yüklendi',
      });
    } catch (error) {
      showToast({
        variant: 'error',
        title: 'Hata',
        message: 'Veriler yüklenemedi',
      });
    }
  };
};
```

### Başarı Bildirimi

```tsx
export const SaveButton = () => {
  const { showToast } = useAlert();

  const handleSave = async () => {
    await saveData();
    showToast({
      variant: 'success',
      title: 'Kaydedildi',
      message: 'Değişiklikleriniz başarıyla kaydedildi',
    });
  };
};
```

### Silme Onayı

```tsx
export const DeleteButton = ({ itemId }) => {
  const { showAlert } = useAlert();

  const handleDelete = () => {
    showAlert({
      variant: 'error',
      title: 'Öğeyi Sil',
      message: 'Bu öğeyi silmek istediğinizden emin misiniz?',
      confirmLabel: 'Sil',
      cancelLabel: 'İptal',
      onConfirm: async () => {
        await deleteItem(itemId);
        showToast({
          variant: 'success',
          title: 'Silindi',
          message: 'Öğe başarıyla silindi',
        });
      },
    });
  };

  return (
    <Button title="Sil" onPress={handleDelete} />
  );
};
```

### Banner Uyarısı

```tsx
export const MaintenanceBanner = () => {
  return (
    <AlertBanner
      variant="warning"
      title="Bakım Modu"
      message="Sistem bakımda, bazı özellikler kullanılamayabilir"
      dismissible
    />
  );
};
```

## Best Practices

### 1. Alert Türü Seçimi

```tsx
// Kritik işlemler için Modal
showAlert({ variant: 'error', onConfirm: delete });

// Başarı için Toast
showToast({ variant: 'success', message: 'Kaydedildi' });

// Form hatası için Inline
<AlertInline variant="error" message="Geçersiz değer" />

// Sayfa uyarısı için Banner
<AlertBanner variant="info" message="Sistem bakımda" />
```

### 2. Message Length

```tsx
// Kısa ve öz
showToast({
  message: 'Kaydedildi', // İyi
});

// Uzun ve açıklayıcı
showAlert({
  message: 'Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?', // İyi
});
```

### 3. Variant Kullanımı

```tsx
// Başarı
showToast({ variant: 'success' });

// Hata
showToast({ variant: 'error' });

// Uyarı
showAlert({ variant: 'warning' });

// Bilgi
showBanner({ variant: 'info' });
```

## Erişilebilirlik

Alert sistemi, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Semantic anlamlar
- ✅ Auto-dismiss özelliği
- ✅ Focus management
- ✅ Keyboard navigation

## Performans İpuçları

1. **Auto-dismiss**: Toast'ları otomatik kapatın
2. **Queue**: Alert'ları sıraya alın
3. **Unmount**: Kullanılmayan alert'ları unmount edin

## İlgili Bileşenler

- [`BaseModal`](../BaseModal/README.md) - Modal bileşeni
- [`FormField`](../FormField/README.md) - Form alanı
- [`AtomicButton`](../../atoms/button/README.md) - Buton bileşeni

## Lisans

MIT

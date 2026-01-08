# EmptyState

EmptyState, veri bulunmadığında gösterilen bir bileşendir. Kullanıcıya durumu açıklar ve aksiyon alması için rehberlik eder.

## Özellikler

- 🎭 **İkon veya Illustration**: Görsel destek
- 📝 **Title & Description**: Açıklama metinleri
- 👆 **Action Button**: Aksiyon butonu desteği
- 🎨 **Tema Bilinci**: Otomatik tema uyumu
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { EmptyState } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { EmptyState } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ flex: 1 }}>
      <EmptyState
        title="Henüz öğe yok"
        description="İlk öğeyi oluşturmak için başlayın"
      />
    </View>
  );
};
```

## Basic Empty State

```tsx
<EmptyState
  title="Veri Bulunamadı"
/>
```

## Description ile

```tsx
<EmptyState
  title="Henüz mesaj yok"
  description="İlk mesajı gönderin ve sohbeti başlatın"
/>
```

## Custom İkon

```tsx
<EmptyState
  icon="mail-outline"
  title="Mesaj Yok"
  description="Henüz mesajınız bulunmuyor"
/>
```

## Action Button ile

```tsx
<EmptyState
  icon="document-text-outline"
  title="Henüz içerik yok"
  description="İlk içeriği oluşturmak için butona tıklayın"
  actionLabel="İçerik Oluştur"
  onAction={() => console.log('İçerik oluştur')}
/>
```

## Custom Illustration

```tsx
<EmptyState
  title="Özelleştirilmiş İllüstrasyon"
  illustration={
    <Image
      source={require('./empty-state.png')}
      style={{ width: 200, height: 200 }}
    />
  }
  description="Açıklama metni"
/>
```

## Örnek Kullanımlar

### Boş Liste

```tsx
export const EmptyList = () => {
  return (
    <EmptyState
      icon="list-outline"
      title="Henüz liste boş"
      description="Listeye öğe eklemek için butona tıklayın"
      actionLabel="Öğe Ekle"
      onAction={() => console.log('Ekle')}
    />
  );
};
```

### Boş Arama

```tsx
export const EmptySearch = ({ query }) => {
  return (
    <EmptyState
      icon="search-outline"
      title="Sonuç Bulunamadı"
      description={`"${query}" için sonuç bulunamadı`}
      actionLabel="Aramayı Temizle"
      onAction={() => setQuery('')}
    />
  );
};
```

### Boş Bildirimler

```tsx
export const EmptyNotifications = () => {
  return (
    <EmptyState
      icon="notifications-off-outline"
      title="Bildirim Yok"
      description="Henüz bildiriminiz bulunmuyor"
    />
  );
};
```

### Boş Favoriler

```tsx
export const EmptyFavorites = () => {
  return (
    <EmptyState
      icon="heart-outline"
      title="Favori Yok"
      description="Beğendiğiniz öğeleri favorilere ekleyin"
      actionLabel="Keşfet"
      onAction={() => navigation.navigate('Explore')}
    />
  );
};
```

### Boş Sepet

```tsx
export const EmptyCart = () => {
  return (
    <EmptyState
      icon="cart-outline"
      title="Sepetiniz Boş"
      description="Sepetinize ürün ekleyin ve alışverişe başlayın"
      actionLabel="Alışverişe Başla"
      onAction={() => navigation.navigate('Products')}
    />
  );
};
```

### Boş İndirmeler

```tsx
export const EmptyDownloads = () => {
  return (
    <EmptyState
      icon="download-outline"
      title="İndirme Yok"
      description="İndirilen içeriğiniz burada görünecek"
    />
  );
};
```

### Boş Arama Geçmişi

```tsx
export const EmptySearchHistory = () => {
  return (
    <EmptyState
      icon="time-outline"
      title="Arama Geçmişi Yok"
      description="Yaptığınız aramalar burada görünecek"
    />
  );
};
```

### Bağlantı Hatası

```tsx
export const ConnectionError = () => {
  return (
    <EmptyState
      icon="wifi-outline"
      title="İnternet Bağlantısı Yok"
      description="Lütfen internet bağlantınızı kontrol edin"
      actionLabel="Tekrar Dene"
      onAction={() => refetch()}
    />
  );
};
```

### Hata Durumu

```tsx
export const ErrorState = ({ error, onRetry }) => {
  return (
    <EmptyState
      icon="alert-circle-outline"
      title="Bir Hata Oluştu"
      description={error?.message || 'Beklenmeyen bir hata oluştu'}
      actionLabel="Tekrar Dene"
      onAction={onRetry}
    />
  );
};
```

### İzin Gerekli

```tsx
export const PermissionRequired = () => {
  return (
    <EmptyState
      icon="lock-closed-outline"
      title="Kamera İzni Gerekli"
      description="Fotoğraf çekmek için kamera izni vermeniz gerekiyor"
      actionLabel="İzin Ver"
      onAction={() => requestPermission()}
    />
  );
};
```

### Giriş Gerekli

```tsx
export const LoginRequired = () => {
  return (
    <EmptyState
      icon="person-outline"
      title="Giriş Yapmalısınız"
      description="Bu özelliği kullanmak için giriş yapmalısınız"
      actionLabel="Giriş Yap"
      onAction={() => navigation.navigate('Login')}
    />
  );
};
```

### Özellik Yakında

```tsx
export const ComingSoon = () => {
  return (
    <EmptyState
      icon="rocket-outline"
      title="Yakında Burada"
      description="Bu özellik yakında kullanıma sunulacak"
    />
  );
};
```

### Bakım Modu

```tsx
export const MaintenanceMode = () => {
  return (
    <EmptyState
      icon="construct-outline"
      title="Bakım Modu"
      description="Sistem bakımında, lütfen daha sonra tekrar deneyin"
    />
  );
};
```

## Props

### EmptyStateProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `icon` | `string` | `'file-tray-outline'` | İkon ismi |
| `title` | `string` | - **(Zorunlu)** | Başlık metni |
| `subtitle` | `string` | - | Alt başlık (deprecated, description kullanın) |
| `description` | `string` | - | Açıklama metni |
| `actionLabel` | `string` | - | Aksiyon butonu metni |
| `onAction` | `() => void` | - | Aksiyon callback'i |
| `illustration` | `ReactNode` | - | Custom illüstrasyon |
| `style` | `ViewStyle` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

## Best Practices

### 1. İkon Seçimi

```tsx
// Genel boş durum
<EmptyState icon="document-outline" />

// Arama boş
<EmptyState icon="search-outline" />

// Hata durumu
<EmptyState icon="alert-circle-outline" />

// Başarı durumu
<EmptyState icon="checkmark-circle-outline" />
```

### 2. Açıklama Metni

```tsx
// Kısa ve açıklayıcı
<EmptyState
  title="Boş Başlık"
  description="Ne yapmanız gerektiğini açıklayın"
/>
```

### 3. Action Button

```tsx
// Aksiyon varsa
<EmptyState
  actionLabel="Şimdi Ekle"
  onAction={handleAction}
/>

// Sadece bilgilendirme
<EmptyState title="Bilgilendirme" />
```

## Erişilebilirlik

EmptyState, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Semantic anlamlar
- ✅ Touch uygun boyut
- ✅ Action button erişilebilirliği

## Performans İpuçları

1. **Lazy Load**: Illustration'ları lazy load edin
2. **Memoization**: Component'i memo edin
3. **Simple Icons**: Karmaşık illüstrasyonlar yerine basit ikonlar kullanın

## İlgili Bileşenler

- [`AtomicSkeleton`](./skeleton/AtomicSkeleton/README.md) - Skeleton loading
- [`AtomicSpinner`](./AtomicSpinner/README.md) - Yükleme göstergesi
- [`AtomicIcon`](./AtomicIcon/README.md) - İkon bileşeni

## Lisans

MIT

# React Native Design System - Bileşenler

Bu React Native Design System, Atomic Design prensiplerine dayalı olarak kapsamlı bir bileşen kütüphanesi sunar. Tüm bileşenler tamamen özelleştirilebilir, tema bilincine sahip ve erişilebilirdir.

## 📦 İçindekiler

- [Atomlar](#atomlar)
- [Moleküller](#moleküller)
- [Organizmalar](#organizmalar)
- [Layout'lar](#layoutlar)

## ⚛️ Atomlar

Atomlar, tasarım sisteminin en temel yapı taşlarıdır. Tek bir amaca hizmet eden basit bileşenlerdir.

### Input & Button

- **[AtomicButton](src/atoms/button/README.md)** - 6 variant'lı buton bileşeni
- **[AtomicInput](src/atoms/input/README.md)** - Çok özellikli input bileşeni
- **[AtomicTextArea](src/atoms/AtomicTextArea.README.md)** - Çok satırlı metin girişi
- **[AtomicPicker](src/atoms/picker/README.md)** - Modal seçim bileşeni
- **[AtomicDatePicker](src/atoms/AtomicDatePicker.README.md)** - Tarih seçici

### Display & Content

- **[AtomicText](src/atoms/AtomicText.README.md)** - Tema bilincine sahip metin bileşeni
- **[AtomicIcon](src/atoms/AtomicIcon.README.md)** - Ionicons wrapper'ı
- **[AtomicImage](src/atoms/AtomicImage.README.md)** - Optimize edilmiş resim bileşeni
- **[AtomicCard](src/atoms/AtomicCard.README.md)** - Basit kart container'ı

### Interactive Elements

- **[AtomicChip](src/atoms/chip/README.md)** - Etiket/filtre bileşeni
- **[AtomicBadge](src/atoms/AtomicBadge.README.md)** - Rozet bileşeni
- **[AtomicSwitch](src/atoms/AtomicSwitch.README.md)** - Toggle switch
- **[AtomicTouchable](src/atoms/AtomicTouchable.README.md)** - Touchable wrapper

### Feedback & Loading

- **[AtomicSpinner](src/atoms/AtomicSpinner.README.md)** - Yükleme göstergesi
- **[AtomicProgress](src/atoms/AtomicProgress.README.md)** - İlerleme çubuğu
- **[AtomicSkeleton](src/atoms/skeleton/AtomicSkeleton.README.md)** - Skeleton loading

### Special Components

- **[AtomicAvatar](src/atoms/AtomicAvatar.README.md)** - Kullanıcı avatar'ı
- **[AtomicFab](src/atoms/AtomicFab.README.md)** - Floating action button
- **[EmptyState](src/atoms/EmptyState.README.md)** - Boş durum gösterimi

### Utility Components

- **[AtomicStatusBar](src/atoms/AtomicStatusBar.README.md)** - Status bar wrapper
- **[AtomicKeyboardAvoidingView](src/atoms/AtomicKeyboardAvoidingView.README.md)** - Klavye yönetimi

### Effects

- **[GlassView](src/atoms/GlassView/README.md)** - Glassmorphism efekti

## 🧪 Moleküller

Moleküller, birden fazla atomun birleşiminden oluşan daha karmaşık bileşenlerdir.

### Form Components

- **[FormField](src/molecules/FormField.README.md)** - Form alanı (label + input + error)
- **[FormContainer](src/organisms/FormContainer.README.md)** - Form container

### Navigation & Search

- **[SearchBar](src/molecules/SearchBar/README.md)** - Arama çubuğu
- **[ListItem](src/molecules/ListItem.README.md)** - Liste elemanı

### Modals & Overlays

- **[BaseModal](src/molecules/BaseModal.README.md)** - Temel modal bileşeni
- **[ConfirmationModal](src/molecules/ConfirmationModal.README.md)** - Onay modalı
- **[BottomSheet](src/molecules/bottom-sheet/README.md)** - Alt sheet
- **[FilterBottomSheet](src/molecules/FilterBottomSheet.README.md)** - Filtre sheet'i

### Alerts & Notifications

- **[AlertBanner](src/molecules/alerts/AlertBanner/README.md)** - Banner uyarısı
- **[AlertToast](src/molecules/alerts/AlertToast/README.md)** - Toast bildirimi
- **[AlertInline](src/molecules/alerts/AlertInline/README.md)** - Inline uyarı
- **[AlertModal](src/molecules/alerts/AlertModal/README.md)** - Modal uyarı
- **[AlertContainer](src/molecules/alerts/AlertContainer/README.md)** - Alert container

### Cards & Media

- **[MediaCard](src/molecules/media-card/MediaCard.README.md)** - Medya kartı
- **[GlowingCard](src/molecules/GlowingCard/README.md)** - Parlak kart
- **[Avatar](src/molecules/avatar/Avatar.README.md)** - Kullanıcı avatar'ı
- **[AvatarGroup](src/molecules/avatar/AvatarGroup/README.md)** - Avatar grubu

### Lists & Data

- **[List](src/molecules/List/README.md)** - Liste bileşeni
- **[StepProgress](src/molecules/StepProgress/README.md)** - Adım ilerlemesi
- **[StepHeader](src/molecules/StepHeader/README.md)** - Adım başlığı

### Advanced Components

- **[AtomicCalendar](src/molecules/calendar/README.md)** - Takvim bileşeni
- **[TabsNavigator](src/molecules/navigation/README.md)** - Tab navigasyonu
- **[StackNavigator](src/molecules/navigation/StackNavigator/README.md)** - Stack navigasyonu
- **[EmojiPicker](src/molecules/emoji/README.md)** - Emoji seçici
- **[Countdown](src/molecules/countdown/README.md)** - Geri sayım sayacı
- **[SwipeActionButton](src/molecules/swipe-actions/README.md)** - Kaydırma aksiyonu

### Utility

- **[IconContainer](src/molecules/IconContainer.README.md)** - İkon container'ı
- **[SplashScreen](src/molecules/splash/README.md)** - Açılış ekranı

## 🏢 Organizmalar

Organizmalar, moleküllerin ve atomların birleşiminden oluşan karmaşık UI desenleridir.

- **[FormContainer](src/organisms/FormContainer.README.md)** - Tam özellikli form container

## 📐 Layout'lar

Layout bileşenleri, sayfa düzenlerini ve container'ları yönetir.

- **[ScreenLayout](src/layouts/ScreenLayout/README.md)** - Ekran düzeni
- **[AppHeader](src/layouts/AppHeader/README.md)** - Uygulama başlığı
- **[ScreenHeader](src/layouts/ScreenHeader/README.md)** - Ekran başlığı
- **[Grid](src/layouts/Grid/README.md)** - Izgara düzeni
- **[Container](src/layouts/Container/README.md)** - Container bileşeni
- **[FormLayout](src/layouts/FormLayout/README.md)** - Form düzeni

## 🚀 Hızlı Başlangıç

### Kurulum

```bash
npm install react-native-design-system
# veya
yarn add react-native-design-system
```

### Temel Kullanım

```tsx
import { AtomicButton, AtomicInput, FormField } from 'react-native-design-system';

function MyScreen() {
  return (
    <>
      <FormField
        label="E-posta"
        placeholder="ornek@email.com"
        keyboardType="email-address"
      />

      <AtomicButton
        title="Gönder"
        onPress={() => console.log('Gönderildi')}
      />
    </>
  );
}
```

### Tema Sağlayıcı

```tsx
import { DesignSystemProvider } from 'react-native-design-system';

function App() {
  return (
    <DesignSystemProvider>
      <MyScreen />
    </DesignSystemProvider>
  );
}
```

## 🎨 Tema Özelleştirme

Tüm bileşenler tema sistemi ile tam entegre çalışır:

```tsx
import { useAppDesignTokens } from 'react-native-design-system';

function MyComponent() {
  const tokens = useAppDesignTokens();

  return (
    <View style={{ backgroundColor: tokens.colors.primary }}>
      <Text style={{ color: tokens.colors.onPrimary }}>
        Tema Bilinci
      </Text>
    </View>
  );
}
```

## ♿ Erişilebilirlik

Tüm bileşenler tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Touch uygun boyutlar
- ✅ Semantic anlamlar
- ✅ Keyboard navigation (web)
- ✅ Test ID desteği

## 📱 Platform Desteği

- ✅ iOS (tam destek)
- ✅ Android (tam destek)
- ⚠️ Web (çoğu bileşen)

## 🔧 Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Storybook'u başlat
npm run storybook

# Testleri çalıştır
npm test

# Build
npm run build
```

## 📚 Dokümantasyon

Her bileşenin kendi README dosyası vardır:

- Kapsamlı kullanım örnekleri
- Tüm props'ların açıklamaları
- Best practices
- Performans ipuçları
- Erişilebilirlik bilgileri

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen pull request göndermeden önce:

1. Fork'layın
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Push edin
5. Pull request açın

## 📄 Lisans

MIT License - LICENSE dosyasına bakın

## 🔗 Kaynaklar

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)
- [Material Design 3](https://m3.material.io/)

---

**Not**: Her bileşenin detaylı dökümantasyonu için kendi README dosyasına bakın.

# StepHeader

StepHeader, adım adım ilerleyen iş akışları (onboarding, kayıt, wizard vb.) için kullanılan başlık bileşenidir. Adım göstergesi, başlık ve alt başlık içerir.

## Özellikler

- 📊 **Step Indicator**: Adım göstergesi (dot sistemi)
- 📝 **Title & Subtitle**: Başlık ve açıklama metni
- 🎯 **Hizalama**: Sol, orta, sağ hizalama seçenekleri
- 🎨 **Özelleştirilebilir**: Font boyutu, boşluk ayarları
- 🎭 **Tema Bilinci**: Design token uyumlu
- ♿ **Erişilebilir**: Screen reader desteği

## Kurulum

```tsx
import { StepHeader } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { StepHeader } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View>
      <StepHeader
        title="Hoş Geldiniz"
        subtitle="Hesabınızı oluşturmak için birkaç adım"
      />
    </View>
  );
};
```

## Step Indicator ile

```tsx
<StepHeader
  title="Profil Bilgileri"
  subtitle="Lütfen kişisel bilgilerinizi girin"
  config={{
    showStepIndicator: true,
    currentStep: 2,
    totalSteps: 4,
  }}
/>
```

## Adım Göstergesi

```tsx
<View>
  {/* 1. Adım */}
  <StepHeader
    title="Adım 1"
    config={{
      showStepIndicator: true,
      currentStep: 1,
      totalSteps: 3,
    }}
  />

  {/* 2. Adım */}
  <StepHeader
    title="Adım 2"
    config={{
      showStepIndicator: true,
      currentStep: 2,
      totalSteps: 3,
    }}
  />

  {/* 3. Adım */}
  <StepHeader
    title="Adım 3"
    config={{
      showStepIndicator: true,
      currentStep: 3,
      totalSteps: 3,
    }}
  />
</View>
```

## Hizalama Seçenekleri

```tsx
<View>
  {/* Sol hizalı (varsayılan) */}
  <StepHeader
    title="Sol Hizalı"
    subtitle="Solaya hizalı başlık"
    config={{
      titleAlignment: 'left',
    }}
  />

  {/* Ortalanmış */}
  <StepHeader
    title="Ortada"
    subtitle="Ortalanmış başlık"
    config={{
      titleAlignment: 'center',
    }}
  />

  {/* Sağ hizalı */}
  <StepHeader
    title="Sağ Hizalı"
    subtitle="Sağa hizalı başlık"
    config={{
      titleAlignment: 'right',
    }}
  />
</View>
```

## Custom Font Boyutu

```tsx
<StepHeader
  title="Büyük Başlık"
  subtitle="Alt başlık"
  config={{
    titleFontSize: 32,
    subtitleFontSize: 18,
  }}
/>
```

## Custom Boşluk

```tsx
<StepHeader
  title="Özel Boşluk"
  subtitle="Özel padding ve margin"
  config={{
    spacing: {
      marginBottom: 48,
      paddingHorizontal: 32,
    },
  }}
/>
```

## Örnek Kullanımlar

### Onboarding Flow

```tsx
export const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    {
      title: 'Hoş Geldiniz 👋',
      subtitle: 'Uygulamamıza hoş geldiniz',
    },
    {
      title: 'Profil Oluştur',
      subtitle: 'Kendiniz hakkında bilgi verin',
    },
    {
      title: 'İlgi Alanları',
      subtitle: 'İlgi alanlarınızı seçin',
    },
    {
      title: 'Hazır! 🎉',
      subtitle: 'Uygulamayı kullanmaya başlayın',
    },
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <ScreenLayout>
      <StepHeader
        title={currentStepData.title}
        subtitle={currentStepData.subtitle}
        config={{
          showStepIndicator: true,
          currentStep,
          totalSteps: steps.length,
          titleAlignment: 'center',
        }}
      />

      {/* Step content */}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Geri"
          disabled={currentStep === 1}
          onPress={() => setCurrentStep(currentStep - 1)}
        />
        <Button
          title={currentStep === steps.length ? 'Bitir' : 'İleri'}
          onPress={() => {
            if (currentStep < steps.length) {
              setCurrentStep(currentStep + 1);
            } else {
              // Finish onboarding
            }
          }}
        />
      </View>
    </ScreenLayout>
  );
};
```

### Kayıt Formu

```tsx
export const RegistrationForm = () => {
  const [step, setStep] = useState(1);

  return (
    <ScreenLayout>
      {step === 1 && (
        <>
          <StepHeader
            title="Hesap Oluştur"
            subtitle="E-posta adresiniz ve şifreniz ile başlayın"
            config={{
              showStepIndicator: true,
              currentStep: 1,
              totalSteps: 3,
            }}
          />
          {/* Email & password fields */}
        </>
      )}

      {step === 2 && (
        <>
          <StepHeader
            title="Profil Bilgileri"
            subtitle="Adınızı ve profil fotoğrafınızı ekleyin"
            config={{
              showStepIndicator: true,
              currentStep: 2,
              totalSteps: 3,
            }}
          />
          {/* Profile fields */}
        </>
      )}

      {step === 3 && (
        <>
          <StepHeader
            title="Onayla"
            subtitle="Bilgilerinizi kontrol edin"
            config={{
              showStepIndicator: true,
              currentStep: 3,
              totalSteps: 3,
            }}
          />
          {/* Confirmation */}
        </>
      )}
    </ScreenLayout>
  );
};
```

### Checkout Wizard

```tsx
export const CheckoutWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Teslimat', subtitle: 'Teslimat adresini seçin' },
    { id: 2, title: 'Ödeme', subtitle: 'Ödeme yöntemini seçin' },
    { id: 3, title: 'Onay', subtitle: 'Siparişi onaylayın' },
  ];

  return (
    <ScreenLayout>
      <StepHeader
        title={steps[currentStep - 1].title}
        subtitle={steps[currentStep - 1].subtitle}
        config={{
          showStepIndicator: true,
          currentStep,
          totalSteps: steps.length,
        }}
      />

      {/* Step content */}
    </ScreenLayout>
  );
};
```

### Profil Tamamlama

```tsx
export const ProfileCompletion = ({ completionPercentage }) => {
  const totalSteps = 5;
  const currentStep = Math.ceil((completionPercentage / 100) * totalSteps);

  return (
    <View>
      <StepHeader
        title="Profilinizi Tamamlayın"
        subtitle={`${completionPercentage}% tamamlandı`}
        config={{
          showStepIndicator: true,
          currentStep,
          totalSteps,
          titleAlignment: 'center',
        }}
      />
    </View>
  );
};
```

### Setup Assistant

```tsx
export const SetupAssistant = () => {
  const [setupStep, setSetupStep] = useState(1);

  const setupSteps = [
    { title: 'Dil Seçin', subtitle: 'Tercih ettiğiniz dili seçin' },
    { title: 'Bildirimler', subtitle: 'Bildirim tercihlerinizi ayarlayın' },
    { title: 'Gizlilik', subtitle: 'Gizlilik ayarlarınızı yapılandırın' },
    { title: 'Tema', subtitle: 'Uygulama temasını özelleştirin' },
  ];

  return (
    <ScreenLayout>
      <StepHeader
        title={setupSteps[setupStep - 1].title}
        subtitle={setupSteps[setupStep - 1].subtitle}
        config={{
          showStepIndicator: true,
          currentStep: setupStep,
          totalSteps: setupSteps.length,
          titleFontSize: 24,
          subtitleFontSize: 14,
        }}
      />

      {/* Setup content */}
    </ScreenLayout>
  );
};
```

### Questionnaire

```tsx
export const Questionnaire = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const questions = [
    { title: 'Soru 1', subtitle: 'Yaşınız nedir?' },
    { title: 'Soru 2', subtitle: 'Mesleğiniz nedir?' },
    { title: 'Soru 3', subtitle: 'İlgi alanlarınız nelerdir?' },
  ];

  return (
    <View>
      <StepHeader
        title={questions[questionIndex].title}
        subtitle={questions[questionIndex].subtitle}
        config={{
          showStepIndicator: true,
          currentStep: questionIndex + 1,
          totalSteps: questions.length,
          titleAlignment: 'center',
          spacing: {
            marginBottom: 24,
            paddingHorizontal: 16,
          },
        }}
      />

      {/* Question content */}
    </View>
  );
};
```

## Props

### StepHeaderProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `title` | `string` | - **(Zorunlu)** | Ana başlık |
| `subtitle` | `string` | - | Alt başlık |
| `config` | `StepHeaderConfig` | `{}` | Konfigürasyon |
| `style` | `ViewStyle` | - | Özel stil |

### StepHeaderConfig

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `showStepIndicator` | `boolean` | `false` | Adım göstergesi göster |
| `currentStep` | `number` | - | Mevcut adım |
| `totalSteps` | `number` | - | Toplam adım sayısı |
| `titleAlignment` | `'left' \| 'center' \| 'right'` | `'left'` | Başlık hizalaması |
| `titleFontSize` | `number` | `28` | Başlık font boyutu |
| `subtitleFontSize` | `number` | `16` | Alt başlık font boyutu |
| `spacing` | `object` | - | Boşluk ayarları |
| `spacing.marginBottom` | `number` | `32` | Alt boşluk |
| `spacing.paddingHorizontal` | `number` | `24` | Yatay boşluk |

## Best Practices

### 1. Step Indicator Kullanımı

```tsx
// Çok adımlı iş akışlarında
config={{
  showStepIndicator: true,
  currentStep: 2,
  totalSteps: 5,
}}
```

### 2. Hizalama Seçimi

```tsx
// Form için
titleAlignment: 'left'

// Onboarding için
titleAlignment: 'center'

// RTL diller için
titleAlignment: 'right'
```

### 3. Adım Sayısı

```tsx
// İdeal: 3-5 adım
totalSteps: 4

// Çok fazla adımdan kaçının
totalSteps: 10 // ❌ Kötü
```

### 4. Başlık Uzunluğu

```tsx
// Kısa ve öz
title="Profil Oluştur" // ✅ İyi

// Çok uzun
title="Lütfen kişisel profil bilgilerinizi buraya girin" // ❌ Kötü
```

## Erişilebilirlik

StepHeader, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Semantic heading yapısı
- ✅ Focus management
- ✅ Yeterli dokunma alanı

## Performans İpuçları

1. **Memoization**: Step header'ı memo edin
2. **Optimized Re-renders**: Sadece gerekli olduğunda güncelleyin
3. **Minimal Props**: Gereksiz props'tan kaçının

## İlgili Bileşenler

- [`AtomicText`](../../atoms/AtomicText/README.md) - Metin bileşeni
- [`BaseModal`](../BaseModal/README.md) - Modal bileşeni
- [`FormField`](../FormField/README.md) - Form alanı

## Lisans

MIT

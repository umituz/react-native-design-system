# StepProgress

StepProgress, çok adımlı iş akışlarında ilerleme durumunu gösteren basit ve etkili bir bileşendir. Yatay ilerleme çubuğu ile hangi adımda olduğunuzu görselleştirir.

## Özellikler

- 📊 **Görsel İlerleme**: Adım ilerlemesini görselleştirir
- 🎨 **Tema Bilinci**: Design token uyumlu
- 🎯 **Basit Kullanım**: Sadece 2 prop gerekli
- ♿ **Erişilebilir**: Screen reader desteği
- 📐 **Responsive**: Otomatik genişlik ayarı

## Kurulum

```tsx
import { StepProgress } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { StepProgress } from 'react-native-design-system';

export const BasicExample = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const totalSteps = 4;

  return (
    <View>
      <StepProgress
        currentStep={currentStep}
        totalSteps={totalSteps}
      />
    </View>
  );
};
```

## Temel İlerleme

```tsx
{/* 3 adımdan 2. adım */}
<StepProgress
  currentStep={2}
  totalSteps={3}
/>

{/* 5 adımdan 1. adım */}
<StepProgress
  currentStep={1}
  totalSteps={5}
/>
```

## Dinamik İlerleme

```tsx
export const DynamicProgress = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  return (
    <View>
      <StepProgress
        currentStep={step}
        totalSteps={totalSteps}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        <Button
          title="Geri"
          disabled={step === 1}
          onPress={() => setStep(step - 1)}
        />
        <Button
          title="İleri"
          disabled={step === totalSteps}
          onPress={() => setStep(step + 1)}
        />
      </View>
    </View>
  );
};
```

## Örnek Kullanımlar

### Onboarding Flow

```tsx
export const OnboardingProgress = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, title: 'Hoş Geldiniz' },
    { id: 2, title: 'Profil' },
    { id: 3, title: 'İlgi Alanları' },
    { id: 4, title: 'Bitir' },
  ];

  return (
    <ScreenLayout>
      <StepProgress
        currentStep={currentStep}
        totalSteps={steps.length}
      />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <AtomicText type="headlineLarge" style={{ textAlign: 'center' }}>
          {steps[currentStep - 1].title}
        </AtomicText>
      </View>

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
              // Finish
            }
          }}
        />
      </View>
    </ScreenLayout>
  );
};
```

### Checkout Süreci

```tsx
export const CheckoutProgress = () => {
  const [checkoutStep, setCheckoutStep] = useState(1);
  const checkoutSteps = ['Sepet', 'Teslimat', 'Ödeme', 'Onay'];

  return (
    <View>
      <StepProgress
        currentStep={checkoutStep}
        totalSteps={checkoutSteps.length}
      />

      <View style={{ marginTop: 16 }}>
        <AtomicText type="titleMedium" style={{ textAlign: 'center', marginBottom: 8 }}>
          {checkoutSteps[checkoutStep - 1]}
        </AtomicText>
      </View>

      {/* Step content */}
    </View>
  );
};
```

### Quiz İlerlemesi

```tsx
export const QuizProgress = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const questions = [
    'Soru 1',
    'Soru 2',
    'Soru 3',
    'Soru 4',
    'Soru 5',
  ];

  const progress = questionIndex + 1;

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <AtomicText type="labelLarge">Soru {progress}/{questions.length}</AtomicText>
        <AtomicText type="labelLarge" color="primary">
          %{Math.round((progress / questions.length) * 100)}
        </AtomicText>
      </View>

      <StepProgress
        currentStep={progress}
        totalSteps={questions.length}
      />

      <View style={{ marginTop: 24 }}>
        <AtomicText type="headlineMedium">{questions[questionIndex]}</AtomicText>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 32 }}>
        <Button
          title="Önceki"
          disabled={questionIndex === 0}
          onPress={() => setQuestionIndex(questionIndex - 1)}
        />
        <Button
          title={questionIndex === questions.length - 1 ? 'Bitir' : 'Sonraki'}
          onPress={() => {
            if (questionIndex < questions.length - 1) {
              setQuestionIndex(questionIndex + 1);
            } else {
              // Submit quiz
            }
          }}
        />
      </View>
    </View>
  );
};
```

### Form Adımları

```tsx
export const FormWizard = () => {
  const [formStep, setFormStep] = useState(1);
  const formSteps = ['Kişisel', 'İletişim', 'Adres', 'Onay'];

  return (
    <AtomicCard variant="outlined">
      <View style={{ padding: 16 }}>
        <StepProgress
          currentStep={formStep}
          totalSteps={formSteps.length}
        />

        <View style={{ marginTop: 24 }}>
          {formStep === 1 && (
            <View>
              <AtomicText type="titleLarge">Kişisel Bilgiler</AtomicText>
              <FormField label="Ad" />
              <FormField label="Soyad" />
            </View>
          )}

          {formStep === 2 && (
            <View>
              <AtomicText type="titleLarge">İletişim Bilgileri</AtomicText>
              <FormField label="E-posta" />
              <FormField label="Telefon" />
            </View>
          )}

          {formStep === 3 && (
            <View>
              <AtomicText type="titleLarge">Adres</AtomicText>
              <FormField label="Şehir" />
              <FormField label="Ülke" />
            </View>
          )}

          {formStep === 4 && (
            <View>
              <AtomicText type="titleLarge">Onayla</AtomicText>
              <AtomicText>Bilgilerinizi kontrol edin</AtomicText>
            </View>
          )}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
          <Button
            title="Geri"
            variant="ghost"
            disabled={formStep === 1}
            onPress={() => setFormStep(formStep - 1)}
          />
          <Button
            title={formStep === formSteps.length ? 'Gönder' : 'İleri'}
            onPress={() => {
              if (formStep < formSteps.length) {
                setFormStep(formStep + 1);
              } else {
                // Submit form
              }
            }}
          />
        </View>
      </View>
    </AtomicCard>
  );
};
```

### Görev İzleme

```tsx
export const TaskTracker = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const totalTasks = 10;

  const toggleTask = () => {
    if (completedTasks < totalTasks) {
      setCompletedTasks(completedTasks + 1);
    }
  };

  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <AtomicCard variant="elevated">
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <AtomicText type="titleMedium">Günlük Görevler</AtomicText>
          <AtomicText type="labelLarge" color="primary">
            %{progressPercentage}
          </AtomicText>
        </View>

        <StepProgress
          currentStep={completedTasks}
          totalTasks={totalTasks}
        />

        <View style={{ marginTop: 16 }}>
          <AtomicText type="bodyMedium" color="secondary">
            {completedTasks}/{totalTasks} görev tamamlandı
          </AtomicText>
        </View>

        {completedTasks < totalTasks && (
          <Button
            title="Görevi Tamamla"
            onPress={toggleTask}
            style={{ marginTop: 16 }}
          />
        )}

        {completedTasks === totalTasks && (
          <View style={{ marginTop: 16, alignItems: 'center' }}>
            <AtomicIcon name="checkmark-circle" size="xl" color="success" />
            <AtomicText type="titleMedium" color="success" style={{ marginTop: 8 }}>
              Tüm görevler tamamlandı!
            </AtomicText>
          </View>
        )}
      </View>
    </AtomicCard>
  );
};
```

### Dosya Yükleme İlerlemesi

```tsx
export const FileUploadProgress = () => {
  const [uploadedFiles, setUploadedFiles] = useState(0);
  const totalFiles = 5;

  const uploadFile = () => {
    if (uploadedFiles < totalFiles) {
      setUploadedFiles(uploadedFiles + 1);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <AtomicText type="titleMedium">Dosya Yükleme</AtomicText>
        <AtomicText type="labelLarge">
          {uploadedFiles}/{totalFiles}
        </AtomicText>
      </View>

      <StepProgress
        currentStep={uploadedFiles}
        totalSteps={totalFiles}
      />

      {uploadedFiles < totalFiles && (
        <Button
          title="Dosya Yükle"
          onPress={uploadFile}
          style={{ marginTop: 16 }}
        />
      )}

      {uploadedFiles === totalFiles && (
        <AtomicText type="bodyMedium" color="success" style={{ marginTop: 16 }}>
          Tüm dosyalar yüklendi ✓
        </AtomicText>
      )}
    </View>
  );
};
```

### Profil Tamamlama

```tsx
export const ProfileCompletion = () => {
  const [completedSections, setCompletedSections] = useState(2);
  const totalSections = 5;

  const sections = [
    { id: 1, name: 'Profil Fotoğrafı', completed: true },
    { id: 2, name: 'Kişisel Bilgiler', completed: true },
    { id: 3, name: 'İletişim Bilgileri', completed: false },
    { id: 4, name: 'Eğitim', completed: false },
    { id: 5, name: 'Deneyim', completed: false },
  ];

  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="headlineMedium" style={{ marginBottom: 8 }}>
        Profilinizi Tamamlayın
      </AtomicText>

      <StepProgress
        currentStep={completedSections}
        totalSteps={totalSections}
      />

      <View style={{ marginTop: 16 }}>
        <AtomicText type="bodyMedium" color="secondary">
          {completedSections}/{totalSections} bölüm tamamlandı
        </AtomicText>
      </View>

      <View style={{ marginTop: 16 }}>
        {sections.map((section) => (
          <View
            key={section.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#e0e0e0',
            }}
          >
            <AtomicIcon
              name={section.completed ? 'checkmark-circle' : 'ellipse-outline'}
              size="md"
              color={section.completed ? 'success' : 'secondary'}
            />
            <AtomicText style={{ marginLeft: 12 }}>
              {section.name}
            </AtomicText>
          </View>
        ))}
      </View>
    </View>
  );
};
```

## Props

### StepProgressProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `currentStep` | `number` | - **(Zorunlu)** | Mevcut adım |
| `totalSteps` | `number` | - **(Zorunlu)** | Toplam adım sayısı |
| `style` | `ViewStyle` | - | Özel stil |

## Best Practices

### 1. Adım Sayısı

```tsx
// İdeal: 3-7 adım
<StepProgress currentStep={2} totalSteps={5} /> // ✅

// Çok az
<StepProgress currentStep={1} totalSteps={2} /> // ⚠️

// Çok fazla
<StepProgress currentStep={5} totalSteps={20} /> // ❌
```

### 2. State Yönetimi

```tsx
// Doğru
const [step, setStep] = useState(1);
<StepProgress currentStep={step} totalSteps={5} />

// Yanlış (hardcoded)
<StepProgress currentStep={2} totalSteps={5} /> // ❌
```

### 3. Kullanıcı Geri Bildirimi

```tsx
// Adım numarasını göster
<AtomicText>Adım {currentStep}/{totalSteps}</AtomicText>

// Yüzde göster
<AtomicText>%{Math.round((currentStep / totalSteps) * 100)}</AtomicText>
```

## Erişilebilirlik

StepProgress, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Semantic role
- ✅ Progress anonsu
- ✅ Görsel kontrast

## Performans İpuçları

1. **Memoization**: Component'i memo edin
2. **Minimal Props**: Sadece gerekli props'ları kullanın
3. **Stable References**: Callback'leri useCallback ile sarın

## İlgili Bileşenler

- [`StepHeader`](../StepHeader/README.md) - Adım başlığı
- [`Divider`](../Divider/README.md) - Ayırıcı
- [`AtomicText`](../../atoms/AtomicText/README.md) - Metin bileşeni

## Lisans

MIT

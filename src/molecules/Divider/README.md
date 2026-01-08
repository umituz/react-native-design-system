# Divider

Divider, içerik bölümleri arasında görsel ayırıcı göstermek için kullanılan bileşendir. Yatay, dikey ve metinli ayırıcıları destekler.

## Özellikler

- 📏 **2 Orientasyon**: Yatay, dikey
- 🎨 **3 Stil**: Solid, dashed, dotted
- 📝 **Text Label**: Metinli ayırıcı
- 🎯 **4 Spacing**: None, small, medium, large
- 🎭 **Tema Bilinci**: Design token uyumlu
- 🌈 **Custom Renk**: Özel renk desteği
- 📐 **Custom Kalınlık**: Özel kalınlık

## Kurulum

```tsx
import { Divider } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicText>Bölüm 1</AtomicText>
      <Divider />
      <AtomicText>Bölüm 2</AtomicText>
    </View>
  );
};
```

## Yatay Ayırıcı

```tsx
{/* Varsayılan yatay */}
<Divider />

{/* Custom spacing */}
<Divider spacing="large" />

{/* Custom color */}
<Divider color="#6366f1" />

{/* Custom thickness */}
<Divider thickness={2} />
```

## Dikey Ayırıcı

```tsx
<View style={{ flexDirection: 'row', height: 100 }}>
  <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} />
  <Divider orientation="vertical" />
  <View style={{ flex: 1, backgroundColor: '#e0e0e0' }} />
</View>
```

## Çizgi Stilleri

```tsx
<View>
  {/* Solid (varsayılan) */}
  <Divider lineStyle="solid" />

  {/* Dashed */}
  <Divider lineStyle="dashed" />

  {/* Dotted */}
  <Divider lineStyle="dotted" />
</View>
```

## Metinli Ayırıcı

```tsx
<Divider text="VEYA" />

<Divider text="veya devam et" />

<Divider
  text="⭐ Özellikli ⭐"
  lineStyle="dashed"
/>
```

## Spacing Seçenekleri

```tsx
<View>
  {/* None */}
  <Divider spacing="none" />

  {/* Small */}
  <Divider spacing="small" />

  {/* Medium (varsayılan) */}
  <Divider spacing="medium" />

  {/* Large */}
  <Divider spacing="large" />
</View>
```

## Custom Renk ve Kalınlık

```tsx
<Divider
  color="#6366f1"
  thickness={2}
  spacing="large"
/>

<Divider
  color="#ef4444"
  thickness={3}
  lineStyle="dashed"
/>
```

## Örnek Kullanımlar

### Form Bölümleri

```tsx
export const FormSections = () => {
  return (
    <View style={{ padding: 16 }}>
      <View>
        <AtomicText type="titleMedium">Kişisel Bilgiler</AtomicText>
        <FormField label="Ad" />
        <FormField label="Soyad" />
      </View>

      <Divider spacing="large" />

      <View>
        <AtomicText type="titleMedium">İletişim Bilgileri</AtomicText>
        <FormField label="E-posta" />
        <FormField label="Telefon" />
      </View>

      <Divider spacing="large" />

      <View>
        <AtomicText type="titleMedium">Adres</AtomicText>
        <FormField label="Şehir" />
        <FormField label="Ülke" />
      </View>
    </View>
  );
};
```

### Menü Ayırıcıları

```tsx
export const MenuDivider = () => {
  return (
    <View>
      <MenuItem title="Profil" icon="person-outline" />
      <MenuItem title="Ayarlar" icon="settings-outline" />
      <Divider />
      <MenuItem title="Yardım" icon="help-circle-outline" />
      <MenuItem title="Hakkında" icon="information-circle-outline" />
      <Divider spacing="large" />
      <MenuItem title="Çıkış" icon="log-out-outline" variant="danger" />
    </View>
  );
};
```

### Kart İçeriği

```tsx
export const CardContent = () => {
  return (
    <AtomicCard variant="outlined">
      <View style={{ padding: 16 }}>
        <AtomicText type="titleLarge">Kart Başlığı</AtomicText>
        <AtomicText type="bodyMedium" color="secondary">
          Alt başlık veya açıklama
        </AtomicText>
      </View>

      <Divider />

      <View style={{ padding: 16 }}>
        <AtomicText>İçerik buraya gelir</AtomicText>
      </View>

      <Divider />

      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button title="İptal" variant="ghost" style={{ marginRight: 8 }} />
        <Button title="Kaydet" />
      </View>
    </AtomicCard>
  );
};
```

### OR Ayırıcı

```tsx
export const OrSeparator = () => {
  return (
    <View style={{ padding: 16 }}>
      <SocialLoginButton provider="google" label="Google ile devam et" />

      <Divider text="VEYA" spacing="large" />

      <FormField label="E-posta" />
      <FormField label="Şifre" secureTextEntry />

      <Button title="Giriş Yap" />
    </View>
  );
};
```

### Tablo Ayırıcıları

```tsx
export const TableDivider = () => {
  return (
    <View>
      {/* Header */}
      <View style={{ flexDirection: 'row', padding: 12 }}>
        <AtomicText style={{ flex: 1, fontWeight: '600' }}>Ad</AtomicText>
        <AtomicText style={{ flex: 1, fontWeight: '600' }}>Soyad</AtomicText>
        <AtomicText style={{ flex: 1, fontWeight: '600' }}>E-posta</AtomicText>
      </View>

      <Divider thickness={2} />

      {/* Rows */}
      <View style={{ flexDirection: 'row', padding: 12 }}>
        <AtomicText style={{ flex: 1 }}>Ahmet</AtomicText>
        <AtomicText style={{ flex: 1 }}>Yılmaz</AtomicText>
        <AtomicText style={{ flex: 1 }}>ahmet@example.com</AtomicText>
      </View>

      <Divider />

      <View style={{ flexDirection: 'row', padding: 12 }}>
        <AtomicText style={{ flex: 1 }}>Ayşe</AtomicText>
        <AtomicText style={{ flex: 1 }}>Demir</AtomicText>
        <AtomicText style={{ flex: 1 }}>ayse@example.com</AtomicText>
      </View>
    </View>
  );
};
```

### Timeline

```tsx
export const TimelineDivider = () => {
  const events = [
    { time: '09:00', title: 'Kayıt', description: 'Kayıt işlemleri' },
    { time: '10:00', title: 'Açılış', description: 'Konferans açılışı' },
    { time: '12:00', title: 'Öğle Arası', description: 'Yemek molası' },
  ];

  return (
    <View style={{ padding: 16 }}>
      {events.map((event, index) => (
        <View key={index}>
          <View style={{ flexDirection: 'row' }}>
            <AtomicText style={{ width: 60 }}>{event.time}</AtomicText>
            <View style={{ flex: 1 }}>
              <AtomicText fontWeight="600">{event.title}</AtomicText>
              <AtomicText type="bodySmall" color="secondary">
                {event.description}
              </AtomicText>
            </View>
          </View>

          {index < events.length - 1 && (
            <Divider
              orientation="vertical"
              spacing="small"
              style={{ marginLeft: 24 }}
            />
          )}
        </View>
      ))}
    </View>
  );
};
```

### Yan Yana İçerik

```tsx
export const SideBySideContent = () => {
  return (
    <View style={{ flexDirection: 'row', height: 200 }}>
      <View style={{ flex: 1, padding: 16, backgroundColor: '#f0f0f0' }}>
        <AtomicText>Sol İçerik</AtomicText>
      </View>

      <Divider orientation="vertical" thickness={2} color="#6366f1" />

      <View style={{ flex: 1, padding: 16, backgroundColor: '#e0e0e0' }}>
        <AtomicText>Sağ İçerik</AtomicText>
      </View>
    </View>
  );
};
```

### Liste Grupları

```tsx
export const ListGroups = () => {
  const groups = [
    {
      title: 'Favoriler',
      items: ['Öğe 1', 'Öğe 2', 'Öğe 3'],
    },
    {
      title: 'Son Eklenenler',
      items: ['Öğe 4', 'Öğe 5'],
    },
  ];

  return (
    <View>
      {groups.map((group, groupIndex) => (
        <View key={groupIndex}>
          <AtomicText
            type="labelLarge"
            style={{ padding: 16, paddingBottom: 8 }}
          >
            {group.title}
          </AtomicText>

          {group.items.map((item, itemIndex) => (
            <View key={itemIndex} style={{ padding: 16 }}>
              <AtomicText>{item}</AtomicText>
            </View>
          ))}

          {groupIndex < groups.length - 1 && <Divider spacing="large" />}
        </View>
      ))}
    </View>
  );
};
```

### Ayırıcı Menü

```tsx
export const SeparatorMenu = () => {
  return (
    <View>
      <Pressable style={{ padding: 16 }}>
        <AtomicText>Düzenle</AtomicText>
      </Pressable>

      <Divider spacing="small" />

      <Pressable style={{ padding: 16 }}>
        <AtomicText>Sil</AtomicText>
      </Pressable>

      <Divider text="Diğer İşlemler" />

      <Pressable style={{ padding: 16 }}>
        <AtomicText>Paylaş</AtomicText>
      </Pressable>

      <Divider spacing="small" />

      <Pressable style={{ padding: 16 }}>
        <AtomicText>Bağlantıyı Kopyala</AtomicText>
      </Pressable>
    </View>
  );
};
```

## Props

### DividerProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Ayırıcı yönü |
| `lineStyle` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Çizgi stili |
| `spacing` | `'none' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Boşluk |
| `color` | `string` | `tokens.colors.border` | Çizgi rengi |
| `thickness` | `number` | `1` | Çizgi kalınlığı |
| `text` | `string` | - | Metin etiketi |
| `style` | `ViewStyle` | - | Özel stil |

## Best Practices

### 1. Orientasyon Seçimi

```tsx
// Form bölümleri için
<Divider /> // horizontal ✅

// Yan yana içerik için
<Divider orientation="vertical" /> // vertical ✅
```

### 2. Spacing Kullanımı

```tsx
// İçerik içinde
<Divider spacing="small" />

// Bölüm arası
<Divider spacing="large" />
```

### 3. Stil Seçimi

```tsx
// Varsayılan
<Divider lineStyle="solid" />

    // Vurgulu
<Divider lineStyle="dashed" thickness={2} />
```

### 4. Renk Kullanımı

```tsx
// Theme-aware (önerilen)
<Divider />

// Custom (spesifik durumlarda)
<Divider color="#6366f1" />
```

## Erişilebilirlik

Divider, erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Semantic role
- ✅ Görsel ayırıcı

## Performans İpuçları

1. **Simplify**: Basit tutun, fazla prop kullanmayın
2. **Theme-aware**: Token rengi kullanın
3. **Minimal**: Gereksiz divider'lardan kaçının

## İlgili Bileşenler

- [`AtomicText`](../../atoms/AtomicText/README.md) - Metin bileşeni
- [`AtomicCard`](../../atoms/AtomicCard.README.md) - Kart bileşeni
- [`ListItem`](../ListItem.tsx) - Liste öğesi

## Lisans

MIT

# AtomicFab

AtomicFab (Floating Action Button), Material Design 3 uyumlu bir yüzen aksiyon butonudur. Ekranın sağ alt köşesinde bulunur ve bir ekrandaki birincil eylemi temsil eder.

## Özellikler

- 🎯 **Primary Action**: Ana eylem için buton
- 📏 **3 Size**: Small (40px), Medium (56px), Large (72px)
- 🎨 **3 Variant**: Primary, Secondary, Surface
- 📍 **Responsive**: Otomatik pozisyonlama
- 🔝 **Safe Area**: Tab bar ve safe area uyumlu
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Önemli Not

⚠️ **FAB mutlaka ScreenLayout seviyesinde kullanılmalı, ScrollView içinde kullanılmamalıdır!**

## Kurulum

```tsx
import { AtomicFab } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { AtomicFab, ScreenLayout } from 'react-native-design-system';

export const BasicExample = () => {
  const handleAdd = () => {
    console.log('Yeni öğe ekle');
  };

  return (
    <ScreenLayout>
      <ScrollView>
        {/* İçerik */}
      </ScrollView>

      <AtomicFab
        icon="add"
        onPress={handleAdd}
      />
    </ScreenLayout>
  );
};
```

## Variant'lar

```tsx
<View style={{ gap: 16 }}>
  {/* Primary (Varsayılan) */}
  <AtomicFab
    icon="add"
    variant="primary"
    onPress={() => {}}
  />

  {/* Secondary */}
  <AtomicFab
    icon="create"
    variant="secondary"
    onPress={() => {}}
  />

  {/* Surface */}
  <AtomicFab
    icon="share"
    variant="surface"
    onPress={() => {}}
  />
</View>
```

## Boyutlar

```tsx
<View style={{ gap: 16 }}>
  {/* Small */}
  <AtomicFab
    icon="add"
    size="sm"
    onPress={() => {}}
  />

  {/* Medium (Varsayılan) */}
  <AtomicFab
    icon="add"
    size="md"
    onPress={() => {}}
  />

  {/* Large */}
  <AtomicFab
    icon="add"
    size="lg"
    onPress={() => {}}
  />
</View>
```

## Disabled State

```tsx
<AtomicFab
  icon="add"
  disabled
  onPress={() => {}}
/>
```

## Custom Style

```tsx
<AtomicFab
  icon="add"
  onPress={handleAdd}
  style={{
    bottom: 100,
    right: 20,
  }}
/>
```

## Örnek Kullanımlar

### Yeni Öğe Ekleme

```tsx
export const ItemList = () => {
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
      />

      <AtomicFab
        icon="add"
        onPress={() => navigation.navigate('AddItem')}
        accessibilityLabel="Yeni öğe ekle"
      />
    </ScreenLayout>
  );
};
```

### Mesaj Oluşturma

```tsx
export const ChatList = () => {
  return (
    <ScreenLayout>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ConversationCard item={item} />}
      />

      <AtomicFab
        icon="chatbubble-outline"
        onPress={() => console.log('Yeni mesaj')}
        accessibilityLabel="Yeni mesaj"
      />
    </ScreenLayout>
  );
};
```

### Fotoğraf Çekme

```tsx
export const PhotoGallery = () => {
  const handleTakePhoto = () => {
    launchCamera();
  };

  return (
    <ScreenLayout>
      <FlatList
        data={photos}
        numColumns={3}
        renderItem={({ item }) => <PhotoItem photo={item} />}
      />

      <AtomicFab
        icon="camera-outline"
        onPress={handleTakePhoto}
        accessibilityLabel="Fotoğraf çek"
      />
    </ScreenLayout>
  );
};
```

### Konum Oluşturma

```tsx
export const MapScreen = () => {
  const handleAddLocation = () => {
    console.log('Konum ekle');
  };

  return (
    <ScreenLayout>
      <MapView style={{ flex: 1 }} />

      <AtomicFab
        icon="location-outline"
        variant="secondary"
        onPress={handleAddLocation}
        accessibilityLabel="Konum ekle"
      />
    </ScreenLayout>
  );
};
```

### Arama

```tsx
export const ContactList = () => {
  const handleCall = () => {
    console.log('Ara');
  };

  return (
    <ScreenLayout>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactCard contact={item} />}
      />

      <AtomicFab
        icon="call-outline"
        variant="surface"
        onPress={handleCall}
        accessibilityLabel="Ara"
      />
    </ScreenLayout>
  );
};
```

### Farklı Eylemler

```tsx
export const Dashboard = () => {
  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <DashboardCards />
      </ScrollView>

      {/* İlk FAB - Ana eylem */}
      <AtomicFab
        icon="add"
        onPress={() => console.log('Ana eylem')}
        style={{ right: 80 }}
      />

      {/* İkinci FAB - İkincil eylem */}
      <AtomicFab
        icon="settings-outline"
        variant="secondary"
        size="sm"
        onPress={() => console.log('İkincil eylem')}
      />
    </ScreenLayout>
  );
};
```

## Props

### AtomicFabProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `icon` | `string` | - **(Zorunlu)** | İkon ismi (Ionicons) |
| `onPress` | `() => void` | - **(Zorunlu)** | Tıklama olayı |
| `variant` | `FabVariant` | `'primary'` | FAB variant'ı |
| `size` | `FabSize` | `'md'` | FAB boyutu |
| `disabled` | `boolean` | `false` | Devre dışı |
| `activeOpacity` | `number` | `0.7` | Tıklama opaklığı |
| `accessibilityLabel` | `string` | - | Erişilebilirlik etiketi |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

### FabVariant

```typescript
type FabVariant =
  | 'primary'    // Ana eylem (varsayılan)
  | 'secondary'  // İkincil eylem
  | 'surface';   // Yüzey eylemi
```

### FabSize

```typescript
type FabSize =
  | 'sm'  // Small (40px)
  | 'md'  // Medium (56px, varsayılan)
  | 'lg'; // Large (72px)
```

## Best Practices

### 1. Doğru Kullanım

```tsx
// ✅ DOĞRU - ScreenLayout seviyesinde
<ScreenLayout>
  <ScrollView>
    {/* İçerik */}
  </ScrollView>
  <AtomicFab icon="add" onPress={handleAdd} />
</ScreenLayout>

// ❌ YANLIŞ - ScrollView içinde
<ScrollView>
  <AtomicFab icon="add" onPress={handleAdd} />
</ScrollView>
```

### 2. İkon Seçimi

```tsx
// Ekleme işlemi
<AtomicFab icon="add" />

// Düzenleme
<AtomicFab icon="create" />

// Mesajlaşma
<AtomicFab icon="chatbubble-outline" />

// Paylaşım
<AtomicFab icon="share-outline" />

// Arama
<AtomicFab icon="call-outline" />
```

### 3. Variant Seçimi

```tsx
// Ana eylem
<AtomicFab variant="primary" icon="add" />

// İkincil eylem
<AtomicFab variant="secondary" icon="create" />

// Alternatif eylem
<AtomicFab variant="surface" icon="share" />
```

## Erişilebilirlik

AtomicFab, tam erişilebilirlik desteği sunar:

- ✅ Touch uygun boyut (minimum 40x40)
- ✅ Screen reader desteği
- ✅ Accessibility label
- ✅ Semantic role (button)
- ✅ Test ID desteği

## Performans İpuçları

1. **OnPress Stabilization**: `onPress` callback'ini `useCallback` ile sarın
2. **Avoid Re-renders**: FAB'ı gereksiz yere yeniden render etmeyin
3. **Single FAB**: Genellikle bir ekranda tek FAB olmalıdır

## Material Design 3 Uyumluluğu

Bu bileşen Material Design 3 spesifikasyonlarına uygun olarak tasarlanmıştır:

- ✅ Standart boyutlar (40px, 56px, 72px)
- ✅ Variant renkleri
- ✅ Border ile derinlik (gölge yok)
- ✅ Responsive pozisyonlama
- ✅ Safe area desteği

## İlgili Bileşenler

- [`AtomicButton`](./button/README.md) - Normal buton
- [`AtomicIcon`](./AtomicIcon/README.md) - İkon bileşeni
- [`ScreenLayout`](../layouts/ScreenLayout/README.md) - Ekran düzeni

## Önemli Bilgiler

### FAB Kullanımı

1. **Birincil Eylem**: FAB, ekrandaki en önemli eylem olmalıdır
2. **Sınırlı Sayı**: Bir ekranda genellikle tek FAB bulunur
3. **Pozisyon**: Sağ alt köşededir
4. **Scroll**: İçerik scroll olduğunda sabit kalır

### FAB vs Extended FAB

Standart FAB (bu bileşen):
- Dairesel şekil
- Sadece ikon
- Compact tasarım

Extended FAB (farklı bileşen):
- Dikdörtgen/Pill şekil
- İkon + metin
- Daha fazla yer kaplar

## Lisans

MIT

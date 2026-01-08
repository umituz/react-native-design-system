# MediaCard

MediaCard, resim, video veya medya içeriği göstermek için optimize edilmiş bir kart bileşenidir. Overlay text, badge ve seçim durumu destekler.

## Özellikler

- 🖼️ **Görsel Odaklı**: Resim/video odaklı tasarım
- 📝 **Overlay Text**: Üzerinde metin gösterimi
- 🏷️ **Badge**: Rozet/badge desteği
- ✅ **Selected State**: Seçim durumu
- 📏 **3 Size**: Small, Medium, Large
- 👆 **Pressable**: Tıklanabilir kart
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { MediaCard } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { MediaCard } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <MediaCard
        uri="https://example.com/image.jpg"
        title="Görsel Başlığı"
        subtitle="Alt başlık"
      />
    </View>
  );
};
```

## Basic Card

```tsx
<MediaCard
  uri="https://example.com/image.jpg"
/>
```

## Title & Subtitle

```tsx
<MediaCard
  uri="https://example.com/image.jpg"
  title="Manzara"
  subtitle="Doğa harikası"
/>
```

## Badge

```tsx
<MediaCard
  uri="https://example.com/image.jpg"
  title="Yeni"
  badge="YENİ"
/>
```

## Seçim Durumu

```tsx
<MediaCard
  uri="https://example.com/image.jpg"
  title="Seçili"
  selected
/>
```

## Boyutlar

```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  {/* Small */}
  <MediaCard
    uri="https://example.com/image.jpg"
    size="sm"
  />

  {/* Medium */}
  <MediaCard
    uri="https://example.com/image.jpg"
    size="md"
  />

  {/* Large */}
  <MediaCard
    uri="https://example.com/image.jpg"
    size="lg"
  />
</View>
```

## Pressable

```tsx
<MediaCard
  uri="https://example.com/image.jpg"
  title="Tıkla"
  onPress={() => console.log('Tıklandı')}
/>
```

## Custom Genişlik

```tsx
<MediaCard
  uri="https://example.com/image.jpg"
  width={200}
  size="lg"
/>
```

## Overlay Pozisyonu

```tsx
<View style={{ gap: 8 }}>
  {/* Altta */}
  <MediaCard
    uri="https://example.com/image.jpg"
    overlayPosition="bottom"
    title="Altta"
  />

  {/* Ortada */}
  <MediaCard
    uri="https://example.com/image.jpg"
    overlayPosition="center"
    title="Ortada"
  />
</View>
```

## Overlay Gizle

```tsx
<MediaCard
  uri="https://example.com/image.jpg"
  showOverlay={false}
/>
```

## Örnek Kullanımlar

### Fotoğraf Galeri

```tsx
export const PhotoGallery = ({ photos }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 16 }}>
      {photos.map((photo) => (
        <MediaCard
          key={photo.id}
          uri={photo.uri}
          size="sm"
          onPress={() => navigation.navigate('PhotoDetail', { photoId: photo.id })}
        />
      ))}
    </View>
  );
};
```

### Şablon Seçimi

```tsx
export const TemplateGallery = ({ templates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={templates}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MediaCard
            uri={item.thumbnail}
            title={item.name}
            selected={selectedTemplate?.id === item.id}
            onPress={() => setSelectedTemplate(item)}
            style={{ margin: 8 }}
          />
        )}
      />

      <Button
        title="Şablonu Kullan"
        onPress={() => applyTemplate(selectedTemplate)}
      />
    </View>
  );
};
```

### Ürün Kartları

```tsx
export const ProductGrid = ({ products }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {products.map((product) => (
        <MediaCard
          key={product.id}
          uri={product.image}
          title={product.name}
          subtitle={`${product.price} TL`}
          badge={product.isNew ? 'YENİ' : ''}
          onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
        />
      ))}
    </View>
  );
};
```

### Hikaye Seçimi

```tsx
export const StorySelector = ({ stories }) => {
  return (
    <ScrollView horizontal style={{ padding: 16 }}>
      {stories.map((story) => (
        <MediaCard
          key={story.id}
          uri={story.avatar}
          size="sm"
          aspectRatio={1}
          onPress={() => openStory(story)}
          style={{ marginRight: 8 }}
        />
      ))}
    </ScrollView>
  );
};
```

### Meme Koleksiyonu

```tsx
export const MemeGallery = ({ memes }) => {
  const [selectedMemes, setSelectedMemes] = useState(new Set());

  const toggleSelection = (id) => {
    const newSet = new Set(selectedMemes);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedMemes(newSet);
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {memes.map((meme) => (
        <MediaCard
          key={meme.id}
          uri={meme.image}
          selected={selectedMemes.has(meme.id)}
          onPress={() => toggleSelection(meme.id)}
        />
      ))}
    </View>
  );
};
```

### Arka Plan Seçimi

```tsx
export const BackgroundPicker = ({ backgrounds }) => {
  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={backgrounds}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MediaCard
            uri={item.thumbnail}
            selected={selectedBg?.id === item.id}
            onPress={() => setSelectedBg(item)}
            style={{ margin: 4 }}
          />
        )}
      />
    </View>
  );
};
```

## Props

### MediaCardProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `uri` | `string` | - **(Zorunlu)** | Resim URI'si |
| `title` | `string` | - | Başlık metni |
| `subtitle` | `string` | - | Alt başlık |
| `badge` | `string \| number` | - | Badge içeriği |
| `selected` | `boolean` | `false` | Seçili durumu |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Kart boyutu |
| `aspectRatio` | `number` | `0.8` | En-boy oranı |
| `overlayPosition` | `'top' \| 'bottom' \| 'center'` | `'bottom'` | Overlay pozisyonu |
| `showOverlay` | `boolean` | `true` | Overlay göster |
| `width` | `number` | - | Custom genişlik |
| `onPress` | `() => void` | - | Tıklama olayı |
| `testID` | `string` | - | Test ID'si |

## Best Practices

### 1. Boyut Seçimi

```tsx
// Yoğun grid
<MediaCard size="sm" />

// Normal grid
<MediaCard size="md" />

// Vurgu
<MediaCard size="lg" />
```

### 2. Aspect Ratio

```tsx
// Kare
<MediaCard aspectRatio={1} />

// Dikdörtgen
<MediaCard aspectRatio={0.8} />

// Yatay
<MediaCard aspectRatio={1.2} />
```

### 3. Overlay Kullanımı

```tsx
// Bilgi için
<MediaCard title="Başlık" subtitle="Açıklama" />

// Sadece görsel
<MediaCard showOverlay={false} />
```

## Erişilebilirlik

MediaCard, tam erişilebilirlik desteği sunar:

- ✅ Touch uygun boyut
- ✅ Screen reader desteği
- ✅ Selected state anonsu
- ✅ Test ID desteği

## Performans İpuçları

1. **Optimization**: Resimleri optimize edin
2. **Caching**: Resimleri cache'leyin
3. **Lazy Loading**: Uzun listelerde lazy load kullanın

## İlgili Bileşenler

- [`AtomicCard`](../../atoms/AtomicCard.README.md) - Basit kart
- [`GlowingCard`](../GlowingCard/README.md) - Parlak kart
- [`AtomicImage`](../../atoms/AtomicImage/README.md) - Resim bileşeni

## Lisans

MIT

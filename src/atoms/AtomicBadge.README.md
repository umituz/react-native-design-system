# AtomicBadge

AtomicBadge, etiketler, durum göstergeleri ve küçük bilgi etiketleri için kullanılan bir rozet bileşenidir.

## Özellikler

- 🏷️ **6 Variant**: Primary, Secondary, Success, Warning, Error, Info
- 📏 **3 Size**: Small, Medium, Large
- 🎭 **İkon Desteği**: Sol veya sağ ikon
- 🎨 **Semantic Colors**: Anlamlı renkler
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği
- 💪 **React.memo**: Optimize edilmiş render

## Kurulum

```tsx
import { AtomicBadge } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { AtomicBadge } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <AtomicBadge text="Badge" />
    </View>
  );
};
```

## Variant'lar

```tsx
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <AtomicBadge text="Primary" variant="primary" />
  <AtomicBadge text="Secondary" variant="secondary" />
  <AtomicBadge text="Success" variant="success" />
  <AtomicBadge text="Warning" variant="warning" />
  <AtomicBadge text="Error" variant="error" />
  <AtomicBadge text="Info" variant="info" />
</View>
```

## Boyutlar

```tsx
<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
  {/* Small */}
  <AtomicBadge text="Small" size="sm" variant="primary" />

  {/* Medium (Varsayılan) */}
  <AtomicBadge text="Medium" size="md" variant="primary" />

  {/* Large */}
  <AtomicBadge text="Large" size="lg" variant="primary" />
</View>
```

## İkonlu Badge

```tsx
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  {/* Sol İkon */}
  <AtomicBadge
    text="New"
    variant="success"
    icon="checkmark-circle"
    iconPosition="left"
  />

  {/* Sağ İkon */}
  <AtomicBadge
    text="Error"
    variant="error"
    icon="warning"
    iconPosition="right"
  />
</View>
```

## Örnek Kullanımlar

### Durum Rozetleri

```tsx
export const StatusBadges = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <AtomicBadge text="Aktif" variant="success" icon="checkmark-circle" />
      <AtomicBadge text="Beklemede" variant="warning" icon="time" />
      <AtomicBadge text="İptal" variant="error" icon="close-circle" />
      <AtomicBadge text="Taslak" variant="secondary" icon="document" />
    </View>
  );
};
```

### Kategori Etiketleri

```tsx
export const CategoryBadges = ({ categories }) => {
  return (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      {categories.map((category) => (
        <AtomicBadge
          key={category.id}
          text={category.name}
          variant="primary"
          size="sm"
        />
      ))}
    </View>
  );
};
```

### Sürüm Etiketi

```tsx
export const VersionBadge = ({ version }) => {
  return (
    <AtomicBadge
      text={`v${version}`}
      variant="info"
      icon="code-slash"
      size="sm"
    />
  );
};
```

### Bildirim Sayısı

```tsx
export const NotificationBadge = ({ count }) => {
  return (
    <View style={{ position: 'relative' }}>
      <AtomicIcon name="notifications-outline" size="lg" />

      {count > 0 && (
        <View style={{ position: 'absolute', top: -4, right: -4 }}>
          <AtomicBadge
            text={count > 99 ? '99+' : count.toString()}
            variant="error"
            size="sm"
          />
        </View>
      )}
    </View>
  );
};
```

### Ürün Durumu

```tsx
export const ProductBadges = ({ product }) => {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {product.isNew && (
        <AtomicBadge
          text="Yeni"
          variant="success"
          icon="sparkles"
          size="sm"
        />
      )}

      {product.isOnSale && (
        <AtomicBadge
          text="İndirim"
          variant="error"
          icon="pricetag"
          size="sm"
        />
      )}

      {product.isLimited && (
        <AtomicBadge
          text="Sınırlı"
          variant="warning"
          icon="time"
          size="sm"
        />
      )}
    </View>
  );
};
```

### Kullanıcı Rolü

```tsx
export const RoleBadge = ({ role }) => {
  const variants = {
    admin: 'error',
    moderator: 'warning',
    user: 'primary',
    guest: 'secondary',
  };

  return (
    <AtomicBadge
      text={role.toUpperCase()}
      variant={variants[role]}
      size="sm"
    />
  );
};
```

### Öncelik

```tsx
export const PriorityBadge = ({ priority }) => {
  const config = {
    low: { variant: 'secondary', icon: 'arrow-down' },
    medium: { variant: 'info', icon: 'remove' },
    high: { variant: 'warning', icon: 'arrow-up' },
    urgent: { variant: 'error', icon: 'warning' },
  };

  const { variant, icon } = config[priority];

  return (
    <AtomicBadge
      text={priority.toUpperCase()}
      variant={variant}
      icon={icon}
      size="sm"
    />
  );
};
```

### Fiyat Etiketi

```tsx
export const PriceBadge = ({ price, originalPrice }) => {
  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <AtomicText type="titleLarge" fontWeight="700">
        ${price}
      </AtomicText>

      {discount > 0 && (
        <AtomicBadge
          text={`%${discount} İndirim`}
          variant="error"
          icon="pricetag"
          size="sm"
        />
      )}
    </View>
  );
};
```

### Listede Rozetler

```tsx
export const ListItemWithBadges = ({ item }) => {
  return (
    <View style={{ padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <AtomicText type="bodyLarge" fontWeight="600">
            {item.title}
          </AtomicText>
          <AtomicText type="bodySmall" color="textSecondary">
            {item.description}
          </AtomicText>
        </View>

        <View style={{ flexDirection: 'row', gap: 4 }}>
          {item.badges.map((badge) => (
            <AtomicBadge
              key={badge.id}
              text={badge.text}
              variant={badge.variant}
              size="sm"
            />
          ))}
        </View>
      </View>
    </View>
  );
};
```

### Özellik Rozetleri

```tsx
export const FeatureBadges = ({ features }) => {
  return (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      {features.map((feature) => (
        <AtomicBadge
          key={feature.id}
          text={feature.name}
          variant="info"
          icon={feature.icon}
          size="sm"
        />
      ))}
    </View>
  );
};
```

## Props

### AtomicBadgeProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `text` | `string` | - **(Zorunlu)** | Rozet metni |
| `variant` | `BadgeVariant` | `'primary'` | Rozet variant'ı |
| `size` | `BadgeSize` | `'md'` | Rozet boyutu |
| `icon` | `IconName` | - | İkon ismi |
| `iconPosition` | `'left' \| 'right'` | `'left'` | İkon konumu |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |
| `textStyle` | `StyleProp<TextStyle>` | - | Metin stili |
| `testID` | `string` | - | Test ID'si |

### BadgeVariant

```typescript
type BadgeVariant =
  | 'primary'    // Ana renk
  | 'secondary'  // İkincil renk
  | 'success'    // Başarı rengi
  | 'warning'    // Uyarı rengi
  | 'error'      // Hata rengi
  | 'info';      // Bilgi rengi
```

### BadgeSize

```typescript
type BadgeSize =
  | 'sm'  // Small
  | 'md'  // Medium (varsayılan)
  | 'lg'; // Large
```

## Best Practices

### 1. Variant Seçimi

```tsx
// Başarı durumu
<AtomicBadge variant="success" />

// Hata durumu
<AtomicBadge variant="error" />

// Uyarı durumu
<AtomicBadge variant="warning" />

// Bilgi durumu
<AtomicBadge variant="info" />
```

### 2. Boyut Seçimi

```tsx
// Yoğun içerik için
<AtomicBadge size="sm" />

// Normal kullanım
<AtomicBadge size="md" />

// Vurgu için
<AtomicBadge size="lg" />
```

### 3. İkon Kullanımı

```tsx
// Durum göstergeleri
<AtomicBadge icon="checkmark-circle" variant="success" />

// Kategoriler
<AtomicBadge icon="pricetag" variant="primary" />

// Uyarılar
<AtomicBadge icon="warning" variant="warning" />
```

## Erişilebilirlik

AtomicBadge, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Semantic renkler
- ✅ Touch uygun boyut
- ✅ Test ID desteği

## Performans İpuçları

1. **React.memo**: AtomicBadge zaten optimize edilmiş
2. **Static Props**: Prop'ları sabit tutun
3. **Listelerde**: `key` prop'unu kullanmayı unutmayın

## İlgili Bileşenler

- [`AtomicChip`](./chip/README.md) - Chip bileşeni
- [`AtomicIcon`](./AtomicIcon/README.md) - İkon bileşeni
- [`AtomicText`](./AtomicText/README.md) - Metin bileşeni

## Lisans

MIT

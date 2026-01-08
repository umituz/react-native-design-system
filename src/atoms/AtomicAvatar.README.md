# AtomicAvatar

AtomicAvatar, kullanıcı profil resimlerini göstermek için tasarlanmış çok yönlü bir avatar bileşenidir. Resim yoksa ismin baş harflerini gösterir.

## Özellikler

- 🖼️ **Image Support**: URI veya require ile resim yükleme
- 🔤 **Initials Fallback**: Resim yoksa baş harfler
- 📏 **6 Size**: xs, sm, md, lg, xl, xxl
- 🎨 **Özelleştirilebilir**: Renk, border, stil
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği
- 🌐 **Responsive**: Otomatik boyutlandırma

## Kurulum

```tsx
import { AtomicAvatar } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { AtomicAvatar } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      {/* Resim ile */}
      <AtomicAvatar
        source={{ uri: 'https://example.com/avatar.jpg' }}
      />

      {/* İsim ile (baş harfler) */}
      <AtomicAvatar
        name="Ahmet Yılmaz"
      />
    </View>
  );
};
```

## Boyutlar

```tsx
<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
  {/* Extra Small */}
  <AtomicAvatar
    name="AY"
    size="xs"
  />

  {/* Small */}
  <AtomicAvatar
    name="Ahmet"
    size="sm"
  />

  {/* Medium (Varsayılan) */}
  <AtomicAvatar
    name="Ahmet"
    size="md"
  />

  {/* Large */}
  <AtomicAvatar
    name="Ahmet"
    size="lg"
  />

  {/* Extra Large */}
  <AtomicAvatar
    name="Ahmet"
    size="xl"
  />

  {/* Extra Extra Large */}
  <AtomicAvatar
    name="Ahmet"
    size="xxl"
  />
</View>
```

## Resim ile

```tsx
{/* URI ile */}
<AtomicAvatar
  source={{ uri: 'https://example.com/avatar.jpg' }}
/>

{/* Local resim */}
<AtomicAvatar
  source={require('./assets/avatar.png')}
/>

{/* Custom size */}
<AtomicAvatar
  source={{ uri: 'https://example.com/avatar.jpg' }}
  customSize={80}
/>
```

## Baş Harfler ile

```tsx
{/* Tek isim */}
<AtomicAvatar name="Ahmet" /> {/* A */}

{/* İki isim */}
<AtomicAvatar name="Ahmet Yılmaz" /> {/* AY */}

{/* Üç isim */}
<AtomicAvatar name="Ahmet Can Yılmaz" /> {/* AC */}

{/* Boş isim */}
<AtomicAvatar /> {/* ? */}
```

## Custom Renkler

```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  {/* Custom background */}
  <AtomicAvatar
    name="Ahmet"
    backgroundColor="#6366f1"
    textColor="#ffffff"
  />

  {/* Custom text */}
  <AtomicAvatar
    name="Ayşe"
    backgroundColor="#ec4899"
    textColor="#ffffff"
  />
</View>
```

## Border

```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  {/* Border width */}
  <AtomicAvatar
    name="Ahmet"
    borderWidth={2}
    borderColor="#6366f1"
  />

  {/* Custom border */}
  <AtomicAvatar
    name="Ayşe"
    borderWidth={3}
    borderColor="#ec4899"
  />
</View>
```

## Custom Border Radius

```tsx
{/* Yuvarlak (varsayılan) */}
<AtomicAvatar
  name="Ahmet"
  size="lg"
/>

{/* Kare */}
<AtomicAvatar
  name="Ahmet"
  size="lg"
  borderRadius={8}
/>

<!-- Köşeli yuvarlatılmış -->
<AtomicAvatar
  name="Ahmet"
  size="lg"
  borderRadius={16}
/>
```

## Örnek Kullanımlar

### Kullanıcı Listesi

```tsx
export const UserList = ({ users }) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <AtomicAvatar
            source={item.avatar ? { uri: item.avatar } : undefined}
            name={item.name}
            size="md"
            style={{ marginRight: 12 }}
          />

          <View>
            <AtomicText type="bodyLarge" fontWeight="600">
              {item.name}
            </AtomicText>
            <AtomicText type="bodySmall" color="textSecondary">
              {item.email}
            </AtomicText>
          </View>
        </View>
      )}
    />
  );
};
```

### Profil Başlığı

```tsx
export const ProfileHeader = ({ user }) => {
  return (
    <View style={{ alignItems: 'center', padding: 24 }}>
      <AtomicAvatar
        source={user.avatar ? { uri: user.avatar } : undefined}
        name={user.name}
        size="xxl"
        borderWidth={3}
        borderColor={tokens.colors.primary}
        style={{ marginBottom: 16 }}
      />

      <AtomicText type="headlineSmall">
        {user.name}
      </AtomicText>

      <AtomicText type="bodyMedium" color="textSecondary">
        @{user.username}
      </AtomicText>
    </View>
  );
};
```

### Avatar Grubu

```tsx
export const AvatarGroup = ({ users, max = 3 }) => {
  const visibleUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <View style={{ flexDirection: 'row' }}>
      {visibleUsers.map((user, index) => (
        <AtomicAvatar
          key={user.id}
          source={user.avatar ? { uri: user.avatar } : undefined}
          name={user.name}
          size="sm"
          style={{
            marginLeft: index > 0 ? -8 : 0,
            borderWidth: 2,
            borderColor: tokens.colors.backgroundPrimary,
          }}
        />
      ))}

      {remainingCount > 0 && (
        <View
          style={{
            width: tokens.avatarSizes.sm,
            height: tokens.avatarSizes.sm,
            borderRadius: tokens.avatarSizes.sm / 2,
            backgroundColor: tokens.colors.surfaceVariant,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: -8,
            borderWidth: 2,
            borderColor: tokens.colors.backgroundPrimary,
          }}
        >
          <AtomicText type="labelSmall">
            +{remainingCount}
          </AtomicText>
        </View>
      )}
    </View>
  );
};
```

### Yorum Bileşeni

```tsx
export const Comment = ({ comment }) => {
  return (
    <View style={{ flexDirection: 'row', padding: 16 }}>
      <AtomicAvatar
        source={comment.author.avatar ? { uri: comment.author.avatar } : undefined}
        name={comment.author.name}
        size="sm"
        style={{ marginRight: 12 }}
      />

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <AtomicText type="bodyMedium" fontWeight="600">
            {comment.author.name}
          </AtomicText>
          <AtomicText type="bodySmall" color="textTertiary" style={{ marginLeft: 8 }}>
            {comment.timestamp}
          </AtomicText>
        </View>

        <AtomicText type="bodyMedium">
          {comment.text}
        </AtomicText>
      </View>
    </View>
  );
};
```

### Navigasyon

```tsx
export const ProfileTab = ({ user }) => {
  return (
    <Pressable
      style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
      onPress={() => navigation.navigate('Profile', { userId: user.id })}
    >
      <AtomicAvatar
        source={user.avatar ? { uri: user.avatar } : undefined}
        name={user.name}
        size="md"
      />

      <View style={{ marginLeft: 12, flex: 1 }}>
        <AtomicText type="bodyLarge" fontWeight="600">
          {user.name}
        </AtomicText>
        <AtomicText type="bodySmall" color="textSecondary">
          Profili görüntüle
        </AtomicText>
      </View>

      <AtomicIcon name="chevron-forward" size="sm" />
    </Pressable>
  );
};
```

### Online Durumu

```tsx
export const AvatarWithStatus = ({ user, isOnline }) => {
  return (
    <View style={{ position: 'relative' }}>
      <AtomicAvatar
        source={user.avatar ? { uri: user.avatar } : undefined}
        name={user.name}
        size="lg"
      />

      {isOnline && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: tokens.colors.success,
            borderWidth: 2,
            borderColor: tokens.colors.backgroundPrimary,
          }}
        />
      )}
    </View>
  );
};
```

## Props

### AtomicAvatarProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `source` | `ImageSourcePropType` | - | Resim kaynağı |
| `name` | `string` | - | Kullanıcı ismi (baş harfler için) |
| `size` | `AvatarSize` | `'md'` | Avatar boyutu |
| `customSize` | `number` | - | Özel boyut (px) |
| `backgroundColor` | `string` | - | Arka plan rengi |
| `textColor` | `string` | - | Metin rengi |
| `borderRadius` | `number` | - | Köşe yarıçapı |
| `borderWidth` | `number` | `0` | Çerçeve kalınlığı |
| `borderColor` | `string` | - | Çerçeve rengi |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |
| `imageStyle` | `StyleProp<ImageStyle>` | - | Resim stili |
| `testID` | `string` | - | Test ID'si |

### AvatarSize

```typescript
type AvatarSize =
  | 'xs'   // Extra small
  | 'sm'   // Small
  | 'md'   // Medium (varsayılan)
  | 'lg'   // Large
  | 'xl'   // Extra large
  | 'xxl'; // Extra extra large
```

## Best Practices

### 1. Boyut Seçimi

```tsx
// Küçük alanlar için
<AtomicAvatar size="xs" />

// Liste elemanları için
<AtomicAvatar size="sm" />

// Normal kullanım
<AtomicAvatar size="md" />

// Vurgu için
<AtomicAvatar size="lg" />

// Profil sayfası için
<AtomicAvatar size="xxl" />
```

### 2. Initials Kullanımı

```tsx
// İsim varsa
<AtomicAvatar name="Ahmet Yılmaz" /> {/* AY */}

// İsim yoksa
<AtomicAvatar /> {/* ? */}
```

### 3. Resim Yükleme

```tsx
// URI ile
<AtomicAvatar source={{ uri: avatarUrl }} />

// Local resim
<AtomicAvatar source={require('./avatar.png')} />
```

## Erişilebilirlik

AtomicAvatar, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Accessibility label
- ✅ Semantic role (image)
- ✅ Test ID desteği

## Performans İpuçları

1. **Image Caching**: Resimleri cache'leyin
2. **Lazy Loading**: Uzun listelerde lazy load kullanın
3. **Resize**: Resimleri doğru boyutta yükleyin

## İlgili Bileşenler

- [`AvatarGroup`](../../molecules/avatar/AvatarGroup/README.md) - Avatar grubu
- [`AtomicCard`](./AtomicCard.README.md) - Kart bileşeni
- [`AtomicIcon`](./AtomicIcon/README.md) - İkon bileşeni

## Lisans

MIT

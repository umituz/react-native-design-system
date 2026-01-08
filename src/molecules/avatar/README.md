# Avatar (Molecule)

Avatar molecule bileşeni, kullanıcı profil resimlerini göstermek için gelişmiş bir bileşendir. Resim, isim baş harfleri veya ikon fallback'ları destekler. Ayrıca online durumu gösterebilir.

## Özellikler

- 🖼️ **Resim Desteği**: URI ile resim yükleme
- 🔤 **Initials**: İsimden baş harfleri oluşturma
- 🎭 **İkon Fallback**: Fallback ikon desteği
- 🟢 **Status Indicator**: Online/offline durumu
- 📏 **5 Size**: xs, sm, md, lg, xl
- 🔲 **2 Shape**: Circle, Square
- 🎨 **Özelleştirilebilir**: Renk ve stil
- 👆 **Pressable**: Tıklanabilir avatar

## Kurulum

```tsx
import { Avatar } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View style={{ padding: 16 }}>
      <Avatar
        uri="https://example.com/avatar.jpg"
        size="md"
      />
    </View>
  );
};
```

## Basic Avatar

```tsx
{/* Resim ile */}
<Avatar
  uri="https://example.com/avatar.jpg"
  size="md"
/>

{/* İsim ile (initials) */}
<Avatar
  name="Ahmet Yılmaz"
  size="md"
/>

{/* İkon ile */}
<Avatar
  icon="person-outline"
  size="md"
/>
```

## Boyutlar

```tsx
<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
  <Avatar name="A" size="xs" />
  <Avatar name="A" size="sm" />
  <Avatar name="A" size="md" />
  <Avatar name="A" size="lg" />
  <Avatar name="A" size="xl" />
</View>
```

## Shape

```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  {/* Circle (varsayılan) */}
  <Avatar
    uri="https://example.com/avatar.jpg"
    shape="circle"
    size="lg"
  />

  {/* Square */}
  <Avatar
    uri="https://example.com/avatar.jpg"
    shape="square"
    size="lg"
  />
</View>
```

## Status Indicator

```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  <Avatar
    uri="https://example.com/avatar.jpg"
    showStatus
    status="online"
    size="lg"
  />

  <Avatar
    uri="https://example.com/avatar.jpg"
    showStatus
    status="offline"
    size="lg"
  />

  <Avatar
    uri="https://example.com/avatar.jpg"
    showStatus
    status="away"
    size="lg"
  />

  <Avatar
    uri="https://example.com/avatar.jpg"
    showStatus
    status="busy"
    size="lg"
  />
</View>
```

## Custom Background

```tsx
<Avatar
  name="Ahmet"
  backgroundColor="#6366f1"
  size="lg"
/>
```

## Pressable

```tsx
<Avatar
  uri="https://example.com/avatar.jpg"
  size="lg"
  onPress={() => navigation.navigate('Profile')}
/>
```

## Örnek Kullanımlar

### Kullanıcı Listesi

```tsx
export const UserList = ({ users }) => {
  return (
    <View style={{ padding: 16 }}>
      {users.map((user) => (
        <View key={user.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Avatar
            uri={user.avatar}
            name={user.name}
            showStatus
            status={user.status}
            size="md"
            style={{ marginRight: 12 }}
          />

          <View style={{ flex: 1 }}>
            <AtomicText type="bodyLarge" fontWeight="600">
              {user.name}
            </AtomicText>
            <AtomicText type="bodySmall" color="textSecondary">
              @{user.username}
            </AtomicText>
          </View>
        </View>
      ))}
    </View>
  );
};
```

### Avatar Group

```tsx
export const AvatarGroup = ({ users, max = 3 }) => {
  const visibleUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <View style={{ flexDirection: 'row' }}>
      {visibleUsers.map((user, index) => (
        <Avatar
          key={user.id}
          uri={user.avatar}
          name={user.name}
          size="sm"
          style={{
            marginLeft: index > 0 ? -8 : 0,
            borderWidth: 2,
            borderColor: '#fff',
          }}
        />
      ))}

      {remainingCount > 0 && (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: -8,
            borderWidth: 2,
            borderColor: '#fff',
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

### Profil Header

```tsx
export const ProfileHeader = ({ user }) => {
  return (
    <View style={{ alignItems: 'center', padding: 24 }}>
      <Avatar
        uri={user.avatar}
        name={user.name}
        size="xl"
        showStatus
        status={user.status}
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

### Sohbet Listesi

```tsx
export const ChatList = ({ chats }) => {
  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
          onPress={() => navigation.navigate('Chat', { chatId: item.id })}
        >
          <Avatar
            uri={item.avatar}
            name={item.name}
            showStatus
            status={item.online ? 'online' : 'offline'}
            size="md"
            style={{ marginRight: 12 }}
          />

          <View style={{ flex: 1 }}>
            <AtomicText type="bodyLarge" fontWeight="600">
              {item.name}
            </AtomicText>
            <AtomicText type="bodySmall" color="textSecondary" numberOfLines={1}>
              {item.lastMessage}
            </AtomicText>
          </View>

          <AtomicText type="bodySmall" color="textTertiary">
            {item.time}
          </AtomicText>
        </Pressable>
      )}
    />
  );
};
```

### Takım Üyeleri

```tsx
export const TeamMembers = ({ members }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {members.map((member) => (
        <View key={member.id} style={{ alignItems: 'center' }}>
          <Avatar
            uri={member.avatar}
            name={member.name}
            showStatus
            status={member.status}
            size="sm"
          />

          <AtomicText type="bodySmall" style={{ marginTop: 4 }}>
            {member.firstName}
          </AtomicText>
        </View>
      ))}
    </View>
  );
};
```

## Props

### AvatarProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `uri` | `string` | - | Resim URI'si |
| `name` | `string` | - | Kullanıcı ismi |
| `icon` | `string` | - | Fallback ikon |
| `size` | `AvatarSize` | `'md'` | Avatar boyutu |
| `shape` | `AvatarShape` | `'circle'` | Avatar şekli |
| `backgroundColor` | `string` | - | Arka plan rengi |
| `showStatus` | `boolean` | `false` | Status göster |
| `status` | `StatusType` | `'offline'` | Durum |
| `style` | `ViewStyle` | - | Özel stil |
| `imageStyle` | `ImageStyle` | - | Resim stili |
| `onPress` | `() => void` | - | Tıklama olayı |

### AvatarSize

```typescript
type AvatarSize =
  | 'xs'   // Extra small
  | 'sm'   // Small
  | 'md'   // Medium (varsayılan)
  | 'lg'   // Large
  | 'xl';  // Extra large
```

### AvatarShape

```typescript
type AvatarShape = 'circle' | 'square';
```

### StatusType

```typescript
type StatusType =
  | 'online'   // Yeşil
  | 'offline'  // Gri
  | 'away'     // Sarı
  | 'busy';     // Kırmızı
```

## Best Practices

### 1. Boyut Seçimi

```tsx
// Liste içinde
<Avatar size="sm" />

// Profil sayfası
<Avatar size="xl" />

// Navigasyon
<Avatar size="md" />
```

### 2. Status Kullanımı

```tsx
// Kullanıcı durumu
<Avatar showStatus status="online" />

// Sohbet uygulaması
<Avatar showStatus status={user.isOnline ? 'online' : 'offline'} />
```

### 3. Fallback Hierarchy

```tsx
// 1. Resim varsa
<Avatar uri={avatarUri} />

// 2. İsim varsa
<Avatar name="Ahmet Yılmaz" /> {/* AY */}

// 3. Hiçbiri yoksa
<Avatar /> {/* İkon */}
```

## Erişilebilirlik

Avatar, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Accessibility label
- ✅ FaceID for status
- ✅ Touch uygun boyut
- ✅ Test ID desteği

## Performans İpuçları

1. **Image Caching**: Resimleri cache'leyin
2. **Lazy Loading**: Uzun listelerde lazy load kullanın
3. **Resize**: Resimleri doğru boyutta yükleyin

## İlgili Bileşenler

- [`AvatarGroup`](./AvatarGroup/README.md) - Avatar grubu
- [`AtomicAvatar`](../../atoms/AtomicAvatar/README.md) - Atom avatar
- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - İkon bileşeni

## Lisans

MIT

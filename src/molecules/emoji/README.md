# EmojiPicker

EmojiPicker, emoji seçimi için kullanılan bileşendir. `rn-emoji-keyboard` kütüphanesini wrapper'layarak temiz bir arayüz sunar. Kategori bazlı seçim, arama ve son kullanılan emoji'leri destekler.

## Özellikler

- 😀 **Emoji Seçimi**: Geniş emoji koleksiyonu
- 📁 **Kategoriler**: Kategori bazlı navigasyon
- 🔍 **Arama**: Emoji arama özelliği
- ⏰ **Son Kullanılanlar**: Son kullanılan emoji'ler
- 🌍 **Lokalizasyon**: Çoklu dil desteği
- 🎨 **Özelleştirilebilir**: Konfigürasyon seçenekleri
- ✨ **Animasyonlar**: Smooth animasyonlar

## Kurulum

```tsx
import { EmojiPicker } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { EmojiPicker } from 'react-native-design-system';

export const BasicExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState('');

  const handleEmojiSelect = (emojiObject) => {
    setEmoji(emojiObject.emoji);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Text>{emoji || 'Emoji Seç'}</Text>
      </TouchableOpacity>

      <EmojiPicker
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onEmojiSelected={handleEmojiSelect}
      />
    </View>
  );
};
```

## Basit Emoji Seçimi

```tsx
export const SimpleEmojiPicker = () => {
  const [open, setOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  return (
    <View>
      <Button
        title={selectedEmoji || 'Emoji Seç'}
        onPress={() => setOpen(true)}
      />

      <EmojiPicker
        open={open}
        onClose={() => setOpen(false)}
        onEmojiSelected={(emoji) => {
          setSelectedEmoji(emoji.emoji);
          setOpen(false);
        }}
      />
    </View>
  );
};
```

## Mesajlaşma

```tsx
export const MessageComposer = () => {
  const [message, setMessage] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleEmojiSelect = (emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <TouchableOpacity onPress={() => setEmojiPickerOpen(true)}>
          <AtomicIcon name="happy-outline" size="lg" />
        </TouchableOpacity>

        <TextInput
          style={{ flex: 1, marginLeft: 8 }}
          value={message}
          onChangeText={setMessage}
          placeholder="Mesaj yazın..."
        />

        <Button
          title="Gönder"
          onPress={() => sendMessage(message)}
        />
      </View>

      <EmojiPicker
        open={emojiPickerOpen}
        onClose={() => setEmojiPickerOpen(false)}
        onEmojiSelected={handleEmojiSelect}
      />
    </View>
  );
};
```

## Yorum Ekleme

```tsx
export const CommentInput = () => {
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const insertEmoji = (emojiObject) => {
    setComment(comment + emojiObject.emoji);
  };

  return (
    <View>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <Avatar
            uri={currentUser.avatar}
            name={currentUser.name}
            size="sm"
          />

          <View style={{ flex: 1, marginLeft: 12 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 8,
                padding: 12,
                minHeight: 80,
              }}
              value={comment}
              onChangeText={setComment}
              placeholder="Yorumunuzu yazın..."
              multiline
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <TouchableOpacity onPress={() => setShowEmojiPicker(true)}>
                <AtomicIcon name="happy-outline" size="md" />
              </TouchableOpacity>

              <Button
                title="Yorum Yap"
                onPress={() => postComment(comment)}
              />
            </View>
          </View>
        </View>
      </View>

      <EmojiPicker
        open={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onEmojiSelected={insertEmoji}
      />
    </View>
  );
};
```

## Profil Reaksiyonları

```tsx
export const ProfileReactions = () => {
  const [reactions, setReactions] = useState([]);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const addReaction = (emojiObject) => {
    setReactions([...reactions, emojiObject.emoji]);
    setEmojiPickerOpen(false);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <Avatar
          uri={user.avatar}
          name={user.name}
          size="lg"
        />

        <View style={{ flex: 1, marginLeft: 12 }}>
          <AtomicText type="titleMedium">{user.name}</AtomicText>
          <AtomicText type="bodyMedium" color="secondary">
            {user.bio}
          </AtomicText>
        </View>

        <TouchableOpacity onPress={() => setEmojiPickerOpen(true)}>
          <AtomicIcon name="heart-outline" size="lg" />
        </TouchableOpacity>
      </View>

      {reactions.length > 0 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingBottom: 16 }}>
          {reactions.map((emoji, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#f0f0f0',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                marginRight: 8,
                marginBottom: 8,
              }}
            >
              <AtomicText style={{ fontSize: 18 }}>{emoji}</AtomicText>
            </View>
          ))}
        </View>
      )}

      <EmojiPicker
        open={emojiPickerOpen}
        onClose={() => setEmojiPickerOpen(false)}
        onEmojiSelected={addReaction}
      />
    </View>
  );
};
```

## Post Oluşturma

```tsx
export const PostCreator = () => {
  const [content, setContent] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleEmojiSelect = (emojiObject) => {
    setContent(content + emojiObject.emoji);
  };

  const createPost = () => {
    if (content.trim()) {
      publishPost(content);
      setContent('');
    }
  };

  return (
    <AtomicCard variant="outlined" style={{ margin: 16 }}>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <Avatar
            uri={currentUser.avatar}
            name={currentUser.name}
            size="md"
          />

          <View style={{ flex: 1, marginLeft: 12 }}>
            <TextInput
              style={{ minHeight: 100 }}
              value={content}
              onChangeText={setContent}
              placeholder="Neler oluyor?"
              multiline
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <TouchableOpacity onPress={() => setEmojiPickerOpen(true)}>
                  <AtomicIcon name="happy-outline" size="md" color="primary" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AtomicIcon name="image-outline" size="md" color="primary" />
                </TouchableOpacity>
              </View>

              <Button
                title="Paylaş"
                onPress={createPost}
                disabled={!content.trim()}
              />
            </View>
          </View>
        </View>
      </View>

      <EmojiPicker
        open={emojiPickerOpen}
        onClose={() => setEmojiPickerOpen(false)}
        onEmojiSelected={handleEmojiSelect}
      />
    </AtomicCard>
  );
};
```

## Grup İsmi

```tsx
export const GroupNameEditor = () => {
  const [groupName, setGroupName] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="titleMedium" style={{ marginBottom: 8 }}>
        Grup İsmi
      </AtomicText>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setEmojiPickerOpen(true)}
        >
          <AtomicText style={{ fontSize: 32 }}>
            {groupName.slice(0, 1) || '📝'}
          </AtomicText>
        </TouchableOpacity>

        <TextInput
          style={{ flex: 1, marginLeft: 12 }}
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Grup adı..."
        />
      </View>

      <EmojiPicker
        open={emojiPickerOpen}
        onClose={() => setEmojiPickerOpen(false)}
        onEmojiSelected={(emoji) => {
          setGroupName(emoji.emoji + ' ' + groupName);
          setEmojiPickerOpen(false);
        }}
      />
    </View>
  );
};
```

## Emoji Reaksiyonları

```tsx
export const MessageReactions = ({ message }) => {
  const [reactions, setReactions] = useState(message.reactions || []);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const addReaction = (emojiObject) => {
    const existing = reactions.find(r => r.emoji === emojiObject.emoji);

    if (existing) {
      // Remove reaction if already exists
      setReactions(reactions.filter(r => r.emoji !== emojiObject.emoji));
    } else {
      // Add new reaction
      setReactions([...reactions, {
        emoji: emojiObject.emoji,
        users: [currentUser.id],
        count: 1,
      }]);
    }

    setEmojiPickerOpen(false);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
        {reactions.map((reaction, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: reaction.users.includes(currentUser.id)
                ? `${tokens.colors.primary}20`
                : '#f0f0f0',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 16,
              borderWidth: reaction.users.includes(currentUser.id) ? 1 : 0,
              borderColor: tokens.colors.primary,
            }}
            onPress={() => addReaction({ emoji: reaction.emoji })}
          >
            <AtomicText style={{ fontSize: 16, marginRight: 4 }}>
              {reaction.emoji}
            </AtomicText>
            <AtomicText type="labelSmall">
              {reaction.count}
            </AtomicText>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 16,
          }}
          onPress={() => setEmojiPickerOpen(true)}
        >
          <AtomicIcon name="add-outline" size="sm" />
        </TouchableOpacity>
      </View>

      <EmojiPicker
        open={emojiPickerOpen}
        onClose={() => setEmojiPickerOpen(false)}
        onEmojiSelected={addReaction}
      />
    </View>
  );
};
```

## Emoji Filtreleme

```tsx
export const EmojiFilter = () => {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [filteredContent, setFilteredContent] = useState([]);

  const handleEmojiSelect = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
    setEmojiPickerOpen(false);

    // Filter content by emoji reaction
    const filtered = content.filter(item =>
      item.reactions?.some(r => r.emoji === emojiObject.emoji)
    );
    setFilteredContent(filtered);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8 }}>
        <TouchableOpacity onPress={() => {
          setSelectedEmoji('');
          setFilteredContent(content);
        }}>
          <AtomicText type="labelLarge">Tümü</AtomicText>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: selectedEmoji ? `${tokens.colors.primary}20` : '#f0f0f0',
            borderRadius: 16,
          }}
          onPress={() => setEmojiPickerOpen(true)}
        >
          <AtomicText style={{ fontSize: 18 }}>
            {selectedEmoji || '😀'}
          </AtomicText>
        </TouchableOpacity>
      </View>

      <EmojiPicker
        open={emojiPickerOpen}
        onClose={() => setEmojiPickerOpen(false)}
        onEmojiSelected={handleEmojiSelect}
      />
    </View>
  );
};
```

## Props

### EmojiPickerProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `open` | `boolean` | - **(Zorunlu)** | Picker açık mı |
| `onClose` | `() => void` | - **(Zorunlu)** | Kapanma callback'i |
| `onEmojiSelected` | `(emoji) => void` | - **(Zorunlu)** | Emoji seçildiğinde |
| `config` | `EmojiPickerConfig` | `{}` | Konfigürasyon |

### EmojiPickerConfig

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `enableRecentlyUsed` | `boolean` | `true` | Son kullanılanlar |
| `enableSearch` | `boolean` | `true` | Arama çubuğu |
| `enableCategoryTabs` | `boolean` | `true` | Kategori sekmeleri |
| `categoryOrder` | `string[]` | - | Kategori sırası |
| `translation` | `object` | - | Lokalizasyon |

### EmojiObject

| Prop | Tip | Açıklama |
|------|-----|----------|
| `emoji` | `string` | Emoji karakteri |
| `name` | `string` | Emoji adı |
| `slug` | `string` | URL slug |
| `unicode_version` | `string` | Unicode versiyonu |

## Best Practices

### 1. Kullanıcı Deneyimi

```tsx
// ✅ İyi - Hemen kapanır
onEmojiSelected={(emoji) => {
  onEmojiSelect(emoji);
  onClose(); // Hemen kapat
}}
```

### 2. State Yönetimi

```tsx
// ✅ İyi - Ayrı state
const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
const [selectedEmoji, setSelectedEmoji] = useState('');
```

### 3. Trigger Butonu

```tsx
// ✅ İyi - İkonlu buton
<TouchableOpacity onPress={() => setEmojiPickerOpen(true)}>
  <AtomicIcon name="happy-outline" size="lg" />
</TouchableOpacity>
```

## Erişilebilirlik

EmojiPicker, erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Touch uygun boyut
- ✅ Semantic anlamlar

## Performans İpuçları

1. **Lazy Load**: Lazy loading kullanın
2. **Cache**: Emoji'leri cache'leyin
3. **Unmount**: Kullanılmadığında unmount edin

## İlgili Bileşenler

- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - İkon bileşeni
- [`FormField`](../FormField/README.md) - Form alanı
- [`BaseModal`](../BaseModal/README.md) - Modal bileşeni

## Bağımlılıklar

- `rn-emoji-keyboard` - Emoji picker UI library

## Lisans

MIT

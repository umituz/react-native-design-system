# ListItem

ListItem, liste elemanlarını göstermek için basit ve özelleştirilebilir bir molekül bileşenidir.

## Özellikler

- 📝 **Title & Subtitle**: Ana başlık ve alt başlık desteği
- 🎭 **İkon Desteği**: Sol ve sağ ikonlar
- 👆 **Pressable**: Tıklanabilir öğeler
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği
- 🎨 **Tema Bilinci**: Otomatik tema uyumu

## Kurulum

```tsx
import { ListItem } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View>
      <ListItem
        title="Başlık"
        subtitle="Alt başlık"
      />
    </View>
  );
};
```

## Basic Item

```tsx
<ListItem
  title="Öğe Başlığı"
/>
```

## Subtitle ile

```tsx
<ListItem
  title="Başlık"
  subtitle="Bu bir alt başlıktır"
/>
```

## İkonlu

```tsx
<ListItem
  title="Ayarlar"
  subtitle="Uygulama ayarlarını yönetin"
  leftIcon="settings-outline"
  rightIcon="chevron-forward"
  onPress={() => console.log('Ayarlar')}
/>
```

## Pressable

```tsx
<ListItem
  title="Profil"
  subtitle="Profil bilgilerinizi görüntüleyin"
  leftIcon="person-outline"
  rightIcon="chevron-forward"
  onPress={() => navigation.navigate('Profile')}
/>
```

## Disabled

```tsx
<ListItem
  title="Devre Dışı Öğe"
  subtitle="Bu öğe tıklanamaz"
  leftIcon="lock-closed-outline"
  disabled
/>
```

## Örnek Kullanımlar

### Ayarlar Listesi

```tsx
export const SettingsList = () => {
  const settings = [
    {
      id: '1',
      title: 'Profil',
      subtitle: 'Profil bilgilerinizi yönetin',
      icon: 'person-outline',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      id: '2',
      title: 'Bildirimler',
      subtitle: 'Bildirim tercihlerinizi ayarlayın',
      icon: 'notifications-outline',
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      id: '3',
      title: 'Gizlilik',
      subtitle: 'Gizlilik ayarlarınızı yönetin',
      icon: 'lock-closed-outline',
      onPress: () => navigation.navigate('Privacy'),
    },
  ];

  return (
    <View>
      {settings.map((setting) => (
        <ListItem
          key={setting.id}
          title={setting.title}
          subtitle={setting.subtitle}
          leftIcon={setting.icon}
          rightIcon="chevron-forward"
          onPress={setting.onPress}
        />
      ))}
    </View>
  );
};
```

### Menü Listesi

```tsx
export const MenuList = () => {
  return (
    <View>
      <ListItem
        title="Ana Sayfa"
        leftIcon="home-outline"
        onPress={() => navigation.navigate('Home')}
      />

      <ListItem
        title="Arama"
        leftIcon="search-outline"
        onPress={() => navigation.navigate('Search')}
      />

      <ListItem
        title="Profilim"
        leftIcon="person-outline"
        onPress={() => navigation.navigate('Profile')}
      />

      <ListItem
        title="Ayarlar"
        leftIcon="settings-outline"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};
```

### Kullanıcı Listesi

```tsx
export const UserList = ({ users }) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListItem
          title={item.name}
          subtitle={item.email}
          leftIcon="person-outline"
          onPress={() => navigation.navigate('UserDetail', { userId: item.id })}
        />
      )}
    />
  );
};
```

### Seçim Listesi

```tsx
export const SelectionList = ({ options, selectedOption, onSelect }) => {
  return (
    <View>
      {options.map((option) => (
        <ListItem
          key={option.id}
          title={option.title}
          subtitle={option.description}
          leftIcon={selectedOption === option.id ? 'checkmark-circle' : 'ellipse-outline'}
          onPress={() => onSelect(option.id)}
        />
      ))}
    </View>
  );
};
```

### Navigasyon Listesi

```tsx
export const NavigationList = () => {
  const routes = [
    { id: '1', title: 'Dashboard', icon: 'grid-outline', screen: 'Dashboard' },
    { id: '2', title: 'Products', icon: 'cube-outline', screen: 'Products' },
    { id: '3', title: 'Orders', icon: 'cart-outline', screen: 'Orders' },
    { id: '4', title: 'Customers', icon: 'people-outline', screen: 'Customers' },
  ];

  return (
    <View>
      {routes.map((route) => (
        <ListItem
          key={route.id}
          title={route.title}
          leftIcon={route.icon}
          rightIcon="chevron-forward"
          onPress={() => navigation.navigate(route.screen)}
        />
      ))}
    </View>
  );
};
```

### Action Listesi

```tsx
export const ActionList = () => {
  return (
    <View>
      <ListItem
        title="Yeni Ekle"
        subtitle="Yeni bir öğe oluşturun"
        leftIcon="add-circle-outline"
        onPress={() => console.log('Add')}
      />

      <ListItem
        title="Düzenle"
        subtitle="Öğeyi düzenleyin"
        leftIcon="create-outline"
        onPress={() => console.log('Edit')}
      />

      <ListItem
        title="Sil"
        subtitle="Öğeyi silin"
        leftIcon="trash-outline"
        onPress={() => console.log('Delete')}
      />

      <ListItem
        title="Paylaş"
        subtitle="Öğeyi paylaşın"
        leftIcon="share-outline"
        onPress={() => console.log('Share')}
      />
    </View>
  );
};
```

### Bağlantı Listesi

```tsx
export const LinkList = ({ links }) => {
  return (
    <View>
      <ListItem
        title="Web Sitesi"
        subtitle="www.example.com"
        leftIcon="globe-outline"
        rightIcon="open-outline"
        onPress={() => Linking.openURL('https://www.example.com')}
      />

      <ListItem
        title="Twitter"
        subtitle="@example"
        leftIcon="logo-twitter"
        rightIcon="open-outline"
        onPress={() => Linking.openURL('https://twitter.com/example')}
      />

      <ListItem
        title="GitHub"
        subtitle="github.com/example"
        leftIcon="logo-github"
        rightIcon="open-outline"
        onPress={() => Linking.openURL('https://github.com/example')}
      />
    </View>
  );
};
```

## Props

### ListItemProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `title` | `string` | - **(Zorunlu)** | Başlık metni |
| `subtitle` | `string` | - | Alt başlık metni |
| `leftIcon` | `string` | - | Sol ikon ismi |
| `rightIcon` | `string` | - | Sağ ikon ismi |
| `onPress` | `() => void` | - | Tıklama olayı |
| `disabled` | `boolean` | `false` | Devre dışı |
| `style` | `ViewStyle` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

## Best Practices

### 1. İkon Seçimi

```tsx
// Navigasyon için
<ListItem
  leftIcon="chevron-forward"
  rightIcon="chevron-back"
/>

// Aksiyon için
<ListItem
  leftIcon="add-circle"
/>

// Bilgi için
<ListItem
  leftIcon="information-circle"
/>
```

### 2. Subtitle Kullanımı

```tsx
// Açıklama için
<ListItem
  title="Başlık"
  subtitle="Detaylı açıklama"
/>

// Ek bilgi için
<ListItem
  title="Kullanıcı Adı"
  subtitle="@username"
/>
```

### 3. Pressable Kullanımı

```tsx
// Navigasyon
<ListItem
  onPress={() => navigation.navigate('Screen')}
/>

// Aksiyon
<ListItem
  onPress={() => handleAction()}
/>
```

## Erişilebilirlik

ListItem, tam erişilebilirlik desteği sunar:

- ✅ Touch uygun boyut
- ✅ Screen reader desteği
- ✅ Disabled state
- ✅ Active opacity
- ✅ Test ID desteği

## Performans İpuçları

1. **FlatList ile**: Uzun listelerde `FlatList` kullanın
2. **Key Prop**: `key` prop'unu unutmayın
3. **OnPress Stabilization**: `onPress`'i `useCallback` ile sarın

## İlgili Bileşenler

- [`List`](../List/README.md) - Liste bileşeni
- [`AtomicIcon`](../atoms/AtomicIcon/README.md) - İkon bileşeni
- [`AtomicText`](../atoms/AtomicText/README.md) - Metin bileşeni

## Lisans

MIT

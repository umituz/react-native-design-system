# ListItem

ListItem is a versatile list item component with title, subtitle, and optional icons. Perfect for menus, settings, navigation lists, and more.

## Features

- 📝 **Title & Subtitle**: Display primary and secondary text
- 🎭 **Left Icon**: Icon on the left side
- 🔄 **Right Icon**: Icon on the right side (for navigation)
- 👆 **Pressable**: Optional press handler
- ♿ **Accessible**: Full accessibility support
- 🎨 **Theme-Aware**: Design token integration
- ⚡ **Disabled State**: Disabled styling support

## Installation

```tsx
import { ListItem } from 'react-native-design-system';
```

## Basic Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-design-system';

export const BasicExample = () => {
  return (
    <View>
      <ListItem
        title="Settings"
        onPress={() => console.log('Settings pressed')}
      />
    </View>
  );
};
```

## Basic Item

```tsx
<ListItem
  title="Profile"
/>
```

## With Subtitle

```tsx
<ListItem
  title="John Doe"
  subtitle="Software Engineer"
/>
```

## With Left Icon

```tsx
<ListItem
  title="Settings"
  leftIcon="settings-outline"
/>
```

## Pressable with Right Icon

```tsx
<ListItem
  title="Notifications"
  rightIcon="chevron-forward-outline"
  onPress={() => navigation.navigate('Notifications')}
/>
```

## With Both Icons

```tsx
<ListItem
  title="Dark Mode"
  leftIcon="moon-outline"
  rightIcon="chevron-forward-outline"
  onPress={() => {}}
/>
```

## Disabled Item

```tsx
<ListItem
  title="Premium Feature"
  subtitle="Upgrade to access"
  leftIcon="diamond-outline"
  disabled
/>
```

## Example Usages

### Settings Menu

```tsx
export const SettingsMenu = () => {
  const menuItems = [
    {
      title: 'Account',
      subtitle: 'Personal information',
      leftIcon: 'person-outline',
      route: 'Account',
    },
    {
      title: 'Notifications',
      subtitle: 'Push notifications',
      leftIcon: 'notifications-outline',
      route: 'Notifications',
    },
    {
      title: 'Privacy',
      subtitle: 'Privacy settings',
      leftIcon: 'shield-checkmark-outline',
      route: 'Privacy',
    },
    {
      title: 'Help',
      subtitle: 'FAQ and support',
      leftIcon: 'help-circle-outline',
      route: 'Help',
    },
  ];

  return (
    <View>
      {menuItems.map((item, index) => (
        <ListItem
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          leftIcon={item.leftIcon}
          rightIcon="chevron-forward-outline"
          onPress={() => navigation.navigate(item.route)}
        />
      ))}
    </View>
  );
};
```

### User List

```tsx
export const UserList = ({ users }) => {
  return (
    <View>
      {users.map((user) => (
        <ListItem
          key={user.id}
          title={user.name}
          subtitle={user.email}
          leftIcon="person-outline"
          onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
        />
      ))}
    </View>
  );
};
```

### Navigation Menu

```tsx
export const NavigationMenu = () => {
  const menuItems = [
    { title: 'Home', icon: 'home-outline', route: 'Home' },
    { title: 'Search', icon: 'search-outline', route: 'Search' },
    { title: 'Notifications', icon: 'notifications-outline', route: 'Notifications' },
    { title: 'Messages', icon: 'chatbubble-outline', route: 'Messages' },
    { title: 'Profile', icon: 'person-outline', route: 'Profile' },
  ];

  return (
    <View>
      {menuItems.map((item) => (
        <ListItem
          key={item.route}
          title={item.title}
          leftIcon={item.icon}
          onPress={() => navigation.navigate(item.route)}
        />
      ))}
    </View>
  );
};
```

### Feature List

```tsx
export const FeatureList = () => {
  const features = [
    {
      title: 'Dark Mode',
      subtitle: 'Reduce eye strain',
      icon: 'moon-outline',
      available: true,
    },
    {
      title: 'Biometric Login',
      subtitle: 'Face ID / Touch ID',
      icon: 'finger-print-outline',
      available: true,
    },
    {
      title: 'Cloud Sync',
      subtitle: 'Sync across devices',
      icon: 'cloud-outline',
      available: false,
    },
  ];

  return (
    <View>
      {features.map((feature, index) => (
        <ListItem
          key={index}
          title={feature.title}
          subtitle={feature.subtitle}
          leftIcon={feature.icon}
          disabled={!feature.available}
          onPress={feature.available ? () => enableFeature(feature) : undefined}
          rightIcon={feature.available ? 'chevron-forward-outline' : undefined}
        />
      ))}
    </View>
  );
};
```

### Action Menu

```tsx
export const ActionMenu = ({ onAction }) => {
  const actions = [
    { title: 'Edit', icon: 'create-outline', action: 'edit' },
    { title: 'Share', icon: 'share-outline', action: 'share' },
    { title: 'Delete', icon: 'trash-outline', action: 'delete' },
  ];

  return (
    <View>
      {actions.map((action) => (
        <ListItem
          key={action.action}
          title={action.title}
          leftIcon={action.icon}
          onPress={() => onAction(action.action)}
          rightIcon="chevron-forward-outline"
        />
      ))}
    </View>
  );
};
```

### Contact List

```tsx
export const ContactList = ({ contacts }) => {
  return (
    <View>
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          title={contact.name}
          subtitle={contact.phone}
          leftIcon="person-outline"
          rightIcon="call-outline"
          onPress={() => Linking.openURL(`tel:${contact.phone}`)}
        />
      ))}
    </View>
  );
};
```

### File List

```tsx
export const FileList = ({ files }) => {
  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) return 'document-text-outline';
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) return 'image-outline';
    if (fileName.endsWith('.mp4')) return 'videocam-outline';
    return 'document-outline';
  };

  return (
    <View>
      {files.map((file) => (
        <ListItem
          key={file.id}
          title={file.name}
          subtitle={`${file.size} • ${file.date}`}
          leftIcon={getFileIcon(file.name)}
          onPress={() => openFile(file)}
          rightIcon="ellipsis-vertical-outline"
        />
      ))}
    </View>
  );
};
```

### Download List

```tsx
export const DownloadList = ({ downloads }) => {
  return (
    <View>
      {downloads.map((download) => (
        <ListItem
          key={download.id}
          title={download.fileName}
          subtitle={`${download.progress}% • ${download.status}`}
          leftIcon="download-outline"
          disabled={download.status === 'downloading'}
          onPress={() => {
            if (download.status === 'completed') {
              openDownload(download);
            } else if (download.status === 'pending') {
              startDownload(download);
            }
          }}
          rightIcon={download.status === 'completed' ? 'checkmark-circle' : undefined}
        />
      ))}
    </View>
  );
};
```

### Selection List

```tsx
export const SelectionList = ({ options, selectedOption, onSelect }) => {
  return (
    <View>
      {options.map((option) => (
        <ListItem
          key={option.id}
          title={option.title}
          subtitle={option.subtitle}
          leftIcon={option.icon}
          onPress={() => onSelect(option)}
          rightIcon={selectedOption?.id === option.id ? 'checkmark' : undefined}
        />
      ))}
    </View>
  );
};
```

### Grouped List

```tsx
export const GroupedList = () => {
  const groups = [
    {
      title: 'Account',
      items: [
        { title: 'Profile', icon: 'person-outline' },
        { title: 'Security', icon: 'shield-outline' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { title: 'Appearance', icon: 'color-palette-outline' },
        { title: 'Language', icon: 'globe-outline' },
      ],
    },
  ];

  return (
    <View>
      {groups.map((group, groupIndex) => (
        <View key={groupIndex}>
          <AtomicText
            type="labelLarge"
            color="primary"
            style={{ paddingHorizontal: 16, paddingVertical: 8 }}
          >
            {group.title}
          </AtomicText>

          {group.items.map((item, itemIndex) => (
            <ListItem
              key={itemIndex}
              title={item.title}
              leftIcon={item.icon}
              onPress={() => handleNavigation(item.title)}
              rightIcon="chevron-forward-outline"
            />
          ))}
        </View>
      ))}
    </View>
  );
};
```

## Props

### ListItemProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - **(Required)** | Primary text |
| `subtitle` | `string` | - | Secondary text |
| `leftIcon` | `string` | - | Left icon name (Ionicons) |
| `rightIcon` | `string` | - | Right icon name (Ionicons) |
| `onPress` | `() => void` | - | Press callback (makes item pressable) |
| `disabled` | `boolean` | `false` | Disable the item |
| `style` | `ViewStyle` | - | Custom container style |

## Best Practices

### 1. Icon Selection

```tsx
// ✅ Good: Descriptive icons
<ListItem
  title="Settings"
  leftIcon="settings-outline"
/>

// ❌ Bad: Generic icons
<ListItem
  title="Settings"
  leftIcon="ellipse-outline"
/>
```

### 2. Right Icon Usage

```tsx
// ✅ Good: Navigation indicator
<ListItem
  title="Settings"
  rightIcon="chevron-forward-outline"
  onPress={() => navigate('Settings')}
/>

// ❌ Bad: No press handler
<ListItem
  title="Settings"
  rightIcon="chevron-forward-outline"
/>
```

### 3. Subtitle Length

```tsx
// ✅ Good: Concise
<ListItem
  subtitle="Software Engineer at Google"
/>

// ❌ Bad: Too long
<ListItem
  subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor"
/>
```

## Accessibility

ListItem provides full accessibility support:

- ✅ Screen reader support
- ✅ Touch target size
- ✅ Accessibility labels
- ✅ Disabled state announcements
- ✅ Semantic roles

## Performance Tips

1. **Memoization**: Memo list items for large lists
2. **Key Prop**: Always use unique keys
3. **Optimization**: Use `removeClippedSubviews` for long lists

## Related Components

- [`List`](../List/README.md) - List container component
- [`Avatar`](../avatar/README.md) - User avatar component
- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - Icon component
- [`Divider`](../Divider/README.md) - List divider component

## License

MIT

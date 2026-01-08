# Swipe Actions

Swipe Actions system provides swipeable action buttons for list items. Users can swipe left or right to reveal quick actions like delete, edit, archive, etc.

## Features

- 👆 **Swipe Gestures**: Left and right swipe support
- 🎨 **Customizable Colors**: Theme-aware or custom colors
- 📳 **Haptic Feedback**: Built-in haptic feedback support
- 🎯 **Multiple Actions**: Support for multiple actions
- 🔄 **Animated**: Smooth swipe animations
- ♿ **Accessible**: Full accessibility support
- 🎭 **Icon & Label**: Visual icons and text labels

## Installation

```tsx
import { SwipeActionButton } from 'react-native-design-system';
```

## Basic Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import { SwipeActionButton } from 'react-native-design-system';

export const BasicExample = () => {
  const deleteAction = {
    label: 'Delete',
    icon: 'trash-outline',
    color: '#ef4444',
    onPress: () => console.log('Deleted'),
  };

  return (
    <SwipeActionButton
      action={deleteAction}
      position={0}
      totalActions={1}
      direction="right"
    />
  );
};
```

## Action Button

```tsx
const deleteAction = {
  label: 'Delete',
  icon: 'trash-outline',
  color: '#ef4444',
  onPress: () => handleDelete(),
};

<SwipeActionButton
  action={deleteAction}
  position={0}
  totalActions={1}
  direction="right"
/>
```

## Theme Color

```tsx
const editAction = {
  label: 'Edit',
  icon: 'create-outline',
  colorKey: 'primary',
  onPress: () => handleEdit(),
};

<SwipeActionButton
  action={editAction}
  position={0}
  totalActions={1}
  direction="left"
/>
```

## With Haptics

```tsx
const archiveAction = {
  label: 'Archive',
  icon: 'archive-outline',
  colorKey: 'tertiary',
  enableHaptics: true,
  hapticsIntensity: 'Medium',
  onPress: () => handleArchive(),
};

<SwipeActionButton
  action={archiveAction}
  position={0}
  totalActions={1}
  direction="right"
/>
```

## Example Usages

### Email Actions

```tsx
export const EmailSwipeActions = ({ emailId }) => {
  const handleDelete = async () => {
    await deleteEmail(emailId);
  };

  const handleArchive = async () => {
    await archiveEmail(emailId);
  };

  const handleMarkRead = async () => {
    await markAsRead(emailId);
  };

  return (
    <>
      {/* Right swipe actions */}
      <SwipeActionButton
        action={{
          label: 'Archive',
          icon: 'archive-outline',
          colorKey: 'primary',
          onPress: handleArchive,
        }}
        position={0}
        totalActions={2}
        direction="right"
      />

      <SwipeActionButton
        action={{
          label: 'Delete',
          icon: 'trash-outline',
          colorKey: 'error',
          onPress: handleDelete,
        }}
        position={1}
        totalActions={2}
        direction="right"
      />
    </>
  );
};
```

### Task Actions

```tsx
export const TaskSwipeActions = ({ taskId }) => {
  const handleComplete = async () => {
    await completeTask(taskId);
    showSuccessToast('Task completed!');
  };

  const handleSnooze = async () => {
    await snoozeTask(taskId);
  };

  return (
    <>
      <SwipeActionButton
        action={{
          label: 'Complete',
          icon: 'checkmark-circle-outline',
          colorKey: 'success',
          enableHaptics: true,
          hapticsIntensity: 'Heavy',
          onPress: handleComplete,
        }}
        position={0}
        totalActions={1}
        direction="right"
      />

      <SwipeActionButton
        action={{
          label: 'Snooze',
          icon: 'time-outline',
          colorKey: 'warning',
          onPress: handleSnooze,
        }}
        position={0}
        totalActions={1}
        direction="left"
      />
    </>
  );
};
```

### Message Actions

```tsx
export const MessageSwipeActions = ({ message }) => {
  const handleReply = () => {
    navigation.navigate('Reply', { messageId: message.id });
  };

  const handleForward = () => {
    navigation.navigate('Forward', { messageId: message.id });
  };

  const handleDelete = async () => {
    showAlert({
      variant: 'error',
      title: 'Delete Message',
      message: 'Are you sure you want to delete this message?',
      onConfirm: async () => {
        await deleteMessage(message.id);
      },
    });
  };

  return (
    <>
      <SwipeActionButton
        action={{
          label: 'Reply',
          icon: 'arrow-undo-outline',
          colorKey: 'primary',
          onPress: handleReply,
        }}
        position={0}
        totalActions={2}
        direction="left"
      />

      <SwipeActionButton
        action={{
          label: 'Forward',
          icon: 'arrow-redo-outline',
          colorKey: 'primary',
          onPress: handleForward,
        }}
        position={1}
        totalActions={2}
        direction="left"
      />

      <SwipeActionButton
        action={{
          label: 'Delete',
          icon: 'trash-outline',
          colorKey: 'error',
          onPress: handleDelete,
        }}
        position={0}
        totalActions={1}
        direction="right"
      />
    </>
  );
};
```

### Contact Actions

```tsx
export const ContactSwipeActions = ({ contact }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };

  const handleMessage = () => {
    navigation.navigate('Message', { contactId: contact.id });
  };

  const handleFavorite = async () => {
    await toggleFavorite(contact.id);
    showToast({
      variant: 'success',
      title: contact.isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
    });
  };

  return (
    <>
      <SwipeActionButton
        action={{
          label: 'Call',
          icon: 'call-outline',
          colorKey: 'success',
          onPress: handleCall,
        }}
        position={0}
        totalActions={2}
        direction="left"
      />

      <SwipeActionButton
        action={{
          label: 'Message',
          icon: 'chatbubble-outline',
          colorKey: 'primary',
          onPress: handleMessage,
        }}
        position={1}
        totalActions={2}
        direction="left"
      />

      <SwipeActionButton
        action={{
          label: contact.isFavorite ? 'Unfavorite' : 'Favorite',
          icon: contact.isFavorite ? 'heart' : 'heart-outline',
          colorKey: contact.isFavorite ? 'error' : 'error',
          onPress: handleFavorite,
        }}
        position={0}
        totalActions={1}
        direction="right"
      />
    </>
  );
};
```

### File Actions

```tsx
export const FileSwipeActions = ({ file }) => {
  const handleShare = async () => {
    await shareFile(file.uri);
  };

  const handleRename = () => {
    navigation.navigate('RenameFile', { fileId: file.id });
  };

  const handleDelete = async () => {
    showAlert({
      variant: 'error',
      title: 'Delete File',
      message: `Are you sure you want to delete ${file.name}?`,
      onConfirm: async () => {
        await deleteFile(file.id);
      },
    });
  };

  return (
    <>
      <SwipeActionButton
        action={{
          label: 'Share',
          icon: 'share-outline',
          colorKey: 'primary',
          onPress: handleShare,
        }}
        position={0}
        totalActions={2}
        direction="left"
      />

      <SwipeActionButton
        action={{
          label: 'Rename',
          icon: 'create-outline',
          colorKey: 'tertiary',
          onPress: handleRename,
        }}
        position={1}
        totalActions={2}
        direction="left"
      />

      <SwipeActionButton
        action={{
          label: 'Delete',
          icon: 'trash-outline',
          colorKey: 'error',
          onPress: handleDelete,
        }}
        position={0}
        totalActions={1}
        direction="right"
      />
    </>
  );
};
```

### Notification Actions

```tsx
export const NotificationSwipeActions = ({ notification }) => {
  const handleMarkRead = async () => {
    await markAsRead(notification.id);
  };

  const handleMute = async () => {
    await muteNotification(notification.id);
    showToast({
      variant: 'info',
      title: 'Notification muted',
    });
  };

  const handleDelete = async () => {
    await deleteNotification(notification.id);
  };

  return (
    <>
      <SwipeActionButton
        action={{
          label: 'Mark Read',
          icon: 'checkmark-done-outline',
          colorKey: 'success',
          onPress: handleMarkRead,
        }}
        position={0}
        totalActions={2}
        direction="left"
      />

      <SwipeActionButton
        action={{
          label: 'Mute',
          icon: 'volume-mute-outline',
          colorKey: 'warning',
          onPress: handleMute,
        }}
        position={1}
        totalActions={2}
        direction="left"
      />

      <SwipeActionButton
        action={{
          label: 'Delete',
          icon: 'trash-outline',
          colorKey: 'error',
          onPress: handleDelete,
        }}
        position={0}
        totalActions={1}
        direction="right"
      />
    </>
  );
};
```

### Cart Item Actions

```tsx
export const CartItemSwipeActions = ({ item }) => {
  const handleMoveToWishlist = async () => {
    await moveToWishlist(item.id);
    showToast({
      variant: 'success',
      title: 'Moved to wishlist',
    });
  };

  const handleRemove = async () => {
    showAlert({
      variant: 'warning',
      title: 'Remove Item',
      message: 'Remove this item from your cart?',
      onConfirm: async () => {
        await removeFromCart(item.id);
      },
    });
  };

  return (
    <>
      <SwipeActionButton
        action={{
          label: 'Wishlist',
          icon: 'heart-outline',
          colorKey: 'error',
          onPress: handleMoveToWishlist,
        }}
        position={0}
        totalActions={1}
        direction="left"
      />

      <SwipeActionButton
        action={{
          label: 'Remove',
          icon: 'trash-outline',
          colorKey: 'error',
          onPress: handleRemove,
        }}
        position={0}
        totalActions={1}
        direction="right"
      />
    </>
  );
};
```

### Order Actions

```tsx
export const OrderSwipeActions = ({ order }) => {
  const handleTrack = () => {
    navigation.navigate('OrderTracking', { orderId: order.id });
  };

  const handleReorder = async () => {
    await reorderItems(order.items);
    showToast({
      variant: 'success',
      title: 'Items added to cart',
    });
  };

  const handleCancel = async () => {
    if (order.canCancel) {
      showAlert({
        variant: 'error',
        title: 'Cancel Order',
        message: 'Are you sure you want to cancel this order?',
        onConfirm: async () => {
          await cancelOrder(order.id);
        },
      });
    }
  };

  return (
    <>
      <SwipeActionButton
        action={{
          label: 'Track',
          icon: 'locate-outline',
          colorKey: 'primary',
          onPress: handleTrack,
        }}
        position={0}
        totalActions={2}
        direction="left"
      />

      {order.canReorder && (
        <SwipeActionButton
          action={{
            label: 'Reorder',
            icon: 'refresh-outline',
            colorKey: 'success',
            onPress: handleReorder,
          }}
          position={1}
          totalActions={2}
          direction="left"
        />
      )}

      {order.canCancel && (
        <SwipeActionButton
          action={{
            label: 'Cancel',
            icon: 'close-circle-outline',
            colorKey: 'error',
            onPress: handleCancel,
          }}
          position={0}
          totalActions={1}
          direction="right"
        />
      )}
    </>
  );
};
```

## Props

### SwipeActionButtonProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `action` | `SwipeActionConfig` | - **(Required)** | Action configuration |
| `position` | `number` | - **(Required)** | Button position index |
| `totalActions` | `number` | - **(Required)** | Total number of actions |
| `direction` | `'left' \| 'right'` | - **(Required)** | Swipe direction |
| `style` | `ViewStyle` | - | Custom container style |

### SwipeActionConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - **(Required)** | Button label |
| `icon` | `string` | - **(Required)** | Icon name (Ionicons) |
| `onPress` | `() => void` | - **(Required)** | Press callback |
| `color` | `string` | - | Custom color |
| `colorKey` | `string` | - | Theme color key |
| `enableHaptics` | `boolean` | `true` | Enable haptic feedback |
| `hapticsIntensity` | `'Light' \| 'Medium' \| 'Heavy'` | `'Medium'` | Haptic intensity |

## Best Practices

### 1. Action Placement

```tsx
// Destructive actions on right swipe
<SwipeActionButton
  action={{ label: 'Delete', icon: 'trash' }}
  direction="right" // ✅
/>

// Common actions on left swipe
<SwipeActionButton
  action={{ label: 'Edit', icon: 'create' }}
  direction="left" // ✅
/>
```

### 2. Haptic Feedback

```tsx
// Important actions: Heavy haptics
action={{
  hapticsIntensity: 'Heavy',
}}

// Secondary actions: Medium haptics
action={{
  hapticsIntensity: 'Medium',
}}
```

### 3. Clear Labels

```tsx
// ✅ Good: Clear action
label: 'Delete'

// ❌ Bad: Vague
label: 'OK'
```

## Accessibility

SwipeActionButton provides full accessibility support:

- ✅ Screen reader support
- ✅ Accessibility labels
- ✅ Touch target size
- ✅ Semantic actions

## Performance Tips

1. **Memoization**: Memo action callbacks
2. **Optimize**: Minimize re-renders
3. **Debounce**: Debounce rapid actions

## Related Components

- [`ListItem`](../listitem/README.md) - List item component
- [`BaseModal`](../BaseModal/README.md) - Modal component
- [`AlertInline`](../alerts/README.md) - Alert components

## Dependencies

- `@umituz/react-native-haptics` - Haptic feedback service

## License

MIT

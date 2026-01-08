# List

List, FlatList wrapper'ı olan responsive bir liste bileşenidir. Pull-to-refresh desteği, içerik padding'i ve theme-aware renkler sunar.

## Özellikler

- 📜 **FlatList Wrapper**: React Native FlatList'in tüm özellikleri
- 🔄 **Pull-to-Refresh**: Yenileme desteği
- 📏 **Content Padding**: Responsive içerik padding'i
- 🎨 **Theme-Aware**: Design token uyumlu
- ⚡ **Performanslı**: Optimize edilmiş liste performansı
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { List } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-design-system';

export const BasicExample = () => {
  const data = [
    { id: '1', title: 'Öğe 1' },
    { id: '2', title: 'Öğe 2' },
    { id: '3', title: 'Öğe 3' },
  ];

  return (
    <List
      data={data}
      renderItem={({ item }) => (
        <View style={{ padding: 16 }}>
          <AtomicText>{item.title}</AtomicText>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
```

## Basit Liste

```tsx
const users = [
  { id: '1', name: 'Ahmet Yılmaz' },
  { id: '2', name: 'Ayşe Demir' },
  { id: '3', name: 'Mehmet Kaya' },
];

<List
  data={users}
  renderItem={({ item }) => (
    <ListItem title={item.name} />
  )}
  keyExtractor={(item) => item.id}
/>
```

## Pull-to-Refresh

```tsx
export const RefreshableList = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const newData = await fetchData();
    setData(newData);
    setRefreshing(false);
  };

  return (
    <List
      data={data}
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};
```

## Content Padding

```tsx
<List
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  keyExtractor={(item) => item.id}
  contentPadding
/>
```

## Örnek Kullanımlar

### Kullanıcı Listesi

```tsx
export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const renderUser = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.email}
      left={() => (
        <Avatar
          uri={item.avatar}
          name={item.name}
          size="md"
        />
      )}
      onPress={() => navigation.navigate('UserProfile', { userId: item.id })}
    />
  );

  return (
    <List
      data={users}
      renderItem={renderUser}
      keyExtractor={(item) => item.id}
      contentPadding
    />
  );
};
```

### Sonsuz Kaydırma

```tsx
export const InfiniteList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const newData = await fetchItems(page);
    setData([...data, ...newData]);
    setPage(page + 1);
    setLoading(false);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ padding: 16 }}>
        <AtomicSpinner size="md" />
      </View>
    );
  };

  return (
    <List
      data={data}
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentPadding
    />
  );
};
```

### Ürün Listesi

```tsx
export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const data = await fetchProducts();
    setProducts(data);
    setRefreshing(false);
  };

  const renderProduct = ({ item }) => (
    <MediaCard
      uri={item.image}
      title={item.name}
      subtitle={`${item.price} TL`}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    />
  );

  return (
    <List
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      onRefresh={onRefresh}
      refreshing={refreshing}
      numColumns={2}
      columnWrapperStyle={{ gap: 8 }}
      contentPadding
    />
  );
};
```

### Haber Listesi

```tsx
export const NewsList = () => {
  const [articles, setArticles] = useState([]);

  const renderArticle = ({ item }) => (
    <AtomicCard
      variant="outlined"
      style={{ marginBottom: 16 }}
      onPress={() => navigation.navigate('Article', { articleId: item.id })}
    >
      <View style={{ padding: 16 }}>
        <AtomicText type="titleMedium" style={{ marginBottom: 8 }}>
          {item.title}
        </AtomicText>
        <AtomicText type="bodyMedium" color="secondary" numberOfLines={2}>
          {item.excerpt}
        </AtomicText>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <AtomicText type="labelSmall" color="tertiary">
            {item.category}
          </AtomicText>
          <AtomicText type="labelSmall" color="tertiary" style={{ marginLeft: 16 }}>
            {formatDate(item.publishedAt)}
          </AtomicText>
        </View>
      </View>
    </AtomicCard>
  );

  return (
    <List
      data={articles}
      renderItem={renderArticle}
      keyExtractor={(item) => item.id}
      contentPadding
    />
  );
};
```

### Sohbet Listesi

```tsx
export const ChatList = () => {
  const [conversations, setConversations] = useState([]);

  const renderConversation = ({ item }) => (
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
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AtomicText type="bodyLarge" fontWeight="600">
            {item.name}
          </AtomicText>
          <AtomicText type="bodySmall" color="tertiary">
            {formatTime(item.lastMessageAt)}
          </AtomicText>
        </View>

        <AtomicText
          type="bodyMedium"
          color="secondary"
          numberOfLines={1}
          style={{ marginTop: 4 }}
        >
          {item.lastMessage}
        </AtomicText>
      </View>
    </Pressable>
  );

  return (
    <List
      data={conversations}
      renderItem={renderConversation}
      keyExtractor={(item) => item.id}
      contentPadding
    />
  );
};
```

### Arama Sonuçları

```tsx
export const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      const data = await searchItems(query);
      setResults(data);
      setLoading(false);
    };

    if (query.length > 2) {
      search();
    }
  }, [query]);

  const renderResult = ({ item }) => (
    <ListItem
      title={item.title}
      subtitle={item.description}
      left={() => <AtomicIcon name="search-outline" size="md" />}
      onPress={() => navigation.navigate('Detail', { id: item.id })}
    />
  );

  if (loading) {
    return <AtomicSpinner fullContainer />;
  }

  if (results.length === 0) {
    return (
      <EmptyState
        icon="search-outline"
        title="Sonuç bulunamadı"
        message={`"${query}" için sonuç bulunamadı`}
      />
    );
  }

  return (
    <List
      data={results}
      renderItem={renderResult}
      keyExtractor={(item) => item.id}
      contentPadding
    />
  );
};
```

### Bildirim Listesi

```tsx
export const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  const renderNotification = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        padding: 16,
        backgroundColor: item.read ? 'transparent' : `${tokens.colors.primary}10`,
        borderBottomWidth: 1,
        borderBottomColor: tokens.colors.border,
      }}
    >
      <View style={{ marginRight: 12 }}>
        <AtomicIcon
          name={item.type === 'success' ? 'checkmark-circle' : 'information-circle'}
          size="lg"
          color={item.type === 'success' ? 'success' : 'primary'}
        />
      </View>

      <View style={{ flex: 1 }}>
        <AtomicText type="bodyLarge" fontWeight="600">
          {item.title}
        </AtomicText>
        <AtomicText type="bodyMedium" color="secondary" style={{ marginTop: 4 }}>
          {item.message}
        </AtomicText>
        <AtomicText type="labelSmall" color="tertiary" style={{ marginTop: 8 }}>
          {formatRelativeTime(item.createdAt)}
        </AtomicText>
      </View>
    </View>
  );

  return (
    <List
      data={notifications}
      renderItem={renderNotification}
      keyExtractor={(item) => item.id}
      contentPadding
    />
  );
};
```

### Görev Listesi

```tsx
export const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderTask = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: tokens.colors.border,
      }}
    >
      <Pressable onPress={() => toggleTask(item.id)}>
        <AtomicIcon
          name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size="md"
          color={item.completed ? 'success' : 'secondary'}
        />
      </Pressable>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <AtomicText
          type="bodyLarge"
          style={{
            textDecorationLine: item.completed ? 'line-through' : 'none',
            opacity: item.completed ? 0.6 : 1,
          }}
        >
          {item.title}
        </AtomicText>

        {item.dueDate && (
          <AtomicText type="labelSmall" color="tertiary" style={{ marginTop: 4 }}>
            {formatDate(item.dueDate)}
          </AtomicText>
        )}
      </View>

      {item.priority === 'high' && (
        <AtomicIcon name="alert-circle" size="sm" color="error" />
      )}
    </View>
  );

  return (
    <List
      data={tasks}
      renderItem={renderTask}
      keyExtractor={(item) => item.id}
      contentPadding
    />
  );
};
```

## Props

### ListProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `data` | `T[]` | - **(Zorunlu)** | Liste verisi |
| `renderItem` | `ListRenderItem<T>` | - **(Zorunlu)** | Render fonksiyonu |
| `keyExtractor` | `(item, index) => string` | - **(Zorunlu)** | Key extractor |
| `onRefresh` | `() => void` | - | Yenileme callback'i |
| `refreshing` | `boolean` | `false` | Yeneleniyor durumunda |
| `contentPadding` | `boolean` | `false` | İçerik padding'i |

**Not:** List, FlatList'in tüm props'larını destekler.

## Best Practices

### 1. Key Extractor

```tsx
// ✅ İyi - Unique ve stable
keyExtractor={(item) => item.id}

// ❌ Kötü - Index kullanımı
keyExtractor={(item, index) => index.toString()}
```

### 2. Performans

```tsx
// ✅ Memo kullan
const renderItem = useCallback(({ item }) => (
  <ItemCard item={item} />
), []);

// ✅ Inline function değil
renderItem={renderItem}
```

### 3. Content Padding

```tsx
// Liste için
<List contentPadding />

// Manuel padding
<View style={{ padding: 16 }}>
  <List />
</View> // ❌ Gereksiz
```

### 4. Empty State

```tsx
{data.length === 0 ? (
  <EmptyState />
) : (
  <List data={data} />
)}
```

## Erişilebilirlik

List, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Semantic list anlamları
- ✅ Focus management
- ✅ Keyboard navigation

## Performans İpuçları

1. **keyExtractor**: Her item için unique key kullanın
2. **Memoization**: renderItem fonksiyonunu memo edin
3. **removeClippedSubviews**: Büyük listelerde kullanın
4. **getItemLayout**: Sabit boyutlu item'larda kullanın
5. **windowSize**: Viewport dışındaki item sayısını sınırlayın

## İlgili Bileşenler

- [`FlatList`](https://reactnative.dev/docs/flatlist) - React Native FlatList
- [`ListItem`](../listitem/README.md) - Liste öğesi
- [`MediaCard`](../media-card/README.md) - Medya kartı
- [`Avatar`](../avatar/README.md) - Avatar bileşeni

## Lisans

MIT

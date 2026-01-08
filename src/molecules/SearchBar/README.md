# SearchBar

SearchBar, React Native için modern ve özelleştirilebilir bir arama çubuğu bileşenidir. Material Design prensiplerine uygun olarak tasarlanmıştır.

## Özellikler

- 🔍 **Arama İkonu**: Sol tarafta arama ikonu
- ❌ **Clear Button**: Sağ tarafta temizleme butonu
- ⏳ **Loading State**: Yükleme göstergesi
- 🎨 **Tema Bilinci**: Tam tema entegrasyonu
- ⌨️ **Klavye Desteği**: Return key olarak "search"
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { SearchBar } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-design-system';

export const BasicExample = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Ara..."
      />
    </View>
  );
};
```

## Basic Search

```tsx
const [query, setQuery] = useState('');

<SearchBar
  value={query}
  onChangeText={setQuery}
  placeholder="Ürün ara..."
/>
```

## With Submit Handler

```tsx
const handleSearch = () => {
  console.log('Searching for:', query);
  // Arama yap
};

<SearchBar
  value={query}
  onChangeText={setQuery}
  onSubmit={handleSearch}
  placeholder="Ara..."
  returnKeyType="search"
/>
```

## Loading State

```tsx
const [isSearching, setIsSearching] = useState(false);

const handleSearch = async () => {
  setIsSearching(true);
  await performSearch(query);
  setIsSearching(false);
};

<SearchBar
  value={query}
  onChangeText={setQuery}
  onSubmit={handleSearch}
  loading={isSearching}
  placeholder="Ara..."
/>
```

## With Clear Handler

```tsx
const handleClear = () => {
  setSearchQuery('');
  // Ek işlemler (örn: sonuçları sıfırla)
};

<SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
  onClear={handleClear}
  placeholder="Ara..."
/>
```

## Disabled State

```tsx
<SearchBar
  value={query}
  onChangeText={setQuery}
  disabled
  placeholder="Arama devre dışı..."
/>
```

## Auto Focus

```tsx
<SearchBar
  value={query}
  onChangeText={setQuery}
  autoFocus
  placeholder="Ara..."
/>
```

## Örnek Kullanımlar

### Ürün Arama

```tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable, Text } from 'react-native';
import { SearchBar } from 'react-native-design-system';

export const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetchProducts(query);
      setResults(response);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmit={handleSearch}
        onClear={handleClear}
        loading={loading}
        placeholder="Ürün ara..."
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={{ padding: 16, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};
```

### Kullanıcı Arama

```tsx
export const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchUsers(searchQuery);
    } else {
      setUsers([]);
    }
  }, [searchQuery]);

  const searchUsers = async (query) => {
    setLoading(true);
    const results = await fetchUsers(query);
    setUsers(results);
    setLoading(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        loading={loading}
        placeholder="Kullanıcı ara..."
      />

      {users.map((user) => (
        <View key={user.id} style={{ padding: 16 }}>
          <Text>{user.name}</Text>
        </View>
      ))}
    </View>
  );
};
```

### Filtreleme ile Arama

```tsx
export const FilterableSearch = () => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleSearch = () => {
    // Seçili filtreye göre arama
    console.log(`Searching for "${query}" in ${selectedFilter}`);
  };

  return (
    <View style={{ padding: 16 }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmit={handleSearch}
        placeholder={`${selectedFilter === 'all' ? 'Tümü' : selectedFilter} ara...`}
      />

      {/* Filtre seçimi */}
      <View style={{ flexDirection: 'row', marginTop: 16, gap: 8 }}>
        <Pressable onPress={() => setSelectedFilter('all')}>
          <Text>Tümü</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedFilter('users')}>
          <Text>Kullanıcılar</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedFilter('products')}>
          <Text>Ürünler</Text>
        </Pressable>
      </View>
    </View>
  );
};
```

### Debounce ile Arama

```tsx
import { useCallback, useEffect } from 'react';

export const DebouncedSearch = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Arama
  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  const performSearch = async (searchQuery) => {
    setLoading(true);
    await fetch(`/api/search?q=${searchQuery}`);
    setLoading(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        loading={loading}
        placeholder="Ara..."
      />
    </View>
  );
};
```

## Props

### SearchBarProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `value` | `string` | - **(Zorunlu)** | Arama sorgusu |
| `onChangeText` | `(text: string) => void` | - **(Zorunlu)** | Değişiklik olayı |
| `onSubmit` | `() => void` | - | Submit olayı |
| `onClear` | `() => void` | - | Temizleme olayı |
| `onFocus` | `() => void` | - | Focus olayı |
| `onBlur` | `() => void` | - | Blur olayı |
| `placeholder` | `string` | `'Search...'` | Placeholder metni |
| `autoFocus` | `boolean` | `false` | Otomatik odak |
| `loading` | `boolean` | `false` | Yükleme durumu |
| `disabled` | `boolean` | `false` | Devre dışı |
| `containerStyle` | `ViewStyle` | - | Container stil |
| `inputStyle` | `TextStyle` | - | Input stil |
| `testID` | `string` | - | Test ID'si |

## Stil Özelleştirme

```tsx
<SearchBar
  value={query}
  onChangeText={setQuery}
  containerStyle={{
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  }}
  inputStyle={{
    fontSize: 16,
    fontWeight: '500',
  }}
/>
```

## Best Practices

### 1. Debounce Kullanımı

```tsx
// API çağrılarını azaltmak için debounce kullanın
useEffect(() => {
  const timer = setTimeout(() => {
    if (query.length > 2) {
      performSearch(query);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [query]);
```

### 2. Minimum Karakter

```tsx
// En az 3 karakter sonra ara
useEffect(() => {
  if (query.length > 2) {
    performSearch(query);
  } else {
    setResults([]);
  }
}, [query]);
```

### 3. Loading State

```tsx
// Kullanıcıya geri bildirim verin
<SearchBar
  value={query}
  onChangeText={setQuery}
  loading={isSearching}
  onSubmit={handleSearch}
/>
```

### 4. Clear Handler

```tsx
// Temizleme ile sonuçları sıfırlayın
const handleClear = () => {
  setQuery('');
  setResults([]);
  setFilters({});
};
```

## Erişilebilirlik

SearchBar, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Accessibility label
- ✅ Touch uygun boyut
- ✅ Keyboard navigation
- ✅ Test ID desteği

## Performans İpuçları

1. **Debouncing**: API çağrılarını azaltın
2. **Minimum Length**: Gereksiz aramaları önleyin
3. **Cancellation**: Async işlemleri iptal edin
4. **Memoization**: Sonuçları memoize edin

## İlgili Bileşenler

- [`AtomicInput`](../../atoms/input/README.md) - Input bileşeni
- [`BaseModal`](../BaseModal/README.md) - Modal arama sonuçları
- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - İkon bileşeni

## Örnek Proje

```tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable, Text, Image } from 'react-native';
import { SearchBar } from 'react-native-design-system';

export const AdvancedSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        performSearch(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const performSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${searchQuery}`);
      const data = await response.json();
      setResults(data);

      // Geçmişe ekle
      setHistory(prev => [searchQuery, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={handleClear}
        loading={loading}
        placeholder="Ara..."
      />

      {/* Arama Geçmişi */}
      {query.length === 0 && history.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ marginBottom: 8, fontWeight: '600' }}>
            Son Aramalar
          </Text>
          {history.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setQuery(item)}
              style={{ padding: 12 }}
            >
              <Text>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Arama Sonuçları */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={{
              flexDirection: 'row',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#e0e0e0',
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 50, height: 50, borderRadius: 8 }}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                {item.title}
              </Text>
              <Text style={{ color: 'gray', marginTop: 4 }}>
                {item.description}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};
```

## Lisans

MIT

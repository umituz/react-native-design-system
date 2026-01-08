# MediaCard

MediaCard is an optimized card component for displaying images, videos, and media content with overlay text, badges, and selection state support.

## Import & Usage

```typescript
import { MediaCard } from 'react-native-design-system/src/molecules/media-card';
```

**Location:** `src/molecules/media-card/MediaCard.tsx`

## Basic Usage

```tsx
<MediaCard
  uri="https://example.com/image.jpg"
  title="Media Title"
  subtitle="Description"
/>
```

## Strategy

**Purpose**: Provide a visually appealing and interactive card component optimized for media content display.

**When to Use**:
- Photo galleries and image grids
- Template/media selection interfaces
- Product cards with images
- Avatar/story selectors
- Background pickers
- Meme collections

**When NOT to Use**:
- For text-only content - use AtomicCard instead
- For complex layouts - use custom components
- For non-interactive displays - use Image component

## Rules

### Required

1. **ALWAYS** provide a `uri` prop with valid image URL
2. **MUST** have unique keys when rendering in lists
3. **NEVER** use invalid or broken image URLs
4. **ALWAYS** provide accessibility labels for screen readers
5. **MUST** handle loading and error states appropriately

### Content Guidelines

1. **ALWAYS** use appropriate size for context (sm/md/lg)
2. **MUST** maintain aspect ratio for images
3. **SHOULD** provide meaningful titles and subtitles
4. **NEVER** use text that overflows the card

### Selection State

1. **MUST** clearly indicate selected state
2. **ALWAYS** provide visual feedback for selection
3. **SHOULD** allow toggle behavior (select/deselect)

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Missing URI
<MediaCard />

// ❌ Invalid URI
<MediaCard uri="not-a-url" />

// ❌ Text overflow
<MediaCard
  uri="image.jpg"
  title="This is an extremely long title that will overflow"
/>

// ❌ Wrong aspect ratio
<MediaCard
  uri="portrait.jpg"
  aspectRatio={2} // Too wide for portrait image
/>

// ❌ Inconsistent sizes in grid
<View>
  <MediaCard size="sm" />
  <MediaCard size="lg" /> {/* ❌ Inconsistent */}
</View>

// ❌ No accessibility
<MediaCard uri="image.jpg" /> {/* Missing accessibilityLabel */}
```

## Best Practices

### Size Selection

✅ **DO**:
- Use `sm` for dense grids and galleries
- Use `md` for standard product cards
- Use `lg` for featured/hero items
- Keep sizes consistent within grids

❌ **DON'T**:
- Mix sizes arbitrarily in the same grid
- Use `lg` for small thumbnails
- Use `sm` for hero/featured content

### Aspect Ratio

✅ **DO**:
```tsx
// Square images
<MediaCard aspectRatio={1} />

// Portrait images
<MediaCard aspectRatio={0.8} />

// Landscape images
<MediaCard aspectRatio={1.2} />
```

❌ **DON'T**:
```tsx
// Don't distort images
<MediaCard aspectRatio={2} /> // For portrait image
```

### Overlay Usage

✅ **DO**:
```tsx
// Provide context
<MediaCard
  title="Product Name"
  subtitle="$29.99"
/>

// Clean display
<MediaCard showOverlay={false} />
```

❌ **DON'T**:
```tsx
// Don't show overlay for no reason
<MediaCard title="" subtitle="" />
```

## AI Coding Guidelines

### For AI Agents

When generating MediaCard components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { MediaCard } from 'react-native-design-system/src/molecules/media-card';
   ```

2. **Always provide required props**:
   ```tsx
   <MediaCard
     uri="有效的图片URL"
     title="简洁的标题"
     size="根据上下文选择合适尺寸"
   />
   ```

3. **Always handle press events**:
   ```tsx
   <MediaCard
     uri="image.jpg"
     onPress={() => navigation.navigate('Detail', { id })}
   />
   ```

4. **Always use appropriate sizes**:
   ```tsx
   // Dense grid
   <MediaCard size="sm" />

   // Standard card
   <MediaCard size="md" />

   // Featured item
   <MediaCard size="lg" />
   ```

5. **Never forget accessibility**:
   ```tsx
   // ❌ Bad
   <MediaCard uri="image.jpg" />

   // ✅ Good
   <MediaCard
     uri="image.jpg"
     accessibilityLabel="Product image"
     title="Product Name"
   />
   ```

### Common Patterns

#### Photo Gallery
```tsx
<FlatList
  numColumns={3}
  data={photos}
  renderItem={({ item }) => (
    <MediaCard
      uri={item.uri}
      size="sm"
      onPress={() => navigateToPhoto(item.id)}
    />
  )}
/>
```

#### Template Selector
```tsx
<MediaCard
  uri={template.thumbnail}
  title={template.name}
  selected={selectedId === template.id}
  onPress={() => setSelectedTemplate(template)}
/>
```

#### Product Card
```tsx
<MediaCard
  uri={product.image}
  title={product.name}
  subtitle={`$${product.price}`}
  badge={product.isNew ? 'NEW' : ''}
  onPress={() => navigateToProduct(product.id)}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `uri` | `string` | Yes | - | Image URI |
| `title` | `string` | No | - | Overlay title |
| `subtitle` | `string` | No | - | Overlay subtitle |
| `badge` | `string \| number` | No | - | Badge content |
| `selected` | `boolean` | No | `false` | Selected state |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Card size |
| `aspectRatio` | `number` | No | `0.8` | Aspect ratio |
| `overlayPosition` | `'top' \| 'bottom' \| 'center'` | No | `'bottom'` | Overlay position |
| `showOverlay` | `boolean` | No | `true` | Show overlay |
| `width` | `number` | No | - | Custom width |
| `onPress` | `() => void` | No | - | Press handler |

## Accessibility

- ✅ Screen reader announces title and subtitle
- ✅ Touch target size: minimum 44x44pt
- ✅ Selected state announced to screen readers
- ✅ Test ID support for testing
- ✅ Accessibility label support

## Performance

1. **Image optimization**: Use optimized image sizes
2. **Caching**: Enable image caching
3. **Lazy loading**: Use in long lists
4. **Memoization**: Memo press handlers

## Related Components

- [`AtomicCard`](../../atoms/AtomicCard/README.md) - Basic card component
- [`GlowingCard`](../GlowingCard/README.md) - Glowing effect card
- [`AtomicImage`](../../atoms/AtomicImage/README.md) - Image component
- [`Avatar`](../avatar/README.md) - User avatar component

## License

MIT

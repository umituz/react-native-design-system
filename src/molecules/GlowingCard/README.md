# GlowingCard

A card component with neon-like glowing shadow effect for highlighting important content and creating visual emphasis.

## Import & Usage

```typescript
import { GlowingCard } from 'react-native-design-system/src/molecules/GlowingCard';
```

**Location:** `src/molecules/GlowingCard/GlowingCard.tsx`

## Basic Usage

```tsx
<GlowingCard glowColor="#6366f1" intensity={0.5}>
  <YourContent />
</GlowingCard>
```

## Strategy

**Purpose**: Create visual emphasis and draw attention to specific content through glowing effects.

**When to Use**:
- Featured products or items
- Premium content highlighting
- Important announcements
- Achievement badges
- Limited-time offers
- User highlights (verified users, contributors)

**When NOT to Use**:
- Regular content cards (use AtomicCard instead)
- Multiple items on same screen (causes visual clutter)
- Background elements
- Non-essential content

## Rules

### Required

1. **MUST** provide a `glowColor` prop
2. **MUST** keep `intensity` between 0.3 and 0.8
3. **ALWAYS** use sparingly (max 1-2 per screen)
4. **MUST** ensure sufficient contrast with glow color
5. **SHOULD** have purpose (highlight featured content)

### Intensity Guidelines

1. **Subtle emphasis**: 0.3 - 0.5
2. **Medium emphasis**: 0.5 - 0.7
3. **Strong emphasis**: 0.7 - 0.8

**Never use intensity > 0.8** (too distracting)

### Color Selection

1. **MUST** use theme colors when possible
2. **SHOULD** match content purpose
3. **NEVER** use pure neon colors (#00FF00, #FF00FF, etc.)

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No glow color
<GlowingCard>
  <Content />
</GlowingCard>

// ❌ Too high intensity
<GlowingCard glowColor="#6366f1" intensity={1.0}>
  <Content />
</GlowingCard>

// ❌ Too many glowing cards
<View>
  <GlowingCard glowColor="#6366f1"><Content1 /></GlowingCard>
  <GlowingCard glowColor="#10b981"><Content2 /></GlowingCard>
  <GlowingCard glowColor="#f59e0b"><Content3 /></GlowingCard>
  {/* ❌ Max 1-2 per screen */}
</View>

// ❌ Neon colors
<GlowingCard glowColor="#00FF00" intensity={0.8}>
  <Content />
</GlowingCard>

// ❌ Non-essential content
<GlowingCard glowColor="#6366f1">
  <RegularContent /> {/* ❌ Use AtomicCard instead */}
</GlowingCard>

// ❌ Nested GlowingCards
<GlowingCard glowColor="#6366f1">
  <GlowingCard glowColor="#10b981">
    <Content />
  </GlowingCard>
</GlowingCard>
```

## Best Practices

### Featured Content

✅ **DO**:
```tsx
<GlowingCard
  glowColor={tokens.colors.primary}
  intensity={0.6}
  onPress={() => navigateTo(featuredItem)}
>
  <FeaturedProductCard product={featuredProduct} />
</GlowingCard>
```

❌ **DON'T**:
```tsx
<GlowingCard glowColor="#ff0000" intensity={0.9}>
  <RegularProduct />
</GlowingCard>
```

### Achievement Badges

✅ **DO**:
```tsx
<GlowingCard
  glowColor="#f59e0b"
  intensity={0.5}
  style={{ width: 120, height: 120 }}
>
  <AchievementBadge achievement={achievement} />
</GlowingCard>
```

### User Highlights

✅ **DO**:
```tsx
<GlowingCard glowColor="#8b5cf6" intensity={0.4}>
  <UserHighlight user={verifiedUser} />
</GlowingCard>
```

### Color by Purpose

✅ **DO**:
- Primary actions: Theme primary color
- Success: Green (#10b981, #22c55e)
- Warning: Orange/Amber (#f59e0b, #f97316)
- Error: Red (#ef4444, #dc2626)
- Info: Blue (#3b82f6, #2563eb)

❌ **DON'T**:
```tsx
// ❌ Random colors
<GlowingCard glowColor="#123456" />

// ❌ Too bright
<GlowingCard glowColor="#00FF00" />
```

## AI Coding Guidelines

### For AI Agents

When generating GlowingCard components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { GlowingCard } from 'react-native-design-system/src/molecules/GlowingCard';
   ```

2. **Always specify glowColor**:
   ```tsx
   <GlowingCard
     glowColor={根据内容选择合适的颜色}
     intensity={0.5-0.7之间的值}
   >
     {content}
   </GlowingCard>
   ```

3. **Never use without purpose**:
   ```tsx
   // ❌ Bad - arbitrary use
   <GlowingCard glowColor="#6366f1">
     <RegularContent />
   </GlowingCard>

   // ✅ Good - featured content
   {isFeatured && (
     <GlowingCard glowColor="#6366f1" intensity={0.6}>
       <FeaturedContent />
     </GlowingCard>
   )}
   ```

4. **Always limit usage on screen**:
   ```tsx
   // ✅ Good - conditional highlighting
   <View>
     {items.map((item, index) =>
       item.isFeatured ? (
         <GlowingCard key={item.id} glowColor="#6366f1" intensity={0.6}>
           <ItemCard item={item} />
         </GlowingCard>
       ) : (
         <AtomicCard key={item.id}>
           <ItemCard item={item} />
         </AtomicCard>
       )
     )}
   </View>
   ```

5. **Always use semantic colors**:
   ```tsx
   // ✅ Good - color by purpose
   const getGlowColor = (type: 'success' | 'warning' | 'error') => {
     switch (type) {
       case 'success': return '#10b981';
       case 'warning': return '#f59e0b';
       case 'error': return '#ef4444';
       default: return tokens.colors.primary;
     }
   };

   <GlowingCard glowColor={getGlowColor(type)} />
   ```

### Common Patterns

#### Featured Product
```tsx
<GlowingCard
  glowColor="#6366f1"
  intensity={0.6}
  onPress={() => navigation.navigate('Product', { productId: product.id })}
>
  <ProductCard product={product} variant="featured" />
</GlowingCard>
```

#### Achievement Badge
```tsx
<GlowingCard
  glowColor="#f59e0b"
  intensity={0.5}
  style={{ margin: 8 }}
>
  <AchievementBadge achievement={achievement} />
</GlowingCard>
```

#### Notification Card
```tsx
<GlowingCard
  glowColor={notification.urgency === 'high' ? '#ef4444' : '#3b82f6'}
  intensity={notification.urgency === 'high' ? 0.7 : 0.4}
  onPress={() => markAsRead(notification.id)}
>
  <NotificationCard notification={notification} />
</GlowingCard>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `glowColor` | `string` | **Yes** | Theme primary color | Glow color (hex) |
| `intensity` | `number` | No | `0.5` | Glow intensity (0-1) |
| `borderWidth` | `number` | No | `0` | Border width |
| `borderColor` | `string` | No | Same as glowColor | Border color |
| `onPress` | `() => void` | No | - | Press callback |
| `style` | `ViewStyle` | No | - | Custom container style |
| `children` | `ReactNode` | **Yes** | - | Card content |

## Accessibility

- ✅ Screen reader announces card content
- ✅ Touch target size maintained (min 44x44pt)
- ✅ Focus indicators for pressable cards
- ✅ Sufficient color contrast with glow
- ✅ Semantic structure preserved

## Performance Tips

1. **Use sparingly**: Only for highlights (1-2 per screen max)
2. **Lower intensity**: Better performance with 0.3-0.5
3. **Avoid animation**: Static glow more performant
4. **Conditional rendering**: Don't use for every card
5. **Memo content**: Memo card content to prevent re-renders

## Related Components

- [`AtomicCard`](../../atoms/AtomicCard/README.md) - Base card component
- [`MediaCard`](../media-card/README.md) - Media card component
- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - Icon component

## License

MIT

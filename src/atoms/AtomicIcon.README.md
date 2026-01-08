# AtomicIcon

A theme-aware icon component using Ionicons with semantic sizing and colors.

## Import & Usage

```typescript
import { AtomicIcon } from 'react-native-design-system/src/atoms/AtomicIcon';
```

**Location:** `src/atoms/AtomicIcon.tsx`

## Basic Usage

```tsx
<AtomicIcon name="heart" />
```

## Strategy

**Purpose**: Provide consistent, accessible icons with theme integration.

**When to Use**:
- Navigation icons (tabs, headers, buttons)
- Action indicators (favorites, settings, search)
- Status indicators (success, error, warning)
- Decorative icons with semantic meaning

**When NOT to Use**:
- For images or photos (use Image component)
- When custom icon graphics are needed (use SVG)
- For non-icon graphics or illustrations

## Rules

### Required

1. **MUST** provide `name` prop (valid Ionicons name)
2. **ALWAYS** use appropriate size for context
3. **SHOULD** use semantic colors when meaningful
4. **MUST** provide accessibility label if not decorative
5. **ALWAYS** validate icon name exists
6. **SHOULD** use consistent sizing within context
7. **MUST** handle invalid icon names gracefully

### Size Guidelines

1. **xs (16px)**: Inline text, tiny badges
2. **sm (20px)**: List items, compact buttons
3. **md (24px)**: Default, most use cases
4. **lg (28px)**: Emphasis, large buttons
5. **xl (32px)**: Headers, featured icons

### Color Semantics

1. **primary**: Primary actions, active states
2. **success**: Success states, confirmations
3. **warning**: Warning states, cautions
4. **error**: Error states, destructive actions
5. **secondary**: Secondary actions, inactive states

### Background Usage

1. **Use for**: Floating action buttons, avatar icons
2. **Don't overuse**: Not every icon needs background
3. **Match colors**: Background should complement icon

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No icon name
<AtomicIcon /> {/* ❌ Missing required prop */}

// ❌ Invalid icon name
<AtomicIcon name="invalid-icon-name" /> {/* ❌ Shows fallback */}

// ❌ Wrong size for context
<Button>
  <AtomicIcon name="add" size="xxl" /> {/* ❌ Too large */}
</Button>

// ❌ Inconsistent sizes
<View style={{ flexDirection: 'row' }}>
  <AtomicIcon name="home" size="xs" />
  <AtomicIcon name="settings" size="xl" /> {/* ❌ Inconsistent */}
</View>

// ❌ Decorative icon not hidden
<AtomicIcon
  name="sparkles"
  // ❌ Should have accessibilityElementsHidden
/>

// ❌ Confusing color semantics
<AtomicIcon
  name="trash"
  color="success" {/* ❌ Trash should be error/danger */}
/>

// ❌ Background for every icon
<AtomicIcon
  name="home"
  withBackground {/* ❌ Unnecessary */}
/>
```

## Best Practices

### Size Selection

✅ **DO**:
```tsx
// ✅ Inline with text
<AtomicText>
  <AtomicIcon name="star" size="xs" /> Featured
</AtomicText>

// ✅ Button icons
<Button>
  <AtomicIcon name="add" size="sm" />
</Button>

// ✅ Tab icons
<TabBar>
  <TabIcon icon="home" size="md" />
</TabBar>
```

❌ **DON'T**:
```tsx
// ❌ Wrong sizes
<Button>
  <AtomicIcon name="add" size="xl" /> {/* Too large */}
</Button>

<AtomicText>
  <AtomicIcon name="star" size="xl" /> Featured {/* Too large */}
</AtomicText>
```

### Semantic Colors

✅ **DO**:
```tsx
// ✅ Meaningful colors
<AtomicIcon name="checkmark-circle" color="success" />
<AtomicIcon name="warning" color="warning" />
<AtomicIcon name="close-circle" color="error" />
<AtomicIcon name="heart" color="primary" />
```

❌ **DON'T**:
```tsx
// ❌ Confusing colors
<AtomicIcon name="trash" color="success" />
<AtomicIcon name="checkmark" color="error" />
```

### Background Usage

✅ **DO**:
```tsx
// ✅ FAB icons
<AtomicIcon
  name="add"
  size="md"
  withBackground
  color="primary"
/>

// ✅ Status icons
<AtomicIcon
  name="checkmark"
  size="sm"
  withBackground
  color="success"
  backgroundColor="#d4edda"
/>
```

❌ **DON'T**:
```tsx
// ❌ Unnecessary background
<AtomicIcon
  name="home"
  withBackground {/* Not needed */}
/>
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicIcon components, follow these rules:

1. **Always provide valid icon name**:
   ```tsx
   // ✅ Good - valid Ionicons
   <AtomicIcon name="home" />
   <AtomicIcon name="settings-outline" />
   <AtomicIcon name="chevron-forward" />

   // ❌ Bad - invalid names
   <AtomicIcon name="invalid-icon" />
   <AtomicIcon name="home_icon" />
   ```

2. **Always use appropriate size**:
   ```tsx
   // ✅ Good - size matches context
   <Button>
     <AtomicIcon name="add" size="sm" />
   </Button>
   <TabIcon icon="home" size="md" />

   // ❌ Bad - wrong size
   <Button>
     <AtomicIcon name="add" size="xl" />
   </Button>
   ```

3. **Always use semantic colors meaningfully**:
   ```tsx
   // ✅ Good - meaningful colors
   <AtomicIcon name="checkmark" color="success" />
   <AtomicIcon name="warning" color="warning" />
   <AtomicIcon name="trash" color="error" />

   // ❌ Bad - confusing colors
   <AtomicIcon name="trash" color="success" />
   ```

4. **Always provide accessibility context**:
   ```tsx
   // ✅ Good - accessible
   <AtomicIcon
     name="menu"
     accessibilityLabel="Open menu"
     accessibilityRole="button"
   />

   // ❌ Bad - not accessible
   <AtomicIcon name="menu" />
   ```

### Common Patterns

#### Basic Icon
```tsx
<AtomicIcon name="heart" />
```

#### With Text
```tsx
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <AtomicIcon name="star" size="sm" color="warning" />
  <AtomicText>Featured</AtomicText>
</View>
```

#### Button Icon
```tsx
<Button onPress={handleAction}>
  <AtomicIcon name="add" size="sm" color="white" />
</Button>
```

#### Status Icon
```tsx
<AtomicIcon
  name="checkmark-circle"
  size="lg"
  color="success"
  accessibilityLabel="Completed"
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `IconName` | Yes | - | Ionicons icon name |
| `size` | `IconSize` | No | `'md'` | Icon size |
| `customSize` | `number` | No | - | Custom size (px) |
| `color` | `IconColor` | No | - | Semantic color |
| `customColor` | `string` | No | - | Custom color |
| `svgPath` | `string` | No | - | Custom SVG path |
| `svgViewBox` | `string` | No | `'0 0 24 24'` | SVG viewBox |
| `withBackground` | `boolean` | No | `false` | Circular background |
| `backgroundColor` | `string` | No | - | Background color |
| `accessibilityLabel` | `string` | No | - | Accessibility label |

## Accessibility

- ✅ Screen reader support
- ✅ Accessibility label
- ✅ Semantic role
- ✅ Test ID support

## Performance Tips

1. **React.memo**: Component is already memoized
2. **Static names**: Use constant icon names
3. **Avoid re-renders**: Stabilize icon props

## Related Components

- [`AtomicButton`](./AtomicButton.README.md) - Button component
- [`AtomicChip`](./AtomicChip.README.md) - Chip component
- [`AtomicText`](./AtomicText.README.md) - Text component

## License

MIT

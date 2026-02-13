# Error Handling Pattern

## Standard Pattern for Design System Hooks

All hooks in this design system should follow a consistent error handling pattern for predictable behavior and easier debugging.

## Pattern Structure

```typescript
/**
 * Standard Error Handling Pattern
 *
 * 1. try/catch/finally structure
 * 2. Set loading state in try
 * 3. Clear error state at start
 * 4. Catch all errors, set error state
 * 5. Log with __DEV__ only
 * 6. Reset loading state in finally
 * 7. Return safe fallback values
 */

const someAsyncFunction = useCallback(async () => {
  try {
    setIsLoading(true);
    setError(null);

    const result = await someOperation();
    return result;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Operation failed';
    setError(errorMessage);

    if (__DEV__) {
      console.error('[DesignSystem] HookName.functionName error:', err);
    }

    // Return safe fallback value
    return fallbackValue;
  } finally {
    setIsLoading(false);
  }
}, [dependencies]);
```

## Key Principles

### 1. Consistent State Management
- Always use `try/catch/finally`
- Set `isLoading` in try block
- Clear `error` at start
- Reset `isLoading` in finally block

### 2. Error Handling
- Catch all errors (never throw unhandled)
- Convert errors to string messages
- Set error state for UI feedback
- Return safe fallback values

### 3. Development Logging
- Use `__DEV__` for conditional logging (NOT `process.env.NODE_ENV`)
- Prefix logs with `[DesignSystem]`
- Include hook/function name
- Log full error object for debugging

### 4. Production Behavior
- Silent failures (no console logs)
- Error state available for UI
- Graceful degradation with fallbacks

## Examples

### Network Request Hook

```typescript
const fetchData = useCallback(async (id: string) => {
  try {
    setIsLoading(true);
    setError(null);

    const response = await api.getData(id);
    return response;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
    setError(errorMessage);

    if (__DEV__) {
      console.error('[DesignSystem] useData.fetchData error:', err);
    }

    return null; // Safe fallback
  } finally {
    setIsLoading(false);
  }
}, []);
```

### Media Operation Hook

```typescript
const pickImage = useCallback(async (options?: MediaPickerOptions) => {
  try {
    setIsLoading(true);
    setError(null);

    const result = await MediaPickerService.pickSingleImage(options);

    if (result.errorMessage) {
      setError(result.errorMessage);
    }

    return result;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to pick image';
    setError(errorMessage);

    if (__DEV__) {
      console.error('[DesignSystem] useMedia.pickImage error:', err);
    }

    return { canceled: true }; // Safe fallback
  } finally {
    setIsLoading(false);
  }
}, []);
```

### Storage Operation Hook

```typescript
const saveToStorage = useCallback(async (key: string, value: unknown) => {
  try {
    setIsLoading(true);
    setError(null);

    await StorageService.setItem(key, value);
    return true;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to save';
    setError(errorMessage);

    if (__DEV__) {
      console.error('[DesignSystem] useStorage.save error:', err);
    }

    return false; // Safe fallback
  } finally {
    setIsLoading(false);
  }
}, []);
```

## Anti-Patterns to Avoid

### ❌ Don't: Inconsistent error handling

```typescript
// Bad - different patterns in same codebase
async function foo() {
  try {
    // ...
  } catch (e) {
    console.log(e); // Always logs
  }
}

async function bar() {
  try {
    // ...
  } catch (e) {
    throw e; // Unhandled
  }
}
```

### ❌ Don't: Use process.env.NODE_ENV

```typescript
// Bad - inconsistent with codebase
if (process.env.NODE_ENV === 'development') {
  console.error(err);
}
```

### ❌ Don't: Skip finally block

```typescript
// Bad - loading state not reset on error
try {
  setIsLoading(true);
  await operation();
  setIsLoading(false); // Won't run on error
} catch (err) {
  setError(err.message);
}
```

### ❌ Don't: Silent failures without fallbacks

```typescript
// Bad - no fallback value, breaks UI
async function getData() {
  try {
    return await fetch();
  } catch {
    // Returns undefined, UI might break
  }
}
```

## ✅ Do: Use standard pattern

```typescript
// Good - consistent, safe, debuggable
async function getData() {
  try {
    setIsLoading(true);
    setError(null);

    const data = await fetch();
    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed';
    setError(errorMessage);

    if (__DEV__) {
      console.error('[DesignSystem] getData error:', err);
    }

    return null; // Safe fallback
  } finally {
    setIsLoading(false);
  }
}
```

## Implementation Checklist

When creating or updating hooks:

- [ ] Use try/catch/finally structure
- [ ] Set loading state in try block
- [ ] Clear error at start of operation
- [ ] Catch all errors, never throw unhandled
- [ ] Convert errors to string messages
- [ ] Set error state for UI feedback
- [ ] Use `__DEV__` for logging (not process.env)
- [ ] Prefix logs with `[DesignSystem]`
- [ ] Reset loading state in finally
- [ ] Return safe fallback values
- [ ] Document expected error states
- [ ] Test error scenarios

## Migration Guide

### Before (Inconsistent)

```typescript
const doSomething = async () => {
  setLoading(true);
  try {
    const result = await operation();
    setLoading(false);
    return result;
  } catch (e) {
    console.log(e);
    return;
  }
};
```

### After (Standard Pattern)

```typescript
const doSomething = useCallback(async () => {
  try {
    setIsLoading(true);
    setError(null);

    const result = await operation();
    return result;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Operation failed';
    setError(errorMessage);

    if (__DEV__) {
      console.error('[DesignSystem] doSomething error:', err);
    }

    return null; // Safe fallback
  } finally {
    setIsLoading(false);
  }
}, []);
```

## Benefits

1. **Predictability**: Same pattern everywhere
2. **Debuggability**: Consistent logging in development
3. **Production Safety**: No console noise, graceful failures
4. **UI Consistency**: Error state always available
5. **Maintainability**: Easy to review and update
6. **Testing**: Standard error paths to test

## Related Patterns

- **Loading States**: See `docs/LOADING_PATTERNS.md`
- **Error Boundaries**: See `docs/ERROR_BOUNDARIES.md`
- **Retry Logic**: See `docs/RETRY_PATTERNS.md`

# FormField

FormField is a molecule component that combines a label, input field, and validation messages into a complete form input unit. It wraps `AtomicInput` with `AtomicText` for labels and error/helper messages.

## Features

- 📝 **Complete Form Input**: Label, input, and messages in one component
- ✅ **Validation**: Error and helper text support
- 🔴 **Required Indicator**: Visual required field marker
- 🎨 **Theme-Aware**: Design token integration
- ♿ **Accessible**: Full accessibility support
- 🎯 **Simple API**: Easy to use with minimal props

## Installation

```tsx
import { FormField } from 'react-native-design-system';
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { FormField } from 'react-native-design-system';

export const BasicExample = () => {
  const [email, setEmail] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
    </View>
  );
};
```

## Basic Input

```tsx
<FormField
  label="Username"
  value={username}
  onChangeText={setUsername}
  placeholder="Enter username"
/>
```

## With Error

```tsx
<FormField
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
  error="Please enter a valid email address"
/>
```

## Required Field

```tsx
<FormField
  label="Password"
  value={password}
  onChangeText={setPassword}
  placeholder="Enter password"
  secureTextEntry
  required
/>
```

## Helper Text

```tsx
<FormField
  label="Username"
  value={username}
  onChangeText={setUsername}
  placeholder="Choose a username"
  helperText="Must be at least 3 characters long"
/>
```

## Custom Required Indicator

```tsx
<FormField
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="your@email.com"
  required
  requiredIndicator=" (required)"
/>
```

## With Icons

```tsx
<FormField
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="your@email.com"
  leftIcon="mail-outline"
  rightIcon="checkmark-circle-outline"
/>
```

## Example Usages

### Login Form

```tsx
export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      login({ email, password });
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="your@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        required
      />

      <FormField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        error={errors.password}
        required
      />

      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};
```

### Registration Form

```tsx
export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <FormField
        label="First Name"
        value={formData.firstName}
        onChangeText={(value) => handleChange('firstName', value)}
        placeholder="John"
        error={errors.firstName}
        required
      />

      <FormField
        label="Last Name"
        value={formData.lastName}
        onChangeText={(value) => handleChange('lastName', value)}
        placeholder="Doe"
        error={errors.lastName}
        required
      />

      <FormField
        label="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        placeholder="john.doe@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        required
      />

      <FormField
        label="Password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        placeholder="Create a password"
        secureTextEntry
        error={errors.password}
        helperText="Must be at least 8 characters"
        required
      />

      <FormField
        label="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        placeholder="Confirm your password"
        secureTextEntry
        error={errors.confirmPassword}
        required
      />

      <Button title="Create Account" onPress={validate} />
    </ScrollView>
  );
};
```

### Profile Settings

```tsx
export const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    displayName: '',
    username: '',
    bio: '',
    location: '',
    website: '',
  });

  return (
    <ScrollView style={{ padding: 16 }}>
      <FormField
        label="Display Name"
        value={profile.displayName}
        onChangeText={(value) => setProfile({ ...profile, displayName: value })}
        placeholder="John Doe"
        helperText="This is how you'll appear on your profile"
      />

      <FormField
        label="Username"
        value={profile.username}
        onChangeText={(value) => setProfile({ ...profile, username: value })}
        placeholder="johndoe"
        helperText="https://example.com/username"
        leftIcon="at-outline"
      />

      <FormField
        label="Bio"
        value={profile.bio}
        onChangeText={(value) => setProfile({ ...profile, bio: value })}
        placeholder="Tell us about yourself"
        multiline
        numberOfLines={4}
        helperText="Maximum 150 characters"
      />

      <FormField
        label="Location"
        value={profile.location}
        onChangeText={(value) => setProfile({ ...profile, location: value })}
        placeholder="New York, NY"
        leftIcon="location-outline"
      />

      <FormField
        label="Website"
        value={profile.website}
        onChangeText={(value) => setProfile({ ...profile, website: value })}
        placeholder="https://yourwebsite.com"
        keyboardType="url"
        autoCapitalize="none"
        leftIcon="link-outline"
      />

      <Button title="Save Changes" onPress={handleSave} />
    </ScrollView>
  );
};
```

### Address Form

```tsx
export const AddressForm = () => {
  const [address, setAddress] = useState({
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  return (
    <View style={{ padding: 16 }}>
      <FormField
        label="Street Address"
        value={address.street}
        onChangeText={(value) => setAddress({ ...address, street: value })}
        placeholder="123 Main St"
        required
      />

      <FormField
        label="Apartment/Suite (optional)"
        value={address.apartment}
        onChangeText={(value) => setAddress({ ...address, apartment: value })}
        placeholder="Apt 4B"
      />

      <FormField
        label="City"
        value={address.city}
        onChangeText={(value) => setAddress({ ...address, city: value })}
        placeholder="New York"
        required
      />

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <FormField
            label="State"
            value={address.state}
            onChangeText={(value) => setAddress({ ...address, state: value })}
            placeholder="NY"
            required
          />
        </View>

        <View style={{ flex: 1 }}>
          <FormField
            label="ZIP Code"
            value={address.zipCode}
            onChangeText={(value) => setAddress({ ...address, zipCode: value })}
            placeholder="10001"
            keyboardType="number-pad"
            required
          />
        </View>
      </View>

      <FormField
        label="Country"
        value={address.country}
        onChangeText={(value) => setAddress({ ...address, country: value })}
        placeholder="United States"
        required
      />
    </View>
  );
};
```

### Credit Card Form

```tsx
export const CreditCardForm = () => {
  const [card, setCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const formatCardNumber = (text) => {
    return text.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (text) => {
    if (text.length === 2 && !text.includes('/')) {
      return text + '/';
    }
    return text;
  };

  return (
    <View style={{ padding: 16 }}>
      <FormField
        label="Card Number"
        value={card.cardNumber}
        onChangeText={(value) => setCard({ ...card, cardNumber: formatCardNumber(value) })}
        placeholder="1234 5678 9012 3456"
        keyboardType="number-pad"
        maxLength={19}
        leftIcon="card-outline"
        required
      />

      <FormField
        label="Cardholder Name"
        value={card.cardHolder}
        onChangeText={(value) => setCard({ ...card, cardHolder: value })}
        placeholder="JOHN DOE"
        autoCapitalize="characters"
        required
      />

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <FormField
            label="Expiry Date"
            value={card.expiryDate}
            onChangeText={(value) => setCard({ ...card, expiryDate: formatExpiry(value) })}
            placeholder="MM/YY"
            keyboardType="number-pad"
            maxLength={5}
            required
          />
        </View>

        <View style={{ flex: 1 }}>
          <FormField
            label="CVV"
            value={card.cvv}
            onChangeText={(value) => setCard({ ...card, cvv: value })}
            placeholder="123"
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
            helperText="3 or 4 digits on back of card"
            required
          />
        </View>
      </View>
    </View>
  );
};
```

### Search Form

```tsx
export const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  return (
    <View style={{ padding: 16 }}>
      <FormField
        label="Search"
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="What are you looking for?"
        leftIcon="search-outline"
      />

      <FormField
        label="Category"
        value={filters.category}
        onChangeText={(value) => setFilters({ ...filters, category: value })}
        placeholder="Select a category"
        rightIcon="chevron-down-outline"
      />

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <FormField
            label="Min Price"
            value={filters.minPrice}
            onChangeText={(value) => setFilters({ ...filters, minPrice: value })}
            placeholder="$0"
            keyboardType="number-pad"
          />
        </View>

        <View style={{ flex: 1 }}>
          <FormField
            label="Max Price"
            value={filters.maxPrice}
            onChangeText={(value) => setFilters({ ...filters, maxPrice: value })}
            placeholder="$1000"
            keyboardType="number-pad"
          />
        </View>
      </View>

      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};
```

## Props

### FormFieldProps

Extends `Omit<AtomicInputProps, 'state' | 'label'>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Field label |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text |
| `required` | `boolean` | `false` | Show required indicator |
| `containerStyle` | `ViewStyle` | - | Container style |
| `style` | `ViewStyle` | - | Alias for containerStyle |
| `requiredIndicator` | `string` | `' *'` | Required indicator text |

Plus all AtomicInput props:
- `value`, `onChangeText`, `placeholder`, `secureTextEntry`, `keyboardType`, etc.

## Best Practices

### 1. Error Handling

```tsx
// ✅ Good: Clear specific errors
<FormField
  error="Email must be in format: user@example.com"
/>

// ❌ Bad: Vague errors
<FormField
  error="Invalid"
/>
```

### 2. Helper Text

```tsx
// ✅ Good: Helpful guidance
<FormField
  helperText="Must be at least 8 characters with 1 number"
/>

// ❌ Bad: Obvious info
<FormField
  helperText="Enter text here"
/>
```

### 3. Required Fields

```tsx
// ✅ Good: Use sparingly
<FormField
  label="Email"
  required
/>

// ❌ Bad: Overuse
<FormField
  label="Optional Field"
  required
/>
```

## Accessibility

FormField provides full accessibility support:

- ✅ Screen reader labels
- ✅ Error announcements
- ✅ Required field indicators
- ✅ Helper text
- ✅ Auto-focus handling

## Performance Tips

1. **Controlled Inputs**: Always use controlled inputs with state
2. **Validation Debounce**: Debounce validation for better UX
3. **Memoization**: Memo validation functions

## Related Components

- [`AtomicInput`](../atoms/input/README.md) - Base input component
- [`AtomicText`](../atoms/AtomicText/README.md) - Text component
- [`Button`](../atoms/button/README.md) - Button component
- [`AlertInline`](../alerts/README.md) - Inline alert component

## License

MIT

# AtomicDatePicker

AtomicDatePicker, platforma özel native tarih/saat seçici bileşenidir. iOS ve Android'de tutarlı bir deneyim sunar.

## Özellikler

- 📅 **Tarih Seçimi**: Native tarih picker
- ⏰ **Saat Seçimi**: Native saat picker
- 🌍 **Locale Desteği**: Otomatik dil entegrasyonu
- 🎨 **Tema Bilinci**: Tema entegrasyonu
- 📱 **Platform Spesifik**: iOS wheel, Android dialog
- ⚙️ **Kısıtlamalar**: Min/Maks tarih
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği

## Kurulum

```tsx
import { AtomicDatePicker } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { AtomicDatePicker } from 'react-native-design-system';

export const BasicExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <View style={{ padding: 16 }}>
      <AtomicDatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        label="Doğum Tarihi"
        placeholder="Tarih seçin"
      />
    </View>
  );
};
```

## Date Picker

```tsx
const [date, setDate] = useState<Date | null>(null);

<AtomicDatePicker
  value={date}
  onChange={setDate}
  mode="date"
  label="Tarih"
  placeholder="Tarih seçin"
/>
```

## Time Picker

```tsx
const [time, setTime] = useState<Date | null>(null);

<AtomicDatePicker
  value={time}
  onChange={setTime}
  mode="time"
  label="Saat"
  placeholder="Saat seçin"
/>
```

## DateTime Picker (Sadece iOS)

```tsx
const [dateTime, setDateTime] = useState<Date | null>(null);

<AtomicDatePicker
  value={dateTime}
  onChange={setDateTime}
  mode="datetime"
  label="Tarih ve Saat"
  placeholder="Tarih ve saat seçin"
/>
```

## Min/Max Date

```tsx
<AtomicDatePicker
  value={birthDate}
  onChange={setBirthDate}
  label="Doğum Tarihi"
  minimumDate={new Date(1900, 0, 1)}
  maximumDate={new Date()}
/>
```

## Error State

```tsx
<AtomicDatePicker
  value={date}
  onChange={setDate}
  label="Tarih"
  error="Lütfen geçerli bir tarih seçin"
/>
```

## Disabled

```tsx
<AtomicDatePicker
  value={date}
  onChange={setDate}
  label="Tarih"
  disabled
/>
```

## Örnek Kullanımlar

### Doğum Tarihi

```tsx
export const BirthDateForm = () => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  return (
    <View style={{ padding: 16 }}>
      <AtomicDatePicker
        value={birthDate}
        onChange={setBirthDate}
        label="Doğum Tarihi"
        placeholder="Doğum tarihinizi seçin"
        minimumDate={new Date(1900, 0, 1)}
        maximumDate={new Date()}
        mode="date"
      />

      {birthDate && (
        <AtomicText type="bodyMedium" marginTop="sm">
          Seçilen Tarih: {birthDate.toLocaleDateString('tr-TR')}
        </AtomicText>
      )}
    </View>
  );
};
```

### Randevu Tarihi

```tsx
export const AppointmentForm = () => {
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [error, setError] = useState('');

  const handleDateChange = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      setError('Geçmiş tarih seçemezsiniz');
      return;
    }

    setError('');
    setAppointmentDate(date);
  };

  return (
    <View style={{ padding: 16 }}>
      <AtomicDatePicker
        value={appointmentDate}
        onChange={handleDateChange}
        label="Randevu Tarihi"
        placeholder="Randevu tarihi seçin"
        minimumDate={new Date()}
        error={error}
        mode="date"
      />
    </View>
  );
};
```

### Etkinlik Tarihi ve Saati

```tsx
export const EventForm = () => {
  const [eventDateTime, setEventDateTime] = useState<Date | null>(null);

  return (
    <View style={{ padding: 16 }}>
      <AtomicDatePicker
        value={eventDateTime}
        onChange={setEventDateTime}
        label="Etkinlik Tarihi ve Saati"
        placeholder="Tarih ve saat seçin"
        minimumDate={new Date()}
        mode="datetime"
      />

      {eventDateTime && (
        <AtomicText type="bodyMedium" marginTop="sm">
          {eventDateTime.toLocaleString('tr-TR')}
        </AtomicText>
      )}
    </View>
  );
};
```

### Hatırlatıcı Saati

```tsx
export const ReminderForm = () => {
  const [reminderTime, setReminderTime] = useState<Date | null>(null);

  return (
    <View style={{ padding: 16 }}>
      <AtomicDatePicker
        value={reminderTime}
        onChange={setReminderTime}
        label="Hatırlatıcı Saati"
        placeholder="Saat seçin"
        mode="time"
      />

      {reminderTime && (
        <AtomicText type="bodyMedium" marginTop="sm">
          {reminderTime.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </AtomicText>
      )}
    </View>
  );
};
```

### Geçerlilik Tarihi

```tsx
export const ExpiryForm = () => {
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  const today = new Date();
  const nextYear = new Date();
  nextYear.setFullYear(today.getFullYear() + 1);

  return (
    <View style={{ padding: 16 }}>
      <AtomicDatePicker
        value={expiryDate}
        onChange={setExpiryDate}
        label="Geçerlilik Tarihi"
        placeholder="Son kullanma tarihi"
        minimumDate={today}
        maximumDate={nextYear}
        mode="date"
      />
    </View>
  );
};
```

### Tarih Aralığı

```tsx
export const DateRangeForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <View style={{ padding: 16 }}>
      <AtomicDatePicker
        value={startDate}
        onChange={(date) => {
          setStartDate(date);
          if (endDate && date > endDate) {
            setEndDate(null);
          }
        }}
        label="Başlangıç Tarihi"
        placeholder="Başlangıç tarihi"
        mode="date"
      />

      <AtomicDatePicker
        value={endDate}
        onChange={setEndDate}
        label="Bitiş Tarihi"
        placeholder="Bitiş tarihi"
        minimumDate={startDate || undefined}
        mode="date"
        style={{ marginTop: 16 }}
      />
    </View>
  );
};
```

## Props

### AtomicDatePickerProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `value` | `Date \| null` | - **(Zorunlu)** | Seçili tarih |
| `onChange` | `(date: Date) => void` | - **(Zorunlu)** | Değişiklik olayı |
| `label` | `string` | - | Etiket metni |
| `error` | `string` | - | Hata mesajı |
| `disabled` | `boolean` | `false` | Devre dışı |
| `minimumDate` | `Date` | - | Minimum tarih |
| `maximumDate` | `Date` | - | Maksimum tarih |
| `mode` | `'date' \| 'time' \| 'datetime'` | `'date'` | Picker modu |
| `placeholder` | `string` | `'Select date'` | Placeholder metni |
| `style` | `StyleProp<ViewStyle>` | - | Özel stil |
| `testID` | `string` | - | Test ID'si |

## Platform Davranışı

### iOS
- ✨ Bottom sheet modal açılır
- 🎡 Wheel picker gösterir
- ✅ "Done" butonu ile onaylar
- 👆 Swipe down ile kapatılır

### Android
- 📱 Dialog açılır
- 📅 Takvim view gösterir
- ✅ Seçimde otomatik kapanır

## Best Practices

### 1. Mode Seçimi

```tsx
// Sadece tarih
<AtomicDatePicker mode="date" />

// Sadece saat
<AtomicDatePicker mode="time" />

// Tarih ve saat (sadece iOS)
<AtomicDatePicker mode="datetime" />
```

### 2. Tarih Kısıtlamaları

```tsx
// Geçmiş tarih için
<AtomicDatePicker
  maximumDate={new Date()}
/>

// Gelecek tarih için
<AtomicDatePicker
  minimumDate={new Date()}
/>

// Belirli aralık
<AtomicDatePicker
  minimumDate={new Date(2024, 0, 1)}
  maximumDate={new Date(2024, 11, 31)}
/>
```

### 3. Error Handling

```tsx
const validateDate = (date: Date) => {
  const today = new Date();
  if (date < today) {
    return 'Geçmiş tarih seçemezsiniz';
  }
  return '';
};
```

## Erişilebilirlik

AtomicDatePicker, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Native picker erişilebilirliği
- ✅ Error state anonsu
- ✅ Test ID desteği

## İlgili Bileşenler

- [`AtomicInput`](./input/README.md) - Input bileşeni
- [`FormField`](../../molecules/FormField/README.md) - Form alanı
- [`AtomicPicker`](./picker/README.md) - Seçim bileşeni

## Lisans

MIT

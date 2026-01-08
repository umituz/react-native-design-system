# AtomicCalendar

AtomicCalendar, React Native için tam özellikli bir takvim bileşenidir. Aylık görünümde etkinlik gösterimi, tarih seçimi ve özelleştirme desteği sunar.

## Özellikler

- 📅 **Aylık Görünüm**: 6 haftalık 42 günlük grid
- 🎯 **Tarih Seçimi**: Interactive tarih seçimi
- 🔵 **Event Indicators**: Etkinlik noktaları gösterimi
- 🌍 **Timezone Bilinci**: Timezone uyumlu
- 🎨 **Özelleştirilebilir**: Stil ve tema desteği
- ♿ **Erişilebilir**: Tam erişilebilirlik desteği
- 📱 **Responsive**: Cihaz boyutuna uyum

## Kurulum

```tsx
import { AtomicCalendar } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { AtomicCalendar } from 'react-native-design-system';

export const BasicExample = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Calendar days'i hesaplayın (custom hook veya service kullanabilirsiniz)
  const days = calculateCalendarDays(selectedDate);

  return (
    <View style={{ padding: 16 }}>
      <AtomicCalendar
        days={days}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    </View>
  );
};
```

## Basic Calendar

```tsx
<AtomicCalendar
  days={calendarDays}
  selectedDate={selectedDate}
  onDateSelect={(date) => setSelectedDate(date)}
/>
```

## Weekday Headers Gizle

```tsx
<AtomicCalendar
  days={calendarDays}
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  showWeekdayHeaders={false}
/>
```

## Event Indicators

```tsx
<AtomicCalendar
  days={calendarDays}
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  maxEventIndicators={3}
/>
```

## Custom Day Style

```tsx
<AtomicCalendar
  days={calendarDays}
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  dayStyle={{ borderRadius: 8 }}
/>
```

## Örnek Kullanımlar

### Etkinlik Takvimi

```tsx
export const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events] = useState([
    { id: 1, date: new Date(), title: 'Toplantı', color: '#6366f1' },
    { id: 2, date: new Date(), title: 'Yemek', color: '#10b981' },
  ]);

  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="headlineMedium" style={{ marginBottom: 16 }}>
        Takvim
      </AtomicText>

      <AtomicCalendar
        days={getCalendarDaysWithEvents(events)}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    </View>
  );
};
```

### Randevu Takvimi

```tsx
export const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    loadAppointmentsForDate(date);
  };

  return (
    <View style={{ padding: 16 }}>
      <AtomicCalendar
        days={getCalendarDays()}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      {selectedDate && (
        <View style={{ marginTop: 16 }}>
          <AtomicText type="titleMedium">
            {selectedDate.toLocaleDateString('tr-TR')}
          </AtomicText>

          {appointments.length > 0 ? (
            appointments.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))
          ) : (
            <AtomicText type="bodyMedium" color="textSecondary">
              Randevu yok
            </AtomicText>
          )}
        </View>
      )}
    </View>
  );
};
```

### Görev Takvimi

```tsx
export const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysWithTasks = () => {
    const days = calculateCalendarDays(selectedDate);
    return days.map(day => ({
      ...day,
      events: getTasksForDate(day.date).slice(0, 3),
    }));
  };

  return (
    <View style={{ padding: 16 }}>
      <AtomicCalendar
        days={getDaysWithTasks()}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        maxEventIndicators={5}
      />
    </View>
  );
};
```

### Doğum Günü Takvimi

```tsx
export const BirthdayCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [birthdays] = useState([
    { id: 1, name: 'Ahmet', date: new Date(), month: 0, day: 15 },
  ]);

  const getDaysWithBirthdays = () => {
    const days = calculateCalendarDays(selectedDate);
    return days.map(day => ({
      ...day,
      events: birthdays.filter(b =>
        b.month === day.date.getMonth() && b.day === day.date.getDate()
      ),
    }));
  };

  return (
    <View style={{ padding: 16 }}>
      <AtomicCalendar
        days={getDaysWithBirthdays()}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    </View>
  );
};
```

### Check-in Takvimi

```tsx
export const CheckinCalendar = ({ checkins }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysWithCheckins = () => {
    const days = calculateCalendarDays(selectedDate);
    return days.map(day => ({
      ...day,
      hasCheckin: checkins.some(c =>
        isSameDay(c.date, day.date)
      ),
    }));
  };

  return (
    <View style={{ padding: 16 }}>
      <AtomicCalendar
        days={getDaysWithCheckins()}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    </View>
  );
};
```

## Props

### AtomicCalendarProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `days` | `CalendarDay[]` | - **(Zorunlu)** | Takvim günleri (42 gün) |
| `selectedDate` | `Date` | - **(Zorunlu)** | Seçili tarih |
| `onDateSelect` | `(date: Date) => void` | - **(Zorunlu)** | Tarih seçim callback'i |
| `showWeekdayHeaders` | `boolean` | `true` | Gün başlıklarını göster |
| `maxEventIndicators` | `number` | `3` | Maksimum etkinlik sayısı |
| `dayStyle` | `StyleProp<ViewStyle>` | - | Gün hücresi stili |
| `showEventCount` | `boolean` | `true` | Event sayısını göster |
| `style` | `StyleProp<ViewStyle>` | - | Container stili |
| `testID` | `string` | - | Test ID'si |

### CalendarDay

```typescript
interface CalendarDay {
  date: Date;              // Tarih
  isCurrentMonth: boolean; // Mevcut ay mı
  isSelected: boolean;     // Seçili mi
  isToday: boolean;        // Bugün mü
  events?: Event[];        // Etkinlikler
  isDisabled?: boolean;    // Devre dışı mı
}
```

## Best Practices

### 1. Day Hesaplama

```tsx
// Takvim günlerini hesaplayın
const calculateCalendarDays = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 42 günlük grid (6 hafta)
  const days = [];
  // ... hesaplama logic
  return days;
};
```

### 2. Event Mapping

```tsx
// Etkinlikleri günlere map edin
const mapEventsToDays = (days: CalendarDay[], events: Event[]) => {
  return days.map(day => ({
    ...day,
    events: events.filter(e => isSameDay(e.date, day.date)),
  }));
};
```

### 3. Tarih Seçimi

```tsx
// Tarih seçimi
const handleDateSelect = (date: Date) => {
  setSelectedDate(date);
  loadEventsForDate(date);
};
```

## Erişilebilirlik

AtomicCalendar, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Tarih anonsu
- ✅ Event bilgileri
- ✅ Touch uygun boyut
- ✅ Keyboard navigation (web)

## Performans İpuçları

1. **Memoization**: `days` array'ini memo edin
2. **Lazy Loading**: Event'leri lazy load edin
3. **Virtualization**: Uzun listelerde virtualization kullanın

## İlgili Bileşenler

- [`AtomicDatePicker`](../../atoms/AtomicDatePicker/README.md) - Tarih seçici
- [`FormField`](../FormField/README.md) - Form alanı
- [`AtomicButton`](../../atoms/button/README.md) - Buton bileşeni

## Lisans

MIT

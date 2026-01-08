# Countdown

Countdown, geri sayım sayacı bileşenidir. Belirli bir tarihe/hedefe kalan süreyi gösterir. Birden fazla hedef arasında geçiş yapabilir, gün, saat, dakika ve saniye olarak gösterebilir.

## Özellikler

- ⏰ **Geri Sayım**: Belirli bir tarihe kadar geri sayım
- 🎯 **Çoklu Hedef**: Birden fazla hedef arasında geçiş
- 📊 **Time Unit**: Gün, saat, dakika, saniye gösterimi
- 🎨 **Özelleştirilebilir**: Boyut, etiket, görünüm
- 🔄 **Hook**: useCountdown hook ile kontrol
- 🎭 **Tema Bilinci**: Design token uyumlu
- ♿ **Erişilebilir**: Screen reader desteği

## Kurulum

```tsx
import { Countdown, useCountdown } from 'react-native-design-system';
```

## Temel Kullanım

```tsx
import React from 'react';
import { View } from 'react-native';
import { Countdown } from 'react-native-design-system';

export const BasicExample = () => {
  const targetDate = new Date('2025-12-31T23:59:59');

  return (
    <View style={{ padding: 16 }}>
      <Countdown
        target={{
          date: targetDate,
          label: 'Yılbaşı',
        }}
      />
    </View>
  );
};
```

## Basit Countdown

```tsx
<Countdown
  target={{
    date: new Date('2025-12-31'),
    label: 'Yılbaşı',
  }}
/>
```

## Custom Görünüm

```tsx
<Countdown
  target={{
    date: new Date('2025-06-30'),
    label: 'Yaz Başlangıcı',
    icon: 'sunny-outline',
  }}
  displayConfig={{
    size: 'large',
    showLabel: true,
    showToggle: false,
  }}
/>
```

## Sadece Saat/Dakika/Saniye

```tsx
<Countdown
  target={{
    date: new Date(Date.now() + 3600000), // 1 saat
    label: 'Teklif Bitişi',
  }}
  displayConfig={{
    showDays: false,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
  }}
/>
```

## Çoklu Hedef

```tsx
<Countdown
  target={{
    date: new Date('2025-12-31'),
    label: 'Yılbaşı',
    icon: 'calendar-outline',
  }}
  alternateTargets={[
    {
      date: new Date('2025-06-30'),
      label: 'Yaz Başlangıcı',
      icon: 'sunny-outline',
    },
    {
      date: new Date('2025-03-20'),
      label: 'İlk Bahar',
      icon: 'flower-outline',
    },
  ]}
/>
```

## Custom Label Format

```tsx
<Countdown
  target={{
    date: new Date('2025-12-31'),
    label: 'Yılbaşı',
  }}
  formatLabel={(unit, value) => {
    const labels = {
      days: 'gün',
      hours: 'saat',
      minutes: 'dakika',
      seconds: 'saniye',
    };
    return labels[unit];
  }}
/>
```

## onExpire Callback

```tsx
<Countdown
  target={{
    date: new Date('2025-12-31'),
    label: 'Yılbaşı',
  }}
  onExpire={() => {
    console.log('Süre doldu!');
    Alert.alert('Süre doldu!');
  }}
/>
```

## useCountdown Hook

### Temel Kullanım

```tsx
import { useCountdown } from 'react-native-design-system';

export const MyComponent = () => {
  const { timeRemaining, isActive, isExpired, start, stop, reset } = useCountdown(
    {
      date: new Date('2025-12-31'),
      label: 'Yılbaşı',
    },
    {
      interval: 1000,
      autoStart: true,
    }
  );

  return (
    <View>
      <Text>{timeRemaining.days} gün {timeRemaining.hours} saat</Text>
      <Button title={isActive ? 'Durdur' : 'Başlat'} onPress={isActive ? stop : start} />
    </View>
  );
};
```

### Manual Kontrol

```tsx
const { timeRemaining, isActive, start, stop, reset } = useCountdown(
  target,
  { autoStart: false }
);

return (
  <View>
    <Text>{timeRemaining.totalSeconds} saniye</Text>
    <Button title="Başlat" onPress={start} />
    <Button title="Durdur" onPress={stop} />
    <Button title="Sıfırla" onPress={reset} />
  </View>
);
```

### onTick Callback

```tsx
const { timeRemaining } = useCountdown(target, {
  onTick: (time) => {
    console.log('Kalan süre:', time.totalSeconds);
  },
});
```

## Örnek Kullanımlar

### Flash Sale

```tsx
export const FlashSaleCountdown = () => {
  const endDate = new Date(Date.now() + 3600000); // 1 saat

  return (
    <AtomicCard variant="elevated">
      <Countdown
        target={{
          date: endDate,
          label: 'Flash Sale Bitiş',
          icon: 'flash-outline',
        }}
        displayConfig={{
          showDays: false,
          size: 'large',
        }}
        onExpire={() => {
          Alert.alert('Satış bitti!');
        }}
      />
    </AtomicCard>
  );
};
```

### Etkinlik Sayacı

```tsx
export const EventCountdown = () => {
  const [events] = useState([
    {
      date: new Date('2025-06-30'),
      label: 'Yaz Konseri',
      icon: 'musical-notes-outline',
    },
    {
      date: new Date('2025-09-15'),
      label: 'Teknoloji Zirvesi',
      icon: 'laptop-outline',
    },
    {
      date: new Date('2025-12-25'),
      label: 'Yılbaşı Partisi',
      icon: 'gift-outline',
    },
  ]);

  return (
    <View style={{ padding: 16 }}>
      <Countdown
        target={events[0]}
        alternateTargets={events.slice(1)}
        displayConfig={{
          size: 'medium',
          showToggle: true,
        }}
        onTargetChange={(target) => {
          console.log('Hedef değişti:', target.label);
        }}
      />
    </View>
  );
};
```

### Yarışma Sayacı

```tsx
export const CompetitionCountdown = () => {
  const deadline = new Date('2025-03-31T23:59:59');

  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="headlineMedium" style={{ textAlign: 'center', marginBottom: 16 }}>
        Yarışma Katılım Süresi
      </AtomicText>

      <Countdown
        target={{
          date: deadline,
          label: 'Son Katılım Tarihi',
          icon: 'trophy-outline',
        }}
        displayConfig={{
          size: 'large',
          showLabel: true,
        }}
        formatLabel={(unit) => {
          const labels = {
            days: 'GÜN',
            hours: 'SAAT',
            minutes: 'DAKİKA',
            seconds: 'SANİYE',
          };
          return labels[unit];
        }}
        onExpire={() => {
          Alert.alert('Yarışma sona erdi!');
        }}
      />
    </View>
  );
};
```

### İndirim Sayacı

```tsx
export const DiscountTimer = ({ discountPercentage, validUntil }) => {
  return (
    <View style={{ backgroundColor: '#ff6b6b', padding: 16, borderRadius: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <AtomicIcon name="pricetag-outline" size="sm" color="#fff" />
        <AtomicText type="titleMedium" style={{ color: '#fff', marginLeft: 8 }}>
          %{discountPercentage} İndirim
        </AtomicText>
      </View>

      <Countdown
        target={{
          date: validUntil,
          label: 'Teklif Bitişi',
        }}
        displayConfig={{
          showDays: false,
          size: 'medium',
          showLabel: false,
        }}
      />
    </View>
  );
};
```

### Oyun Sayacı

```tsx
export const GameTimer = ({ duration, onTimeUp }) => {
  const targetDate = useMemo(() => new Date(Date.now() + duration), [duration]);
  const [timeLeft, setTimeLeft] = useState(duration);

  const { timeRemaining, isExpired } = useCountdown(
    { date: targetDate },
    {
      onTick: (time) => {
        setTimeLeft(time.totalSeconds * 1000);
      },
      onExpire: () => {
        onTimeUp?.();
      },
    }
  );

  return (
    <View style={{ alignItems: 'center' }}>
      <Countdown
        target={{ date: targetDate }}
        displayConfig={{
          showDays: false,
          showHours: false,
          showMinutes: true,
          showSeconds: true,
          showLabel: false,
          size: 'large',
        }}
      />

      {isExpired && (
        <AtomicText type="headlineLarge" style={{ color: 'red' }}>
          Süre Doldu!
        </AtomicText>
      )}
    </View>
  );
};
```

### Günlük Hedef Sayacı

```tsx
export const DailyResetCountdown = () => {
  const getNextMidnight = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  const [target] = useState(getNextMidnight);

  return (
    <View style={{ padding: 16 }}>
      <AtomicText type="titleMedium" style={{ marginBottom: 8 }}>
        Günlük Hedefler Sıfırlanmasına:
      </AtomicText>

      <Countdown
        target={{
          date: target,
          label: 'Yarın',
        }}
        displayConfig={{
          showDays: false,
          size: 'medium',
          showLabel: false,
        }}
        onExpire={() => {
          // Refresh targets
          window.location.reload();
        }}
      />
    </View>
  );
};
```

## Props

### CountdownProps

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `target` | `CountdownTarget` | - **(Zorunlu)** | Hedef tarih |
| `alternateTargets` | `CountdownTarget[]` | `[]` | Alternatif hedefler |
| `displayConfig` | `CountdownDisplayConfig` | `{}` | Görünüm konfigürasyonu |
| `interval` | `number` | `1000` | Güncelleme aralığı (ms) |
| `onExpire` | `() => void` | - | Süre dolunca |
| `onTargetChange` | `(target) => void` | - | Hedef değişince |
| `formatLabel` | `(unit, value) => string` | - | Label formatlama |

### CountdownTarget

| Prop | Tip | Açıklama |
|------|-----|----------|
| `date` | `Date` | Hedef tarih |
| `label` | `string` | Hedef etiketi |
| `icon` | `string` | İkon ismi |

### CountdownDisplayConfig

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `showLabel` | `boolean` | `true` | Label göster |
| `showToggle` | `boolean` | `alternateTargets.length > 0` | Toggle göster |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Boyut |
| `showDays` | `boolean` | `auto` | Gün göster |
| `showHours` | `boolean` | `true` | Saat göster |
| `showMinutes` | `boolean` | `true` | Dakika göster |
| `showSeconds` | `boolean` | `true` | Saniye göster |

### useCountdown Options

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `interval` | `number` | `1000` | Güncelleme aralığı (ms) |
| `autoStart` | `boolean` | `true` | Otomatik başlat |
| `onExpire` | `() => void` | - | Süre dolunca |
| `onTick` | `(time) => void` | - | Her tick'te |

### useCountdown Return

| Prop | Tip | Açıklama |
|------|-----|----------|
| `timeRemaining` | `TimeRemaining` | Kalan süre |
| `isActive` | `boolean` | Aktif mi |
| `isExpired` | `boolean` | Doldu mu |
| `start` | `() => void` | Başlat |
| `stop` | `() => void` | Durdur |
| `reset` | `() => void` | Sıfırla |
| `setTarget` | `(target) => void` | Hedef belirle |

## Best Practices

### 1. Hedef Seçimi

```tsx
// Gelecek tarih
target={{ date: new Date('2025-12-31') }} // ✅

// Geçmiş tarih
target={{ date: new Date('2020-01-01') }} // ❌
```

### 2. Performans

```tsx
// Uygun interval
interval={1000} // ✅ 1 saniye (önerilen)
interval={100} // ❌ 100ms (çok sık)
```

### 3. Memory Leak Önleme

```tsx
useEffect(() => {
  return () => {
    // Cleanup
  };
}, []);
```

### 4. Timezone

```tsx
// UTC kullan
const date = new Date('2025-12-31T23:59:59Z');
```

## Erişilebilirlik

Countdown, tam erişilebilirlik desteği sunar:

- ✅ Screen reader desteği
- ✅ Semantic anlamlar
- ✅ Timer role
- ✅ Live region

## Performans İpuçları

1. **Interval**: Uygun interval kullanın (1000ms önerilen)
2. **Memoization**: Component'leri memo edin
3. **Cleanup**: useEffect'te cleanup yapın
4. **Throttle**: onTick callback'ini throttle edin

## İlgili Bileşenler

- [`TimeUnit`](#timeunit) - Zaman birimi bileşeni
- [`CountdownHeader`](#countdownheader) - Countdown başlığı
- [`AtomicText`](../../atoms/AtomicText/README.md) - Metin bileşeni
- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - İkon bileşeni

## Yardımcı Fonksiyonlar

```typescript
// Kalan süreyi hesapla
calculateTimeRemaining(targetDate: Date): TimeRemaining

// Sayıyı padding yap
padNumber(num: number): string

// Sonraki gün başlangıcı
getNextDayStart(): Date

// Sonraki yıl başlangıcı
getNextYearStart(): Date
```

## Lisans

MIT

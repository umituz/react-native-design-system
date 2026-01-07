/**
 * Calendar Day Cell Component
 */

import React from 'react';
import { TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { AtomicText, useAppDesignTokens } from '../../../../index';
import type { CalendarDay } from '../../domain/entities/CalendarDay.entity';
import { CalendarService } from '../../infrastructure/services/CalendarService';
import { calendarStyles } from './calendarStyles';

interface CalendarDayCellProps {
  day: CalendarDay;
  index: number;
  isSelected: boolean;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  maxEventIndicators: number;
  showEventCount: boolean;
  dayStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  index,
  isSelected,
  selectedDate,
  onDateSelect,
  maxEventIndicators,
  showEventCount,
  dayStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const eventCount = day.events.length;
  const visibleEvents = day.events.slice(0, maxEventIndicators);
  const hiddenEventCount = Math.max(0, eventCount - maxEventIndicators);

  return (
    <TouchableOpacity
      key={index}
      style={[
        calendarStyles.dayCell,
        {
          backgroundColor: isSelected ? tokens.colors.primary : 'transparent',
          borderColor: isSelected
            ? tokens.colors.primary
            : day.isToday
              ? tokens.colors.primary
              : tokens.colors.border,
          borderWidth: isSelected ? 2 : day.isToday ? 2 : 1,
          opacity: day.isDisabled ? 0.4 : 1,
        },
        dayStyle,
      ]}
      onPress={() => !day.isDisabled && onDateSelect(day.date)}
      disabled={day.isDisabled}
      testID={testID ? `${testID}-day-${index}` : undefined}
      accessibilityLabel={`${day.date.toLocaleDateString()}, ${eventCount} events`}
      accessibilityRole="button"
      accessibilityState={{ disabled: day.isDisabled, selected: isSelected }}
    >
      <AtomicText
        type="bodyMedium"
        color={isSelected ? 'inverse' : day.isCurrentMonth ? 'primary' : 'secondary'}
        style={[calendarStyles.dayText, day.isToday && !isSelected && { fontWeight: 'bold' }]}
      >
        {day.date.getDate()}
      </AtomicText>

      <View style={calendarStyles.eventIndicators}>
        {day.isToday && eventCount === 0 && (
          <View style={[calendarStyles.eventDot, { backgroundColor: tokens.colors.success }]} />
        )}

        {visibleEvents.map((event, eventIndex) => (
          <View
            key={eventIndex}
            style={[
              calendarStyles.eventDot,
              {
                backgroundColor: event.color
                  ? event.color
                  : event.isCompleted
                    ? tokens.colors.success
                    : tokens.colors.primary,
              },
            ]}
          />
        ))}

        {showEventCount && hiddenEventCount > 0 && (
          <AtomicText type="bodySmall" color="secondary" style={calendarStyles.moreEventsText}>
            +{hiddenEventCount}
          </AtomicText>
        )}
      </View>
    </TouchableOpacity>
  );
};

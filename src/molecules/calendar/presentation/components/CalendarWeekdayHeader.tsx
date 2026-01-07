/**
 * Calendar Weekday Header Component
 */

import React from 'react';
import { View } from 'react-native';
import { AtomicText } from '../../../../index';
import { calendarStyles } from './calendarStyles';

interface CalendarWeekdayHeaderProps {
  weekdayNames: string[];
}

export const CalendarWeekdayHeader: React.FC<CalendarWeekdayHeaderProps> = ({
  weekdayNames,
}) => {
  return (
    <View style={calendarStyles.weekdayHeader}>
      {weekdayNames.map((day, index) => (
        <View key={index} style={calendarStyles.weekdayCell}>
          <AtomicText type="bodySmall" color="secondary" style={calendarStyles.weekdayText}>
            {day}
          </AtomicText>
        </View>
      ))}
    </View>
  );
};

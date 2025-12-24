/**
 * Calendar Domain - Barrel Export
 *
 * Public API for the calendar domain.
 * Provides generic, reusable calendar functionality for all factory-generated apps.
 *
 * Features:
 * - Timezone-aware calendar generation (built-in DateUtilities)
 * - Generic event system (workouts, habits, tasks, etc.)
 * - Month/Week/Day views
 * - Event CRUD operations with persistence
 * - Completion tracking
 * - Recurring events support
 * - **NEW:** System calendar sync (expo-calendar) - iOS/Android only
 *
 * Usage:
 * ```tsx
 * import { useCalendar, AtomicCalendar, useSystemCalendar } from '@umituz/react-native-calendar';
 *
 * const MyScreen = () => {
 *   const { days, selectedDate, actions } = useCalendar();
 *   const {
 *     systemCalendars,
 *     permission,
 *     requestPermission,
 *     syncEventToCalendar,
 *   } = useSystemCalendar();
 *
 *   // Request permission to access device calendar
 *   useEffect(() => {
 *     requestPermission();
 *   }, []);
 *
 *   // Sync event to device calendar
 *   const handleCreateEvent = async (eventData) => {
 *     const event = await actions.addEvent(eventData);
 *     await syncEventToCalendar(event); // Sync to iOS/Android calendar
 *   };
 *
 *   return (
 *     <AtomicCalendar
 *       days={days}
 *       selectedDate={selectedDate}
 *       onDateSelect={actions.setSelectedDate}
 *     />
 *   );
 * };
 * ```
 */

// Domain Entities
export type {
  CalendarEvent,
  CreateCalendarEventRequest,
  UpdateCalendarEventRequest,
  SystemCalendar,
  CalendarPermissionResult,
} from './domain/entities/CalendarEvent.entity';

export type {
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
} from './domain/entities/CalendarDay.entity';

// Domain Repositories
export type { ICalendarRepository } from './domain/repositories/ICalendarRepository';

// Infrastructure Services
export { CalendarService } from './infrastructure/services/CalendarService';
export { CalendarPermissions } from './infrastructure/services/CalendarPermissions';
export { CalendarEvents } from './infrastructure/services/CalendarEvents';
export { CalendarGeneration } from './infrastructure/services/CalendarGeneration';
export { CalendarSync } from './infrastructure/services/CalendarSync';

// Infrastructure Utils
export { DateUtilities } from './infrastructure/utils/DateUtilities';

// Infrastructure Storage
export {
  useCalendarStore,
  type CalendarViewMode,
} from './infrastructure/storage/CalendarStore';

// Presentation Hooks
export {
  useCalendar,
  useCalendarNavigation,
  useCalendarEvents,
  useSystemCalendar,
  type UseCalendarReturn,
} from './presentation/hooks/useCalendar';

// Presentation Components
export {
  AtomicCalendar,
  type AtomicCalendarProps,
} from './presentation/components/AtomicCalendar';

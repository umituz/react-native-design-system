/**
 * Atoms - Primitive UI components
 * Building blocks for molecules and organisms
 */

// Button
export {
    AtomicButton,
    type AtomicButtonProps,
    type ButtonVariant,
    type ButtonSize,
} from './button';

// Text
export { AtomicText, type AtomicTextProps } from './AtomicText';

// Card
export {
    AtomicCard,
    type AtomicCardProps,
    type CardVariant as AtomicCardVariant,
    type CardPadding as AtomicCardPadding,
} from './card';

// Input
export {
    AtomicInput,
} from './AtomicInput';
export type {
    AtomicInputProps,
    AtomicInputVariant,
    AtomicInputState,
    AtomicInputSize,
} from './input/types';

// Icon (Zustand-based icon system)
export {
    AtomicIcon,
    type AtomicIconProps,
    type IconSize,
    type IconColor,
    type IconName,
    type IconRenderProps,
    // Icon Store
    useIconStore,
    useIconRenderer,
    useIconName,
    useHasIconConfig,
    type IconRenderer,
    type IconNames,
    REQUIRED_ICON_KEYS,
    // Type utilities
    type IconSizePreset,
    ICON_SIZES,
    getIconSize,
    isIconSizePreset,
} from './icon';


// Avatar
export { AtomicAvatar, type AtomicAvatarProps } from './AtomicAvatar';

// Chip
export { AtomicChip, type AtomicChipProps } from './chip';

// Progress
export { AtomicProgress, type AtomicProgressProps } from './AtomicProgress';

// Fab
export {
    AtomicFab,
    type AtomicFabProps,
    type FabSize,
    type FabVariant,
    getFabVariants,
} from './AtomicFab';

// Picker
export {
    AtomicPicker,
    type AtomicPickerProps,
    type PickerOption,
    type PickerSize,
} from './AtomicPicker';

// DatePicker
export { AtomicDatePicker, type AtomicDatePickerProps } from './AtomicDatePicker';

// Skeleton
export {
    AtomicSkeleton,
    type AtomicSkeletonProps,
    type SkeletonPattern,
    type SkeletonConfig,
    SKELETON_PATTERNS,
} from './skeleton';

// Badge
export {
    AtomicBadge,
    type AtomicBadgeProps,
    type BadgeVariant,
    type BadgeSize,
} from './badge';

// Spinner
export {
    AtomicSpinner,
    type AtomicSpinnerProps,
    type SpinnerSize,
    type SpinnerColor,
} from './AtomicSpinner';

// Empty State
export { EmptyState, type EmptyStateProps } from './EmptyState';

// TextArea
export { AtomicTextArea, type AtomicTextAreaProps } from './AtomicTextArea';

// Switch
export { AtomicSwitch, type AtomicSwitchProps } from './AtomicSwitch';

// Touchable
export { AtomicTouchable, type AtomicTouchableProps } from './AtomicTouchable';

// StatusBar
export { AtomicStatusBar, type AtomicStatusBarProps } from './status-bar';

// Keyboard Avoiding
export { AtomicKeyboardAvoidingView, type AtomicKeyboardAvoidingViewProps } from './AtomicKeyboardAvoidingView';

// GlassView
export { GlassView, type GlassViewProps } from './GlassView';

// Image
export { AtomicImage, type AtomicImageProps } from './image/AtomicImage';

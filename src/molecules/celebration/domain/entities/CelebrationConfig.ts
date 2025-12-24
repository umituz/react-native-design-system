/**
 * Celebration Config Entity
 * Single Responsibility: Define celebration configuration types
 */

export interface CelebrationAction {
  label: string;
  onPress: () => void;
}

export interface CelebrationConfig {
  title: string;
  message: string;
  primaryAction?: CelebrationAction;
  secondaryAction?: CelebrationAction;
}


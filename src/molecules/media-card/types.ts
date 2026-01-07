export type MediaCardSize = 'sm' | 'md' | 'lg';
export type MediaCardOverlayPosition = 'bottom' | 'center';

export interface MediaCardProps {
  /** Image URI to display */
  uri: string;

  /** Optional title text */
  title?: string;

  /** Optional subtitle text (uses count, etc.) */
  subtitle?: string;

  /** Optional badge text (NEW, etc.) */
  badge?: string;

  /** Whether the card is selected */
  selected?: boolean;

  /** Card size */
  size?: MediaCardSize;

  /** Aspect ratio (width/height) */
  aspectRatio?: number;

  /** Overlay position */
  overlayPosition?: MediaCardOverlayPosition;

  /** Whether to show overlay */
  showOverlay?: boolean;

  /** Press handler */
  onPress?: () => void;

  /** Custom width */
  width?: number;

  /** Test ID */
  testID?: string;
}

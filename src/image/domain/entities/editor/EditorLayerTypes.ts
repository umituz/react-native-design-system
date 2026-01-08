/**
 * Domain - Editor Layer Types
 */

import type { EditorStroke, EditorShape, EditorText, EditorSticker } from './EditorElementTypes';

export interface EditorLayer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  locked: boolean;
  elements: Array<{
    type: 'stroke' | 'shape' | 'text' | 'sticker';
    data: EditorStroke | EditorShape | EditorText | EditorSticker;
  }>;
}

export interface EditorHistory {
  id: string;
  timestamp: Date;
  layers: EditorLayer[];
  thumbnail?: string;
}

export interface EditorSelection {
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  elements: string[];
}

/**
 * Domain - Editor Element Types
 */

import type { ShapeType } from './EditorToolTypes';

export interface EditorPoint {
  x: number;
  y: number;
}

export interface EditorDimensions {
  width: number;
  height: number;
}

export interface EditorStroke {
  points: EditorPoint[];
  color: string;
  size: number;
  style: string;
  opacity: number;
}

export interface EditorShape {
  type: ShapeType;
  startPoint: EditorPoint;
  endPoint: EditorPoint;
  color: string;
  strokeWidth: number;
  fillColor?: string;
  opacity: number;
  rotation?: number;
}

export interface EditorText {
  id: string;
  text: string;
  position: EditorPoint;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor?: string;
  rotation: number;
  opacity: number;
  maxWidth?: number;
  textAlign: 'left' | 'center' | 'right';
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
}

export interface EditorSticker {
  id: string;
  uri: string;
  position: EditorPoint;
  size: EditorDimensions;
  rotation: number;
  opacity: number;
  scale: number;
}

/**
 * Domain - Editor State Types
 */

import type { EditorTool } from './EditorToolTypes';
import type { EditorLayer } from './EditorLayerTypes';
import type { EditorSelection } from './EditorLayerTypes';
import type { EditorHistory } from './EditorLayerTypes';
import type { EditorPoint, EditorDimensions } from './EditorElementTypes';
import type { EditorFilter } from './EditorFilterTypes';

export interface EditorCropArea {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio?: number;
}

export interface EditorState {
  originalUri: string;
  currentUri?: string;
  tool: EditorTool;
  selectedLayer?: string;
  layers: EditorLayer[];
  history: EditorHistory[];
  historyIndex: number;
  selection?: EditorSelection;
  cropArea?: EditorCropArea;
  activeFilter?: EditorFilter;
  isDirty: boolean;
  dimensions: EditorDimensions;
  zoom: number;
  pan: EditorPoint;
}

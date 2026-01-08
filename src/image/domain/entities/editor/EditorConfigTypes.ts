/**
 * Domain - Editor Configuration Types
 */

export interface EditorOptions {
  maxLayers?: number;
  maxHistory?: number;
  enableUndo?: boolean;
  enableRedo?: boolean;
  enableFilters?: boolean;
  enableShapes?: boolean;
  enableText?: boolean;
  enableStickers?: boolean;
  enableCrop?: boolean;
  brushSizeRange?: [number, number];
  strokeWidthRange?: [number, number];
  fontSizeRange?: [number, number];
  defaultColors?: string[];
  stickerPacks?: string[];
  customFonts?: string[];
}

export interface EditorExportOptions {
  format: 'jpeg' | 'png' | 'webp';
  quality: number;
  backgroundColor?: string;
  includeHiddenLayers?: boolean;
  flattenLayers?: boolean;
  maxSize?: number;
}

export interface EditorEvent {
  type: 'toolChange' | 'layerAdd' | 'layerRemove' | 'layerUpdate' | 'selectionChange' | 'historyChange';
  data: unknown;
}

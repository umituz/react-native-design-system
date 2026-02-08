/**
 * Infrastructure - Layer Manager
 * 
 * Manages editor layers with composition and rendering
 */

import type { EditorLayer } from '../../domain/entities/EditorTypes';
import { ImageEditorService } from '../services/ImageEditorService';

export type LayerOperation = 'add' | 'remove' | 'move' | 'merge' | 'duplicate';

export interface LayerComposition {
  width: number;
  height: number;
  backgroundColor?: string;
}

export class LayerManager {


  static mergeLayers(
    layers: EditorLayer[],
    targetIds: string[]
  ): EditorLayer[] {
    const targetLayers = layers.filter(layer => targetIds.includes(layer.id));
    const otherLayers = layers.filter(layer => !targetIds.includes(layer.id));

    if (targetLayers.length === 0) return layers;

    const mergedElements = targetLayers.flatMap(layer => layer.elements);
    const mergedLayer: EditorLayer = {
      id: ImageEditorService.generateId(),
      name: targetLayers.map(l => l.name).join(' + '),
      visible: true,
      opacity: 1,
      locked: false,
      elements: mergedElements,
    };

    return [...otherLayers, mergedLayer];
  }

  static duplicateLayer(layer: EditorLayer): EditorLayer {
    return {
      ...layer,
      id: ImageEditorService.generateId(),
      name: `${layer.name} Copy`,
      elements: [...layer.elements],
    };
  }

  static reorderLayers(
    layers: Array<{ id: string; index?: number }>,
    fromIndex: number,
    toIndex: number
  ): Array<{ id: string; index?: number }> {
    const result = [...layers];
    const [moved] = result.splice(fromIndex, 1) as [{ id: string; index?: number }];
    result.splice(toIndex, 0, moved);
    
    return result.map((layer, index) => ({ ...layer, index }));
  }


}
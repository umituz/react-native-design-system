/**
 * AtomicImage - Universal Image Component
 *
 * Provides consistent image handling across the app with theme integration
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Basic image display with consistent styling
 *
 * Usage:
 * - Profile pictures
 * - Product images
 * - Icons and illustrations
 * - Background images
 */
import React from 'react';
import { ImageProps, ViewStyle } from 'react-native';
export interface AtomicImageProps extends Omit<ImageProps, 'style'> {
    /** Image source */
    source: ImageProps['source'];
    /** Size variant */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    /** Shape variant */
    shape?: 'square' | 'circle' | 'rounded';
    /** Border radius override */
    borderRadius?: number;
    /** Container style override */
    style?: ViewStyle | ViewStyle[];
    /** Image style override */
    imageStyle?: ImageProps['style'];
    /** Background color */
    backgroundColor?: string;
    /** Border color */
    borderColor?: string;
    /** Border width */
    borderWidth?: number;
}
export declare const AtomicImage: React.FC<AtomicImageProps>;
export default AtomicImage;

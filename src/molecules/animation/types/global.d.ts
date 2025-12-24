/// <reference types="react" />
/// <reference types="react-native" />

declare module 'react-native-reanimated' {
  import React from 'react';
  import { ViewProps, ViewStyle } from 'react-native';

  export interface WithTimingConfig {
    duration?: number;
    easing?: (value: number) => number;
  }

  export interface WithSpringConfig {
    damping?: number;
    stiffness?: number;
    mass?: number;
    overshootClamping?: boolean;
    restDisplacementThreshold?: number;
    restSpeedThreshold?: number;
  }

  export interface SharedValue<T> {
    value: T;
  }

  export const Animated: {
    View: React.ComponentType<any>;
    Text: React.ComponentType<any>;
    Image: React.ComponentType<any>;
    ScrollView: React.ComponentType<any>;
  };

  export function useSharedValue<T>(initialValue: T): SharedValue<T>;
  export function useAnimatedStyle<T>(styleFactory: () => T): T;
  export function withTiming(toValue: any, config?: WithTimingConfig): any;
  export function withSpring(toValue: any, config?: WithSpringConfig): any;
  export function withSequence(...animations: any[]): any;
  export function withRepeat(animation: any, count?: number, reverse?: boolean): any;
  export function runOnUI<T>(fn: () => T): () => T;
  export function runOnJS<T extends (...args: any[]) => any>(fn: T): T;
  export function cancelAnimation(sharedValue: SharedValue<any>): void;
  
  export const Easing: {
    linear: (t: number) => number;
    ease: (t: number) => number;
    easeIn: (t: number) => number;
    easeOut: (t: number) => number;
    easeInOut: (t: number) => number;
    step0: (t: number) => number;
    step1: (t: number) => number;
    bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => number;
    cubic: (x1: number, y1: number, x2: number, y2: number) => (t: number) => number;
    in: (easing: (t: number) => number) => (t: number) => number;
    out: (easing: (t: number) => number) => (t: number) => number;
    inOut: (easing: (t: number) => number) => (t: number) => number;
  };
}

declare module 'react-native-gesture-handler' {
  import React from 'react';
  import { ViewStyle } from 'react-native';

  export interface PanGestureHandlerProps {
    onGestureEvent?: (event: any) => void;
    onHandlerStateChange?: (event: any) => void;
  }

  export interface TapGestureHandlerProps {
    onHandlerStateChange?: (event: any) => void;
  }

  export interface PinchGestureHandlerProps {
    onGestureEvent?: (event: any) => void;
    onHandlerStateChange?: (event: any) => void;
  }

  export interface LongPressGestureHandlerProps {
    onHandlerStateChange?: (event: any) => void;
  }

  export const GestureDetector: React.FC<{
    gesture: any;
    children: React.ReactNode;
  }>;

  export const Gesture: {
    Tap: () => any;
    Pan: () => any;
    Pinch: () => any;
    LongPress: () => any;
  };

  export const PanGestureHandler: React.FC<PanGestureHandlerProps>;
  export const TapGestureHandler: React.FC<TapGestureHandlerProps>;
  export const PinchGestureHandler: React.FC<PinchGestureHandlerProps>;
  export const LongPressGestureHandler: React.FC<LongPressGestureHandlerProps>;
}
declare module 'react-lazy-load-image-component' {
  import React from 'react';

  export interface LazyLoadImageProps {
    src: string;
    placeholderSrc?: string;
    effect?: 'blur' | 'opacity';
    className?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    delayTime?: number;
    threshold?: number;
    visibleByDefault?: boolean;
    afterLoad?: () => void;
    beforeLoad?: () => void;
    delayMethod?: 'debounce' | 'throttle';
    scrollPosition?: { x: number; y: number };
    style?: React.CSSProperties;
  }

  export class LazyLoadImage extends React.Component<LazyLoadImageProps> {}
} 
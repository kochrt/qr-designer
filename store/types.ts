
export type DotStyle = "square" | "hexagon" | "rounded" | "circle" | "star" | "triangle"

export interface Glyph {
  component: string;
  config: GlyphConfig;
  image?: {
    src: string;
    width: number;
    height: number;
  };
}

export interface GlyphConfig {
  id: string;
  x: number;
  y: number;
  image?: HTMLImageElement;
  text?: string;
  fontSize?: number;
  rotation?: number;
  fontStyle?: string;
  textDecoration?: string;
  fontFamily?: string;
  fill?: string;
  scale?: { x: number; y: number };
  data?: string;
  name?: string;
  [key: string]: any;
}

export interface RGBA {
  r: number
  g: number
  b: number
  a: number
}

export interface Dots {
  style: DotStyle,
  fill: string,
}

export interface DesignState {
  background: {
    color: string
  }
  qr: {
    dots: Dots
    config: GlyphConfig
  }
  nodes: Glyph[]
}

export const GETTER_SELECTED_NODES_CONFIGS = 'selectedNodesConfigs'

export interface DraggingImage {
  url: string
  width?: number
  height?: number
}

export interface DraggingShapeData {
  component: string
  config: any
}

type DraggingItemType = "image" | "text" | "svg" | "blockText" | "shape"

export interface DraggingItem {
  type: DraggingItemType
  data?: DraggingImage | string | DraggingShapeData
  offsetX?: number
  offsetY?: number
}

export interface TestResult {
  result: "passed" | "failed"
}

export interface XYCoordinate {
  x: number,
  y: number
}

export interface DesignMetaState {
  stage: {
    snapToGridOnMove: boolean
    snapToGridOnResize: boolean
    snapToEachOther: boolean
    hasSetBackgroundToAlpha: boolean
    hasResetBackgroundToOpaque: boolean
    showTransparencyWarning: boolean
    config: {
      width: number,
      height: number,
      scale: XYCoordinate,
      position: XYCoordinate,
      offset: XYCoordinate
    }
  },
  qr: {
    bits: number[],
    lockQr: boolean
    showGrid: boolean,
    showInterpretedPixels: boolean
  },
  sizing: {
    qrSize: number,
    pixelsPerBlock: number,
    baseWidth: number,
    margin: number
  },
  selectionRect: {
    start: XYCoordinate,
    config: GlyphConfig
  }
  draggingItem?: DraggingItem
  testImage: HTMLImageElement | null
  testResults: TestResult[] | null
  selectedNodeIds: string[]
}

type SwinkId = string

export type SwinkError = "EXCEEDED_QUOTA" | "UNKNOWN" | ""

export interface SwinkState {
  swink: Swink,
  error: SwinkError
  creating: boolean
}

export interface Swink {
  tag: TagData
  metadata: TagMetadata
}

export interface TagData {
  redirect: boolean
  url?: string
  name?: string
  message?: string
  images?: string[]
}

export interface TagMetadata {
  id: string
}

export interface RootState {
  designMeta: DesignMetaState
  design: DesignState
  swink: SwinkState
}
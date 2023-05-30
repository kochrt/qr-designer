export interface BlockConfig {
  x: number
  y: number
  width?: number
  height?: number
  radius?: number
  fill?: string
  name: string
  offset?: {
    x: number
    y: number
  }
}

export interface Block {
  name: string
  component: string
  configForPosition: (coorindates: [number, number], blockSizeInPixels: number, fill: string) => BlockConfig
}

export const interpretedPixel: Block = {
  name: "interpreted-pixel",
  component: "v-rect",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    const halfBlock = blockSizeInPixels / 2
    const centerX = coordinates[0] + halfBlock
    const centerY = coordinates[1] + halfBlock
    return {
      x: centerX,
      y: centerY,
      width: blockSizeInPixels,
      height: blockSizeInPixels,
      fillRadialGradientStartPoint: { x: halfBlock, y: halfBlock },
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndPoint: { x: halfBlock, y: halfBlock },
      fillRadialGradientEndRadius: blockSizeInPixels,
      fillRadialGradientColorStops: [0, "red", 0.1, 'palevioletred', 0.3, '#78787861'],
      name: "_qrPixel",
      offset: {
        x: halfBlock,
        y: halfBlock,
      },
    };
  },
}

export const roundedBottomLeft: Block = {
  name: "roundedBottomLeft",
  component: "v-wedge",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0] + blockSizeInPixels,
      y: coordinates[1],
      radius: blockSizeInPixels,
      angle: 90,
      fill: fill,
      rotation: -270,
      name: '_qrPixel'
    }
  }
}


export const roundedBottomLeftSmall: Block = {
  name: "roundedBottomLeftSmall",
  component: "v-rect",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0],
      y: coordinates[1],
      height: blockSizeInPixels,
      width: blockSizeInPixels,
      fill: fill,
      name: '_qrPixel',
      cornerRadius: [0, 0, 0, 16],
    }
  }
}

export const roundedBottomRight: Block = {
  name: "roundedBottomRight",
  component: "v-wedge",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0],
      y: coordinates[1],
      radius: blockSizeInPixels,
      angle: 90,
      fill: fill,
      rotation: 0,
      name: '_qrPixel'
    }
  }
}

export const roundedBottomRightSmall: Block = {
  name: "roundedBottomRightSmall",
  component: "v-rect",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0],
      y: coordinates[1],
      height: blockSizeInPixels,
      width: blockSizeInPixels,
      fill: fill,
      cornerRadius: [0, 0, 16, 0],
      name: '_qrPixel'
    }
  }
}

export const innerFinderPattern: Block = {
  name: "innerFinderPattern",
  component: "v-rect",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0],
      y: coordinates[1],
      width: blockSizeInPixels * 3,
      height: blockSizeInPixels * 3,
      fill: fill,
      cornerRadius: [8, 8, 8, 8],
      name: '_qrPixel'
    }
  }
}

export const outerFinderPattern: Block = {
  name: "outerFinderPattern",
  component: "v-rect",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0] + blockSizeInPixels / 2,
      y: coordinates[1] + blockSizeInPixels / 2,
      width: blockSizeInPixels * 6,
      height: blockSizeInPixels * 6,
      fill: "transparent",
      stroke: fill,
      strokeWidth: 16,
      cornerRadius: [4, 4, 4, 4],
      name: '_qrPixel'
    }
  }
}

export const smallOuterFinderPattern: Block = {
  name: "smallOuterFinderPattern",
  component: "v-rect",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0] + blockSizeInPixels / 2,
      y: coordinates[1] + blockSizeInPixels / 2,
      width: blockSizeInPixels * 4,
      height: blockSizeInPixels * 4,
      fill: "transparent",
      stroke: fill,
      strokeWidth: 16,
      cornerRadius: [4, 4, 4, 4],
      name: '_qrPixel'
    }
  }
}

export const roundedTopLeft: Block = {
  name: "roundedTopLeft",
  component: "v-wedge",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0] + blockSizeInPixels,
      y: coordinates[1] + blockSizeInPixels,
      radius: blockSizeInPixels,
      fill: fill,
      angle: 90,
      rotation: -180,
      name: '_qrPixel'
    }
  }
}

export const roundedTopLeftSmall: Block = {
  name: "roundedTopLeftSmall",
  component: "v-rect",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0],
      y: coordinates[1],
      width: blockSizeInPixels,
      height: blockSizeInPixels,
      fill: fill,
      cornerRadius: [16, 0, 0, 0],
      name: '_qrPixel'
    }
  }
}


export const roundedTopRight: Block = {
  name: "roundedTopRight",
  component: "v-wedge",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0],
      y: coordinates[1] + blockSizeInPixels,
      radius: blockSizeInPixels,
      fill: fill,
      angle: 90,
      rotation: -90,
      name: '_qrPixel'
    }
  }
}

export const roundedTopRightSmall: Block = {
  name: "roundedTopRightSmall",
  component: "v-rect",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0],
      y: coordinates[1],
      width: blockSizeInPixels,
      height: blockSizeInPixels,
      fill: fill,
      cornerRadius: [0, 16, 0, 0],
      name: '_qrPixel'
    }
  }
}

export const square: Block = {
  name: "square",
  component: "v-rect",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0] + blockSizeInPixels / 2,
      y: coordinates[1] + blockSizeInPixels / 2,
      width: blockSizeInPixels,
      height: blockSizeInPixels,
      fill: fill,
      stroke: fill,
      strokeWidth: 1,
      cornerRadius: [0.5, 0.5, 0.5, 0.5],
      name: "_qrPixel",
      offset: {
        x: blockSizeInPixels / 2,
        y: blockSizeInPixels / 2,
      },
    };
  },
}

export const circle: Block = {
  name: "circle",
  component: "v-circle",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0] + blockSizeInPixels / 2,
      y: coordinates[1] + blockSizeInPixels / 2,
      height: blockSizeInPixels - 2,
      fill: fill,
      name: "_qrPixel",
    };
  },
}

export const rounded: Block = {
  name: "rounded",
  component: "v-rect",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0] + blockSizeInPixels / 2,
      y: coordinates[1] + blockSizeInPixels / 2,
      width: blockSizeInPixels - 2,
      height: blockSizeInPixels - 2,
      fill: fill,
      cornerRadius: 5,
      name: "_qrPixel",
      offset: {
        x: blockSizeInPixels / 2 - 1,
        y: blockSizeInPixels / 2 - 1
      },
    };
  },
}

export const hexagon: Block = {
  name: "hexagon",
  component: "v-regular-polygon",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0] + blockSizeInPixels / 2,
      y: coordinates[1] + blockSizeInPixels / 2,
      radius: blockSizeInPixels / 2,
      fill: fill,
      sides: 6,
      name: "_qrPixel",
    };
  }
}

export const star: Block = {
  name: "star",
  component: "v-star",
  configForPosition(coordinates: [number, number], blockSizeInPixels: number, fill: string) {
    return {
      x: coordinates[0] + blockSizeInPixels / 2,
      y: coordinates[1] + blockSizeInPixels / 2,
      fill: fill,
      numPoints: 6,
      innerRadius: 6,
      outerRadius: 10,
      name: "_qrPixel",
    };
  }
}
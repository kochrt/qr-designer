
const zero = 0
const one = 1
type PartialPixel = 0 | 1

export type Coordinate = number[]

export type Pixels = { [row: number]: { [col: number]: PartialPixel } }

class Segment {

  coordinates: Coordinate[]
  colors: PartialPixel[]

  constructor(coordinates: Coordinate[]) {
    this.coordinates = coordinates;
    this.colors = this.coordinates.map(c => this.isDefaultBlack(c))
  }

  static generateSegment(startingCoordinate: Coordinate, length: number): Segment {
    const coordinates: Coordinate[] = []
    let currentCoordinate = startingCoordinate
    while (length > 0) {
      coordinates.push(currentCoordinate)
      currentCoordinate = CoordinateFinder.next(currentCoordinate)
      length--;
    }
    return new Segment(coordinates)
  }

  last(): Coordinate {
    return this.coordinates[this.coordinates.length - 1]
  }

  isDefaultBlack(c: Coordinate): PartialPixel {
    const x = c[0]
    const y = c[1]
    return this.defaultMasked(x, y) ? one : zero
  }

  defaultMasked(x: number, y: number) {
    return (x + y) % 2 === 0
  }

  colorDot(coordinate: Coordinate) {
    const index = this.indexOf(coordinate)
    this.colors[index] = this.isDefaultBlack(coordinate) ? zero : one
    // if (this.isDefaultBlack(coordinate)) {
    //   this.colors[index] = colorDot.pixel ? zero : one
    // } else {
    //   this.colors[index] = colorDot.pixel
    // }
  }

  indexOf(coordinate: Coordinate) {
    return this.coordinates.findIndex(coord => coordinate[0] === coord[0] && coordinate[1] === coord[1])
  }

  numberRepresentation(): number {
    const num = parseInt(
      (this.colors.map(pixel => pixel ? "1" : "0") as string[])
        .reduce((prev, curr) => prev + curr),
      2)
    if (num > 999) {
      throw new Error("Number is too big: " + num)
    }
    return num
  }

  byteRepresentation(): number {
    const s = (this.colors.map(pixel => `${pixel}`) as string[]).reduce((prev, curr) => prev + curr)
    return parseInt(s, 2)
  }
}

export class Segments {
  pixels: Pixels
  coordinateSegmentMap: SegmentMap

  constructor(segments: Segment[]) {
    this.coordinateSegmentMap = new SegmentMap(segments)
    this.pixels = {}
    for (let i = 0; i < 41; i++) {
      this.pixels[i] = {}
    }
  }

  static defaultSegmentGenerationParams(startingCoordinate: Coordinate): SegmentGenerationParams {
    return {
      startingCoordinate,
      segmentLength: 8,
      numSegments: 49,
      offset: 8
    }
  }

  static defaultBlank(remainingBytes: number): Segments {
    const dataSegmentParams = this.defaultSegmentGenerationParams([4, 29])
    let dataSegments = new Segments(this.generate(dataSegmentParams))
    const segs = dataSegments.coordinateSegmentMap.segments
    segs.push(...new Array(remainingBytes - (dataSegments.coordinateSegmentMap.segments.length * 2)))
    const offsetSegmentParams = this.defaultSegmentGenerationParams([0, 29])
    let offsetSegments = new Segments(this.generate(offsetSegmentParams))
    segs.push(...offsetSegments.coordinateSegmentMap.segments)
    return new Segments(segs)
  }

  static generate(params: SegmentGenerationParams): Segment[] {
    const segments: Segment[] = []
    let currentCoordinate = params.startingCoordinate
    let skipTracker = false
    while (params.numSegments > 0) {
      if (params.offset > 0 && skipTracker) {
        let skippedSegment = Segment.generateSegment(
          currentCoordinate,
          params.offset,
        )
        currentCoordinate =
          CoordinateFinder.next(skippedSegment.last())
      } else {
        const segment = Segment.generateSegment(currentCoordinate, params.segmentLength)
        segments.push(segment)
        currentCoordinate = CoordinateFinder.next(segment.last())
        params.numSegments--;
      }
      skipTracker = !skipTracker
    }
    return segments
  }

  static last(segments: Segment[]): Segment {
    return segments[segments.length - 1]
  }

  colorDots(colorDots: Coordinate[]) {
    if (!colorDots) {
      return
    }
    try {
      colorDots.forEach(colorDot => {
        const seg = this.coordinateSegmentMap.segmentForCoordinate(colorDot)
        seg.colorDot(colorDot)
      })
    } catch (error) {
      if (error instanceof TypeError) {
        // We are out of bounds (our string is too long)
        throw new RangeError("String is too long")
      }
    }
  }

  stringRepresentation(): string {
    return this.coordinateSegmentMap.stringRepresentation()
  }
}

class SegmentMap {
  segments: Segment[]
  constructor(segments: Segment[]) {
    this.segments = segments
  }

  segmentForCoordinate(c: Coordinate): Segment {
    for (let seg of this.segments) {
      if (seg && seg.indexOf(c) >= 0) {
        return seg
      }
    }
    return new Segment([])
  }

  stringRepresentation(): string {
    let strungTogether = ""
    for (let seg of this.segments) {
      let segRepresentation = "" + seg.numberRepresentation()
      while (segRepresentation.length < 3) {
        segRepresentation = "0" + segRepresentation
      }
      strungTogether += segRepresentation
    }
    return strungTogether
  }
}
class CoordinateFinder {

  private static upAndRight(c: Coordinate): Coordinate {
    return [c[0] - 1, c[1] + 1]
  }

  private static downAndRight(c: Coordinate): Coordinate {
    return [c[0] + 1, c[1] + 1]
  }

  private static left(c: Coordinate): Coordinate {
    return [c[0], c[1] - 1]
  }

  private static downTwoAndRight(c: Coordinate): Coordinate {
    return [c[0] + 2, c[1] + 1]
  }

  private static upTwoAndRight(c: Coordinate): Coordinate {
    return [c[0] - 2, c[1] + 1]
  }

  static next(c: Coordinate): Coordinate {
    return this.next6(c)
  }

  static next6(c: Coordinate): Coordinate {
    if (c[0] < 0 || c[1] < 0) {
      throw new Error("Out of bounds")
    }
    // If we're an even column, we just move left
    if (c[1] % 2 === 0) {
      return this.left(c)
    }
    if (c[1] === 33) {
      if (c[0] === 31) {
        return [37, 34]
      }
      if (c[0] === 40) {
        return this.left(c)
      }
      return this.downAndRight(c)
    }
    if (c[1] === 31) {
      if (c[0] >= 33 && c[0] <= 37) {
        return [c[0] - 1, 31]
      }
      if (c[0] === 7) {
        return this.upTwoAndRight(c)
      }
      if (c[0] === 0) {
        return this.left(c)
      }
      return this.upAndRight(c)
    }
    // We're in an "up" column
    const goingUp = Math.ceil(c[1] / 2) % 2 === 0
    if (goingUp) {
      if (c[0] === 7) {
        return this.upTwoAndRight(c)
      }
      if (c[0] === 0) {
        return this.left(c)
      }
      return this.upAndRight(c)
    } else {
      if (c[0] === 5) {
        return this.downTwoAndRight(c)
      }
      if (c[0] === 40) {
        return this.left(c)
      }
      return this.downAndRight(c)
    }
  }

  static next4(c: Coordinate): Coordinate {
    if (c[0] < 0 || c[1] < 0) {
      throw new Error("Out of bounds")
    }
    // If we're an even column, we just move left
    if (c[1] % 2 === 0) {
      return this.left(c)
    }
    // Generally speaking if we're going up and in an odd column, the next coordinate
    // will be one up and over to the right. But there are edge cases galore.
    if (c[1] === 31) {
      if (c[0] === 9) {
        return this.left(c)
      }
      return this.upAndRight(c)
    }
    if (c[1] === 29) {
      if (c[0] === 32) {
        return this.left(c)
      }
      return this.downAndRight(c)
    }
    if (c[1] === 27) {
      if (c[0] === 29) {
        return [23, 28]
      }
      if (c[0] === 9) {
        return [9, 26]
      }
      return this.upAndRight(c)
    }
    if (c[1] === 25) {
      if (c[0] === 23) {
        return [29, 26]
      }
      if (c[0] === 32) {
        return this.left(c)
      }
      return this.downAndRight(c)
    }
    if (c[1] === 23) {
      if (c[0] >= 25 && c[0] <= 29) {
        return [c[0] - 1, 23]
      }
      if (c[0] === 7) {
        return [5, 24]
      }
      if (c[0] === 0) {
        return [0, 22]
      }
      return this.upAndRight(c)
    }
    // We're in an "up" column
    const goingUp = Math.ceil(c[1] / 2) % 2 === 0
    if (goingUp) {
      if (c[0] === 7) {
        return this.upTwoAndRight(c)
      }
      if (c[0] === 0) {
        return this.left(c)
      }
      return this.upAndRight(c)
    } else {
      if (c[0] === 5) {
        return this.downTwoAndRight(c)
      }
      if (c[0] === 32) {
        return this.left(c)
      }
      return this.downAndRight(c)
    }
  }
}

export class ColorDot {
  coordinate: Coordinate
  pixel: PartialPixel

  constructor(coordinate: Coordinate, pixel: PartialPixel) {
    this.coordinate = coordinate
    this.pixel = pixel
  }

  static create(x: number, y: number, pixel: PartialPixel): ColorDot {
    return new ColorDot([x, y], pixel)
  }

  static dark(x: number, y: number) {
    return new ColorDot([x, y], one)
  }
}

export interface SegmentGenerationParams {
  startingCoordinate: Coordinate
  segmentLength: number
  numSegments: number
  offset: number
}

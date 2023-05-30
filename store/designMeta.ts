import { GetterTree, MutationTree } from "vuex"
import { DesignMetaState, Glyph, XYCoordinate, DraggingItem, GETTER_SELECTED_NODES_CONFIGS, RootState } from "./types"

const qrSize = 41
const pixelsPerBlock = 16
const baseWidth = qrSize * pixelsPerBlock
const margin = 2 * pixelsPerBlock;
const startingPosition = {
  x: ((qrSize + 2) * pixelsPerBlock) / 2,
  y: ((qrSize + 2) * pixelsPerBlock) / 2
}

export const state: (() => DesignMetaState) = () => ({
  stage: {
    backgroundColor: "#ffffff",
    backgroundColorRgba: { r: 255, g: 255, b: 255, a: 1 },
    snapToEachOther: true,
    snapToGridOnMove: false,
    snapToGridOnResize: false,
    showTransparencyWarning: true,
    hasSetBackgroundToAlpha: false,
    hasResetBackgroundToOpaque: false,
    config: {
      width: baseWidth + margin,
      height: baseWidth + margin,
      scale: { x: 1, y: 1 },
      position: startingPosition,
      offset: startingPosition
    }
  },
  selectionRect: {
    start: { x: 0, y: 0 },
    config: {
      id: "selectionRect",
      x: 0,
      y: 0,
      fill: "rgba(107, 114, 128, 0.4)",
      stroke: "rgba(107, 114, 128, 0.7)",
      strokeWidth: 1,
      visible: false,
      width: 0,
      height: 0,
      name: "selectionRectangle",
    }
  },
  sizing: {
    qrSize,
    pixelsPerBlock,
    baseWidth,
    margin
  },
  qr: {
    showGrid: false,
    showInterpretedPixels: false,
    bits: [
      1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
      0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1,
      1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0,
      0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1,
      1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1,
      1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0,
      0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
      1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
      1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1,
      1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1,
      0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0,
      1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
      0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0,
      1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0,
      0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1,
      1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0,
      1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
      1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0,
      1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0,
      1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1,
      0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0,
      1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
      1,
    ],
    lockQr: true,
  },
  draggingItem: undefined,
  testImage: null,
  testResults: null,
  selectedNodeIds: []
})


export const mutations: MutationTree<DesignMetaState> = {
  dismissTransparencyWarning(state: DesignMetaState) {
    state.stage.hasResetBackgroundToOpaque = true
    state.stage.showTransparencyWarning = false
  },
  setHasSetBackgroundToAlpha(state: DesignMetaState, hasSetBackgroundToAlpha) {
    state.stage.hasSetBackgroundToAlpha = hasSetBackgroundToAlpha
  },
  setStageOffset(stage: DesignMetaState, offset: XYCoordinate) {
    stage.stage.config.offset = offset
  },
  setStageScale(state: DesignMetaState, scale: XYCoordinate) {
    state.stage.config.scale = scale
  },
  setStagePosition(state: DesignMetaState, position: XYCoordinate) {
    state.stage.config.position = position
  },
  setStageDimensions(state: DesignMetaState, dimensions: { width: number, height: number }) {
    state.stage.config.width = dimensions.width
    state.stage.config.height = dimensions.height
  },
  setSelectionRectStart(state: DesignMetaState, start: XYCoordinate) {
    state.selectionRect.start = start
  },
  setSelectionRectVisible(state: DesignMetaState, visible: boolean) {
    state.selectionRect.config.visible = visible
  },
  setSelectionRectDimensions(state: DesignMetaState, dimensions: { x: number, y: number, width: number, height: number }) {
    state.selectionRect.config.x = dimensions.x
    state.selectionRect.config.y = dimensions.y
    state.selectionRect.config.width = dimensions.width
    state.selectionRect.config.height = dimensions.height
  },
  setBits(state: DesignMetaState, bits: number[]) {
    state.qr.bits = bits
  },
  setShowGrid(state: DesignMetaState, showGrid: boolean) {
    state.qr.showGrid = showGrid
  },
  toggleShowGrid(state: DesignMetaState) {
    state.qr.showGrid = !state.qr.showGrid
  },
  toggleSnapToGridOnMove(state: DesignMetaState) {
    state.stage.snapToGridOnMove = !state.stage.snapToGridOnMove
  },
  toggleShowInterpretedPixels(state: DesignMetaState) {
    state.qr.showInterpretedPixels = !state.qr.showInterpretedPixels
  },
  toggleSnapToEachOther(state: DesignMetaState) {
    state.stage.snapToEachOther = !state.stage.snapToEachOther
  },
  toggleLockQr(state: DesignMetaState) {
    state.qr.lockQr = !state.qr.lockQr
  },
  setSnapToEachOther(state: DesignMetaState, snapToEachOther: boolean) {
    state.stage.snapToEachOther = snapToEachOther
    if (snapToEachOther) {
      state.stage.snapToGridOnMove = !snapToEachOther
    }
  },
  setSnapToGridOnMove(state: DesignMetaState, snapToGridOnMove: boolean) {
    state.stage.snapToGridOnMove = snapToGridOnMove
    if (snapToGridOnMove) {
      state.stage.snapToEachOther = !snapToGridOnMove
    }
  },
  setSnapToGridOnResize(state: DesignMetaState, snapToGridOnResize: boolean) {
    state.stage.snapToGridOnResize = snapToGridOnResize
  },
  setShowInterpretedPixels(state: DesignMetaState, showInterpretedPixels: boolean) {
    state.qr.showInterpretedPixels = showInterpretedPixels
  },
  setDraggingItem(state: DesignMetaState, item: DraggingItem) {
    state.draggingItem = item
  },
  clearTestResults(state: DesignMetaState) {
    state.testResults = []
  },
  // addTestResult(state: State, testResult: any) {
  //   state.testResults.push(testResult)
  // },
  setTestImage(state: DesignMetaState, testImage: HTMLImageElement) {
    state.testImage = testImage
  },
  deselectAll(state: DesignMetaState) {
    state.selectedNodeIds = []
  },
  setSelectedNodeIds(state: DesignMetaState, nodeIds: string[]) {
    state.selectedNodeIds = nodeIds
  },
  // moveForward(state: DesignMetaState) {
  //   // Iterate through all glyphs. If we come across a group that is selected, move the element 
  //   // next to it back in line.
  //   for (let i = state.glyphs.length - 1; i >= 0; i--) {
  //     if (isGlyphAtIndexSelected(state, i)) {
  //       const endIndex = i + 1
  //       while (i >= 1 && isGlyphAtIndexSelected(state, i - 1)) {
  //         i--
  //       }

  //       if (endIndex === state.glyphs.length) {
  //         // This group is already as far forward as is possible.
  //         continue
  //       }

  //       const rotatedGroup = [state.glyphs[endIndex]]
  //       rotatedGroup.push(...state.glyphs.slice(i, endIndex))
  //       state.glyphs.splice(i, rotatedGroup.length, ...rotatedGroup)
  //     }
  //   }
  // },
  // moveBackward(state: DesignMetaState) {
  //   for (let i = 0; i < state.glyphs.length; i++) {
  //     if (isGlyphAtIndexSelected(state, i)) {
  //       let startIndex = i
  //       while (i < state.glyphs.length - 1 && isGlyphAtIndexSelected(state, i + 1)) {
  //         i++
  //       }

  //       if (startIndex === 0) {
  //         // This group is already as far backward as is possible.
  //         continue
  //       }

  //       const rotatedGroup = state.glyphs.slice(startIndex, i + 1)
  //       rotatedGroup.push(state.glyphs[startIndex - 1])
  //       state.glyphs.splice(startIndex - 1, rotatedGroup.length, ...rotatedGroup)
  //     }
  //   }
  // }
}

export const getters: GetterTree<DesignMetaState, RootState> = {
  scaledPixelsPerBlock(state): number {
    return state.sizing.pixelsPerBlock * state.stage.config.scale.x
  },
  // canMoveForward(state): boolean {
  //   if (state.selectedNodeIds.length === state.glyphs.length) {
  //     return false
  //   }
  //   for (let i = 0; i < state.selectedNodeIds.length; i++) {
  //     if (!isGlyphAtIndexSelected(state, i)) {
  //       return false
  //     }
  //   }
  //   return true
  // },
  // canMoveBackward(state): boolean {
  //   if (state.selectedNodeIds.length === state.glyphs.length) {
  //     return false
  //   }
  //   for (let i = 0; i < state.selectedNodeIds.length; i++) {
  //     if (!isGlyphAtIndexSelected(state, state.glyphs.length - 1 - i)) {
  //       return false
  //     }
  //   }
  //   return true
  // },
 
}
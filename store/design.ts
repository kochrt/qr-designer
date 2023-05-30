import { MutationTree, ActionTree, GetterTree } from "vuex"
import { DesignState, DotStyle, GETTER_SELECTED_NODES_CONFIGS, Glyph, RootState } from "./types"
import Vue from "vue"
const tinycolor = require("tinycolor2")

const startingState: DesignState = {
  background: {
    color: "#ffffffff"
  },
  qr: {
    dots: {
      style: 'rounded',
      fill: '#000000ff'
    },
    config: {
      id: 'qr',
      x: 0, y: 0,
      scale: { x: 1, y: 1 }
    }
  },
  nodes: []
}

export const state: (() => (DesignState)) = () => (startingState)

export const mutations: MutationTree<DesignState> = {
  setDotFill(state, color: any) {
    state.qr.dots.fill = color.hex8
  },
  setBackgroundColor(state, color: any) {
    state.background.color = color.hex8
  },
  setDotStyle(state, style: DotStyle) {
    state.qr.dots.style = style
  },
  addNode(state, node: Glyph) {
    state.nodes.push(node)
  },
  deleteNodesByIds(state, ids: string[]) {
    for (let i = state.nodes.length - 1; i >= 0; i--) {
      if (ids.includes(state.nodes[i].config.id)) {
        state.nodes.splice(i, 1)
      }
    }
  },
  setPropForNodes(state, params: { configProps: { key: string, value: any }, ids: string[] }) {
    for (const node of state.nodes) {
      if (params.ids.includes(node.config.id)) {
        Vue.set(node.config, params.configProps.key, params.configProps.value)
      }
    }
  },
  styleBold(state, ids: string[]) {
    for (const node of state.nodes) {
      if (!ids.includes(node.config.id)) {
        return
      }
      if (!node.config.fontStyle) {
        Vue.set(node.config, "fontStyle", "")
      }
      const alreadyBolded = node.config.fontStyle!.includes(" bold");
      if (alreadyBolded) {
        node.config.fontStyle = node.config.fontStyle!.replaceAll(
          " bold",
          ""
        ) as "normal";
      } else {
        node.config.fontStyle += " bold";
      }
    }
  },
  styleItalic(state, ids: string[]) {
    for (const node of state.nodes) {
      if (!ids.includes(node.config.id)) {
        return
      }
      if (!node.config.fontStyle) {
        Vue.set(node.config, "fontStyle", "")
      }
      const alreadyBolded = node.config.fontStyle!.includes(" italic");
      if (alreadyBolded) {
        node.config.fontStyle = node.config.fontStyle!.replaceAll(
          " italic",
          ""
        ) as "normal";
      } else {
        node.config.fontStyle += " italic";
      }
    }
  },
  styleUnderline(state, ids: string[]) {
    for (const node of state.nodes) {
      if (ids.includes(node.config.id)) {
        node.config.textDecoration = node.config.textDecoration ? "" : "underline"
      }
    }
  },
  moveForward(state, ids: string[]) {
    const isSelected = (node: Glyph, ids: string[]) => {
      return ids.includes(node.config.id)
    }

    // Iterate through all glyphs. If we come across a group that is selected, move the element 
    // next to it back in line.
    for (let i = state.nodes.length - 1; i >= 0; i--) {
      if (isSelected(state.nodes[i], ids)) {
        const endIndex = i + 1
        while (i >= 1 && isSelected(state.nodes[i - 1], ids)) {
          i--
        }

        if (endIndex === state.nodes.length) {
          // This group is already as far forward as is possible.
          continue
        }

        const rotatedGroup = [state.nodes[endIndex]]
        rotatedGroup.push(...state.nodes.slice(i, endIndex))
        state.nodes.splice(i, rotatedGroup.length, ...rotatedGroup)
      }
    }
  },
  moveBackward(state, ids: string[]) {
    const isSelected = (node: Glyph, ids: string[]) => {
      return ids.includes(node.config.id)
    }

    for (let i = 0; i < state.nodes.length; i++) {
      if (isSelected(state.nodes[i], ids)) {
        let startIndex = i
        while (i < state.nodes.length - 1 && isSelected(state.nodes[i + 1], ids)) {
          i++
        }

        if (startIndex === 0) {
          // This group is already as far backward as is possible.
          continue
        }

        const rotatedGroup = state.nodes.slice(startIndex, i + 1)
        rotatedGroup.push(state.nodes[startIndex - 1])
        state.nodes.splice(startIndex - 1, rotatedGroup.length, ...rotatedGroup)
      }
    }
  }
}

export const actions: ActionTree<DesignState, RootState> = {
  setBackgroundColor(context, color) {
    const designMeta = context.rootState.designMeta
    if (designMeta.stage.showTransparencyWarning) {
      if (designMeta.stage.hasSetBackgroundToAlpha) {
        if (!designMeta.stage.hasResetBackgroundToOpaque) {
          if (color.rgba.a === 1) {
            context.commit('designMeta/dismissTransparencyWarning', null, { root: true })
          }
        }
      } else {
        if (color.rgba.a < 1) {
          context.commit('designMeta/setHasSetBackgroundToAlpha', true, { root: true })
        }
      }
    }
    context.commit('setBackgroundColor', color)
  },
  deleteSelectedNodes(context) {
    context.commit('deleteNodesByIds', context.rootState.designMeta.selectedNodeIds)
  },
  setConfigProps(context, configProps: { key: string, value: any }) {
    context.commit('setPropForNodes', {
      configProps, ids: context.rootState.designMeta.selectedNodeIds
    })
  },
  styleBold(context) {
    context.commit('styleBold', context.rootState.designMeta.selectedNodeIds)
  },
  styleItalic(context) {
    context.commit('styleItalic', context.rootState.designMeta.selectedNodeIds)
  },
  styleUnderline(context) {
    context.commit('styleUnderline', context.rootState.designMeta.selectedNodeIds)
  },
  moveForward(context) {
    context.commit('moveForward', context.rootState.designMeta.selectedNodeIds)
  },
  moveBackward(context) {
    context.commit('moveBackward', context.rootState.designMeta.selectedNodeIds)
  }
}

function styleOptionsForNode(nodeType: string): Set<string> {
  const options = [] as string[];
  const shapes = ["v-rect", "v-circle", "v-line", "v-text"];
  if (shapes.includes(nodeType)) {
    options.push(
      "fill",
      "stroke",
      "strokeWidth",
      "shadowColor",
      "shadowBlur",
      "shadowOffset",
      "shadowOpacity"
    );
  }
  if (nodeType === "v-text") {
    options.push(
      "fontFamily",
      "fontSize",
      "fontStyle",
      "textDecoration",
      "text"
    );
  }
  return new Set(options);
}

function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter((x) => setB.has(x)));
}
function styleOptionsForNodes(nodes: string[]): Set<string> {
  return nodes
    .map(styleOptionsForNode)
    .reduce(intersection, new Set(allStyleOptions));
}

const allStyleOptions = [
  "fill",
  "stroke",
  "strokeWidth",
  "shadowColor",
  "shadowBlur",
  "shadowOffset",
  "shadowOpacity",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "textDecoration",
  "text"
]

export const getters: GetterTree<DesignState, RootState> = {
  backgroundColorRgba(state) {
    return tinycolor(state.background.color).toRgb()
  },
  qrColorRgba(state) {
    return tinycolor(state.qr.dots.fill).toRgb()
  },
  selectedNodesConfigs(state, getters, rootState) {
    return [...state.nodes].filter(node =>
      rootState.designMeta.selectedNodeIds.includes(node.config.id)
    )
  },
  selectedNodeStyleOptions(state, getters) {
    return styleOptionsForNodes(getters[GETTER_SELECTED_NODES_CONFIGS].map((n: Glyph) => n.component))
  },
  singularlySelectedTextNode(state, getters, rootState): Glyph | undefined {
    if (rootState.designMeta.selectedNodeIds.length !== 1) {
      return
    }
    const selected = getters[GETTER_SELECTED_NODES_CONFIGS] as Glyph[]
    if (selected[0].component === 'v-text') {
      return selected[0]
    }
  }
}
<template>
  <div>
    <div class="m-auto" style="max-width: 1200px">
      <transition-expand>
        <component
          v-if="swinkError"
          :is="
            swinkError === 'EXCEEDED_QUOTA'
              ? 'upgrade-account-banner'
              : 'unknown-error-banner'
          "
        />
      </transition-expand>
      <div class="px-4 md:px-8 w-full">
        <div
          class="
        rounded
        p-3
        border
        mb-6
        items-start
        flex flex-row
        bg-blue-50
        border-blue-300
        text-blue-700
        gap-2
      "
        >
          <svg
            class="w-5 h-5 pt-1"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
            ></path>
          </svg>
          <div class="">
            <p>
              Please read the
              <a href="https://github.com/kochrt/qr-designer" class="underline"
                >README</a
              >
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col px-4 md:px-8 w-full pb-4">
        <p>
          The following character set is allowed:
        </p>
        <code class="pb-1 text-sm"
          >0–9, A–Z (upper-case only), space, $, %, *, +, -, ., /, :</code
        >
        <p>
          Values less than 25 characters will be padded with spaces, but that
          should be ok for most urls
        </p>
        <input
          type="text"
          placeholder="URL"
          pattern="[A-Z ]+"
          class="w-full"
          v-model="url"
          @input="urlInput"
        />
        <p class="text-sm">{{ url.length }} / 25</p>
      </div>
      <div class="w-full px-4 md:px-8 flex flex-col md:flex-row">
        <sidebar @test="runScannabilityTest" />
        <div class="order-1 md:order-2">
          <div
            class="border -m-px relative stageBackground"
            @drop.prevent="drop"
          >
            <transparency-warning
              v-if="$store.state.designMeta.showTransparencyWarning"
            ></transparency-warning>
            <v-stage
              :config="configKonva"
              ref="stage"
              tabindex="1"
              @keydown.native.prevent="stageKeyPress"
              @wheel="wheel"
              @mousedown="stageMouseDown"
              @touchdown="stageTouchDown"
              @mousemove="stageMouseMove"
              @touchmove="stageTouchMove"
              @touchend="stageTouchEnd"
              @mouseup="stageMouseUp"
              @click="stageClick"
              @hook:mounted="stageMounted"
            >
              <v-layer>
                <v-rect :config="backgroundConfig" />
                <QRGroup
                  ref="qrGroup"
                  :url="url"
                  :backgroundConfig="backgroundConfig"
                  @transform="transformed"
                  @transformend="transformEnd"
                  @dragmove="dragMove"
                  @dragend="dragEnd"
                ></QRGroup>
              </v-layer>
              <v-layer ref="layer">
                <component
                  :is="glyph.component"
                  v-for="glyph in glyphs"
                  :key="glyph.config.id"
                  :config="glyph.config"
                  :draggable="true"
                  ref="glyphs"
                  @dragmove="dragMove"
                  @dragend="dragEnd"
                  @transform="transformed"
                  @transformend="transformEnd"
                  @hook:mounted="glyphAdded(glyph.config.id)"
                  @hook:destroyed="glyphDestroyed"
                  @dblclick="doubleClick(glyph.config.id)"
                ></component>
              </v-layer>
              <v-layer>
                <v-line
                  ref="lineGuides"
                  v-for="(line, index) in lineGuides"
                  :key="index"
                  :config="line"
                />
                <v-transformer
                  ref="transformer"
                  :config="transformerConfig"
                  @dragmove="transformerDragMove"
                  @transform="transformerTransformed"
                />
                <v-rect
                  :config="selectionRectConfig.config"
                  ref="selectionRect"
                />
              </v-layer>
            </v-stage>
            <transition
              enter-class="scale-75 opacity-0"
              enter-active-class="transition-all ease-in-out transform duration-75"
              enter-to-class="scale-100 opacity-100"
              leave-active-class="transition-all ease-out transform duration-75"
              leave-to-class="scale-75 opacity-0"
            >
              <shape-style-bar
                ref="shapeStyleBar"
                v-if="
                  selectedNodeIds &&
                    selectedNodeIds.length &&
                    !selectionRectConfig.config.visible
                "
                :collapse="collapseShapeStyleBar"
                :style="styleBarStyle"
                @update="determineInterpretedPixels"
              />
            </transition>
          </div>
          <div class="relative">
            <resize-observer @notify="resized" :emitOnMount="true" />
          </div>
          <stage-options
            v-if="isStageMounted"
            @rotate-left="rotateLeft"
            @rotate-right="rotateRight"
            @test="runScannabilityTest"
            @download="download"
            :stage="stage"
            v-model="configKonva.scale"
          />
          <testing-area />
        </div>
      </div>
    </div>
    <design-marketing />
  </div>
</template>

<script lang="ts">
// @ts-ignore
import ResizeObserver from "vue-resize/src/components/ResizeObserver.vue";
import "vue-resize/dist/vue-resize.css";
import { debounce, throttle } from "throttle-debounce";
import Vue from "vue";
import Tips from "./Tips.vue";
import QRGroup from "./QRGroup.vue";
import StageOptions from "./StageOptions/StageOptions.vue";
import { Stage } from "konva/lib/Stage";
import { Transformer } from "konva/lib/shapes/Transformer";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { Layer } from "konva/lib/Layer";
import { Rect } from "konva/lib/shapes/Rect";
import { Shape } from "konva/lib/Shape";
import { Transform } from "konva/lib/Util";
import { mapState, mapGetters } from "vuex";
import Sidebar from "./Sidebar/Sidebar.vue";
import TransparencyWarning from "./TransparencyWarning.vue";
import UpgradeAccountBanner from "./UpgradeAccountBanner.vue";
import UnknownErrorBanner from "./UnknownErrorBanner.vue";
import ShapeStyleBar from "./ShapeStyleBar.vue";
import TransitionExpand from "../TransitionExpand.vue";
import TestingArea from "./TestingArea.vue";
import {
  Glyph,
  DotStyle,
  RootState,
  DraggingItem,
  DraggingImage,
  DraggingShapeData
} from "~/store/types";

interface ItemBounds {
  guide: number;
  offset: number;
  snap: Snap;
}

interface LineGuide {
  lineGuide: number;
  offset: number;
  orientation: string;
  snap: Snap;
}

interface CopyObject {
  swink: {
    version: number;
    nodes: Glyph[];
    background: {
      color: string; // hex8
    };
    qr: {
      config: {
        fill: string; // hex8
        x: number;
        y: number;
        style: DotStyle;
      };
    };
  };
}

type Snap = "start" | "center" | "end";

export interface KonvaVue extends Vue {
  getNode(): Node;
}

export default Vue.extend({
  components: {
    ResizeObserver,
    Tips,
    QRGroup,
    StageOptions,
    Sidebar,
    TransparencyWarning,
    UpgradeAccountBanner,
    UnknownErrorBanner,
    ShapeStyleBar,
    TransitionExpand,
    TestingArea
  },
  data() {
    return {
      transformerConfig: {
        rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315],
        name: "transformer",
        ignoreStroke: true,
        anchorSize: 9,
        anchorFill: "#ffffffcc",
        anchorStroke: "rgb(76, 29, 149)",
        borderStroke: "rgb(196, 196, 196)",
        anchorCornerRadius: 1,
        enabledAnchors: [] as string[],
        padding: 3,
        keepRatio: false
      },
      interpretedPixels: [] as number[][],
      glyphIdCounter: 0,
      hspThreshold: 215,
      collapseShapeStyleBar: true,
      shapeStyleBarStyle: `visibility: hidden;`,
      backgroundConfig: {
        x: -5000,
        y: -5000,
        width: 15000,
        height: 15000,
        fill: this.$store.state.design.background.color,
        listening: false
      },
      guidelineOffset: 5,
      lineGuides: [] as any,
      cachedTransforms: {} as { [coordinate: string]: Transform },
      banner: {
        colorClass: "border-red-300 text-red-700 bg-red-50",
        html: ""
      },
      isStageMounted: false,
      transformerPosition: null as { x: number; y: number } | null,
      lastDist: 0,
      url: ""
    };
  },
  computed: {
    stage(): Stage {
      return ((this.$refs.stage as unknown) as Stage).getStage();
    },
    qrGroup(): typeof QRGroup {
      return (this.$refs.qrGroup as unknown) as typeof QRGroup;
    },
    transformer(): Transformer {
      return (this.$refs.transformer as KonvaVue).getNode() as Transformer;
    },
    glyphLayer(): Layer {
      return (this.$refs.layer as KonvaVue).getNode() as Layer;
    },
    stageBlockHeight(): number {
      return this.stage.width() / this.scaledPixelsPerBlock;
    },
    stageBlockOffset(): number {
      return (this.stageBlockHeight - this.qrSize) / 2;
    },
    selectionRect(): Rect {
      return (this.$refs.selectionRect as KonvaVue).getNode() as Rect;
    },
    ...mapGetters({
      singularlySelectedTextNode: "designMeta/singularlySelectedTextNode",
      scaledPixelsPerBlock: "designMeta/scaledPixelsPerBlock",
      backgroundColorRgba: "design/backgroundColorRgba"
    }),
    ...mapState({
      backgroundColor: (state: any) =>
        (state as RootState).design.background.color,
      showInterpretedPixels: (state: any) =>
        (state as RootState).designMeta.qr.showInterpretedPixels,
      swinkError: (state: any) => (state as RootState).swink?.error,
      swinkId: (state: any) =>
        (state as RootState).swink?.swink?.metadata?.id || "AAAAAAAAAA",
      glyphs: (state: any) => {
        return (state as RootState).design.nodes as Glyph[];
      },
      selectedNodeIds: (state: any) =>
        (state as RootState).designMeta.selectedNodeIds as string[],
      qrSize: (state: any) =>
        (state as RootState).designMeta.sizing.qrSize as number,
      configKonva: (state: any) => (state as RootState).designMeta.stage.config,
      selectionRectConfig: state =>
        (state as RootState).designMeta.selectionRect,
      pixelsPerBlock: state =>
        (state as RootState).designMeta.sizing.pixelsPerBlock
    }),
    styleBarStyle(): string {
      if (!this.transformerPosition) {
        return "visibility: hidden";
      }
      const nodeHeight = this.transformer.height();
      const top = Math.min(
        Math.max(
          0,
          this.stage.container().offsetTop +
            this.transformerPosition.y +
            nodeHeight +
            16
        ),
        this.stage.container().offsetHeight
      );
      const left = Math.min(
        Math.max(
          0,
          this.stage.container().offsetLeft + this.transformerPosition.x
        ),
        this.stage.container().offsetWidth
      );
      return `top: ${top}px; left: ${left}px; visibility: visible;`;
    }
  },
  watch: {
    "configKonva.scale": function(val) {
      this.checkSelection();
    },
    "$store.state.design.qr.dots.fill": function(val) {
      this.determineInterpretedPixels();
    },
    backgroundColor: function(val) {
      this.backgroundConfig.fill = val;
      this.determineInterpretedPixels();
    },
    showInterpretedPixels: function(val) {
      if (val) {
        this.determineInterpretedPixels();
      }
    },
    swinkId: function(val) {
      history.pushState({}, "", `/create/${val}`);
    },
    selectedNodeIds: function(val) {}
  },
  methods: {
    urlInput(el: HTMLInputElement) {
      if (this.url) {
        this.url = this.url.replaceAll(/[^0-9A-Za-z \$\%\*\+\-\.\/\:]/g, "");
        if (this.url.length > 25) {
          this.url = this.url.substring(0, 25);
          return false;
        }
        this.url = this.url.toUpperCase();
      }
    },
    async download() {
      await this.prepForScannabilityTest();
      const dataUrl = this.stage.toDataURL({ pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = "Swink QR.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.$fire.analytics.logEvent("design_downloaded");
    },
    stageMounted() {
      this.isStageMounted = true;
    },
    enableAllAnchors() {
      this.transformerConfig.enabledAnchors = [
        "top-left",
        "top-center",
        "top-right",
        "middle-left",
        "bottom-left",
        "bottom-center",
        "bottom-right",
        "middle-right"
      ];
    },
    enableCornerAnchors() {
      this.transformerConfig.enabledAnchors = [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right"
      ];
    },
    async prepForScannabilityTest() {
      const vm = this;
      return new Promise<void>((resolve, reject) => {
        vm.select([]);
        vm.$store.commit("designMeta/setShowInterpretedPixels", false);
        vm.$store.commit("designMeta/setShowGrid", false);
        Vue.nextTick(resolve);
      });
    },
    async runScannabilityTest() {
      const vm = this;
      vm.$store.commit("designMeta/clearTestResults");
      await vm.prepForScannabilityTest();

      // @ts-ignore
      const qrPosition = vm.qrGroup.getClientRect();
      const testImage = await new Promise((resolve, reject) => {
        vm.stage.toImage({
          x: qrPosition.x - qrPosition.width / 4,
          y: qrPosition.y - qrPosition.width / 4,
          width: qrPosition.width * 1.5,
          height: qrPosition.height * 1.5,
          pixelRatio: 3,
          callback: resolve
        });
      });
      vm.$store.commit("designMeta/setTestImage", testImage);
    },
    doubleClick(id: string) {
      if (this.singularlySelectedTextNode) {
        this.editText();
      }
    },
    editText() {
      document.getElementById("textStyleTextInput")?.focus();
    },
    rotateLeft() {
      this.stage.rotate(-90);
      this.checkSelection();
    },
    isTextNode(node: Node): boolean {
      // @ts-ignore
      return !!node.textArr;
    },
    rotateRight() {
      this.stage.rotate(90);
      this.checkSelection();
    },
    // getSingularlySelectedTextNode(): Node | false {
    //   return (
    //     this.selectedNodes.length === 1 &&
    //     this.isTextNode(this.selectedNodes[0]) &&
    //     this.selectedNodes[0]
    //   );
    // },
    select(nodes: Node[]) {
      const isQr = nodes.length === 1 && nodes[0].nodeType === "Group";
      if (isQr) {
        this.enableCornerAnchors();
      } else {
        this.enableAllAnchors();
      }
      this.transformer.nodes(nodes);
      if (!isQr) {
        this.$store.commit(
          "designMeta/setSelectedNodeIds",
          nodes.map(node => node.id())
        );
      }
      this.checkSelection();
    },
    getNodeById(id: string) {
      for (let i = 0; i < this.glyphs.length; i++) {
        const glyphNode = (this.$refs.glyphs as KonvaVue[])[
          i
        ].getNode() as Node;
        if (glyphNode.id() === id) {
          return glyphNode;
        }
      }
    },
    glyphAdded(id: string) {
      this.determineInterpretedPixels();
      const addedNode = this.getNodeById(id)!;
      this.select([addedNode]);
    },
    glyphDestroyed() {
      this.determineInterpretedPixels();
    },
    delayedUpdate() {
      const vm = this;
      setTimeout(() => {
        vm.determineInterpretedPixels();
      }, 100);
    },
    drop(event: DragEvent) {
      const vm = this;
      const files = event.dataTransfer?.files;
      if (files && files.length) {
        return;
      }

      const item = vm.$store.state.designMeta.draggingItem as DraggingItem;
      if (!item) {
        return;
      }

      ((this.$refs.stage as Vue).$el as HTMLDivElement).focus();
      const scaledOffsetX = (item.offsetX || 0) / vm.configKonva.scale.x;
      const scaledOffsetY = (item.offsetY || 0) / vm.configKonva.scale.y;
      this.stage.setPointersPositions(event);
      let { x, y } = this.stage.getRelativePointerPosition();
      const rotation = this.getCurrentRotation();
      if (rotation === 0) {
        x = x - scaledOffsetX;
        y = y - scaledOffsetY;
      }

      if (item.type === "image") {
        const url = (item.data! as DraggingImage).url;
        const img = document.createElement("img");
        const width =
          (item.data! as DraggingImage).width! / vm.configKonva.scale.x;
        const height =
          (item.data! as DraggingImage).height! / vm.configKonva.scale.y;
        img.setAttribute("width", `${width}`);
        img.setAttribute("height", `${height}`);
        const id = `${this.glyphIdCounter++}`;
        img.onload = () => {
          vm.$store.commit("design/addNode", {
            component: "v-image",
            config: {
              name: "v-image",
              x,
              y,
              image: img,
              id,
              rotation: 360 - this.stage.getAbsoluteRotation()
            }
          } as Glyph);
        };
        img.src = url;
      } else if (item.type === "text") {
        vm.$store.commit("design/addNode", {
          component: "v-text",
          config: {
            id: `${this.glyphIdCounter++}`,
            name: "v-text",
            x,
            y,
            text: "Text",
            fontSize: Math.floor(44 / vm.configKonva.scale.x),
            rotation: 360 - this.stage.getAbsoluteRotation(),
            fontStyle: "normal",
            textDecoration: "",
            fontFamily: "Arial",
            fill: "#000",
            stroke: "",
            strokeWidth: 0,
            strokeScaleEnabled: false
          }
        } as Glyph);
      } else if (item.type === "blockText") {
        vm.$store.commit("design/addNode", {
          component: "v-text",
          config: {
            id: `${this.glyphIdCounter++}`,
            name: "v-text",
            x,
            y,
            text: "QR Block text",
            fontSize: 79.2,
            rotation: 360 - this.stage.getAbsoluteRotation(),
            fontStyle: "normal",
            textDecoration: "",
            fontFamily: "Block Rounded 2",
            fill: "#000",
            stroke: "",
            strokeWidth: 0,
            strokeScaleEnabled: false
          }
        } as Glyph);
      } else if (item.type === "svg") {
        vm.$store.commit("design/addNode", {
          component: "v-path",
          config: {
            name: "v-path",
            id: `${this.glyphIdCounter++}`,
            x,
            y,
            scale: {
              x: 1 / vm.configKonva.scale.x / 28,
              y: 1 / vm.configKonva.scale.y / 28
            },
            data: item.data as string,
            fill: "#12f"
          }
        } as Glyph);
      } else if (item.type === "shape") {
        const data = item.data as DraggingShapeData;
        vm.$store.commit("design/addNode", {
          component: data.component,
          config: {
            name: data.component,
            id: `${this.glyphIdCounter++}`,
            ...data.config,
            x,
            y,
            rotation: data.config.rotation
              ? data.config.rotation
              : 360 - this.stage.getAbsoluteRotation(),
            scale: {
              x: 1 / vm.configKonva.scale.x,
              y: 1 / vm.configKonva.scale.y
            }
            // strokeScaleEnabled: false,
          }
        } as Glyph);
      }
    },
    transformed(event: KonvaEventObject<MouseEvent>) {
      this.determineInterpretedPixels();
    },
    //@ts-ignore
    transformEnd(a) {
      console.log("end");
    },
    deleteSelectedNodes() {
      this.$store.dispatch("design/deleteSelectedNodes");
      this.select([]);
    },
    async stageKeyPress(event: KeyboardEvent) {
      const vm = this;
      const numObjectsSelected = this.selectedNodeIds.length;
      const hasSelection = numObjectsSelected > 0;

      const isDelete = event.key === "Backspace" || event.key === "Delete";
      const isCopy = (event.ctrlKey || event.metaKey) && event.key === "c";
      const isPaste = (event.ctrlKey || event.metaKey) && event.key === "v";

      if (isDelete) {
        if (hasSelection) {
          vm.deleteSelectedNodes();
        }
      } else if (isCopy || isPaste) {
        const clipboard = navigator.clipboard;
        if (!clipboard) {
          console.warn("No access to clipboard");
          return;
        }
        if (isCopy) {
          if (!hasSelection) {
            return;
          }
          const copyObject: CopyObject = {
            //@ts-ignore
            swink: {
              version: 1,
              nodes: []
            }
          };
          copyObject.swink.nodes = vm.transformer
            .nodes()
            .filter(node => node.name() !== "qr")
            .map(this.nodeToGlyph);
          clipboard.writeText(JSON.stringify(copyObject));
        } else {
          const text = await clipboard.readText().catch(console.error);
          if (!text) {
            return;
          }
          this.paste(text);
        }
      }
    },
    nodeToGlyph(node: Node<NodeConfig>) {
      const vm = this;
      const component = node.name();
      const attributes = JSON.parse(JSON.stringify(node.attrs));
      delete attributes.id;
      const glyph = { component, config: attributes } as any;
      if (node.attrs.image) {
        glyph.image = {
          src: node.attrs.image.src,
          width: node.attrs.image.width,
          height: node.attrs.image.height
        };
      }
      return glyph;
    },
    paste(text: string) {
      const vm = this;
      let deserialized;
      try {
        deserialized = JSON.parse(text) as CopyObject;
      } catch (error) {
        console.error(error);
        return;
      }
      if (!(deserialized.swink && deserialized.swink.version)) {
        console.warn("Not pasteable");
        return;
      }
      if (deserialized.swink.version === 1) {
        const nodes = deserialized.swink.nodes;
        nodes.forEach(node => {
          const glyph = {
            component: node.component,
            config: {
              // @ts-ignore
              // We won't be setting ids when we copy, with the expectation
              // that it will be set when pasted.
              id: `${vm.glyphIdCounter++}`,
              ...node.config
            }
          };
          if (node.image) {
            const img = document.createElement("img");
            img.setAttribute("width", `${node.image.width}`);
            img.setAttribute("height", `${node.image.height}`);
            glyph.config.image = img;
            img.onload = () => {
              vm.$store.commit("design/addNode", glyph);
            };
            img.src = node.image.src;
          } else {
            vm.$store.commit("design/addNode", glyph);
          }
        });
      }
    },
    stageMouseMove(event: KonvaEventObject<MouseEvent>) {
      // If we're not selecting, return
      if (!this.selectionRectConfig.config.visible) {
        return;
      }
      const {
        x: currentX,
        y: currentY
      } = this.stage.getRelativePointerPosition();
      this.$store.commit("designMeta/setSelectionRectDimensions", {
        x: Math.min(this.selectionRectConfig.start.x, currentX),
        y: Math.min(this.selectionRectConfig.start.y, currentY),
        width: Math.abs(currentX - this.selectionRectConfig.start.x),
        height: Math.abs(currentY - this.selectionRectConfig.start.y)
      });
      const box = this.selectionRect.getClientRect();
      const selected = this.intersectedGlyphs(box);
      this.select(selected);
    },
    startSelectionRectAt(x: number, y: number) {
      this.$store.commit("designMeta/setSelectionRectVisible", true);
      this.$store.commit("designMeta/setSelectionRectStart", { x, y });
      this.$store.commit("designMeta/setSelectionRectDimensions", {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      });
      this.select([]);
      this.stage.container().style.cursor = "crosshair";
    },
    stageTouchDown(event: KonvaEventObject<MouseEvent>) {
      this.stageMouseDown(event);
    },
    getDistance(
      p1: { x: number; y: number },
      p2: { x: number; y: number }
    ): number {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    },
    stageTouchMove(event: KonvaEventObject<TouchEvent>) {
      const touch1 = event.evt.touches[0];
      const touch2 = event.evt.touches[1];

      if (!(touch1 && touch2)) {
        this.stageMouseMove(event as KonvaEventObject<any>);
        return;
      }
      event.evt.preventDefault();
      const p1 = {
        x: touch1.clientX,
        y: touch1.clientY
      };

      const p2 = {
        x: touch2.clientX,
        y: touch2.clientY
      };

      const dist = this.getDistance(p1, p2);
      if (!this.lastDist) {
        this.lastDist = dist;
      }
      const scale = this.configKonva.scale.x * (dist / this.lastDist);
      const width = this.stage.width();
      const normalScale = width / (this.qrSize * this.pixelsPerBlock);
      const minScale = 0.15 * normalScale;
      const scaleX = Math.max(Math.min(normalScale, scale), minScale);
      const scaleY = Math.max(Math.min(normalScale, scale), minScale);
      this.stage.scaleX(scaleX);
      this.stage.scaleY(scaleY);
      this.$store.commit("designMeta/setStageScale", { x: scaleX, y: scaleY });
      this.lastDist = dist;
    },
    stageTouchEnd() {
      this.lastDist = 0;
    },
    stageMouseDown(event: KonvaEventObject<MouseEvent>) {
      // Start selecting
      if (event.target === event.target.getStage()) {
        this.select([]);
        const {
          x: mouseX,
          y: mouseY
        } = this.stage.getRelativePointerPosition();
        this.startSelectionRectAt(mouseX, mouseY);
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        // @ts-ignore
        event.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }

      // find clicked rect by its id
      let target = event.target as Node;
      if (target.parent && target.parent.nodeType === "Group") {
        target = target.parent;
        if (this.$store.state.designMeta.qr.lockQr) {
          this.select([]);
          const {
            x: mouseX,
            y: mouseY
          } = this.stage.getRelativePointerPosition();
          this.startSelectionRectAt(mouseX, mouseY);
          return;
        }
      }
      const currentlySelected = this.transformer.nodes();
      const targetIndex = currentlySelected.indexOf(target);
      if (targetIndex >= 0) {
        // currentlySelected.splice(targetIndex, 1);
        // this.transformer.nodes(currentlySelected);
      } else {
        if (currentlySelected.length === 0) {
          this.select([target]);
        } else if (event.evt.shiftKey) {
          this.select(currentlySelected);
        } else {
          this.select([target]);
        }
      }
      this.stage.container().style.cursor = "move";
    },
    stageMouseUp(event: KonvaEventObject<MouseEvent>) {
      if (!this.selectionRectConfig.config.visible) {
        this.stage.container().style.cursor = "default";
        this.checkSelection();
        return;
      }
      this.$store.commit("designMeta/setSelectionRectVisible", false);
      this.stage.container().style.cursor = "default";
      this.checkSelection();
    },
    checkSelection() {
      if (this.transformer.nodes().length === 0) {
        this.transformerPosition = null;
      } else {
        this.transformerPosition = this.transformer.absolutePosition();
      }
    },
    stageClick(event: KonvaEventObject<MouseEvent>) {
      if (this.selectionRectConfig.config.visible) {
        return;
      }
    },
    haveIntersection(
      r1: { width: number; height: number; x: number; y: number },
      r2: { width: number; height: number; x: number; y: number }
    ) {
      return (
        r1.x <= r2.x &&
        r1.y <= r2.y &&
        r1.x + r1.width >= r2.x + r2.width &&
        r1.y + r1.height >= r2.y + r2.height
      );
      // return !(
      //   r2.x > r1.x + r1.width ||
      //   r2.x + r2.width < r1.x ||
      //   r2.y > r1.y + r1.height ||
      //   r2.y + r2.height < r1.y
      // );
    },
    intersectedGlyphs(selectionRect: {
      width: number;
      height: number;
      x: number;
      y: number;
    }) {
      const intersected = [];
      for (let i = 0; i < this.glyphs.length; i++) {
        const glyphNode = (this.$refs.glyphs as KonvaVue[])[i].getNode();
        if (this.haveIntersection(selectionRect, glyphNode.getClientRect())) {
          intersected.push(glyphNode);
        }
      }
      return intersected;
    },
    scaledMousePosition(event: MouseEvent) {
      const height = this.configKonva.height / 2;
      return {
        x:
          event.offsetX / this.configKonva.scale.x +
          (height - height / this.configKonva.scale.x),
        y:
          event.offsetY / this.configKonva.scale.y +
          (height - height / this.configKonva.scale.y)
      };
    },
    mouseQrPosition(event: MouseEvent) {
      const vm = this;
      let mouseX = event.offsetX / this.scaledPixelsPerBlock;
      let mouseY = event.offsetY / this.scaledPixelsPerBlock;
      mouseX = Math.floor(mouseX - this.stageBlockOffset);
      mouseY = Math.floor(mouseY - this.stageBlockOffset);
      return {
        x: mouseX,
        y: mouseY
      };
    },

    getObjectSnappingEdges(
      shape: Shape
    ): {
      vertical: ItemBounds[];
      horizontal: ItemBounds[];
    } {
      const box = shape.getClientRect();
      const absPos = shape.absolutePosition();

      return {
        vertical: [
          {
            guide: Math.round(box.x),
            offset: Math.round(absPos.x - box.x),
            snap: "start"
          },
          {
            guide: Math.round(box.x + box.width / 2),
            offset: Math.round(absPos.x - box.x - box.width / 2),
            snap: "center"
          },
          {
            guide: Math.round(box.x + box.width),
            offset: Math.round(absPos.x - box.x - box.width),
            snap: "end"
          }
        ],
        horizontal: [
          {
            guide: Math.round(box.y),
            offset: Math.round(absPos.y - box.y),
            snap: "start"
          },
          {
            guide: Math.round(box.y + box.height / 2),
            offset: Math.round(absPos.y - box.y - box.height / 2),
            snap: "center"
          },
          {
            guide: Math.round(box.y + box.height),
            offset: Math.round(absPos.y - box.y - box.height),
            snap: "end"
          }
        ]
      };
    },
    getLineGuideStops(shape: Shape) {
      const vertical: (number | number[])[] = [];
      const horizontal: (number | number[])[] = [];
      if (shape.name() !== "qr") {
        // @ts-ignore
        const box = this.qrGroup.getClientRect();
        vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
        horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
      }

      // and we snap over edges and center of each object on the canvas
      for (let i = 0; i < this.glyphs.length; i++) {
        const glyphNode = (this.$refs.glyphs as KonvaVue[])[i].getNode();
        if (shape.id() === glyphNode.id()) {
          continue;
        }
        const box = glyphNode.getClientRect();
        vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
        horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
      }

      return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat()
      };
    },
    getGuides(
      lineGuideStops: { vertical: number[]; horizontal: number[] },
      itemBounds: { vertical: ItemBounds[]; horizontal: ItemBounds[] }
    ) {
      const resultV: {
        lineGuide: number;
        diff: number;
        snap: Snap;
        offset: number;
      }[] = [];
      const resultH: {
        lineGuide: number;
        diff: number;
        snap: Snap;
        offset: number;
      }[] = [];

      lineGuideStops.vertical.forEach(lineGuide => {
        itemBounds.vertical.forEach(itemBound => {
          var diff = Math.abs(lineGuide - itemBound.guide);
          // if the distance between guild line and object snap point is close we can consider this for snapping
          if (diff < this.guidelineOffset) {
            resultV.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset
            });
          }
        });
      });

      lineGuideStops.horizontal.forEach(lineGuide => {
        itemBounds.horizontal.forEach(itemBound => {
          var diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < this.guidelineOffset) {
            resultH.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset
            });
          }
        });
      });

      var guides = [];

      // find closest snap
      var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
      var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
      if (minV) {
        guides.push({
          lineGuide: minV.lineGuide,
          offset: minV.offset,
          orientation: "V",
          snap: minV.snap
        });
      }
      if (minH) {
        guides.push({
          lineGuide: minH.lineGuide,
          offset: minH.offset,
          orientation: "H",
          snap: minH.snap
        });
      }
      return guides;
    },
    toAbsolutePos(x: number, y: number) {
      const vm = this;
      const key = `${vm.configKonva.scale.x}-${vm.configKonva.scale.y}`;
      if (vm.cachedTransforms[key]) {
        return vm.cachedTransforms[key].point({ x, y });
      }
      const transform = vm.stage.getAbsoluteTransform().copy();
      transform.invert();
      vm.cachedTransforms[key] = transform;
      const pos = transform.point({ x, y });
      return pos;
    },
    setGuideLines(guides: LineGuide[]) {
      const vm = this;
      vm.lineGuides = [];
      guides.forEach(lineGuide => {
        if (lineGuide.orientation === "H") {
          const { x, y } = vm.toAbsolutePos(0, lineGuide.lineGuide);
          vm.lineGuides.push({
            points: [-6000, 0, 6000, 0],
            stroke: "darkorchid",
            strokeWidth: 1 / vm.configKonva.scale.x,
            name: "guide-line-h",
            dash: [4, 6],
            x,
            y
          });
        } else if (lineGuide.orientation === "V") {
          const { x, y } = vm.toAbsolutePos(lineGuide.lineGuide, 0);
          vm.lineGuides.push({
            points: [0, -6000, 0, 6000],
            stroke: "darkorchid",
            strokeWidth: 1 / vm.configKonva.scale.y,
            name: "guide-line-v",
            dash: [4, 6],
            x,
            y
          });
        }
      });
    },
    transformerDragStart(event: KonvaEventObject<MouseEvent>) {
      this.checkSelection();
    },
    transformerDragMove(event: KonvaEventObject<MouseEvent>) {
      this.checkSelection();
    },
    transformerDragEnd(event: KonvaEventObject<MouseEvent>) {
      this.checkSelection();
    },
    transformerTransformed() {
      this.checkSelection();
    },
    dragMove(event: KonvaEventObject<MouseEvent>) {
      const vm = this;

      vm.lineGuides = [];
      const absPos = event.target.absolutePosition();

      if (this.$store.state.designMeta.stage.snapToGridOnMove) {
        const offsetX = absPos.x % this.scaledPixelsPerBlock;
        const offsetY = absPos.y % this.scaledPixelsPerBlock;

        const adjustedPosition = {
          x: absPos.x - offsetX,
          y: absPos.y - offsetY
        };
        event.target.absolutePosition(adjustedPosition);
      } else if (this.$store.state.designMeta.stage.snapToEachOther) {
        const lineGuideStops = vm.getLineGuideStops(event.target as Shape);
        const itemBounds = vm.getObjectSnappingEdges(event.target as Shape);
        const guides = vm.getGuides(lineGuideStops, itemBounds);

        if (guides.length !== 0) {
          vm.setGuideLines(guides);
          guides.forEach(lg => {
            switch (lg.snap) {
              case "start": {
                switch (lg.orientation) {
                  case "V": {
                    absPos.x = lg.lineGuide + lg.offset;
                    break;
                  }
                  case "H": {
                    absPos.y = lg.lineGuide + lg.offset;
                    break;
                  }
                }
                break;
              }
              case "center": {
                switch (lg.orientation) {
                  case "V": {
                    absPos.x = lg.lineGuide + lg.offset;
                    break;
                  }
                  case "H": {
                    absPos.y = lg.lineGuide + lg.offset;
                    break;
                  }
                }
                break;
              }
              case "end": {
                switch (lg.orientation) {
                  case "V": {
                    absPos.x = lg.lineGuide + lg.offset;
                    break;
                  }
                  case "H": {
                    absPos.y = lg.lineGuide + lg.offset;
                    break;
                  }
                }
                break;
              }
            }
          });
          event.target.absolutePosition(absPos);
        }
      }
      vm.determineInterpretedPixels();
      vm.checkSelection();
    },
    dragEnd(event: KonvaEventObject<MouseEvent>) {
      this.lineGuides = [];
    },
    wheel(event: KonvaEventObject<WheelEvent>) {
      event.evt.preventDefault();
      const scaleBy = event.evt.deltaY;
      const width = this.stage.width();
      const normalScale = width / (this.qrSize * this.pixelsPerBlock);
      const minScale = 0.15 * normalScale;
      const scaleX = Math.max(
        Math.min(normalScale, this.configKonva.scale.x + scaleBy / 100),
        minScale
      );
      const scaleY = Math.max(
        Math.min(normalScale, this.configKonva.scale.y + scaleBy / 100),
        minScale
      );
      this.$store.commit("designMeta/setStageScale", {
        x: scaleX,
        y: scaleY
      });
    },
    getCurrentRotation() {
      let rotation = this.stage.rotation();
      while (rotation >= 360) {
        rotation -= 360;
      }
      while (rotation < 0) {
        rotation += 360;
      }
      return rotation;
    },
    _determineInterpretedPixels() {
      const context = this.glyphLayer.getContext();
      // @ts-ignore
      this.qrGroup.determineInterpretedPixels(context);
    },
    determineInterpretedPixels: debounce(10, function() {
      // @ts-ignore
      this._determineInterpretedPixels();
    }),
    _resized(dimensions: { width: number }) {
      const newWidth = dimensions.width;
      this.$store.commit("designMeta/setStageDimensions", {
        width: newWidth,
        height: newWidth
      });
      const qrWidth = (this.qrSize + 2) * this.pixelsPerBlock;
      const scale = newWidth / qrWidth;
      this.$store.commit("designMeta/setStageScale", {
        x: scale,
        y: scale
      });
      const normalOffset = ((this.qrSize + 2) * this.pixelsPerBlock) / 2;
      this.$store.commit("designMeta/setStageOffset", {
        x: normalOffset,
        y: normalOffset
      });
      this.$store.commit("designMeta/setStagePosition", {
        x: newWidth / 2,
        y: newWidth / 2
      });
    },
    resized: throttle(50, function(dimensions) {
      // @ts-ignore
      this._resized(dimensions);
    })
  },
  async mounted() {
    const vm = this;
    const con = vm.stage.container();
    con.addEventListener("dragover", function(e) {
      e.preventDefault(); // !important
    });
    window.addEventListener("beforeunload", function(e) {
      if (vm.glyphs.length) {
        e.returnValue = "Leave this page? Nothing will be saved.";
        return "Leave this page? Nothing will be saved.";
      }
    });
  }
});
</script>

<style>
.stageBackground {
  background-color: #ffffff;
  opacity: 1;
  background-image: repeating-linear-gradient(
      45deg,
      #f3f3f3 25%,
      transparent 25%,
      transparent 75%,
      #f3f3f3 75%,
      #f3f3f3
    ),
    repeating-linear-gradient(
      45deg,
      #f3f3f3 25%,
      #ffffff 25%,
      #ffffff 75%,
      #f3f3f3 75%,
      #f3f3f3
    );
  background-position: 0 0, 13px 13px;
  background-size: 26px 26px;
}
@font-face {
  font-family: "Block Rounded";
  src: url(/fonts/swink-rounded.ttf) format("truetype");
}
@font-face {
  font-family: "Block Rounded 2";
  src: url(/fonts/swink-rounded-2.ttf) format("truetype");
}
</style>

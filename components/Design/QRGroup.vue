<template>
  <v-group
    ref="qrGroup"
    :config="{
      draggable: !$store.state.designMeta.qr.lockQr,
      name: 'qr',
      ...$store.state.design.qr.config
    }"
    @transform="$emit('transform', $event)"
    @transformend="$emit('transformend', $event)"
    @dragmove="$emit('dragmove', $event)"
    @dragend="$emit('dragend', $event)"
  >
    <template v-for="(bit, index) in bits"
      ><component
        v-if="shouldShow(index, bit)"
        :key="index"
        :is="configForItemAt(index).component"
        :config="configForItemAt(index).config"
      />
    </template>
    <template v-for="detector in detectors">
      <detector-block
        v-if="detector.x !== 35"
        :originalX="detector.x"
        :originalY="detector.y"
        :x="detector.x * pixelsPerBlock"
        :y="detector.y * pixelsPerBlock"
        :pixelsPerBlock="pixelsPerBlock"
        :key="`${detector.x}-${detector.y}`"
        ref="detectorBlocks"
      />
    </template>
    <template v-if="$store.state.designMeta.qr.showGrid">
      <v-line
        v-for="i in qrSize - 20"
        :key="'horizonal' + i"
        :config="{
          points: [
            qrOffset.x,
            i * pixelsPerBlock + 10 * pixelsPerBlock + qrOffset.y,
            qrOffset.x + baseWidth,
            i * pixelsPerBlock + 10 * pixelsPerBlock + qrOffset.y
          ],
          stroke: 'gray',
          strokeWidth: 1,
          dash: [1, 2]
        }"
      />
      <v-line
        v-for="i in qrSize - 1"
        :key="'vertical' + i"
        :config="{
          points: [
            i * pixelsPerBlock + qrOffset.x,
            0 + 11 * pixelsPerBlock + qrOffset.y,
            i * pixelsPerBlock + qrOffset.x,
            baseWidth - 10 * pixelsPerBlock + qrOffset.y
          ],
          stroke: 'gray',
          strokeWidth: 1,
          dash: [1, 2]
        }"
      />
    </template>
  </v-group>
</template>

<script lang="ts">
import { Dots, RootState } from "~/store/types";
import Vue from "vue";
import {
  square,
  circle,
  rounded,
  hexagon,
  star,
  interpretedPixel,
  innerFinderPattern,
  outerFinderPattern,
  smallOuterFinderPattern
} from "./shapes";
import BackgroundGrid from "./BackgroundGrid.vue";
import DetectorBlock from "./DetectorBlock.vue";
import { SceneContext } from "konva/lib/Context";
import { createSymbol } from "./qr";
import { KonvaVue } from "./Design.vue";
import { mapState } from "vuex";

const detectors = [] as { x: number; y: number }[];
for (let x = 1; x < 42; x++) {
  for (let y = 12; y < 32; y++) {
    detectors.push({ x, y });
  }
}

export default Vue.extend({
  components: { BackgroundGrid, DetectorBlock },
  props: ["backgroundConfig", "url"],
  data() {
    return {
      detectors,
      interpretedPixels: [] as [number, number][]
    };
  },
  watch: {
    swinkId: function(val) {
      this.update();
    },
    url: function(val) {
      this.update()
    }
  },
  computed: {
    adjustedUrl(): string {
      if (this.url.length < 25) {
        return this.url + " ".repeat(25 - this.url.length)
      }
      return ''
    },
    ...mapState({
      qrSize: state => (state as RootState).designMeta.sizing.qrSize,
      pixelsPerBlock: state =>
        (state as RootState).designMeta.sizing.pixelsPerBlock,
      qrOffset: state => {
        const pixelsPerBlock = (state as RootState).designMeta.sizing
          .pixelsPerBlock;
        return { x: pixelsPerBlock, y: pixelsPerBlock };
      },
      baseWidth: state => (state as RootState).designMeta.sizing.baseWidth,
      bits: (state: any) => state.designMeta.qr.bits as number[],
      swinkId: (state: any) =>
        (state.swink?.swink?.metadata?.id as string) || "",
      showInterpretedPixels: (state: any) =>
        state.designMeta.qr.showInterpretedPixels as boolean,
      dots: (state: any) => state.design.qr.dots as Dots
    })
  },
  mounted() {
    this.update();
  },
  methods: {
    getClientRect() {
      return (this.$refs.qrGroup as KonvaVue).getNode().getClientRect();
    },
    update() {
      const swinkId = this.swinkId || "AAAAAAAAAA";
      const dataSegments = [
        {
          data: this.adjustedUrl, // `HTTPS://SW.INK/${swinkId.toUpperCase()}`,
          mode: "alphanumeric"
        }
      ];

      // TODO: Twould be nice if we didn't have this arbitrary arithmetic here.
      // Clearly we have an off by one and reversed situation for each axis; we should
      // figure out where the problem is
      const localQr = createSymbol(
        dataSegments,
        this.interpretedPixels.map(c => [41 - c[0], c[1] - 1])
      );
      this.$store.commit("designMeta/setBits", localQr.modules.data);
    },
    determineInterpretedPixels(context: SceneContext) {
      const vm = this;
      const interpretedPixels = [] as [number, number][];
      ((vm.$refs.detectorBlocks as unknown) as typeof DetectorBlock[]).forEach(
        detector => {
          // @ts-ignore
          if (detector.isCovered(context)) {
            // @ts-ignore
            interpretedPixels.push([detector.originalX, detector.originalY]);
          }
        }
      );
      this.interpretedPixels = interpretedPixels;
      this.update();
    },
    shouldShow(index: number, bit: boolean): boolean {
      const coordinates = this.coordinates(index);
      if (this.isInDrawingArea(coordinates[0], coordinates[1])) {
        return bit && this.showInterpretedPixels;
      }
      if (this.finderPatternComponentForIndex(index)) {
        return true;
      }
      if (this.isInFinderPattern(index)) {
        return false;
      }
      return bit;
    },
    isInDrawingArea(x: number, y: number): boolean {
      return (
        y > 10 &&
        y < 31 &&
        x !== 41 - 7 &&
        !(y === 30 && x === 41 - 1) &&
        !((y == 11 || y === 12) && x > 41 - 14)
      );
    },
    coordinates(index: number): [number, number] {
      return [Math.floor(index % this.qrSize), Math.floor(index / this.qrSize)];
    },
    componentType(index: number) {
      const dotStyle = this.dots.style;
      if (dotStyle === square.name) {
        return square.component;
      }
      if (dotStyle === circle.name) {
        return circle.component;
      }
      if (dotStyle === rounded.name) {
        return rounded.component;
      }
      if (dotStyle === "triangle") {
        return "v-regular-polygon";
      }
      if (dotStyle === "star") {
        return "v-star";
      }
      return "v-rect";
    },
    detectorConfigFor(x: number, y: number) {
      return {
        x: x * this.pixelsPerBlock,
        y: y * this.pixelsPerBlock,
        fill: "black"
      };
    },
    configForItemAt(index: number): { component: string; config: any } {
      const dots: Dots = this.dots;
      const style = dots.style;
      const fill = dots.fill;
      const [x, y] = this.coordinates(index);
      const comp = this.finderPatternComponentForIndex(index);
      const position: [number, number] = [
        x * this.pixelsPerBlock + this.qrOffset.x,
        y * this.pixelsPerBlock + this.qrOffset.y
      ];
      if (comp) {
        return {
          component: comp.component,
          config: comp.configForPosition(position, this.pixelsPerBlock, fill)
        };
      }

      if (this.isInDrawingArea(x, y)) {
        return {
          component: interpretedPixel.component,
          config: {
            ...interpretedPixel.configForPosition(
              position,
              this.pixelsPerBlock,
              fill
            ),
            listening: false
          }
        };
      }
      let componentConfig = {} as { component: string; config: any };
      for (const block of [square, circle, rounded, hexagon, star]) {
        if (style === block.name) {
          componentConfig = {
            component: block.component,
            config: block.configForPosition(position, this.pixelsPerBlock, fill)
          };
          break;
        }
      }
      return componentConfig;
    },
    isInFinderPattern(index: number): boolean {
      const [j, i] = this.coordinates(index);
      // top left
      if (i >= 0 && i <= 6 && j >= 0 && j <= 6) {
        return true;
      }
      // top right
      if (i >= 0 && i <= 6 && j >= 34 && j <= 40) {
        return true;
      }
      // bottom right
      if (i >= 34 && i <= 40 && j >= 34 && j <= 40) {
        return true;
      }
      // bottom left
      if (i >= 32 && i <= 36 && j >= 4 && j <= 8) {
        // except for that middle dot
        if (i === 34 && j === 6) {
          return false;
        }
        return true;
      }
      return false;
    },
    finderPatternComponentForIndex(index: number) {
      const [j, i] = this.coordinates(index);
      if (i === 0 && j === 0) {
        return outerFinderPattern;
      }
      if (i === 2 && j === 2) {
        return innerFinderPattern;
      }
      // Top right finder pattern
      if (i === 0 && j === 34) {
        return outerFinderPattern;
      }
      if (i === 2 && j === 36) {
        return innerFinderPattern;
      }

      // Bottom right finder pattern
      if (i === 34 && j === 34) {
        return outerFinderPattern;
      }
      if (i === 36 && j === 36) {
        return innerFinderPattern;
      }

      // bottom left
      if (i === 32 && j === 4) {
        return smallOuterFinderPattern;
      }
    }
  }
});
</script>

<style></style>

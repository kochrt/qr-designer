<template>
  <v-rect :config="config" ref="rect" />
</template>

<script lang="ts">
import { SceneContext } from "konva/lib/Context";
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import { KonvaVue } from "./Design.vue";
import Color from "./color";
import LRUCache from "lru-cache"

const deltaCache = new LRUCache<string, number>(100)

export default Vue.extend({
  props: ["originalX", "originalY", "x", "y", "pixelsPerBlock"],
  data() {
    return {
      covered: false,
      strategy: "contrast",
    };
  },
  computed: {
    ...mapGetters({
      backgroundColorRgba: 'design/backgroundColorRgba',
      qrColorRgba: 'design/qrColorRgba'
    }),
    ...mapState({
      backgroundColor: function(state: any) {
        const rgba = this.backgroundColorRgba
        return new Color([rgba.r, rgba.g, rgba.b, rgba.a]);
      },
      qrColor: function(state: any) {
        const rgba = this.qrColorRgba
        return new Color([rgba.r, rgba.g, rgba.b, rgba.a]);
      },
    }),
    config() {
      const fifthBlock = this.pixelsPerBlock / 5;
      const twoFifthsBlock = this.pixelsPerBlock * (2 / 5);
      const x = this.x + twoFifthsBlock;
      const y = this.y + twoFifthsBlock;
      const width = fifthBlock;
      const height = fifthBlock;
      const c = { x, y, width, height, listening: false } as any;
      // if (this.covered) {
      //   c.fill = "pink";
      //   c.stroke = "#ff000055";
      //   c.strokeWidth = 12;
      //   return c;
      // } else {
      c.fill = "transparent";
      return c;
      // }
    },
  },
  methods: {
    rgbaToRgb(rgba: number[]): number[] {
      return [
        rgba[0] * rgba[3],
        rgba[1] * rgba[3],
        rgba[2] * rgba[3],
      ]
    },
    distance(pixel: number[], other: number[]) {
      pixel[0] *= pixel[3];
      pixel[1] *= pixel[3];
      pixel[2] *= pixel[3];

      other[0] *= other[3];
      other[1] *= other[3];
      other[2] *= other[3];

      return [0, 1, 2].reduce((prev, next) => {
        return (
          prev +
          Math.max(
            Math.pow(other[next] - pixel[next], 2),
            Math.pow(other[next] - pixel[next] - other[3] - pixel[3], 2)
          )
        );
      }, 0);
    },
    contrasts2(pixel: Uint8ClampedArray) {
      // Alpha normalization
      pixel[3] = pixel[3] / 255;
      const pixelColor = new Color(pixel).overlayOn(this.backgroundColor);

      if (pixel[3] === 0) {
        // If this is a fully transparent pixel, aka there's nothing there, then
        // it does not contrast with the background
        return false;
      }
      // console.log(
      //   "%c PIXEL ",
      //   `background: white; color: ${pixelColor.toString()}`
      // );
      const pixelToBackground = this.deltaE(pixelColor.rgb, this.backgroundColor.rgb)
      const pixelToQr = this.deltaE(pixelColor.rgb, this.qrColor.rgb)
      // console.table({
      //   'pixel to background': pixelToBackground,
      //   'pixel to qr': pixelToQr,
      //   'background/qr': pixelToBackground / pixelToQr,
      //   'qr to background': this.deltaE(this.qrColor.rgb, this.backgroundColor.rgb)
      // });
      return pixelToBackground / pixelToQr > 0.3
    },
    deltaE(rgbA: number[], rgbB: number[]): number {
      const cacheKey = `${rgbA.toString()}-${rgbB.toString()}`
      const cachedValue = deltaCache.get(cacheKey)
      if (cachedValue !== undefined) {
        return cachedValue
      }
      let labA = this.rgb2lab(rgbA);
      let labB = this.rgb2lab(rgbB);
      let deltaL = labA[0] - labB[0];
      let deltaA = labA[1] - labB[1];
      let deltaB = labA[2] - labB[2];
      let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
      let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
      let deltaC = c1 - c2;
      let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
      deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
      let sc = 1.0 + 0.045 * c1;
      let sh = 1.0 + 0.015 * c1;
      let deltaLKlsl = deltaL / 1.0;
      let deltaCkcsc = deltaC / sc;
      let deltaHkhsh = deltaH / sh;
      let i =
        deltaLKlsl * deltaLKlsl +
        deltaCkcsc * deltaCkcsc +
        deltaHkhsh * deltaHkhsh;
      const delta = i < 0 ? 0 : Math.sqrt(i);
      deltaCache.set(cacheKey, delta)
      return delta
    },
    rgb2lab(rgb: number[]) {
      let r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255,
        x,
        y,
        z;
      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
      y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
      z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
      x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
    },
    contrasts(pixel: Uint8ClampedArray): boolean {
      // Alpha normalization
      pixel[3] = pixel[3] / 255;
      const pixelColor = new Color(pixel).overlayOn(this.backgroundColor);
      if (this.strategy === "distance") {
        if (pixel[3] === 0) {
          // If this is a fully transparent pixel, aka there's nothing there, then
          // it does not contrast with the background
          return false;
        }
        const p = [...pixelColor.rgba];
        const background = [...this.backgroundColor.rgba];
        const qr = [...this.qrColor.rgba];
        const distanceToBackground = this.distance(p, background);
        const distanceToQr = this.distance(p, qr);
        return distanceToBackground / distanceToQr > 0.1;
      } else if (this.strategy === "contrast") {
        if (pixel[3] === 0) {
          // If this is a fully transparent pixel, aka there's nothing there, then
          // it does not contrast with the background
          return false;
        }
        const qrContrast = pixelColor.contrast(this.qrColor);
        const backgroundContrast = pixelColor.contrast(this.backgroundColor);
        return backgroundContrast.ratio / qrContrast.ratio > 0.4;
      }
      throw new Error("Need to choose comparison strategy");
    },
    isCovered(context: SceneContext): boolean {
      const rect = (this.$refs.rect as KonvaVue).getNode();
      const corners = [
        { x: 0, y: 0 },
        { x: 0, y: rect.height() },
        { x: rect.width(), y: 0 },
        { x: rect.width(), y: rect.height() },
      ];
      const transform = rect.getAbsoluteTransform();

      // We're going to say we need 3 of the 4 corners
      // to count it as covered
      const reduction = corners.reduce((prev, current, index) => {
        const adjustedPosition = transform.point(current);
        const imageData = context.getImageData(
          adjustedPosition.x,
          adjustedPosition.y,
          1,
          1
        );
        // if (index === 0 && imageData.data[3] !== 0) {
        //   this.contrasts2(imageData.data);
        // }
        return prev + (this.contrasts2(imageData.data) ? 1 : 0);
      }, 0);
      this.covered = reduction > 3;
      return this.covered;
    },
  },
});
</script>

<style>
</style>
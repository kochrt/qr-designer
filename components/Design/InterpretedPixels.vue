<template>
  <v-layer>
    <template v-for="(pixel, index) in interpretedPixels">
      <v-rect
        v-if="pixel"
        :key="index"
        :config="interpretedPixelConfigForIndex(index)"
      />
    </template>
  </v-layer>
</template>

<script>
export default {
  props: ["interpretedPixels", "qrSize", "pixelsPerBlock"],
  methods: {
    interpretedPixelConfigForIndex(index) {
      const y = Math.floor(index / this.qrSize) * this.pixelsPerBlock;
      const x = (index % this.qrSize) * this.pixelsPerBlock;
      return {
        name: "_interpretedPixel",
        x,
        y,
        width: this.pixelsPerBlock,
        height: this.pixelsPerBlock,
        fill: !!this.interpretedPixels[index] ? "blue" : "white",
      };
    },
  },
};
</script>

<style>
</style>
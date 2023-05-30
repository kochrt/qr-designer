<template>
  <v-group>
    <v-line
      v-for="i in qrSize - 20"
      :key="'horizonal' + i"
      :config="{
        points: [
          qrOffset.x,
          i * pixelsPerBlock + 10 * pixelsPerBlock + qrOffset.y,
          qrOffset.x + baseWidth,
          i * pixelsPerBlock + 10 * pixelsPerBlock + qrOffset.y,
        ],
        stroke: 'gray',
        strokeWidth: 1,
        dash: [1, 2],
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
          baseWidth - 10 * pixelsPerBlock + qrOffset.y,
        ],
        stroke: 'gray',
        strokeWidth: 1,
        dash: [1, 2],
      }"
    />
  </v-group>
</template>

<script>
export default {
  props: ["pixelsPerBlock", "baseWidth", "qrSize", "qrOffset"],
};
</script>

<style>
</style>
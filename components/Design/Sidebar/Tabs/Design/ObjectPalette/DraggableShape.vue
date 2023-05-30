<template>
  <div
    class="p-1 m-1 border border-gray-300 border-dashed cursor-move"
    draggable="true"
    @dragstart="dragStart"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["config"],
  methods: {
    dragStart(dragEvent: DragEvent) {
      this.$store.commit("designMeta/setDraggingItem", {
        type: "shape",
        data: this.config,
        offsetX: dragEvent.offsetX,
        offsetY: dragEvent.offsetY,
      });
    },
  },
});
</script>

<style>
</style>
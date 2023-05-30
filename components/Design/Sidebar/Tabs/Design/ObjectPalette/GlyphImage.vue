<template>
  <div>
    <div
      class="relative"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div
        class="
          absolute
          top-0
          left-0
          right-0
          bottom-0
          bg-purple-100
          transition
          pointer-events-none
        "
        :class="{ 'opacity-50': selected, 'opacity-0': !selected }"
      ></div>
      <input
        v-show="glyph.fullPath && (hovering || selected)"
        type="checkbox"
        v-model="selected"
        class="top-2 right-2 rounded text-purple-600 absolute cursor-pointer p-2"
        :class="{ 'opacity-75': !selected }"
      />
      <img
        loading="lazy"
        @dragstart="dragStart"
        draggable="true"
        class="mb-1 cursor-move border border-gray-300 border-dashed"
        :src="`/design/glyph/${glyph.fullPath}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import VLazyImage from "v-lazy-image";
import Vue from "vue";
import { DraggingItem } from "~/store/types";

export default Vue.extend({
  components: { VLazyImage },
  props: ["glyph"],
  data() {
    return {
      hovering: false,
      selected: false,
    };
  },
  watch: {
    selected(val, oldVal) {
      if (val) {
        this.$emit("selected", this.glyph.fullPath);
      } else {
        this.$emit("deselected", this.glyph.fullPath);
      }
    },
  },
  methods: {
    dragStart(event: DragEvent) {
      if (this.glyph.fullPath) {
        this.$store.commit(
          "designMeta/setDraggingItem",
          this.draggingItemFromEvent(event)
        );
      }
    },
    draggingItemFromEvent(event: DragEvent): DraggingItem {
      const imgElement = event.target! as HTMLImageElement;
      return {
        type: "image",
        data: {
          url: imgElement.src,
          width: imgElement.width,
          height: imgElement.height,
        },
        offsetX: event.offsetX,
        offsetY: event.offsetY,
      };
    },
  },
});
</script>

<style>
</style>
<template>
  <accordian-panel
    type="design"
    :title="`Text box`"
    :defaultCollapsed="true"
    @check-shadow="$emit('check-shadow')"
  >
    <template #headerIcon>
      <svg
        class="h-4 w-4 mr-2"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M5 4v3h5.5v12h3V7H19V4z"></path>
      </svg>
    </template>
    <div class="my-2">
      <div class="flex flex-row">
        <div
          class="mx-1 cursor-move border border-gray-300 border-dashed"
          style="font-size: 48px"
          draggable="true"
          @dragstart="dragText"
        >
          Text
        </div>
      </div>
      <div class="mt-2">
        <div class="flex flex-row">
          <div
            class="mx-1 cursor-move border border-gray-300 border-dashed"
            style="font-size: 48px; font-family: 'Block Rounded 2'"
            draggable="true"
            @dragstart="dragBlockText"
          >
            QR Block text
          </div>
        </div>
        <!-- <div
            class="
              ml-2
              mb-2
              text-gray-400 text-sm
              font-medium
              p-2
              rounded
              bg-gray-100
            "
          >
            <h5>QR Block text is custom designed to fit in the QR pattern</h5>
          </div> -->
      </div>
    </div>
  </accordian-panel>
</template>

<script lang="ts">
import Vue from "vue";
import { DraggingItem } from "~/store/types";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";

export default Vue.extend({
  components: { AccordianPanel },
  methods: {
    dragText(event: DragEvent) {
      this.$store.commit("designMeta/setDraggingItem", {
        type: "text",
        offsetX: event.offsetX,
        offsetY: event.offsetY,
      } as DraggingItem);
    },
    dragBlockText(event: DragEvent) {
      this.$store.commit("designMeta/setDraggingItem", {
        type: "blockText",
        offsetX: event.offsetX,
        offsetY: event.offsetY,
      } as DraggingItem);
    },
  }
});
</script>

<style>
</style>
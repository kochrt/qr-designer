<template>
  <div class="mb-6">
    <div class="py-1 px-2">
      <div class="flex flex-row items-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <h4 class="text-sm">Object palette</h4>
        <div class="flex">
          <h6 class="text-xs ml-2 border border-gray-300 border-dashed px-1">
            Drag objects onto canvas
          </h6>
        </div>
      </div>
    </div>
    <div>
      <shapes @check-shadow="$emit('check-shadow')" />
      <text-boxes @check-shadow="$emit('check-shadow')" />
      <accordian-panel
        type="design"
        :title="`Images (images work now)`"
        :defaultCollapsed="true"
        @check-shadow="$emit('check-shadow')"
      >
        <template #headerIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </template>
        <design-images />
      </accordian-panel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";
import DesignImages from "./DesignImages.vue";
import Shapes from "./Shapes.vue";
import TextBoxes from "./TextBoxes.vue";

export default Vue.extend({
  components: {
    AccordianPanel,
    DesignImages,
    TextBoxes,
    Shapes,
  },
});
</script>

<style>
</style>
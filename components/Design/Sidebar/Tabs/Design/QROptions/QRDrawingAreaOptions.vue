<template>
  <accordian-panel :title="`Drawing area`" :defaultCollapsed="true" @check-shadow="$emit('check-shadow')" type="design">
    <template #headerIcon>
      <svg
        class="w-4 h-4 mr-2"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
        ></path>
      </svg>
    </template>
    <div class="p-1 flex flex-col ml-1">
      <div class="flex flex-row items-start leading-tight pb-1 mt-px">
        <div class="flex items-center">
          <input
            id="showGrid"
            type="checkbox"
            :checked="$store.state.designMeta.qr.showGrid"
            @change="showGridChanged"
            class="mr-1 rounded text-purple-600"
          />
        </div>
        <label
          for="showGrid"
          class="text-gray-500 cursor-pointer ml-1 flex flex-row"
          ><svg
            class="w-4 h-4 mr-1"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M22 7V5h-3V2h-2v3h-4V2h-2v3H7V2H5v3H2v2h3v4H2v2h3v4H2v2h3v3h2v-3h4v3h2v-3h4v3h2v-3h3v-2h-3v-4h3v-2h-3V7h3zM7 7h4v4H7V7zm0 10v-4h4v4H7zm10 0h-4v-4h4v4zm0-6h-4V7h4v4z"
            ></path></svg
          >Show grid</label
        >
      </div>
      <div class="flex flex-row items-start leading-tight pb-1 mt-px">
        <div class="flex items-center">
          &#8203;
          <input
            id="showInterpretedPixels"
            type="checkbox"
            :checked="$store.state.designMeta.qr.showInterpretedPixels"
            @change="showInterpretedPixelsChanged"
            class="mr-1 rounded text-purple-600"
          />
        </div>
        <label
          for="showInterpretedPixels"
          class="text-gray-500 cursor-pointer ml-1 flex flex-row"
          ><svg
            class="w-4 h-4 mr-1"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"
            ></path></svg
          >Show interpreted pixels</label
        >
      </div>
    </div>
  </accordian-panel>
</template>

<script lang="ts">
import Vue from "vue";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";

export default Vue.extend({
  components: { AccordianPanel },
  methods: {
    showGridChanged(event: InputEvent) {
      this.$store.commit("designMeta/setShowGrid", (event.target as any).checked);
    },
    showInterpretedPixelsChanged(event: InputEvent) {
      this.$store.commit(
        "designMeta/setShowInterpretedPixels",
        (event.target as any).checked
      );
    },
  },
});
</script>

<style>
</style>
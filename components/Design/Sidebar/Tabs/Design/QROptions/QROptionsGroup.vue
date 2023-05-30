<template>
  <div class="flex flex-col mb-6">
    <div class="px-2 flex flex-row items-center text-gray-500">
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
          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
        />
      </svg>
      <h4 class="text-sm">QR code</h4>
    </div>
    <!-- <swink-type @check-shadow="$emit('check-shadow')" /> -->
    <accordian-panel
      :title="`Pattern`"
      :defaultCollapsed="true"
      @check-shadow="$emit('check-shadow')"
      type="design"
    >
      <template #headerIcon>
        <div
          class="rounded-full h-4 w-4 mr-2 border"
          :style="{ 'background-color': $store.state.design.qr.dots.fill }"
        ></div>
      </template>
      <QRPatternSelector @check-shadow="$emit('check-shadow')" />
      <div class="p-1 flex flex-row items-center">
        <chrome
          :value="qrColor"
          @input="$store.commit('design/setDotFill', $event)"
        />
      </div>
    </accordian-panel>
    <QRDrawingAreaOptions @check-shadow="$emit('check-shadow')" />
    <QRPositionOptions @check-shadow="$emit('check-shadow')" />
  </div>
</template>

<script lang="ts">
//@ts-ignore
import ResizeObserver from "vue-resize/src/components/ResizeObserver.vue";
import "vue-resize/dist/vue-resize.css";
import Vue from "vue";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";
import { Chrome } from "vue-color";
import QRDrawingAreaOptions from "./QRDrawingAreaOptions.vue";
import QRPatternSelector from "./QRPatternSelector.vue";
import QRPositionOptions from "./QRPositionOptions.vue";
import SwinkType from "~/components/Design/Sidebar/Swink/SwinkType.vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: {
    ResizeObserver,
    AccordianPanel,
    Chrome,
    QRDrawingAreaOptions,
    QRPositionOptions,
    QRPatternSelector,
    SwinkType,
  },
  data() {
    return {
      qrColor: "#000000",
    };
  },
  computed: mapState({
    swinkId: (state: any) => state.swink.swink.metadata.id,
  }),
});
</script>

<style>
.vc-chrome {
  box-shadow: none !important;
  @apply bg-gray-50 !important;
}
.vc-chrome-body {
  @apply bg-gray-50 !important;
}
</style>
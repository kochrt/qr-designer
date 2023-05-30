<template>
  <div class="-mx-px mt-px">
    <div class="flex flex-row items-start">
      <div class="flex flex-row mr-1">
        <button
          @click="$emit('rotate-right')"
          class="
            border border-transparent
            p-px
            text-gray-800
            hover:text-gray-900 hover:bg-gray-200
            transition
          "
          title="Rotate right"
        >
          <svg
            class="h-5 w-5"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
          >
            <path
              d="M15.55 5.55 11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42 1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"
            ></path>
          </svg>
        </button>
        <button
          @click="$emit('rotate-left')"
          class="
            border border-transparent
            p-px
            text-gray-800
            hover:text-gray-900 hover:bg-gray-200
            transition
          "
          title="Rotate left"
        >
          <svg
            class="h-5 w-5"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
          >
            <path
              d="M7.11 8.53 5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"
            ></path>
          </svg>
        </button>
      </div>
      <stage-toggles />
      <input
        disabled
        type="number"
        class="
          percentInput
          p-1
          text-xs
          font-mono
          text-gray-500
          ml-2
          border-none
          bg-transparent
          transition
          hover:text-gray-600
          focus:text-gray-600
          appearance-none
        "
        min="15"
        max="105"
        :value="Math.round(value.x * 100)"
      />
      <!-- <div class=" ml-2 w-3 h-3 rounded-full bg-green-300 border animate animate-ping"></div> -->
      <div class="ml-auto flex flex-row items-center">
        <div class="mr-2">
          <button
            class="
              hover:bg-indigo-200
              transition
              text-indigo-600
              hover:text-indigo-700
              py-1
              px-2
              flex flex-row
              items-center
            "
            @click="$emit('test')"
          >
            <svg
              class="w-4 h-4 mr-2"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z"></path></svg
            >Run scannability test
          </button>
        </div>
        <download-image @download="$emit('download')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StageToggles from "./StageToggles.vue";
import CopyImageLink from "./CopyImageLink.vue";
import DownloadImage from "./DownloadImage.vue";
import PreviewSwinkButton from "../PreviewSwinkButton.vue";

export default Vue.extend({
  components: {
    StageToggles,
    CopyImageLink,
    DownloadImage,
    PreviewSwinkButton,
  },
  props: ["stage", "value"],
});
</script>

<style>
</style>
<template>
  <button
    class="
      transition
      py-1
      px-2
      flex flex-row
      items-center
      text-purple-800
      bg-purple-50
      border border-purple-800
      hover:bg-purple-800 hover:text-white
    "
    @click="download"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 mr-1 md:hidden"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 md:mr-1"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
    <span class="hidden md:block">Download</span>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["stage"],
  methods: {
    download() {
      this.$emit('download')
    },
  },
});
</script>

<style>
</style>
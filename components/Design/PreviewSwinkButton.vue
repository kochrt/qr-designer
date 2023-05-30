<template>
  <a
    v-if="$store.state.swink.swink.metadata.id"
    target="_blank"
    :href="`/${$store.state.swink.swink.metadata.id}`"
    class="
      transition
      py-1
      px-2
      flex flex-row
      items-center
      text-indigo-800
      bg-indigo-50
      border border-indigo-800
      hover:bg-indigo-800 hover:text-white
    "
    style="font-size: smaller"
  >
    Preview Swink<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="h-3 w-3 transform -rotate-45 ml-1"
    >
      <path
        fill-rule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clip-rule="evenodd"
      ></path></svg
  ></a>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style>
</style>
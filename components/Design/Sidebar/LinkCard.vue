<template>
  <a
    class="
      p-3
      rounded-lg
      text-sm
      flex-shrink-0
      bg-white
      text-gray-600
      hover:text-gray-100
      hover:bg-purple-700
      hover:border-purple-900
      border border-purple-100
      transition
      duration-300
      mr-2
      shadow-sm
      font-medium
      hover:shadow
      cursor-pointer
      flex flex-row
      items-center
    "
    style="font-family: Poppins"
    :href="link"
    ><div v-html="icon"></div>
    <span>{{ title }}</span>
  </a>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["title", "link", "icon"],
});
</script>

<style>
</style>
<template>
  <div
    class="
      px-3
      py-1
      text-white
      bg-purple-800
      border-l border-purple-600
      text-sm
    "
    role="button"
    tabindex="1"
    style="font-family: Poppins"
    @click="emit('select', name)"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["name"]
});
</script>

<style>
</style>
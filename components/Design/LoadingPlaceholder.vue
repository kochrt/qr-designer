<template>
  <div class="m-auto" style="max-width: 1200px">
    <div class="w-full px-4 md:px-8 flex flex-col md:flex-row">
      <!-- sidebar -->
      <div
        class="
          order-2
          md:order-1 md:mr-4
          flex flex-col
          md:-ml-2
          overflow-y-auto
          flex-grow
        "
      ></div>
      <div class="order-1 md:order-2">
        <div
          class="border -m-px relative loadingShimmer"
          style="height: 688px; width: 688px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style>
.loadingShimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(to right, #ffffff 4%, #f6f7f8 25%, #ffffff 36%);
  background-size: 1000px 100%;
}
</style>
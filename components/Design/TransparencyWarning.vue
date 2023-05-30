<template>
  <div
    class="
      font-bold
      absolute
      bottom-0
      left-0
      right-0
      flex
      text-sm
      items-center
      justify-center
    "
  >
    <h3
      class="
        px-8
        py-2
        text-red-800
        bg-red-100
        opacity-40
        flex flex-row
        items-center
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 mr-6 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span
        >Determining a QR code's interpreted pixels can be less accurate on a
        transparent background. Be sure to test for scannability.
        <br /><br />Dismiss this message by setting the background to a fully
        opaque color then back to transparent.</span
      >
    </h3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style>
</style>
<template>
  <div
    class="relative w-20 h-20 flex items-center justify-center"
    :class="{
      'text-green-700': passed,
      'text-gray-700': !passed,
    }"
  >
    <img :src="result.imageData" class="w-16 h-16" />
    <div
      role="button"
      @click="open(result.imageData)"
      class="
        flex flex-row
        items-center
        justify-center
        absolute
        top-0
        left-0
        right-0
        bottom-0
        bg-opacity-50
        transition
        hover:bg-opacity-0
        cursor-pointer
        group
      "
      :class="{
        'bg-gray-200': !passed,
        'bg-green-100': passed,
      }"
    >
      <svg
        v-if="passed"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 group-hover:opacity-0 transition"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 group-hover:opacity-0 transition"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["result"],
  computed: {
    passed(): boolean {
      return this.result.result === "passed";
    },
  },
  methods: {
    open(imageData: string) {
      this.showDocument(
        imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""),
        "image/jpeg"
      );
    },
    base64ToArrayBuffer(_base64Str: string) {
      var binaryString = window.atob(_base64Str);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes;
    },
    showDocument(_base64Str: string, _contentType: string) {
      var byte = this.base64ToArrayBuffer(_base64Str);
      var blob = new Blob([byte], { type: _contentType });
      window.open(URL.createObjectURL(blob), "_blank");
    },
  },
});
</script>

<style>
</style>
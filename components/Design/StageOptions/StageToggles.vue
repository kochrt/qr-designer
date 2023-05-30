<template>
  <div class="flex flex-row">
    <highlighted-toggle
      :value="showGrid"
      @input="toggleShowGrid"
      title="Show grid"
    >
      <svg
        class="w-4 h-4"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M22 7V5h-3V2h-2v3h-4V2h-2v3H7V2H5v3H2v2h3v4H2v2h3v4H2v2h3v3h2v-3h4v3h2v-3h4v3h2v-3h3v-2h-3v-4h3v-2h-3V7h3zM7 7h4v4H7V7zm0 10v-4h4v4H7zm10 0h-4v-4h4v4zm0-6h-4V7h4v4z"
        ></path></svg
    ></highlighted-toggle>
    <highlighted-toggle
      title="Show interpreted pixels"
      :value="showInterpretedPixels"
      @input="toggleShowInterpretedPixels"
    >
      <svg
        class="w-4 h-4"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"
        ></path></svg
    ></highlighted-toggle>
    <!-- <highlighted-toggle
        title="Snap objects to grid"
        :value="snapToGrid"
        @input="toggleSnapToGrid"
        ><svg
          class="w-4 h-4"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M22 11V9h-7V2h-2v7h-2V2H9v7H2v2h7v2H2v2h7v7h2v-7h2v7h2v-7h7v-2h-7v-2h7zm-9 2h-2v-2h2v2z"
          ></path></svg
      ></highlighted-toggle> -->
    <highlighted-toggle
      title="Snap objects to each other"
      :value="snapToEachOther"
      @input="toggleSnapToEachOther"
      ><svg
        class="w-4 h-4"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M22 11h-5V6h-3v5h-4V3H7v8H1.84v2H7v8h3v-8h4v5h3v-5h5z"
        ></path></svg
    ></highlighted-toggle>
    <highlighted-toggle
      title="Lock QR code position"
      :value="lockQr"
      @input="toggleLockQr"
      ><svg
        class="w-4 h-4"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
        ></path></svg
    ></highlighted-toggle>
  </div>
</template>


<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";
import HighlightedToggle from "./HighlightedToggle.vue";
export default Vue.extend({
  components: { HighlightedToggle },
  computed: mapState({
    showInterpretedPixels: (state: any) => state.designMeta.qr.showInterpretedPixels,
    showGrid: (state: any) => state.designMeta.qr.showGrid,
    snapToEachOther: (state: any) => state.designMeta.stage.snapToEachOther,
    snapToGrid: (state: any) => state.designMeta.stage.snapToGridOnMove,
    lockQr: (state: any) => state.designMeta.qr.lockQr,
    classForGrid() {
      return this.showGrid ? "bg-indigo-100 border-indigo-500" : "";
    },
  }),
  methods: {
    toggleLockQr() {
      this.$store.commit("designMeta/toggleLockQr");
    },
    toggleShowGrid() {
      this.$store.commit("designMeta/toggleShowGrid");
    },
    toggleSnapToGrid() {
      this.$store.commit("designMeta/toggleSnapToGridOnMove");
    },
    toggleShowInterpretedPixels() {
      this.$store.commit("designMeta/toggleShowInterpretedPixels");
    },
    toggleSnapToEachOther() {
      this.$store.commit("designMeta/toggleSnapToEachOther");
    },
  },
});
</script>

<style>
</style>
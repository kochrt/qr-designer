<template>
  <div class="px-4 md:px-8 w-full">
    <div
      class="
        rounded
        p-3
        border
        mb-6
        items-center
        flex flex-row
        bg-red-50
        border-red-300
        text-red-700
      "
    >
      <svg
        class="w-5 h-5 mr-2"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
        ></path></svg
      >Something went wrong 😬 Try again later.
      <button
        class="ml-auto hover:bg-red-200 rounded transition p-1"
        @click="clearError"
      >
        <svg
          class="h-5 w-5"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
        >
          <path
            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    clearError() {
      this.$store.commit("swink/clearError")
    }
  }
});
</script>

<style>
</style>
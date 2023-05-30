<template>
  <div class="px-4 md:px-8 w-full">
    <div
      class="
        rounded
        px-3
        py-2
        border
        mb-6
        bg-purple-50
        border-purple-300
        text-purple-700 text-sm
      "
    >
      <div class="items-center flex flex-row">
        <svg
          class="w-5 h-5 mr-2"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
        >
          <path
            d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0 2c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm-1-10v4h2v-4h3l-4-4-4 4h3z"
          ></path></svg
        ><span>You need to upgrade your account to create more swinks!</span
        ><span
          class="ml-2 underline flex items-center"
          role="button"
          @click="collapsed = !collapsed"
          >Expand account options
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transition transform"
            :class="collapsed ? 'rotate-90' : 'rotate-180'"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clip-rule="evenodd"
            /></svg
        ></span>
        <button
          class="
            ml-auto
            hover:bg-red-200 hover:text-red-700
            rounded
            transition
            p-1
          "
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
      <transition-expand>
        <div v-if="!collapsed">
          <!-- Doing these h-1's instead of padding cuz it makes the transition look better -->
          <div class="h-1"></div>
          <div class="">
            <features-and-pricing />
          </div>
          <div class="h-1"></div>
        </div>
      </transition-expand>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import FeaturesAndPricing from "../Home/FeaturesAndPricing.vue";
import TransitionExpand from "../TransitionExpand.vue";

export default Vue.extend({
  components: { TransitionExpand },
  data() {
    return {
      collapsed: true
    };
  },
  methods: {
    clearError() {
      this.$store.commit("swink/clearError");
    }
  }
});
</script>

<style></style>

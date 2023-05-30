<template>
  <div>
    <div
      v-if="type !== 'link'"
      class="px-4 py-2 text-sm text-indigo-500 rounded bg-indigo-50"
    >
      <div class="mb-4">
        <div class="flex items-center justify-center my-1">
          <svg
            class="w-5 h-5"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
          >
            <path
              d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
            ></path>
          </svg>
        </div>
        <p>
          You currently have a Data Swink, which has images, text, and apps.
        </p>
        <br />
        <p>
          If you want your QR code to go to a website, change your swink type to
          Link Swink.
        </p>
      </div>
      <div
        class="
          flex flex-row
          items-center
          leading-tight
          py-1
          px-2
          mb-2 mb-2
          bg-indigo-500
          hover:bg-indigo-600 hover:shadow
          shadow-sm
          transition
          rounded
          text-gray-50
        "
      >
        <div class="flex items-center mr-1">
          &#8203;
          <input
            type="radio"
            class="mr-2 rounded text-indigo-600 hidden"
            id="linkSwink"
            value="link"
            v-model="type"
          /><label
            for="linkSwink"
            class="
              cursor-pointer
              rounded
              p-px
              border
              bg-white
              text-gray-900
              border-gray-800
            "
            ><svg
              class="w-4 h-4"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="currentColor"
            >
              <path
                d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
              ></path></svg
          ></label>
        </div>
        <div>
          <label
            for="linkSwink"
            class="cursor-pointer ml-1 flex flex-row font-bold underline"
            >Change to Link Swink</label
          >
          <label
            for="linkSwink"
            class="cursor-pointer ml-1 flex flex-row text-sm"
            >A Link Swink goes to a website.</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    type: {
      get() {
        return this.$store.state.swink.swink.tag.redirect ? "link" : "data";
      },
      set(value) {
        this.$store.dispatch("swink/setIsRedirect", value === "link");
      },
    },
  },
});
</script>

<style>
</style>
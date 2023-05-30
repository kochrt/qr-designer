<template>
  <accordian-panel
    :title="`Text and Images`"
    :defaultCollapsed="true"
    type="swink"
  >
    <template #headerIcon>
      <div
        class="rounded p-px mr-1"
        :class="type === 'data' ? 'bg-indigo-600 text-white' : 'text-gray-400'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="w-px"></div>
      <div class="w-px"></div>
    </template>
    <div
      v-if="type !== 'data'"
      class="px-8 py-2 mb-2 bg-gray-50 text-sm text-indigo-500 rounded"
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
            <path d="M7 2v11h3v9l7-12h-4l4-8z"></path>
          </svg>
        </div>
        <p>You currently have a Link Swink, which goes to a website.</p>
        <br />
        <p>
          If you want your QR code to have images, text, and apps, change your
          swink type to Data Swink.
        </p>
      </div>
      <div
        class="
          flex flex-row
          leading-tight
          py-1
          px-2
          mb-2
          bg-indigo-50
          hover:bg-indigo-100
          transition
          rounded
          text-gray-800
        "
      >
        <div class="flex items-center mr-1">
          &#8203;
          <input
            type="radio"
            class="mr-2 rounded text-indigo-600 hidden"
            id="dataSwink"
            value="data"
            v-model="type"
          />
          <label
            for="dataSwink"
            class="cursor-pointer rounded p-px border bg-white border-gray-800"
          >
            <svg
              class="w-4 h-4"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M7 2v11h3v9l7-12h-4l4-8z"></path></svg
          ></label>
        </div>
        <div>
          <label
            for="dataSwink"
            class="
              cursor-pointer
              ml-1
              flex flex-row
              font-bold
              underline
              text-sm
            "
            >Change to Data Swink</label
          >
          <label
            for="dataSwink"
            class="cursor-pointer ml-1 flex flex-row text-sm"
            >A Data Swink has images, text, and apps.</label
          >
        </div>
      </div>
    </div>
  </accordian-panel>
</template>

<script lang="ts">
import Vue from "vue";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";

export default Vue.extend({
  components: { AccordianPanel },
  computed: {
    type: {
      get(this: Vue) {
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
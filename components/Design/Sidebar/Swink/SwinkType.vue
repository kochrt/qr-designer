<template>
  <accordian-panel
    :title="`Type`"
    :defaultCollapsed="true"
    @check-shadow="$emit('check-shadow')"
  >
    <template #headerIcon>
      <svg
        class="w-4 h-4 mr-2"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
      >
        <path v-if="type === 'data'" d="M7 2v11h3v9l7-12h-4l4-8z"></path>
        <path
          v-else
          d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
        ></path>
      </svg>
    </template>
    <div class="">
      <div
        class="
          flex flex-row
          items-center
          leading-tight
          py-1
          px-2
          mb-2
          hover:bg-indigo-50
          transition
          rounded
        "
        :class="type === 'link' ? 'text-gray-800' : 'text-gray-600'"
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
            class="cursor-pointer rounded p-px border"
            :class="
              type === 'link'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white border-gray-800'
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
            class="cursor-pointer ml-1 flex flex-row font-bold"
            >Link</label
          >
          <label
            for="linkSwink"
            class="cursor-pointer ml-1 flex flex-row text-sm"
            >A Link Swink goes to a website.</label
          >
        </div>
      </div>
      <div
        class="
          flex flex-row
          leading-tight
          py-1
          px-2
          mb-2
          hover:bg-indigo-50
          transition
          rounded
        "
        :class="type === 'data' ? 'text-gray-800' : 'text-gray-600'"
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
            class="cursor-pointer rounded p-px border"
            :class="
              type === 'data'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white border-gray-800'
            "
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
            class="cursor-pointer ml-1 flex flex-row font-bold"
            >Data</label
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
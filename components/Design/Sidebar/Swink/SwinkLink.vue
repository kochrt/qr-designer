<template>
  <accordian-panel :title="`Link`" :defaultCollapsed="true" type="swink">
    <template #headerIcon>
      <div
        class="rounded p-px mr-1"
        :class="type === 'link' ? 'bg-indigo-600 text-white' : 'text-gray-400'"
      >
        <svg
          class="w-4 h-4"
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
      <div class="w-px"></div>
      <div class="w-px"></div>
    </template>
    <div
      v-if="type !== 'link'"
      class="px-4 mx-2 py-2 text-sm text-indigo-500 rounded"
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
            id="linkSwink"
            value="link"
            v-model="type"
          /><label
            for="linkSwink"
            class="cursor-pointer rounded p-px border bg-white border-gray-800"
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
    <div class="px-2 py-2 overflow-ellipsis overflow-hidden">
      <input
        :disabled="type !== 'link'"
        type="url"
        class="w-full border-none rounded disabled:bg-gray-200"
        placeholder="Link or search term"
        v-model="searchTerm"
      />
      <a
        v-if="url"
        :href="url"
        target="_blank"
        class="underline text-xs text-gray-400 ml-3 whitespace-nowrap"
        >{{ url }}</a
      >
    </div>
  </accordian-panel>
</template>

<script lang="ts">
import Vue from "vue";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";
import { mapState } from "vuex";
import { debounce } from "throttle-debounce";

export default Vue.extend({
  components: { AccordianPanel },
  data() {
    return {
      searchTerm: this.$store.state.swink.swink.tag.url || "",
    };
  },
  watch: {
    searchTerm: debounce(500, function (this: Vue, val) {
      this.$store.dispatch("swink/updateSearchTerm", val);
    }),
  },
  computed: {
    ...mapState({ url: (state: any) => state.swink.swink.tag.url }),
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
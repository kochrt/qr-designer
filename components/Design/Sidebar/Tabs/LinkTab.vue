<template>
  <div class="mx-px">
    <transition-expand>
      <div class="pb-2 flex flex-row justify-end" v-if="swinkId">
        <a
          target="_blank"
          :href="`/${swinkId}/stats`"
          class="
            mr-2
            transition
            flex flex-row
            items-center
            text-gray-400
            hover:text-indigo-800 hover:underline
          "
          style="font-size: smaller"
        >
          View stats<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-3 w-3 transform -rotate-45 ml-1"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path></svg
        ></a>
        <a
          target="_blank"
          :href="`/${swinkId}`"
          class="
            mr-1
            transition
            flex flex-row
            items-center
            text-gray-400
            hover:text-indigo-800 hover:underline
          "
          style="font-size: smaller"
        >
          Preview Swink<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-3 w-3 transform -rotate-45 ml-1"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path></svg
        ></a>
      </div>
    </transition-expand>
    <change-to-link-swink />
    <div
      class="mt-2 transition"
      :class="redirect ? 'hover:bg-gray-100' : 'bg-gray-200'"
    >
      <h4 class="text-sm text-gray-400 pb-px ml-2">What your swink links to</h4>
      <input
        :disabled="!redirect"
        type="url"
        class="
          w-full
          border-none
          appearance-none
          disabled:bg-gray-200
          bg-transparent
          hover:bg-white
          focus:bg-white
        "
        placeholder="Link or search term"
        style="font-family: Poppins"
        v-model="searchTerm"
      />
      <div class="overflow-hidden overflow-ellipsis">
        <a
          v-if="url"
          :href="url"
          target="_blank"
          class="underline text-xs text-gray-400 ml-3 whitespace-nowrap"
          >{{ url }}</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { debounce } from "throttle-debounce";
import ChangeToLinkSwink from "../ChangeToLinkSwink.vue";

export default Vue.extend({
  components: { ChangeToLinkSwink },
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
    ...mapState({
      url: (state: any) => state.swink.swink.tag.url,
      redirect: (state: any) => state.swink.swink.tag.redirect,
      swinkId: (state: any) => state.swink.swink.metadata.id,
    }),
  },
});
</script>

<style>
</style>
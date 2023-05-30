<template>
  <div class="mx-px">
    <div class="pt-2">
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
      <change-to-data-swink />
      <swink-images />
      <div class="hover:bg-gray-100 transition mb-2">
        <input
          type="text"
          class="
            w-full
            border-none
            disabled:bg-gray-200
            appearance-none
            hover:bg-white
            bg-transparent
            focus:bg-white
            text-lg
          "
          style="font-family: Poppins"
          placeholder="Title"
          v-model="name"
          :disabled="!isData"
        />
        <input
          type="text"
          class="
            w-full
            border-none
            appearance-none
            disabled:bg-gray-200
            bg-transparent
            hover:bg-white
            text-sm
            py-1
          "
          :disabled="!isData"
          placeholder="Link"
          style="font-family: Poppins"
          v-model="searchTerm"
        />
        <div
          class="overflow-hidden overflow-ellipsis"
          :class="!isData ? 'bg-gray-200' : ''"
        >
          <a
            v-if="url"
            :href="url"
            target="_blank"
            class="underline text-xs text-gray-400 ml-3 whitespace-nowrap"
            >{{ url }}</a
          >
        </div>
      </div>
      <div class="hover:bg-gray-100 transition">
        <textarea
          type="text"
          class="
            w-full
            border-none
            disabled:bg-gray-200
            appearance-none
            hover:bg-white
            bg-transparent
            focus:bg-white
          "
          style="font-family: Poppins"
          placeholder="Message"
          v-model="message"
          :disabled="!isData"
        />
      </div>
    </div>
    <div class="mt-4" v-if="swinkId">
      <app-picker />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ChangeToDataSwink from "../ChangeToDataSwink.vue";
import { mapState } from "vuex";
import SwinkImages from "../SwinkImages.vue";
import { debounce } from "throttle-debounce";
import AppPicker from "~/components/AppPicker.vue";
import PreviewSwinkButton from "~/components/Design/PreviewSwinkButton.vue";
import ViewStatsButton from "../../ViewStatsButton.vue";
import TransitionExpand from "~/components/TransitionExpand.vue";

export default Vue.extend({
  components: {
    ChangeToDataSwink,
    SwinkImages,
    AppPicker,
    PreviewSwinkButton,
    ViewStatsButton,
    TransitionExpand,
  },
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
      type: (state: any) => (state.swink.swink.tag.redirect ? "link" : "data"),
      url: (state: any) => state.swink.swink.tag.url,
      swinkId: (state: any) => state.swink.swink.metadata.id,
    }),
    isData(): boolean {
      return this.type === "data";
    },
    name: {
      get() {
        return this.$store.state.swink.swink.tag.name;
      },
      set: debounce(500, function (val: string) {
        // @ts-ignore
        this.$store.dispatch("swink/setName", val);
      }),
    },
    message: {
      get() {
        return this.$store.state.swink.swink.tag.message;
      },
      set: debounce(500, function (val: string) {
        // @ts-ignore
        this.$store.dispatch("swink/setMessage", val);
      }),
    },
  },
});
</script>

<style>
</style>
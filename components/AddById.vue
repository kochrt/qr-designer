<template>
  <form @submit.prevent="addById" class="flex flex-row mr-2 min-w-0">
    <input
      @focus="focused = true"
      @blur="focused = false"
      @input="editting"
      :disabled="!isData"
      v-model="id"
      type="text"
      placeholder="Add app by id..."
      class="
        min-w-0
        border-none
        text-sm
        py-1
        pl-2
        hidden
        md:block
        transition
        hover:bg-white
        focus:bg-white
        bg-transparent
        disabled:bg-gray-200
      "
    />
    <default-transition>
      <button
        class="h-full p-1 ml-1 rounded"
        :class="{ 'hover:bg-blue-100': state === 'editting' }"
        v-if="focused || state !== 'editting'"
      >
        <default-transition>
          <svg
            v-if="state === 'editting'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-4 w-4 text-blue-800"
          >
            <path
              data-v-20fc78c6=""
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <svg
            v-if="state === 'adding'"
            class="animate-spin h-4 w-4 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <svg
            v-if="state === 'added'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-if="state === 'unable'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-red-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </default-transition>
      </button>
    </default-transition>
  </form>
</template>

<script lang="ts">
import DefaultTransition from "./DefaultTransition.vue";
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: { DefaultTransition },
  data() {
    return {
      id: "",
      focused: false,
      state: "editting",
    };
  },
  computed: {
    ...mapState({
      swinkId: (state: any) => state.swink.swink.metadata.id,
      isData: (state: any) => !state.swink.swink.tag.redirect,
    }),
  },
  methods: {
    async addById() {
      if (!this.isData) {
        return;
      }
      const vm = this;
      vm.adding();
     
    },
    adding() {
      this.state = "adding";
    },
    unable() {
      this.state = "unable";
    },
    added() {
      this.state = "added";
    },
    editting() {
      if (this.state === "adding") {
        return;
      }
      this.state = "editting";
    },
  },
});
</script>

<style>
</style>
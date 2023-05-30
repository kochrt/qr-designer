<template>
  <div class="flex flex-col mb-6">
    <div class="px-2 flex flex-row items-center text-gray-500">
      <svg
        class="w-4 h-4 mr-2"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
      >
        <path
          d="M22 7V5h-3V2h-2v3h-4V2h-2v3H7V2H5v3H2v2h3v4H2v2h3v4H2v2h3v3h2v-3h4v3h2v-3h4v3h2v-3h3v-2h-3v-4h3v-2h-3V7h3zM7 7h4v4H7V7zm0 10v-4h4v4H7zm10 0h-4v-4h4v4zm0-6h-4V7h4v4z"
        ></path>
      </svg>
      <h4 class="text-sm">Canvas</h4>
    </div>
    <div>
      <accordian-panel
        type="design"
        title="Background"
        :defaultCollapsed="true"
        @check-shadow="$emit('check-shadow')"
      >
        <template #headerIcon>
          <div
            class="rounded-full h-4 w-4 mr-2 border"
            :style="{ 'background-color': $store.state.design.background.color }"
          ></div>
        </template>
        <div class="p-1 flex flex-row items-center">
          <chrome :value="backgroundColor" @input="setBackgroundColor" />
        </div>
      </accordian-panel>
      <accordian-panel
        type="design"
        :title="`Object snapping`"
        :defaultCollapsed="true"
        @check-shadow="$emit('check-shadow')"
      >
        <template #headerIcon>
          <svg
            class="h-4 w-4 mr-2"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M4 20h16v2H4zM4 2h16v2H4zm9 7h3l-4-4-4 4h3v6H8l4 4 4-4h-3z"
            ></path>
          </svg>
        </template>
        <div class="p-1 flex flex-col ml-1">
          <div class="flex flex-row items-start leading-tight pb-1 mt-px">
            <div class="flex items-center">
              &#8203;
              <input
                id="snapToEachOther"
                type="checkbox"
                :checked="snapToEachOther"
                @change="snapToEachOtherChanged"
                class="mr-1 rounded text-purple-600"
              />
            </div>
            <label
              for="snapToEachOther"
              class="text-gray-500 cursor-pointer ml-1 flex flex-row"
              ><svg
                class="w-4 h-4 mr-1"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22 11h-5V6h-3v5h-4V3H7v8H1.84v2H7v8h3v-8h4v5h3v-5h5z"
                ></path></svg
              >Snap objects to each other</label
            >
          </div>
          <!-- <div class="flex flex-row items-start leading-tight pb-1 mt-px">
            <div class="flex items-center">
              &#8203;
              <input
                id="snapToGridOnMove"
                type="checkbox"
                :checked="snapToGridOnMove"
                @change="snapToGridOnMoveChanged"
                class="mr-1 rounded text-indigo-600"
              />
            </div>
            <label
              for="snapToGridOnMove"
              class="text-gray-500 cursor-pointer ml-1 flex flex-row"
              ><svg
                class="w-4 h-4 mr-1"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22 11V9h-7V2h-2v7h-2V2H9v7H2v2h7v2H2v2h7v7h2v-7h2v7h2v-7h7v-2h-7v-2h7zm-9 2h-2v-2h2v2z"
                ></path></svg
              >Snap objects to grid</label
            >
          </div> -->
        </div>
      </accordian-panel>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";
import { Chrome } from "vue-color";

export default Vue.extend({
  components: { AccordianPanel, Chrome },
  data() {
    return {
      backgroundColor: "#ffffff",
    };
  },
  computed: mapState({
    snapToGridOnMove: (state: any) => state.designMeta.snapToGridOnMove,
    snapToEachOther: (state: any) => state.designMeta.snapToEachOther,
  }),
  methods: {
    snapToGridOnMoveChanged(event: InputEvent) {
      this.$store.commit(
        "designMeta/setSnapToGridOnMove",
        (event.target as any).checked
      );
    },
    snapToEachOtherChanged(event: InputEvent) {
      this.$store.commit(
        "designMeta/setSnapToEachOther",
        (event.target as any).checked
      );
    },
    setBackgroundColor(color: any) {
      this.$store.commit("design/setBackgroundColor", color);
    },
  },
});
</script>

<style>
</style>
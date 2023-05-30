<template>
  <div class="my-1 relative">
    <div class="flex flex-row">
      <div
        v-if="testResults"
        class="
          h-20
          min-w-20
          flex
          items-center
          justify-center
          mr-2
          cursor-pointer
        "
        style="font-family: Poppins"
        @mouseenter="hoverInfo = true"
        @mouseleave="hoverInfo = false"
      >
        <div class="p-3 rounded-full bg-gray-100 shadow-inner">
          <h3 class="text-xl text-gray-600 flex flex-row items-center">
            <span
              class="mr-2 transition"
              :class="{
                'text-gray-600': !hoverInfo,
                'text-yellow-700': hoverInfo,
              }"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            ></span>
            <strong>{{ numPassed }}</strong
            >/<strong class="">{{ testResults.length }}</strong>
          </h3>
        </div>
      </div>
      <test-stage
        v-for="testConfig in testConfigs"
        :key="testConfig.id"
        :testConfig="testConfig"
        :stageConfig="stageConfig"
      />
    </div>
    <default-transition>
      <div
        v-show="hoverInfo"
        class="
          absolute
          p-2
          bg-yellow-100
          text-yellow-700 text-sm
          flex flex-row
          items-center
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-2 mt-px flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          /></svg
        ><span
          >Trust your phone's camera over this testing tool.<br />Tests may not
          pass even if the QR code is valid and
          <strong>your phone's scanner is better.</strong></span
        >
      </div>
    </default-transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";
import { mapState } from "vuex";
//@ts-ignore
import { TestResult } from "~/store/designMeta";
import TestStage from "./TestStage.vue";
import DefaultTransition from "../DefaultTransition.vue";

const stageConfig = {
  height: 600,
  width: 600,
};

export default Vue.extend({
  components: { AccordianPanel, TestStage, DefaultTransition },
  data() {
    return {
      hoverInfo: false,
      stageConfig,
      testConfigs: [
        {
          x: stageConfig.width / 4,
          y: stageConfig.height / 4,
          width: stageConfig.width / 2,
          height: stageConfig.height / 2,
          skew: { x: 0, y: 0 },
          rotation: 0,
          id: "0",
        },
        {
          x: stageConfig.width / 4,
          y: stageConfig.height / 4,
          width: stageConfig.width / 2,
          height: stageConfig.height / 2,
          skew: {
            x: 0.2,
            y: 0.2,
          },
          rotation: 7,
          id: "1",
        },
        {
          x: stageConfig.width,
          y: stageConfig.height / 4,
          width: stageConfig.width / 2,
          height: stageConfig.height / 2,
          skew: { x: 0.2, y: 0.1 },
          rotation: 90,
          id: "2",
        },
      ],
    };
  },
  computed: {
    numPassed(): number {
      return this.testResults.reduce((prev, next) => {
        return prev + (next.result === "passed" ? 1 : 0);
      }, 0);
    },
    hasFailure(): boolean {
      return this.testResults?.some((result) => result.result === "failed");
    },
    ...mapState({
      testResults: (state: any) => state.designMeta.testResults as TestResult[],
    }),
  },
});
</script>

<style>
</style>
<template>
  <div v-show="testImage">
    <test-result-vue v-if="result" :result="result"> </test-result-vue>
    <div
      v-else
      class="w-20 h-20 flex items-center justify-center text-gray-500"
    >
      <svg
        class="animate-spin h-6 w-6"
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
    </div>
    <v-stage :config="stageConfig" ref="stage" class="hidden">
      <v-layer>
        <v-image __useStrictMode :config="testImageConfig"> </v-image>
      </v-layer>
    </v-stage>
  </div>
</template>

<script lang="ts">
import { Stage } from "konva/lib/Stage";
import Vue from "vue";
import { mapState } from "vuex";
import { KonvaVue } from "./Design.vue";
import * as zbar from "zbar.wasm";
import getReader from "./ScannabilityTester";
import TestResultVue from "./Sidebar/TestResult.vue";

export default Vue.extend({
  components: { TestResultVue },
  props: ["testConfig", "stageConfig"],
  data() {
    return {
      useZbar: true,
      result: null as any,
      reader: getReader(),
    };
  },
  computed: {
    ...mapState({
      testImage: (state: any) => state.designMeta.testImage,
    }),
    testImageConfig(): any {
      return {
        ...this.testConfig,
        image: this.testImage,
      };
    },
  },
  methods: {
    async runTest() {
      const vm = this;
      const stage = (vm.$refs.stage as KonvaVue).getNode() as Stage;
      const imageData = stage
        .getLayers()[0]
        .canvas.getContext()
        .getImageData(0, 0, stage.width(), stage.height());
      const stageImageData = await new Promise<string>((resolve, reject) => {
        stage.toDataURL({ callback: resolve });
      });
      // console.log("got stage image data", this.testConfig.id);
      let scanResult;
      let passedZbar = false;
      const result = {
        index: this.testConfig.id,
        imageData: stageImageData,
        result: "failed",
      };
      if (vm.useZbar) {
        const results = await zbar.scanImageData(imageData);
        passedZbar = results && !!results.length;
        result.result = passedZbar ? "passed" : "failed";
      }
      // console.log("zbar", result.result, this.testConfig.id);
      if (result.result === "failed") {
        try {
          scanResult = await this.reader.decodeFromImageUrl(stageImageData);
        } catch (e) {}
        result.result =
          scanResult && scanResult.getText() ? "passed" : "failed";
        // console.log("zxing", result.result, this.testConfig.id);
      }
      // console.log("setting result", this.testConfig.id);
      this.result = result;
      this.$store.commit("designMeta/addTestResult", result);
    },
  },
  watch: {
    testImage(val) {
      this.result = null;
      Vue.nextTick(() => this.runTest());
    },
  },
});
</script>

<style>
</style>
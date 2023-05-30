<template>
  <div class="absolute flex flex-col">
    <div
      class="
        p-1
        flex flex-col
        hover:opacity-100
        bg-gray-100
        transition
        rounded
        shadow-lg
      "
    >
      <div class="flex flex-row items-center">
        <div class="relative" v-if="canShowFill" title="Fill color">
          <div
            class="h-5 w-5 rounded cursor-pointer border border-gray-200"
            role="button"
            :style="`background-color: ${fillColor}`"
            @click="showingFillColorPicker = !showingFillColorPicker"
          ></div>
          <color-picker
            class="absolute top-8 left-0"
            v-if="showingFillColorPicker"
            :value="fillColor"
            @input="setFill"
          />
        </div>
        <div v-if="canShowStroke" class="flex ml-1 relative items-center">
          <div
            class="flex border border-gray-200 h-5 w-5 rounded items-center"
            @click="showingStrokeColorPicker = !showingStrokeColorPicker"
          >
            <div
              class="w-full"
              :style="`background-color: ${stroke}; height: ${
                1 + strokeWidth
              }px`"
            ></div>
          </div>
          <color-picker
            class="absolute top-8 left-0"
            v-if="showingStrokeColorPicker"
            :value="stroke"
            @input="setStroke"
          />
          <input
            class="
              p-1
              text-xs
              font-mono
              text-gray-500
              ml-2
              border-none
              bg-transparent
              transition
              hover:text-gray-600
              focus:text-gray-600
              appearance-none
            "
            type="number"
            min="0"
            max="16"
            :value="strokeWidth"
            @change="setStrokeWidth"
          />
        </div>
        <div class="flex items-center mx-1">
          <button
            class="transition text-gray-600 hover:text-gray-900 mr-1"
            title="Move forward"
            @click="moveForward"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="w-4 h-4"
            >
              <path
                fill="currentColor"
                d="M352 304V48a48 48 0 0 0-48-48H48A48 48 0 0 0 0 48v256a48 48 0 0 0 48 48h256a48 48 0 0 0 48-48zm112-144h-80v64h64v224H224v-64h-64v80a48 48 0 0 0 48 48h256a48 48 0 0 0 48-48V208a48 48 0 0 0-48-48z"
                class=""
              ></path>
            </svg>
          </button>
          <button
            class="transition text-gray-600 hover:text-gray-900"
            title="Move backward"
            @click="moveBackward"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="w-4 h-4"
            >
              <path
                fill="currentColor"
                d="M464,160H208a48,48,0,0,0-48,48V464a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48h0V208A48,48,0,0,0,464,160ZM448,448H224V224H448ZM352,128V48A48,48,0,0,0,304,0H48A48,48,0,0,0,0,48V304a48,48,0,0,0,48,48h80V208a80.09,80.09,0,0,1,80-80Z"
                class=""
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-row items-center">
        <div v-if="canShowFontStyle">
          <style-buttons
            @bold="styleBold"
            @italic="styleItalic"
            @underline="styleUnderline"
          />
        </div>
        <div v-if="canShowFont">
          <font-picker
            :apiKey="apiKey"
            class="ml-1"
            @change="setFont"
            @loaded="fontLoaded"
            @expanded="collapseColorPickers"
            :activeFont="activeFont"
            :collapse="collapseFontPicker"
          />
        </div>
        <div v-if="canShowText" class="ml-1">
          <input
            id="textStyleTextInput"
            type="text"
            class="border-none p-1 focus:outline-none w-full"
            v-model="text"
            @input="updateText"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Chrome } from "vue-color";
import StyleButtons from "./StyleButtons.vue";
import FontPicker from "./FontPicker.vue";
import { GETTER_SELECTED_NODES_CONFIGS, Glyph } from "~/store/types";
import { mapGetters } from "vuex";

export default Vue.extend({
  components: { "color-picker": Chrome, StyleButtons, FontPicker },
  data() {
    return {
      apiKey: `AIzaSyDPlj-MkpwSvYtVnMCpQywMqtzNOY3mKtI`,
      activeFont: "Arial",
      showingFillColorPicker: false,
      showingStrokeColorPicker: false,
      collapseFontPicker: 1,
    };
  },
  watch: {
    showingFillColorPicker(val) {
      if (val) {
        this.showingStrokeColorPicker = false;
        this.collapseFontPicker++;
      }
    },
    showingStrokeColorPicker(val) {
      if (val) {
        this.showingFillColorPicker = false;
        this.collapseFontPicker++;
      }
    },
  },
  computed: {
    selectedNodeStyleOptions(): Set<string> {
      return this.$store.getters["design/selectedNodeStyleOptions"];
    },
    selectedNodesConfigs(): Glyph[] {
      return this.$store.getters[`design/${GETTER_SELECTED_NODES_CONFIGS}`];
    },
    canShowFill(): boolean {
      return (
        this.selectedNodeStyleOptions &&
        this.selectedNodeStyleOptions.has("fill")
      );
    },
    canShowStroke(): boolean {
      return (
        this.selectedNodeStyleOptions &&
        this.selectedNodeStyleOptions.has("stroke")
      );
    },
    canShowFont(): boolean {
      return (
        this.selectedNodeStyleOptions &&
        this.selectedNodeStyleOptions.has("fontFamily")
      );
    },
    canShowFontStyle(): boolean {
      return (
        this.selectedNodeStyleOptions &&
        this.selectedNodeStyleOptions.has("fontStyle")
      );
    },
    canShowText(): boolean {
      return (
        this.selectedNodeStyleOptions &&
        this.selectedNodeStyleOptions.has("text")
      );
    },
    fillColor(): string {
      return this.getConsensusProp("fill", "black");
    },
    stroke(): string {
      return this.getConsensusProp("stroke", "black");
    },
    strokeWidth(): number {
      return this.getConsensusProp("strokeWidth", 0);
    },
    text(): string {
      return this.getConsensusProp("text", "");
    },
  },
  methods: {
    moveForward() {
      this.$store.dispatch("design/moveForward");
    },
    moveBackward() {
      this.$store.dispatch("design/moveBackward");
    },
    collapseColorPickers() {
      this.showingFillColorPicker = false;
      this.showingStrokeColorPicker = false;
    },
    getConsensusProp<T>(key: string, defaultValue: T): T {
      let val = this.selectedNodesConfigs[0].config[key] || defaultValue;
      for (let config of this.selectedNodesConfigs.map((n) => n.config)) {
        if (config[key] !== val) {
          return defaultValue;
        }
      }
      return val;
    },
    setFill(color: any) {
      this.setConfigProp("fill", color.hex8);
    },
    setStrokeWidth(event: InputEvent) {
      this.setConfigProp(
        "strokeWidth",
        parseInt((event.target! as HTMLInputElement).value)
      );
    },
    setStroke(color: any) {
      this.setConfigProp("stroke", color.hex8);
    },
    setConfigProp(key: string, value: any) {
      this.$store.dispatch("design/setConfigProps", {
        key,
        value,
      });
      this.$emit("update");
    },
    setFont(font: any) {
      this.activeFont = font.family;
    },
    fontLoaded(font: any) {
      const vm = this;
      if (font.family === vm.activeFont) {
        setTimeout(() => {
          vm.setConfigProp("fontFamily", font.family);
          vm.$emit("update");
        }, 200);
      }
    },
    styleBold() {
      this.$store.dispatch("design/styleBold");
      this.$emit("update");
    },
    styleItalic() {
      this.$store.dispatch("design/styleItalic");
      this.$emit("update");
    },
    styleUnderline() {
      this.$store.dispatch("design/styleUnderline");
      this.$emit("update");
    },
    updateText(input: InputEvent) {
      this.setConfigProp("text", (input.target! as HTMLInputElement).value);
    },
  },
});
</script>

<style lang="scss">
#font-picker {
  box-shadow: none;
  position: static;

  .dropdown-button {
    @apply h-8 bg-transparent hover:bg-gray-200 transition;
  }
}
</style>
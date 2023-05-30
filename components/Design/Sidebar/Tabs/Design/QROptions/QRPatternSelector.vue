<template>
  <div>
    <v-stage :config="configKonva" ref="stage">
      <v-layer>
        <component
          v-for="option in options"
          :key="option.name"
          :is="option.component"
          :config="configFor(option.name)"
          @mouseenter="mouseenter(option.name)"
          @mouseleave="mouseleave(option.name)"
          @click="select(option.name)"
        />
      </v-layer>
    </v-stage>
    <div class="relative">
      <resize-observer @notify="resized" :emitOnMount="true" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { square, circle, rounded, hexagon, star } from "~/components/Design/shapes";

export default Vue.extend({
  data() {
    const blockSize = 24;
    const space = 6;
    const positionForIndex = (index: number): [number, number] => {
      return [space * (index + 1) + blockSize * index, space * 1];
    };
    const options = [
      {
        component: square.component,
        name: square.name,
        config: square.configForPosition(
          positionForIndex(0),
          blockSize,
          "black"
        ),
      },
      {
        component: rounded.component,
        name: rounded.name,
        config: rounded.configForPosition(
          positionForIndex(1),
          blockSize,
          "black"
        ),
      },
      {
        component: circle.component,
        name: circle.name,
        config: circle.configForPosition(
          positionForIndex(2),
          blockSize,
          "black"
        ),
      },
      {
        component: hexagon.component,
        name: hexagon.name,
        config: hexagon.configForPosition(
          positionForIndex(3),
          blockSize,
          "black"
        ),
      },
      {
        component: star.component,
        name: star.name,
        config: star.configForPosition(positionForIndex(4), blockSize, "black"),
      },
    ];
    return {
      hovering: "",
      options,
      configKonva: {
        width: 100,
        height: 36,
      },
      hoverStrokeConfig: {
        stroke: "white",
        strokeWidth: 2,
        dash: [4, 1],
      },
      selectedConfig: {
        stroke: "white",
        strokeWidth: 3,
      },
      selected: this.$store.state.design.qr.dots.style,
    };
  },
  watch: {
    hovering(val) {
      //@ts-ignore
      this.$refs.stage.getStage().container().style.cursor = val
        ? "pointer"
        : "default";
    },
  },
  methods: {
    select(name: string) {
      this.$store.commit("design/setDotStyle", name);
    },
    configFor(name: string) {
      let config = this.options.find((option) => option.name === name)!.config;
      config.fill = "black";
      const selected = this.$store.state.design.qr.dots.style;
      if (selected === name) {
        config = { ...this.selectedConfig, ...config };
      } else if (this.hovering === name) {
        config = { ...this.hoverStrokeConfig, ...config };
      }
      return config;
    },
    mouseenter(dotStyle: string) {
      this.hovering = dotStyle;
    },
    mouseleave(dotStyle: string) {
      this.hovering = "";
    },
    classForOption(option: string) {
      let cls = "m-px rounded transition border-2 cursor-pointer";
      if (option === this.$store.state.design.qr.dot.style) {
        cls += " border-blue-400";
      } else {
        cls += " border-gray-50 hover:border-blue-300";
      }
      return cls;
    },
    resized(dimensions: any) {
      this.configKonva.width = dimensions.width;
      // this.stage.scale({
      //   x: dimensions.width / 656,
      //   y: dimensions.width / 656,
      // });
    },
  },
});
</script>

<style>
</style>
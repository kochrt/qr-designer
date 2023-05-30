<template>
  <accordian-panel
    type="design"
    :title="`Shapes`"
    :defaultCollapsed="true"
    @check-shadow="$emit('check-shadow')"
  >
    <template #headerIcon>
      <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="w-4 h-4 mr-2"
      >
        <path
          fill="currentColor"
          d="M480 288H320c-17.67 0-32 14.33-32 32v160c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V320c0-17.67-14.33-32-32-32zm-16 176H336V336h128v128zM128 256C57.31 256 0 313.31 0 384s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 208c-44.11 0-80-35.89-80-80s35.89-80 80-80 80 35.89 80 80-35.89 80-80 80zm378.98-262.86L400.07 18.29C392.95 6.1 380.47 0 368 0s-24.95 6.1-32.07 18.29L229.02 201.14c-14.26 24.38 3.56 54.86 32.07 54.86h213.82c28.51 0 46.33-30.48 32.07-54.86zM280.61 208L368 58.53 455.39 208H280.61z"
          class=""
        ></path>
      </svg>
    </template>
    <div class="py-2 flex flex-row flex-wrap">
      <draggable-shape
        v-for="shape in shapes"
        :key="shape.name"
        :config="shape.componentData"
      >
        <div :class="shape.classes"></div>
      </draggable-shape>
      <!-- <draggable-shape
        class="flex items-center"
        :config="{
          component: 'v-line',
          config: {
            points: [0, 0, 100, 0],
            fill: 'black',
            stroke: 'black',
            strokeWidth: 4,
            rotation: 45
          },
        }"
      >
        <div class="h-1 w-16 bg-black transform rotate-45"></div>
      </draggable-shape> -->
    </div>
  </accordian-panel>
</template>

<script lang="ts">
import Vue from "vue";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";
import DraggableShape from "./DraggableShape.vue";

export default Vue.extend({
  components: { AccordianPanel, DraggableShape },

  data() {
    const square = {
      name: "square",
      classes: "h-16 w-16 bg-black",
      componentData: {
        component: "v-rect",
        config: {
          width: 64,
          height: 64,
          fill: "black",
          stroke: 'black',
          strokeWidth: 0
        },
      },
    };
    const squareBorder = {
      name: "squareBorder",
      classes: "h-16 w-16 border-4 border-black",
      componentData: {
        component: "v-rect",
        config: {
          width: 64,
          height: 64,
          fill: "transparent",
          stroke: "black",
          strokeWidth: 4,
        },
      },
    };
    const roundedSquare = {
      name: "roundedSquare",
      classes: "h-16 w-16 bg-black rounded-lg",
      componentData: {
        component: "v-rect",
        config: {
          width: 64,
          height: 64,
          fill: "black",
          cornerRadius: 8,
          stroke: 'black',
          strokeWidth: 0
        },
      },
    };
    const roundedBorder = {
      name: "roundedBorder",
      classes: "h-16 w-16 border-4 border-black rounded-lg",
      componentData: {
        component: "v-rect",
        config: {
          width: 64,
          height: 64,
          cornerRadius: 8,
          stroke: "black",
          strokeWidth: 4,
        },
      },
    };
    const circle = {
      name: "circle",
      classes: "h-16 w-16 rounded-full bg-black",
      componentData: {
        component: "v-circle",
        config: {
          radius: 32,
          fill: "black",
          stroke: 'black',
          strokeWidth: 0
        },
      },
    };
    const circleBorder = {
      name: "circleBorder",
      classes: "h-16 w-16 border-4 border-black rounded-full",
      componentData: {
        component: "v-circle",
        config: {
          radius: 32,
          fill: "transparent",
          stroke: "black",
          strokeWidth: 4,
        },
      },
    };
    return {
      shapes: [
        square,
        squareBorder,
        roundedSquare,
        roundedBorder,
        circle,
        circleBorder,
      ],
    };
  },
});
</script>

<style>
</style>
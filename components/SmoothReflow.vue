// SmoothReflow.vue
<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<script>
import smoothReflow from "vue-smooth-reflow";
export default {
  name: "SmoothReflow",
  mixins: [smoothReflow],
  props: {
    tag: {
      type: String,
      default: "div",
    },
    options: Object,
  },
  mounted() {
    this.$smoothReflow({
      transition: 'height .35s cubic-bezier(0.66, 0.02, 0.27, 1.55)'
    });
  },
};
</script>
<template>
  <div
    class="max-h-full p-1 inline-block flex-shrink-0 relative"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div
      class="
        absolute
        top-0
        left-0
        right-0
        bottom-0
        bg-indigo-100
        transition
        pointer-events-none
      "
      :class="{ 'opacity-50': value, 'opacity-0': !value }"
    ></div>
    <input
      v-show="hovering || value"
      type="checkbox"
      v-model="selected"
      class="top-2 right-2 rounded text-indigo-600 absolute cursor-pointer"
      :class="{ 'opacity-75': !value }"
    />
    <div>
      <img :src="imgSrc" class="max-h-full w-auto" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["image", "value"],
  data() {
    return {
      hovering: false,
      selected: this.value,
    };
  },
  watch: {
    selected(val, oldVal) {
      this.$emit("input", val);
    },
  },
  computed: {
    imgSrc(): string {
      const swinkId = this.$store.state.swink.swink.metadata.id;
      return `${this.$config.apiPath}/v0/swink/${swinkId}/images/${this.image}?format=thumb`;
    },
  },
});
</script>

<style>
</style>
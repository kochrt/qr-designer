<template>
  <select
    id="swinkSelect"
    class="w-full mb-2"
    @change="changed"
    ref="selector"
  >
    <option selected>Attach to swink...</option>
    <option v-for="swink in swinks" :key="swink.id" :value="swink.id">
      {{ swinkName(swink) }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["value"],
  data() {
    return {
      swinks: [],
    };
  },
  methods: {
    swinkName(swink: any) {
      return `${swink.name ? swink.name : "[unnamed]"} - [${swink.id}]`;
    },
    changed(event: any) {
      this.$emit("input", (this.$refs.selector as HTMLSelectElement).value)
    },
  },
  async mounted() {
  },
});
</script>

<style>
</style>
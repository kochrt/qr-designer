<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["grants", "colorClass", "showingGrants"],
  methods: {
    onClick(e: MouseEvent) {
      this.$emit("click");
    },
    grantClass(grant: any) {
      let c = grant.icon;
      if (!grant.active) {
        c += " inactive-grant";
      }
      return c;
    },
  },
});
</script>

<template>
  <div class="flex flex-row button" v-on:click.stop.prevent="onClick">
    <div class="flex flex-row grants">
      <div
        v-if="showingGrants"
        class="arrow border-gray-100"
        :class="'arrow-' + colorClass"
      ></div>
      <i
        v-for="grant in grants"
        :key="grant.icon"
        :class="grantClass(grant)"
        class="fas px-1"
      ></i>
    </div>
    <div class="flex flex-row cogButton">
      <i class="fas fa-cog"></i>
    </div>
  </div>
</template>

<style>
.cogButton {
  padding-top: 0.35rem;
  padding-bottom: 0.35rem;

  padding-left: 0.5rem;
  padding-right: 0.5rem;

  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
}

.fa-cog {
  border-top-right-radius: 0.25rem;
}

.arrow {
  height: 0px;
  width: 0px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top-width: 8px;
  border-top-style: solid;

  position: absolute;
  top: -0.8em;
  left: calc(50% - 5px);
}

.grants {
  padding: 0.35rem;
  position: relative;
}

.inactive-grant {
  color: #b2bac1;
}

.button:hover {
  cursor: pointer;
}
</style>
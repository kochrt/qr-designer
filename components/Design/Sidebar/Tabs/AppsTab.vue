<template>
  <div class="mx-px">
    <div class="pt-2" v-if="$store.state.swink.swink.tag.redirect">
      <change-to-data-swink />
    </div>
    <div>
      <app-picker />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppPicker from "~/components/AppPicker.vue";
import ChangeToDataSwink from "../ChangeToDataSwink.vue";

export default Vue.extend({
  components: { ChangeToDataSwink, AppPicker },
});
</script>

<style>
</style>
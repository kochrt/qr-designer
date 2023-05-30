<template>
  <accordian-panel
    title="Position"
    :defaultCollapsed="true"
    @check-shadow="$emit('check-shadow')"
    type="design"
  >
    <template #headerIcon
      ><svg
        class="w-4 h-4 mr-2"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M22 11V9h-7V2h-2v7h-2V2H9v7H2v2h7v2H2v2h7v7h2v-7h2v7h2v-7h7v-2h-7v-2h7zm-9 2h-2v-2h2v2z"
        ></path></svg
    ></template>
    <div class="p-1 flex flex-col ml-1">
      <div class="flex flex-row items-start leading-tight pb-1 mt-px">
        <div class="flex items-center">
          &#8203;
          <input
            id="lockQrPosition"
            type="checkbox"
            :checked="$store.state.designMeta.qr.lockQr"
            @change="$store.commit('designMeta/toggleLockQr')"
            class="mr-1 rounded text-purple-600"
          />
        </div>
        <label
          for="lockQrPosition"
          class="text-gray-500 cursor-pointer ml-1 flex flex-row"
          ><svg
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="w-4 h-4 mr-1"
          >
            <path
              d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
            ></path></svg
          >Lock QR position</label
        >
      </div>
    </div>
  </accordian-panel>
</template>

<script lang="ts">
import Vue from "vue";
import AccordianPanel from "~/components/Design/Sidebar/AccordianPanel.vue";
export default Vue.extend({ components: { AccordianPanel } });
</script>

<style>
</style>
AccordianPanel
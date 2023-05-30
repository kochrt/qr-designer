<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["value"],
});
</script>

<template>
  <div class="md:col-span-3">
    <h3 class="text-gray-500 my-1" style="font-family: 'Poppins'">
      1. Choose type
    </h3>
    <div class="flex md:flex-col">
      <div
        :class="
          value
            ? 'bg-pink-50 border-pink-200 text-gray-800'
            : 'bg-white text-gray-500'
        "
        class="
          p-4
          mb-2
          md:w-auto
          w-1/2
          mr-1
          md:mr-0
          cursor-pointer
          border-2
          transition
          rounded
          hover:shadow-lg
        "
        v-on:click="$emit('input', true)"
      >
        <h5
          :class="value ? 'text-gray-800' : 'text-gray-600'"
          class="font-bold mb-1"
          style="font-family: 'Poppins', sans-serif"
        >
          Swink
        </h5>
        <div>
          <p
            class="text-sm"
            :class="(value ? 'text-gray-800' : 'text-gray-600') + ' m-0'"
          >
            <span><i class="fas fa-link mr-1"></i></span>Go to a website
          </p>
        </div>
      </div>
      <div
        :class="
          !value
            ? 'bg-pink-50 border-pink-200 text-gray-800'
            : 'bg-white text-gray-500'
        "
        class="
          p-4
          mb-2
          md:w-auto
          w-1/2
          ml-1
          md:ml-0
          cursor-pointer
          border-2
          transition
          rounded
          hover:shadow-lg
        "
        v-on:click="$emit('input', false)"
      >
        <h5 style="font-family: 'Poppins', sans-serif" class="font-bold mb-1">
          Data Swink
        </h5>
        <div class="row text-sm">
          <p>⚡️ Apps &amp; Images</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selector {
  border: 2px solid rgb(0 0 0 / 8%);
  background: white;
  border-radius: 0.25rem;
}
.selector:hover {
  cursor: pointer;
}
.unselected:hover {
  box-shadow: 0px 4px 12px 0px rgb(159 132 167 / 20%);
}
.fa-instagram {
  color: purple;
}
</style>

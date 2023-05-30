<template>
  <a
    class="
      flex flex-row
      p-6
      transition
      rounded-lg
      group
    "
    :href="doc.path"
  >
    <div
      class="
        flex-shrink
        w-1/2
        p-2
        group-hover:opacity-100
        opacity-10
        max-h-36
        transition
      "
      :class="{ 'order-1': isLeft, 'order-2': !isLeft }"
      v-if="doc.image"
    >
      <v-img
        class="object-cover h-full w-auto"
        :class="isLeft ? 'ml-auto' : ''"
        :src="doc.image"
        :alt="doc.description ? doc.description : ''"
      />
    </div>
    <div
      class="flex flex-col w-1/2 p-2 justify-center"
      :class="isLeft ? 'ml-auto order-2' : 'text-right items-end order-1'"
    >
      <div>
        <h3
          class="poppins text-3xl hover:underline transition font-bold mb-1"
          style="color: mediumvioletred"
        >
          {{ doc.title }}
        </h3>
      </div>
      <h6 class="text-gray-400 poppins">{{ doc.date }}</h6>
      <p v-if="doc.description" class="text-gray-600">
        {{ doc.description }}
      </p>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["index", "doc"],
  computed: {
    isLeft(): boolean {
      return this.index % 2 === 1;
    },
  },
});
</script>

<style>
</style>
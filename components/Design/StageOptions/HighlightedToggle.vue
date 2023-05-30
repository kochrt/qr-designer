<template>
  <div
    role="button"
    class="
      w-6
      h-6
      border
      hover:bg-purple-200
      hover:border-purple-600
      transition
      flex
      items-center
      content-center
      justify-center
    "
    :class="clss"
    @click="$emit('input', !value)"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["value"],
  computed: {
    clss() {
      if (this.value) {
        return "bg-purple-100 border-purple-500"
      }
      return ''
    }
  }
};
</script>

<style>
</style>
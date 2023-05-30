<template>
  <transition
    enter-active-class="transition-all transition-fastest ease-out-quad"
    leave-active-class="transition-all transition-faster ease-in-quad"
    enter-class="opacity-0 scale-70"
    enter-to-class="opacity-100 scale-100"
    leave-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-70"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "DefaultTransition"
};
</script>

<style>
</style>
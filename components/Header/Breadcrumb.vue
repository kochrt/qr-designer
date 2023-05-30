<template>
  <h4 class="breadCrumbWrapper mb-0">
    <span
      class="breadCrumbColonSpan ml-1"
      :class="{
        'text-xl': !small,
        'text-gray-900': current,
        'text-gray-400': !current,
      }"
      >{{ current ? "|" : "|" }}</span
    >
    <router-link
      :to="breadCrumb.link"
      class="breadCrumbLink font-bold hover:text-gray-900 transition"
      :class="{
        'text-xl': !small,
        'text-gray-900': current,
        'text-gray-400': !current,
      }"
      >{{ breadCrumb.name }}</router-link
    >
  </h4>
</template>

<script>
export default {
  props: ["breadCrumb", "small", "current"],
};
</script>

<style>
</style>
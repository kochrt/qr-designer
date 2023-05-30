<template>
  <div class="flex flex-row items-center">
    <img
      :src="`${$config.apiPath}/v0/swink/X7KYGO5ATZ/qr?darkColor=808080&textColor=000000&innerText=The%20Only%20Employee&margin=2`"
      alt="TheOnlyEmployee"
      style="width: 2.5rem; height: 2.5rem; border-radius: 1.25rem"
      class="mx-2"
    />
    <div class="text-gray-400">
      <p>
        <a
          :href="`mailto:rob@sw.ink`"
          class="transition hover:text-gray-700 hover:underline"
          >Rob Koch</a
        >
        |
        <a
          class="transition hover:text-gray-700 hover:underline"
          :href="`https://twitter.com/TheOnlyEmployee`"
          target="_blank"
          >@TheOnlyEmployee</a
        >
      </p>
      <p v-if="date">{{ date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["date"],
};
</script>

<style>
</style>
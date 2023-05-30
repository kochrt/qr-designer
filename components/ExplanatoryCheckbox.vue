<script>
export default {
  model: {
    prop: "checked",
    event: "change",
  },
  props: ["checked"],
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    this.id = this._uid;
  },
};
</script>

<template>
  <div
    class="
      flex
      items-center
      p-2
      alert
      mt-0
      mb-0
      w-full
      transition transition-all
      rounded
    "
    :class="
      checked
        ? 'bg-blue-100 border border-blue-200'
        : 'bg-white border border-transparent'
    "
  >
    <input
      type="checkbox"
      :checked="checked"
      :id="id"
      class="pl-2 pr-3"
      v-on:change="$emit('change', $event.target.checked)"
    />
    <label :for="id" class="cursor-pointer ml-2">
      <div class="flex items-center">
        <slot name="title"></slot>
      </div>
      <slot name="description"></slot>
    </label>
    <slot name="belowLabel"></slot>
  </div>
</template>

<style>
</style>
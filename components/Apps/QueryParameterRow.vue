<script>
export default {
  props: ["value", "disabled", "index"],
  data() {
    return {
      hover: false
    }
  }
};
</script>

<template>
  <div class="form-row" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="form-group col-md-6 flex align-items-baseline">
      <div class="mr-2 items-center justify-center flex text-light">
        <button class="btn btn-sm paramButton flex items-center justify-center py-0 px-1" :class="hover && !disabled ? 'btn-danger' : 'btn-secondary'" :disabled="disabled || !hover" v-on:click="$emit('remove')">
          <i v-if="hover && !disabled" class="far fa-trash-alt"></i>
          <small class="m-0" v-else>{{ index }}</small>
        </button>
      </div>
      <input class="form-control form-control-sm" v-on:input="$emit('input', { key: $event.target.value, value: value.value })" placeholder="Key" :disabled="disabled" :value="value.key"/>
    </div>
    <div class="form-group col-md-6">
      <input class="form-control form-control-sm" v-on:input="$emit('input', { key: value.key, value: $event.target.value })" placeholder="Example value" :disabled="disabled" :value="value.value"/>
    </div>
  </div>
</template>

<style>
.index {
  font-family: monospace;
}
.paramButton {
  width: 22px;
  height: 22px;
}
</style>
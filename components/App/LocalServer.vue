<template>
  <div class="mb-2">
    <div class="mb-1 flex items-center">
      <input type="checkbox" id="localPreview" v-model="useDevServer"/>
      <label for="localPreview" class="ml-2">Preview from dev server</label>
    </div>
    <div class="m-0">
      <input
        type="text"
        :disabled="!useDevServer"
        v-model="devServerAddress"
        placeholder="http://localhost:8000"
        class="font-mono w-full text-sm disabled:bg-gray-200"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      useDevServer: false,
      devServerAddress: ''
    }
  },
  watch: {
    useDevServer(val, oldVal) {
      if (val) {
        if (this.devServerAddress) {
          this.$emit('input', this.devServerAddress)
        }
      } else {
        this.$emit('input', '')
      }
    },
    devServerAddress(val, oldVal) {
      if (this.useDevServer) {
        this.$emit('input', val)
      }
    }
  }
};
</script>

<style>
</style>
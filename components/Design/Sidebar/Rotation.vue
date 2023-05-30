<template>
  <div class="flex flex-col">
    <h3 class="text-gray-400">Rotation</h3>
    <div class="pb-1">
      <div class="flex flex-row items-center">
        <input
          type="radio"
          name="rotation"
          id="uniform"
          value="uniform"
          @change="
            $store.commit('designMeta/setRotationStyle', $event.target.value)
          "
        />
        <label for="uniform" class="ml-1">Uniform</label>
      </div>
      <input
        :disabled="$store.state.designMeta.qr.dots.rotation.style !== 'uniform'"
        id="rotationAmount"
        type="range"
        min="0"
        max="360"
        class="w-full"
        :value="$store.state.designMeta.qr.dots.rotation.value"
        @input="
          $store.commit(
            'designMeta/setRotationValue',
            parseInt($event.target.value)
          )
        "
      />
    </div>
    <div
      class="pb-1 flex flex-row items-center"
      v-for="rotationType in ['random', 'radial', 'magnetic']"
      :key="rotationType"
    >
      <input
        type="radio"
        name="rotation"
        :id="rotationType"
        :value="rotationType"
        @change="$store.commit('designMeta/setRotationStyle', rotationType)"
      />
      <label :for="rotationType" class="ml-1">{{ rotationType }}</label>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
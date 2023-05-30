<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["value"]
});
</script>

<template>
  <div class="flex flex-row">
    <div
      :class="value ? 'selected' : 'unselected'"
      class="selector mb-2 mr-3"
      v-on:click="$emit('input', true)"
    >
      <h6
        :class="value ? 'text-dark' : 'text-secondary'"
        style="font-family: 'Poppins', sans-serif; font-weight: bold"
      >Swink</h6>
      <div>
        <p
          :class="value ? 'text-dark' : 'text-secondary'"
          class="selectorDescription"
        >
          <span><i class="fas fa-link mr-1"></i></span>Go to a website
        </p>
      </div>
    </div>
    <div
      :class="!value ? 'selected' : 'unselected'"
      class="selector mb-2"
      v-on:click="$emit('input', false)"
    >
      <h6
        :class="!value ? 'text-dark' : 'text-secondary'"
        style="font-family: 'Poppins', sans-serif; font-weight: bold"
      >Data Swink</h6>
      <div class="row">
        <p
          class="col-sm-6 col-md-12 selectorDescription"
          :class="(!value ? 'text-dark' : 'text-secondary') + ' m-0'"
        >
          🔤 &nbsp;Text
        </p>
        <p
          class="col-sm-6 col-md-12 selectorDescription"
          :class="(!value ? 'text-dark' : 'text-secondary') + ' m-0'"
        >
          🌄 &nbsp;Images
        </p>
        <p
          class="col-sm-6 col-md-12 selectorDescription"
          :class="(!value ? 'text-dark' : 'text-secondary') + ' m-0'"
        >
          📱 &nbsp;Contact info
        </p>
        <p
          class="col-sm-6 col-md-12 selectorDescription"
          :class="(!value ? 'text-dark' : 'text-secondary') + ' m-0'"
        >
          💵 &nbsp;Venmo
        </p>
        <p
          class="col-sm-6 col-md-12 selectorDescription"
          :class="(!value ? 'text-dark' : 'text-secondary') + ' m-0'"
        >
          ⚡️ Apps
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selector {
  border: 1px solid transparent;
  background: white;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
  flex: 1 1 50%;
  padding: 0.8rem;
}
.selectorDescription {
  font-size: 90%;
}
.selected {
  background-color: rgb(247 251 255);
  border-color: rgb(151 201 255);
}
.selected .h5 {
  color: rgb(214, 214, 255);
}
.selector:hover {
  cursor: pointer;
}
.unselected {
  box-shadow: 0px 3px 11px 1px #8584a72e;
}
.unselected:hover {
  box-shadow: 0px 3px 11px 5px #8584a72e;
}
.fa-instagram {
  color: purple;
}
</style>

<script>
import Header from "./Header/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      loading: true,
      examples: [],
    };
  },
  mounted() {
    const vm = this;
    const gallery = vm.$fire.functions.httpsCallable("gallery");
    gallery()
      .then((results) => {
        vm.examples = results.data.examples.map((id) => `/${id}?image=true`);
        vm.loading = false;
      })
      .catch((err) => {
        console.error("Unable to load gallery,", err);
        vm.loading = false;
      });
  },
};
</script>

<template>
  <div class="flex flex-col container">
    <Header :showLogin="true"  class="py-4 md:px-8 px-4"/>
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center"
      style="flex-grow: 1; height: 80vh"
    >
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else-if="examples.length" class="row">
      <div class="col-lg-6 col-md-12" v-for="example in examples" :key="example">
        <img :src="example">
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center"
      style="flex-grow: 1; height: 80vh"
    >
      <p class="m-2" style="font-size: larger">no examples to show 😒</p>
    </div>
  </div>
</template>

<style>
</style>
<script>
import Header from "./Header/Header.vue";
export default {
  components: { Header },
};
</script>

<template>
  <div>
    <div class="container-fluid px-2" style="max-width: 1200px">
      <Header :showLogin="true"  class="py-4 md:px-8 px-4"/>
    </div>
    <div class="container-fluid px-2 pt-5 flex flex-col items-center" style="max-width: 1200px">
      <h5 class="text-secondary">Oh no</h5>
      <p>We can't find that page.</p>
    </div>
  </div>
</template>

<style>
</style>
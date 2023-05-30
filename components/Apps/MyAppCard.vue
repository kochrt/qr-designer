<script>
export default {
  props: ["app"],
};
</script>

<template>
  <div class="card appCard p-3 mb-4 bg-white">
    <div class="flex align-items-baseline">
      <div style="overflow: hidden">
        <a :href="`/apps/${app.id}`"
          ><h6 class="appTitle text-lg">{{ app.name }}</h6></a
        >
      </div>
      <button
        class="btn btn-sm ml-auto btn-light mr-2"
        v-on:click="$router.push({ path: `/apps/${app.id}` })"
      ><i class="far fa-edit mr-1"></i>

        Edit
      </button>
      <button
        class="btn btn-sm btn-light"
        v-on:click="$emit('delete-app', app.id)"
      ><i class="far fa-trash-alt mr-1 text-danger"></i>
        Delete
      </button>
    </div>
    <small
      v-if="app.appAuthorName"
      :class="app.appAuthorName === 'qrnew' ? 'admin' : 'text-secondary'"
      >{{ app.appAuthorName }}</small
    >
    <p class="mb-0">{{ app.description }}</p>
  </div>
</template>

<style scoped>
.appCard {
  border: 1px solid transparent;
  border-radius: 0.35rem;
  box-shadow: 0px 3px 11px 1px #8584a72e;
  transition: 0.1s all ease-in-out;
}
.btn-sm {
  padding: 0.05rem 0.5rem;
}
.appTitle {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0;
}
</style>
<script>

export default {
  data() {
    return {
      profiles: [],
    };
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      const vm = this;
      vm.$fire.firestore
        .collection(`users/${vm.$fire.auth.currentUser.uid}/profiles`)
        .orderBy("updated", "desc")
        .onSnapshot((snap) => {
          snap.docChanges().forEach((change) => {
            const docData = change.doc.data();
            docData.id = change.doc.id
            if (change.type === "added") {
              vm.profiles.push(docData);
            } else {
              const index = vm.profiles.findIndex(p => p.id === docData.id) 
              if (change.type === "removed") {
                vm.profiles.splice(index, 1)
              } else if (change.type === "modified") {
                vm.profiles.splice(index, 1, docData)
              }
            }
          });
          vm.loading = false;
        });
    },
  },
};
</script>

<template>
  <div class="pt-1 pb-3 px-3">
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center h-100"
    >
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<style>
</style>
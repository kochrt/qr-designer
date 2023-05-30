<script>
import Footer from "./Footer.vue";
import Header from "./Header/Header.vue";
import MyCode from "./MyCode.vue";

export default {
  components: {
    Header,
    MyCode,
    Footer,
  },
  data: function () {
    return {
      loading: true,
      codes: [],
      deleting: false,
      breadCrumbs: [{
        name: "my swinks",
        link: "/mine"
      }]
    };
  },
  mounted() {
    this.$fire.auth.onAuthStateChanged(this.authStateChanged);
  },
  computed: {
    deleteButtonText() {
      return this.deleting ? "Deleting..." : "Delete all Swinks";
    },
  },
  methods: {
    alertDelete() {
      if (confirm("Delete all your Swinks? This cannot be undone.")) {
        this.deleteAll();
      }
    },
    async deleteAll() {
      const vm = this;
      vm.deleting = true;
    },
    authStateChanged(user) {
      if (user) {
        this.getTags(user);
      } else {
        this.$router.push({ path: "/" });
      }
    },
    expiresSoon(tag) {
      const expires = new Date(tag.expires);
      const oneWeek = new Date() - -1000 * 60 * 60 * 24 * 7;
      return tag.expires !== 0 && expires < oneWeek;
    },
    getTags(currentUser) {
      this.$fire.firestore
        .collection("tags/")
        .where("uid", "==", currentUser.uid)
        .orderBy("set", "asc")
        .onSnapshot((snap) => {
          snap.docChanges().forEach(this.addTagOrLink);
          this.loading = false;
        });
    },
    addTagOrLink(change) {
      if (change.type === "added") {
        let data = change.doc.data();
        data.id = change.doc.id;
        this.codes.unshift(data);
      } else if (change.type === "modified") {
        let data = change.doc.data();
        data.id = change.doc.id;
        let index = this.codes.findIndex((tag) => tag.id === data.id);
        if (index !== -1) {
          this.codes.splice(index, 1, data);
        }
      } else if (change.type === "removed") {
        this.codes = this.codes.filter((code) => code.id !== change.doc.id);
      }
    },
  },
};
</script>

<template>
  <div class="flex flex-col m-auto p-0" style="max-width: 1200px">
    <Header :showLogin="true" :breadCrumbs="breadCrumbs"  class="py-4 md:px-8 px-4"/>
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center"
      style="flex-grow: 1; height: 80vh"
    >
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else-if="codes.length" class="px-3 md:px-8">
      <my-code
        v-for="tag in codes"
        :key="tag.id"
        :tag="tag"
        :deleting="deleting"
      ></my-code>
      <div class="flex justify-center pb-5 pt-3">
        <button
          class="
            text-sm
            border
            p-1 rounded
            border-red-700
            text-red-700
            hover:border-red-600
            hover:text-red-600
            transition
          "
          v-on:click="alertDelete"
          :disabled="deleting"
        >
          {{ deleteButtonText }}
        </button>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center"
      style="flex-grow: 1; height: 80vh"
    >
      <p class="m-2" style="font-size: larger">You don't have any swinks.</p>
      <router-link class="btn btn-outline-primary" :to="{ path: '/create' }"
        >Make a swink</router-link
      >
    </div>
    <Footer />
  </div>
</template>

<style>
</style>
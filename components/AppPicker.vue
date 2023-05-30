<script lang="ts">
import AddById from "./AddById.vue";
import AppCard from "./AppCard.vue";
import CreateAppButton from "./Apps/CreateAppButton.vue";
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: { AppCard, CreateAppButton, AddById },
  data() {
    return {
      apps: [] as firebase.default.firestore.QueryDocumentSnapshot<firebase.default.firestore.DocumentData>[],
      ourApps: [] as string[],
      intersection: [] as string[],
      creatingApp: false,
      filter: "recommended",
    };
  },
  computed: mapState({
    swinkId: (state: any) => state.swink.swink.metadata.id,
  }),
  watch: {
    filter(val, oldVal) {
      this.queryForApps();
    },
  },
  mounted() {
    const vm = this;
    vm.queryForApps();
    vm.$fire.firestore.collection(`tags/${this.swinkId}/swinkApps`).onSnapshot(
      function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          const id = change.doc.id;
          if (change.type === "added") {
            vm.ourApps.push(id);
            vm.$emit("app-added");
          } else if (change.type === "removed") {
            let index = vm.ourApps.indexOf(id);
            if (index > -1) {
              vm.ourApps.splice(index, 1);
              vm.$emit("app-removed");
            }
          }
        });
        vm.$emit("app-ids", vm.ourApps);
        vm.checkOwnership();
      },
      function (err) {
        console.log("Can't get our apps", err);
      }
    );
  },
  methods: {
    queryForApps() {
      const vm = this;
      vm.getQueryForCurrentFilter()
        .get()
        .then(function (apps) {
          vm.apps = apps.docs;
          vm.checkOwnership();
        })
        .catch((err) => {
          console.log("Can't get published apps", err);
        });
    },
    getQueryForCurrentFilter() {
      const vm = this;
      const baseQuery = vm.$fire.firestore.collection("apps").limit(20);
      if (vm.filter === "recommended") {
        return baseQuery
          .where("author", "==", "Q2RNaJK0LqfwlHLKUeMK0rQxp653")
          .where("status", "==", "published");
      } else if (vm.filter === "mine") {
        return baseQuery.where("author", "==", vm.$fire.auth.currentUser?.uid);
      } else if (vm.filter === "all") {
        return baseQuery.where("status", "==", "published");
      }
      throw new Error("Unknown filter " + vm.filter);
    },
    checkOwnership() {
      const vm = this;
      vm.intersection = vm.apps
        .map((app) => app.id)
        .filter((appId) => vm.ourApps.indexOf(appId) !== -1);
    },
    async addRemove(id: string) {
      const vm = this;
      vm.$emit("editting");
    },
    appState(id: string) {
      const vm = this;
      return vm.intersection.indexOf(id) === -1 ? "unadded" : "added";
    },
  },
});
</script>

<template>
  <div class="mb-2">
    <div
      class="
        flex
        items-center
        appsHeader
        mb-2
        col-12
        sticky
        top-0
        border-b
        bg-gray-50
        py-2
        px-4
      "
    >
      <add-by-id />
      <div class="ml-auto flex items-center">
        <div class="text-sm">
          <div class="">
            <select
              v-model="filter"
              class="
                transition
                hover:bg-white
                focus:bg-white
                border-none
                text-sm
                py-1
                bg-transparent
                text-gray-500
              "
            >
              <option value="mine">Mine</option>
              <option value="all">All</option>
              <option value="recommended">Recommended</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div v-if="apps.length === 0" class="flex flex-col items-center">
      <h6 class="text-gray-400">No apps found</h6>
      <create-app-button class="my-4" />
    </div>
    <div v-else>
      <app-card
        v-for="app in apps"
        :key="app.id"
        :id="app.id"
        :app="app.data()"
        :state="appState(app.id)"
        v-on:add-remove="addRemove"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
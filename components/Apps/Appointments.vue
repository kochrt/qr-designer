<template>
  <div class="container-fluid px-2" style="max-width: 1200px">
    <Header :showLogin="true"  class="py-4 md:px-8 px-4"/>
    <div class="p-3 card mainCard mt-3">
      
    </div>
  </div>
</template>

<script>
import Header from "../Header/Header.vue";
import { debounce } from "throttle-debounce";
import LoadingToCheckmark from "../LoadingToCheckmark.vue";

export default {
  components: { Header, LoadingToCheckmark },
  props: {
    qrId: String,
    LoadingToCheckmark,
  },
  data() {
    return {
      status: "done",
    };
  },
  watch: {
    name(val, oldVal) {
      this.debouncedUpdateMetadata();
    },
    allowedToSeeOthers(val, oldVal) {
      this.debouncedUpdateMetadata();
    },
  },
  created() {
    this.debouncedUpdateMetadata = debounce(500, () => {
      this.updateMetadata();
    });
  },
  async mounted() {
    const vm = this;
    vm.setCurrentQr();
    vm.setCurrentApp();
    vm.startListening();
  },
  computed: {
    appId() {
      return "0brOO1QRdOtwWHNNOjBD";
    },
    tagPath() {
      return `tags/${this.qrId}`;
    },
    appPath() {
      return `${this.tagPath}/apps/${this.appId}`;
    },
    collectionPath() {
      return `${this.appPath}/appointments`;
    },
  },
  methods: {
    updateMetadata() {
      const vm = this;
      const updateDoc = {
        
      };
      vm.status = "loading";
      vm.$fire
        .firestore
        .doc(this.appPath)
        .update(updateDoc)
        .then(() => {
          vm.status = "saved";
        });
    },
    setCurrentQr() {
      const vm = this;
      // If we don't have the currentQr set or the id is different, get the current one
      if (
        !vm.$store.state.currentQr ||
        vm.$store.state.currentQr.id !== vm.qrId
      ) {
        vm.$fire
          .firestore
          .doc(vm.tagPath)
          .get()
          .then((snap) => {
            if (snap.exists) {
              const data = snap.data();
              data.id = snap.id;
              vm.$store.commit("setCurrentQr", data);
            }
          });
      }
    },
    setCurrentApp() {
      const vm = this;
      if (
        !vm.$store.state.currentApp ||
        vm.$store.state.currentApp.path !== vm.appPath
      ) {
        vm.$fire
          .firestore
          .doc(vm.appPath)
          .get()
          .then((snap) => {
            if (snap.exists) {
              const data = snap.data();
              data.id = snap.id;
              data.appPath = vm.appPath;
              vm.name = data.name || "Appointments & Reservations";
              vm.$store.commit("setCurrentApp", data);
            }
          });
      }
    },
    startListening() {
      const vm = this;
      vm.$fire
        .firestore
        .collection(vm.collectionPath)
        .orderBy("timestamp", "asc")
        .onSnapshot(function (snap) {
          snap.docChanges().forEach(function (change) {
            const doc = change.doc.data();
            doc.id = change.doc.id;
            if (change.type === "added") {
              vm.queue.push(doc);
            } else if (change.type === "removed") {
              const index = vm.queue.findIndex((d) => d.id === doc.id);
              vm.queue.splice(index, 1);
            }
          });
        });
    },
    next() {
      const vm = this;
      if (vm.queue.length === 0) {
        return;
      }
      vm.$fire
        .firestore
        .collection(vm.collectionPath)
        .doc(vm.queue[0].id)
        .delete();
    },
    served(itemId) {
      const vm = this;
      vm.$fire.firestore.collection(vm.collectionPath).doc(itemId).delete();
    },
  },
};
</script>

<style scoped>
.mainCard {
  border: none;
  border-radius: 0.35rem;
  box-shadow: 0px 3px 11px 1px #8584a72e;
}
.nameInput {
  margin-left: -0.5rem;
  border: none;
  font-size: larger;
}
</style>

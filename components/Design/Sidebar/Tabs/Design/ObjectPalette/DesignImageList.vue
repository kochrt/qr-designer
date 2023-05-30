<template>
  <div>
    <transition-expand>
      <div
        v-if="deleteList.length"
        class="flex flex-row items-center justify-center"
      >
        <button
          class="
            flex flex-row
            items-center
            px-2
            py-1
            bg-red-100
            hover:bg-red-200
            hover:text-red-800
            disabled:bg-red-100
            disabled:text-red-800
            transition
            text-red-700
            mb-2
          "
          @click="deleteSelected"
          :disabled="deleting"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1 mb-px"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          {{ deleteButtonText }}
        </button>
      </div>
    </transition-expand>
    <div class="overflow-auto flex flex-row">
      <div class="flex flex-col max-w-1/2 items-center mr-1">
        <glyph-image
          v-for="glyph in glyphListLeft"
          :key="glyph.fullPath"
          :glyph="glyph"
          @selected="selected"
          @deselected="deselected"
        />
      </div>
      <div class="flex flex-col max-w-1/2 items-center">
        <glyph-image
          v-for="glyph in glyphListRight"
          :key="glyph.fullPath"
          :glyph="glyph"
          @selected="selected"
          @deselected="deselected"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TransitionExpand from "~/components/TransitionExpand.vue";
import Vue from "vue";
import GlyphImage from "./GlyphImage.vue";

export default Vue.extend({
  components: {
    GlyphImage,
    TransitionExpand,
  },
  props: ['newestUploadId'],
  data() {
    return {
      glyphListLeft: [] as firebase.default.storage.Reference[],
      glyphListRight: [] as firebase.default.storage.Reference[],
      deleteList: [] as string[],
      deleting: false,
    };
  },
  watch: {
    newestUploadId(val: string) {
      this.refreshImages()
    }
  },
  computed: {
    deleteButtonText(): string {
      if (this.deleting) {
        return `Deleting ${this.deleteList.length} image${
          this.deleteList.length > 1 ? "s" : ""
        }...`;
      } else {
        return `Delete ${this.deleteList.length} image${
          this.deleteList.length > 1 ? "s" : ""
        }`;
      }
    },
  },
  async mounted() {
    this.refreshImages();
  },
  methods: {
    async refreshImages() {
      const uid = await this.$fire.auth.currentUser?.uid;
      if (uid) {
        const glyphs = await this.$fire.storage
          .ref(`design/glyphs/${uid}`)
          .listAll();
        this.glyphListLeft = glyphs.items.filter(
          (file, index) => index % 2 === 0
        );
        this.glyphListRight = glyphs.items.filter(
          (file, index) => index % 2 === 1
        );
      }
    },
    selected(glyphPath: string) {
      this.deleteList.push(glyphPath);
    },
    deselected(glyphPath: string) {
      this.deleteList.splice(this.deleteList.indexOf(glyphPath), 1);
    },
    async deleteSelected() {
      this.deleting = true;
      try {
        await Promise.all(
          this.deleteList.map((path) => this.$fire.storage.ref(path).delete())
        );
      } catch {}
      this.deleteList = [];
      this.deleting = false;
      this.refreshImages();
    },
  },
});
</script>

<style>
</style>
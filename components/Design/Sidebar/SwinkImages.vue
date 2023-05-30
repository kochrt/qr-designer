<template>
  <div class="swinkImages">
    <scroll-shadow
      class="transition mb-2"
      :class="{
        'hover:bg-gray-100': type === 'data',
        'bg-gray-200': type !== 'data',
      }"
    >
      <div class="flex flex-row h-40">
        <el-upload
          drag
          :disabled="type !== 'data'"
          :action="uploadUrl"
          :before-upload="getHeaders"
          :headers="headers"
          :on-success="refreshImages"
          :accept="'image/png, image/jpeg'"
          :show-file-list="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text m-2">
            <p>
              Drop image here or
              <em>click to upload.</em><br />
            </p>
          </div>
        </el-upload>
        <swink-image
          v-for="image in images"
          :image="image"
          :key="image"
          :value="selected[image]"
          @input="select(image, $event)"
        />
      </div>
    </scroll-shadow>
    <transition-expand>
      <div
        v-if="hasSelection"
        class="flex flex-row items-center justify-center"
      >
        <button
          class="
            flex flex-row
            items-center
            px-2
            py-1
            bg-red-100
            hover:bg-red-200 hover:text-red-800
            disabled:bg-red-100 disabled:text-red-800
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ScrollShadow from "~/components/ScrollShadow.vue";
import { mapState } from "vuex";
import SwinkImage from "./SwinkImage.vue";
import TransitionExpand from "~/components/TransitionExpand.vue";

export default Vue.extend({
  components: { ScrollShadow, SwinkImage, TransitionExpand },
  data() {
    return {
      headers: {},
      selected: {} as { [imageId: string]: boolean },
      deleting: false,
    };
  },
  methods: {
    select(imageId: string, selected: boolean) {
      Vue.set(this.selected, imageId, selected);
    },
    async getHeaders() {
      const token = await this.$fire.auth.currentUser!.getIdToken();
      this.headers = {
        Authorization: `Bearer ${token}`,
      };
    },
    refreshImages(result: any) {
      if (result && result.imageId) {
        this.$store.commit("swink/addImageIds", [result.imageId]);
      }
    },
    deleteSelected() {
      this.deleting = true;
      this.$store.dispatch("swink/deleteImages", this.selectedImageIds);
    },
  },
  watch: {
    images(val, oldVal) {
      this.deleting = false;
      Vue.set(this, "selected", {});
    },
  },
  computed: {
    ...mapState({
      type: (state: any) => (state.swink.swink.tag.redirect ? "link" : "data"),
      images: (state: any) => state.swink.swink.tag.images,
    }),
    uploadUrl(): string {
      const swinkId = this.$store.state.swink.swink.metadata.id;
      return `${this.$config.apiPath}/function/swink/${swinkId}/image`;
    },
    hasSelection(): boolean {
      return this.selectionCount > 0;
    },
    selectionCount(): number {
      return Object.values(this.selected).filter((v) => v).length;
    },
    selectedImageIds(): string[] {
      return Object.entries(this.selected)
        .filter(([imageId, selected]) => selected)
        .map(([imageId, selected]) => imageId);
    },
    deleteButtonText(): string {
      const count = this.selectionCount;
      if (this.deleting) {
        return `Deleting ${count} image${count > 1 ? "s" : ""}...`;
      } else {
        return `Delete ${count} image${count > 1 ? "s" : ""}`;
      }
    },
  },
});
</script>

<style lang="scss">
.swinkImages {
  .el-upload {
    display: block;
    @apply w-40 h-40;
  }
  .el-upload-dragger {
    width: 100%;
    height: 100%;
    @apply flex items-center content-center justify-center flex-col p-1 border-none bg-transparent hover:bg-white rounded-none;
  }
  .el-icon-upload {
    margin: 0;
  }
}
</style>
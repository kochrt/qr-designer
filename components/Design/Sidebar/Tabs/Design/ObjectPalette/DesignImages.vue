<template>
  <div class="flex flex-row flex-wrap mx-1 my-2 designImages">
    <el-upload
      class="w-full mb-2"
      drag
      action=""
      :headers="headers"
      :on-change="onChange"
      :accept="'image/png, image/jpeg'"
      :auto-upload="false"
      :show-file-list="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text m-2">
        <p>
          Drop file here or
          <em>click to upload.</em><br />
          <span class="text-gray-400 font-bold"
            >PNG with transparent background is best.</span
          >
        </p>
        <div class="flex flex-row items-center justify-center mt-2">
          <div class="px-2 py-1 rounded bg-gray-100 text-xs mr-2 font-mono">
            jpg/png
          </div>
          <div class="px-2 py-1 rounded bg-gray-100 text-xs mr-2 font-mono">
            &lt;5Mb
          </div>
        </div>
      </div>
    </el-upload>
    <design-image-list :imageAdded="imageAdded" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DesignImageList from "./DesignImageList.vue";

export default Vue.extend({
  components: { DesignImageList },
  data() {
    return {
      headers: {},
      imageAdded: null
    };
  },
  methods: {
    async getHeaders() {
      const token = await this.$fire.auth.currentUser!.getIdToken();
      this.headers = {
        Authorization: `Bearer ${token}`
      };
    },
    onProgress(a: any, b: any) {
      console.log(a, b);
    },
    onChange(item: any) {
      this.imageAdded = item;
    }
  },
  computed: {
    uploadUrl(): string {
      return `${this.$config.apiPath}/function/design/glyph`;
    }
  }
});
</script>

<style lang="scss">
.designImages {
  .el-upload {
    display: block;
  }
  .el-upload-dragger {
    width: 100%;
    height: auto;
  }
}
</style>

<template>
  <div>
    <link-cards />
    <glyph-panel @check-shadow="checkShadow" />
    <QROptionsGroup @check-shadow="checkShadow" @test="$emit('test')" />
    <canvas-options @check-shadow="checkShadow" />
  </div>
</template>

<script>
import ScrollShadow from "~/components/ScrollShadow.vue";
import CanvasOptions from "../../CanvasOptions.vue";
import GlyphPanel from "~/components/Design/Sidebar/Tabs/Design/ObjectPalette/GlyphPanel.vue";
import LinkCards from "../../LinkCards.vue";
import QROptionsGroup from "~/components/Design/Sidebar/Tabs/Design/QROptions/QROptionsGroup.vue";

export default {
  components: {
    GlyphPanel,
    QROptionsGroup,
    CanvasOptions,
    ScrollShadow,
    LinkCards,
  },
  methods: {
    checkShadow() {
      this.$emit("check-shadow");
    },
  },
};
</script>

<style>
</style>
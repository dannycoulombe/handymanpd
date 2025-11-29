<template>
  <v-sheet
    v-resize="onResize"
    v-bind="$attrs"
    v-on="$listeners"
    :style="style"
    color="transparent"
  >
    <slot></slot>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Sticky extends Vue {

  @Prop({
    type: Boolean,
    default: true,
  }) value!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  }) scrollable?: boolean;

  @Prop({
    type: Number,
    default: 0,
  }) offset!: number;

  @Prop({
    type: Number,
    default: 0,
  }) timeout!: number;

  loaded = false;
  stickyTop = 64;
  maxHeight: number | null = null;

  get style() {
    return this.value && this.loaded
      ? {
        top: this.stickyTop + 'px',
        position: 'sticky',
        maxHeight: (this.maxHeight === null ? window.innerHeight : this.maxHeight) + 'px',
        overflow: this.scrollable ? 'auto' : 'visible',
        zIndex: 3,
      }
      : null;
  }

  onResize() {
    if (this.loaded) {
      const bars = document.getElementsByClassName('v-app-bar');
      const appBarHeight = bars[0].clientHeight || this.$vuetify.application.top || 64;
      this.stickyTop = appBarHeight + this.offset;
      this.maxHeight = window.innerHeight - (appBarHeight || this.stickyTop);
    }
  }

  mounted() {
      setTimeout(() => {
        this.loaded = true;
        this.onResize();
      }, this.timeout);
  }
}
</script>

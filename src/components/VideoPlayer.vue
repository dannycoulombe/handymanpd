<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';

@Component
export default class VideoPlayer extends Vue {
  @Ref() video!: HTMLVideoElement;

  @Prop({ type: String, default: null }) src!: string;
  @Prop({ type: Number, default: 16/9 }) aspectRatio!: number;

  videoLoaded = false

  get style(): { [key: string]: string | number } {
    return {
      opacity: this.videoLoaded ? 1 : 0,
      maxWidth: '100%',
      float: 'left',
    }
  }
}
</script>

<template>
  <v-responsive :aspect-ratio="aspectRatio" max-height="100%">
    <v-overlay v-if="!videoLoaded" absolute>
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-overlay>
    <video
      v-bind="$attrs"
      v-on="$listeners"
      :style="style"
      ref="video"
      @loadeddata="() => videoLoaded = true"
    >
      <source :src="src">
    </video>
  </v-responsive>
</template>

<style lang="scss" scoped>
video {
  width: 100%;
}
</style>

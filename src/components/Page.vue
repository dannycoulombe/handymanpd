<template>
  <v-sheet :class="{ 'h-100': $vuetify.breakpoint.mdAndUp }" :color="color">
    <VideoPlayer
      v-if="video"
      v-bind="videoAttrs"
      :aspect-ratio="16/9"
      :src="video"
      class="video"
      ref="videoPlayer"
      @ended="onVideoEnded"
    />
    <v-carousel
      v-if="images"
      v-model="carouselIdx"
      :show-arrows="false"
      :height="carouselHeight"
      hide-delimiters
      class="carousel"
      continuous
      cycle
    >
      <v-carousel-item
        v-for="image in images"
        :key="image"
      >
        <v-img
          :src="image"
          :height="carouselHeight"
        >
          <template #placeholder>
            <v-overlay absolute>
              <v-progress-circular color="primary" size="128" indeterminate></v-progress-circular>
            </v-overlay>
          </template>
        </v-img>
      </v-carousel-item>
    </v-carousel>
    <div v-if="overlay !== null" class="overlay" :style="{ opacity: overlay }"></div>
    <div style="position: relative; z-index: 3">
      <slot></slot>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
import VideoPlayer from '@/components/VideoPlayer.vue';

@Component({
  components: {
    VideoPlayer
  }
})
export default class Page extends Vue {
  @Ref() videoPlayer!: VideoPlayer;

  @Prop({ type: String, default: null }) color!: string | null;
  @Prop({ type: String, default: null }) video!: string | null;
  @Prop({ type: Number, default: null }) overlay!: number | null;
  @Prop({ type: Array, default: null }) images!: Array<string> | null;
  @Prop({ type: Object, default: () => ({
    muted: true,
    loop: true,
    autoplay: true,
    preload: true,
  }) }) videoAttrs!: any;

  carouselIdx = 0

  get carouselHeight(): number | string {
    return this.$vuetify.breakpoint.mdAndUp
      ? '100vh'
      : '50vh';
  }

  toggleVideo() {

    this.videoPlayer.video.paused
      ? this.videoPlayer.video.play()
      : this.videoPlayer.video.pause();
    this.$emit('video-state', !this.videoPlayer.video.paused);
  }

  onVideoEnded() {
    this.$emit('video-ended');
    this.videoPlayer.video.currentTime = 0;
  }

  created() {
    this.$store.commit('background', this.color);
    this.$vuetify.goTo('#app', {
      duration: 0
    });
  }
}
</script>

<style lang="scss" scoped>
@media all and (max-width: 767px) {
  .carousel {
    margin-bottom: -6px;
  }
}

@media all and (min-width: 768px) {
  .video {
    position: fixed;
    z-index: 1;
    border: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    video {
      position: absolute;
      width: 100vmax;
      min-height: 100%;
      top: 0;
      left: 0;
    }
  }
  .carousel {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .overlay {
    background-color: rgba(0, 0, 0, 1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
}
.video >>> video {
  pointer-events: none;
}
</style>

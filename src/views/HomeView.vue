<template>
  <Page
    :video="$jmsPath($jms('home.video'))"
    :video-attrs="{ preload: true }"
    :overlay="0"
    ref="page"
    @video-ended="onVideoEnded"
    @video-state="onVideoState"
  >
    <v-btn
      v-if="$jms('home.video')"
      :fab="isMobile"
      :xLarge="!isMobile"
      outlined
      class="playButton"
      @click="toggleVideo"
    >
      <v-icon v-if="!videoPlaying" :left="!isMobile">mdi-play</v-icon>
      <v-icon v-else :left="!isMobile">mdi-pause</v-icon>
      <template v-if="!isMobile">
        <span v-if="!videoPlaying">{{ $t('btn.play') }}</span>
        <span v-else>{{ $t('btn.pause') }}</span>
      </template>
    </v-btn>
    <v-sheet color="transparent" dark>
      <v-container class="px-0 py-0 my-md-12" style="max-width: 75rem">
        <v-row class="h-100" no-gutters>
          <v-col cols="12" :md="6" class="d-none d-md-flex align-center justify-center"></v-col>
          <template v-if="true">
            <v-col cols="12" md="1" class="d-none d-md-flex"></v-col>
            <v-col v-show-timeout="[0, 'slide-y']" cols="12" md="5" class="pa-6 rounded text-overlay" align-self="center">
              <h1
                v-html="$options.filters?.markdown($jms('home.title'))"
                class="text-h4 text-md-h2 font-weight-thin"
              />
              <div>
                <p class="body-1 mt-4 mb-0" v-html="$options.filters?.markdown($jms('home.body'))"></p>
              </div>

              <div class="d-flex align-center mt-6">
                <v-btn
                  :to="{ name: 'portfolio' }"
                  block
                  color="primary"
                  x-large
                >
                  {{ $jms('home.cta') }}
                </v-btn>
              </div>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-sheet>
  </Page>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import Page from '@/components/Page.vue'

@Component({
  components: {
    Page,
  }
})
export default class HomeView extends Vue {
  @Ref() page!: Page;

  videoPlaying = false

  get isMobile(): boolean {
    return !this.$vuetify.breakpoint.mdAndUp;
  }

  toggleVideo() {
    this.page.toggleVideo();
  }

  onVideoEnded() {
    this.videoPlaying = false;
  }

  onVideoState(state: boolean) {
    this.videoPlaying = state;
  }
}
</script>

<style lang="scss" scoped>
@media all and (max-width: 767px) {
  .playButton {
    position: absolute;
    top: -4.5rem;
    left: 1rem;
    z-index: 1;
  }
}
@media all and (min-width: 768px) {
  .playButton {
    position: fixed;
    bottom: 6rem;
    left: 2rem;
  }
}
</style>

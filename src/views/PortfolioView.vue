<template>
  <Page>
    <v-container id="portfolio" class="pt-6 pb-3 py-md-12 pt-lg-3 container-md">
      <h1
        v-html="$options.filters?.markdown($jms('portfolio.title'))"
        v-show-timeout="[0, 'slide-y']"
        class="text-h4 text-md-h3 mb-3 mb-md-6"
      ></h1>

      <v-row>
        <v-col cols="12" v-show-timeout="[100, 'slide-x-reverse']">
          <div v-html="$options.filters?.markdown($jms('portfolio.body'))"></div>
          <v-btn
            :to="{ name: 'contact' }"
            color="primary"
            block
            x-large
            class="mt-4"
          >
            {{ $jms('portfolio.cta') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sticky from '@/components/Sticky.vue';
import Page from '@/components/Page.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

@Component({
  components: {
    Sticky,
    Page,
    VideoPlayer,
  }
})
export default class PortfolioView extends Vue {

}
</script>

<style lang="scss" scoped>
video {
  cursor: pointer;
}
</style>

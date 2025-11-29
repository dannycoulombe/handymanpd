<template>
  <Page>
    <v-container class="pt-6 pb-3 py-md-12 pt-lg-3 container-md">
      <h1 v-show-timeout="[0, 'slide-y']" class="text-h4 text-md-h3 mb-6 mb-md-6">{{ $jms('about.title') }}</h1>
      <v-img :src="$jmsPath($jms('about.picture'))" height="50vh" />
      <div class="body-1 mt-6" v-html="$options.filters?.markdown($jms('about.body'))" />

      <div class="d-flex align-center mt-6">
        <v-btn
          :to="{ name: 'portfolio' }"
          block
          color="primary"
          x-large
        >
          {{ $jms('about.cta') }}
        </v-btn>
      </div>
    </v-container>
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Page from '@/components/Page.vue'
import Sticky from '@/components/Sticky.vue'

@Component({
  components: {
    Page,
    Sticky,
  }
})
export default class AboutView extends Vue {

}
</script>

<template>
  <Page color="background" :images="['/images/error.jpg']">
    <v-container class="d-flex align-center justify-end text-center flex-column h-100">
      <v-sheet color="transparent" dark>
        <h1 v-show-timeout="[0, 'slide-x']" class="text-h4 text-md-h3">{{ $t('error.' + code + '.title') }}</h1>
        <p v-show-timeout="[100, 'slide-x']" class="body-1 mt-3">{{ $t('error.' + code + '.body') }}</p>
        <v-divider />
        <p v-show-timeout="[200, 'slide-x']" class="body-1 pb-0">{{ $t('error.tryOptions') }}</p>
        <v-icon>mdi-chevron-down</v-icon>
      </v-sheet>
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
export default class ErrorView extends Vue {
  code = '404'

  created() {
    this.code = this.$route.params.code;
  }
}
</script>

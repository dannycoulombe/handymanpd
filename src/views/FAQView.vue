<template>
  <Page color="background">
    <v-container class="h-100 pt-6 pb-3 py-md-12 pt-lg-3 container-md">
      <h1 v-show-timeout="[0, 'slide-y']" class="text-h4 text-md-h3 mb-6 mb-md-6" v-html="$jms('faq.title', true)" />
      <v-row>
        <v-col cols="12" md="8">
          <v-expansion-panels>
            <v-expansion-panel v-for="(question, questionIdx) in questions" :key="question.hash" v-show-timeout="[questionIdx * 50, 'slide-x']">
              <v-expansion-panel-header class="font-weight-bold">
                <div class="d-flex align-center" style="gap: 1rem">
                  <span>{{ question.title[$i18n.locale] }}</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-html="$options.filters?.markdown(question.body[$i18n.locale])"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sticky from '@/components/Sticky.vue'
import Page from '@/components/Page.vue'

@Component({
  components: {
    Sticky,
    Page,
  }
})
export default class FAQView extends Vue {

  get questions(): any[] {
    return this.$jms('faq.questions');
  }
}
</script>

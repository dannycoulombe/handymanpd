<template>
  <Page color="background">
    <v-container id="calendar" class="h-100 pt-6 pb-3 py-md-12 pt-lg-3 container-md">
      <h1 v-show-timeout="[0, 'slide-y']" class="text-h4 text-md-h3 mb-6 mb-md-6" v-html="$jms('testimonials.title', true)" />
      <p class="body-1 text-pre-wrap mb-0" v-html="$options.filters?.markdown($jms('testimonials.body'))" />
      <v-row>
        <v-col
          v-for="(testimonial, testimonialIdx) in testimonials"
          :key="testimonial.hash"
          cols="12"
          md="4"
        >
          <v-card v-show-timeout="[(100 * testimonialIdx) + 100, 'slide-y']">
            <div v-if="testimonial.thumbnail" class="d-flex justify-center" style="margin-top: 64px">
              <v-avatar size="128" style="margin-top: -64px" color="background">
                <v-img :src="testimonial.thumbnail" :aspect-ratio="1" height="128" contain>
                  <template #placeholder>
                    <v-overlay absolute>
                      <v-progress-circular color="primary" size="32" indeterminate></v-progress-circular>
                    </v-overlay>
                  </template>
                </v-img>
              </v-avatar>
            </div>
            <v-card-title>{{ testimonial.name }}</v-card-title>
            <v-card-subtitle>{{ testimonial.from }}</v-card-subtitle>
            <v-card-text>
              <div v-html="$options.filters?.markdown(testimonial.body)"></div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sticky from '@/components/Sticky.vue';
import Page from '@/components/Page.vue'

interface ITestimonial {
  expand: boolean,
  hash: string,
  thumbnail: string,
  name: string,
  body: string,
  country: string,
}

@Component({
  components: {
    Sticky,
    Page,
  }
})
export default class TestimonialsView extends Vue {

  get testimonials(): Array<ITestimonial> {
    return this.$jms('testimonials.items').map((item: any) => ({
      expand: false,
      hash: item.hash,
      body: item.body[this.$i18n.locale],
      thumbnail: this.$jmsPath(item.thumbnail),
      name: item.name,
      from: item.from,
    }))
  }
}
</script>

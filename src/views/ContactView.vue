<template>
  <Page color="background">
    <v-container id="contact" class="h-100 pt-6 pb-3 py-md-12 pt-lg-3 container-md">
      <h1 v-show-timeout="[0, 'slide-y']" class="text-h4 text-md-h3 mb-3 mb-md-6" v-html="$jms('contact.title', true)" />
      <v-row class="h-100">
        <v-col v-show-timeout="[100, 'fade']" cols="12" md="5">
          <Sticky v-model="$vuetify.breakpoint.mdAndUp" :offset="16">
            <p class="body-1 text-pre-wrap mb-0" v-html="$options.filters?.markdown($jms('contact.body'))" />
          </Sticky>
        </v-col>
        <v-col cols="12" md="1" class="d-none d-md-flex"></v-col>
        <v-col v-show-timeout="[100, 'slide-y']" cols="12" md="6" class="mt-n12 mt-md-0">
          <v-form ref="form" v-model="formIsValid" :disabled="sent" @submit="onSubmitForm" lazy-validation>
            <v-card>
              <v-card-title>{{ $t('contact.form') }}</v-card-title>
              <v-card-text>
                <v-expand-transition>
                  <div v-if="sent" class="pb-6">
                    <v-alert type="success" class="mb-0">
                      {{ $t('contact.sent') }}
                    </v-alert>
                  </div>
                </v-expand-transition>

                <v-text-field
                  v-model="form.name"
                  :label="$t('contact.name')"
                  :rules="[rules.required]"
                  outlined
                  hide-details="auto"
                />
                <v-text-field
                  v-model="form.email"
                  :label="$t('contact.email')"
                  :rules="[rules.required, rules.email]"
                  outlined
                  hide-details="auto"
                  class="mt-4"
                />
                <v-text-field
                  v-model="form.subject"
                  :label="$t('contact.subject')"
                  :rules="[rules.required]"
                  outlined
                  hide-details="auto"
                  class="mt-4"
                />
                <v-textarea
                  v-model="form.message"
                  :label="$t('contact.message')"
                  :rules="[rules.required]"
                  outlined
                  hide-details="auto"
                  class="mt-4"
                />
                <v-checkbox
                  v-model="terms"
                  :rules="[rules.required]"
                  :label="$t('contact.terms')"
                  class="mb-0"
                  required
                  hide-details="auto"
                ></v-checkbox>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  :disabled="!canSend"
                  :loading="sending"
                  color="primary"
                  block
                  large
                  @click="onSubmitForm"
                >
                  {{ $t('contact.send') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Page from '@/components/Page.vue'
import Sticky from '@/components/Sticky.vue'
import Rules from '@/utils/rules';
import emailjs from '@emailjs/browser';

@Component({
  components: {
    Page,
    Sticky,
  }
})
export default class ContactView extends Vue {

  formIsValid = false
  sent = false
  sending = false
  terms = false
  rules: any = {}
  form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  get canSend(): boolean {
    return this.formIsValid && !this.sending;
  }

  onSubmitForm() {
    const form = this.$refs.form as any;
    if (form && form.validate()) {
      this.sending = true;
      emailjs.send('service_jv9yqqf', 'template_ggvq448', this.form, 'Ad5avEk0QPXbPv2Kh')
        .then(() => {
          this.sending = false;
          this.sent = true;
        }, () => {
          this.sending = false;
        });
    }

  }

  created() {
    this.rules = {
      required: (value: string) => Rules.required(value) || this.$t('rules.required'),
      email: (value: string) => Rules.email(value) || this.$t('rules.email'),
    };
  }
}
</script>

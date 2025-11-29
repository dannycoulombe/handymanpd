<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class CookieManager extends Vue {
  visible = false

  injectScripts() {
    const tagManager = document.createElement('script');
    tagManager.src = 'https://www.googletagmanager.com/gtag/js?id=G-61RYZTPS4G';
    tagManager.async = true;

    const script = document.createElement('script');
    script.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-61RYZTPS4G');`

    document.body.append(tagManager);
    document.body.append(script);
  }

  accept() {
    localStorage.setItem('cookie_accepted', 'true');
    this.injectScripts();
    this.visible = false;
  }

  created() {
    this.visible = localStorage.getItem('cookie_accepted') !== 'true';
    if (!this.visible) {
      this.injectScripts();
    }
  }
}
</script>

<template>
  <v-bottom-sheet
    v-model="visible"
    persistent
  >
    <v-sheet>
      <v-container>
        <div class="d-flex flex-column flex-md-row align-center" :style="{
          gap: $vuetify.breakpoint.mdAndUp ? '2rem' : '0.5rem'
        }">
          <v-icon size="64" color="primary">mdi-cookie</v-icon>
          <div style="flex: 1">
            {{ $t('cookieManager.body') }}
          </div>
          <div class="d-flex align-center flex-nowrap" style="flex: 0; gap: 1rem">
            <v-btn
              color="primary"
              @click="accept"
            >
              <span v-text="$t('cookieManager.accept')"></span>
            </v-btn>
            <v-btn
              text
              @click="visible = !visible"
            >
              <span v-text="$t('cookieManager.refuse')"></span>
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

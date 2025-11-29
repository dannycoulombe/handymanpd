<template>
  <v-navigation-drawer v-model="opened" light fixed>
    <template #prepend>
      <v-sheet class="pa-3 d-flex align-center justify-space-between" dark>
        <v-btn :to="{ name: 'home' }" exact text height="60">
          <v-img :src="logo" width="62" height="50" contain />
        </v-btn>

        <v-btn icon @click.stop="opened = !opened">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-sheet>

      <v-divider></v-divider>
    </template>

    <template #append>
      <v-sheet dark>
        <div class="pa-2">
          <v-select
            v-model="$i18n.locale"
            :items="availableLanguages"
            style="max-width: 100%"
            prepend-inner-icon="mdi-translate"
            hide-details
            class="select-transparent"
            flat
            solo
            dense
          />
        </div>

        <v-sheet class="caption text-right text-no-wrap background">
          <div class="px-4 py-1" style="opacity: 0.5" v-text="$t('sidebar.copyright', {
            year,
          })"></div>
        </v-sheet>
      </v-sheet>
    </template>

    <v-list>
      <v-list-item
        v-for="link in links"
        :key="link.key"
        :to="{ name: link.key }"
        exact
        link
      >
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('route.' + link.key) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, VModel } from 'vue-property-decorator';
import { availableLanguages, links } from '@/global';
import logo from '@/assets/images/handymanpd.png';

@Component
export default class Sidebar extends Vue {
  @VModel({ type: Boolean, default: false }) opened!: boolean

  links = links
  logo = logo
  availableLanguages = availableLanguages
  year = new Date().getFullYear()
}
</script>

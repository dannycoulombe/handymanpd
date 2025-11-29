<template>
  <v-app :class="['route-' + $route.name]">
    <v-sheet :color="$store.state.background" class="h-100 d-flex">
      <v-app-bar
        :color="$vuetify.breakpoint.lgAndUp ? 'transparent' : 'background'"
        :flat="$vuetify.breakpoint.lgAndUp"
        class="shrink"
        app
      >
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.smAndDown"
          class="mr-3"
          @click="onAppBarNavClick"
        />

        <v-btn v-if="$vuetify.breakpoint.mdAndUp" :to="{ name: 'home' }" exact text height="100" class="mt-16">
          <v-img :src="logo" width="98" height="80" contain />
        </v-btn>
        <v-btn v-else :to="{ name: 'home' }" exact text height="60" class="ml-n4">
          <v-img :src="logo" width="62" height="50" contain />
        </v-btn>

        <v-spacer />

        <div class="d-flex align-center" style="gap: 1rem">
          <v-tabs
            v-if="$vuetify.breakpoint.mdAndUp"
            v-model="routeName"
            style="max-width: max-content"
            optional
            color="white"
            background-color="transparent"
          >
            <v-tab
              v-for="link in links.filter(link => link.section === 'secondary')"
              :key="link.key"
              :to="{ name: link.key }"
              exact
            >
              <v-icon left>{{ link.icon }}</v-icon>
              <span>{{ $t('route.' + link.key) }}</span>
            </v-tab>
          </v-tabs>

          <v-tooltip
            v-for="link in socialLinks"
            :key="link.href"
            bottom
            color="primary"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                :href="link.href"
                target="_blank"
                icon
                large
              >
                <v-icon v-text="link.icon"></v-icon>
              </v-btn>
            </template>
            <span v-text="link.name"></span>
          </v-tooltip>
        </div>

        <template v-if="$vuetify.breakpoint.mdAndUp">
          <v-divider class="mx-4" inset vertical />

          <v-select
            v-model="$i18n.locale"
            :items="availableLanguages"
            style="max-width: 10rem"
            prepend-inner-icon="mdi-translate"
            hide-details
            class="select-transparent"
            flat
            solo
            dense
          />
        </template>
      </v-app-bar>

      <v-main class="grow">
        <transition name="slide-left" mode="out-in">
          <router-view
            :key="$route.fullPath"
            class="w-100"
          ></router-view>
        </transition>
      </v-main>

      <v-app-bar v-if="$vuetify.breakpoint.mdAndUp" color="background" class="shrink" app bottom>
        <v-tabs v-model="routeName" grow slider-size="5" background-color="primary" optional>
          <v-tab
            v-for="link in links.filter(link => link.section === 'primary')"
            :key="link.key"
            :to="{ name: link.key }"
            :exact-path="link.key === 'home'"
          >
            <v-icon left>{{ link.icon }}</v-icon>
            <div style="transform: translateY(0.1rem)">{{ $t('route.' + link.key) }}</div>
          </v-tab>
        </v-tabs>
      </v-app-bar>
    </v-sheet>

    <Sidebar v-model="drawer" />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar.vue';
import logo from '@/assets/images/handymanpd.png';
import { availableLanguages, links } from '@/global';

@Component({
  components: {
    Sidebar,
  }
})
export default class HomeView extends Vue {
  logo = logo
  drawer = false
  links = links
  availableLanguages = availableLanguages
  routeName = null

  @Watch('$i18n.locale')
  onI18nLocaleChange(locale: string) {
    localStorage.setItem('locale', locale);
    this.updateTitle();
  }

  @Watch('$route.fullPath', { immediate: true })
  onRouteFullPathChange() {
    this.updateTitle();
  }

  get socialLinks() {
    return [
      { href: this.$jms('settings.facebook'), icon: 'mdi-facebook', name: 'Facebook' },
      { href: this.$jms('settings.instagram'), icon: 'mdi-instagram', name: 'Instagram' },
    ]
  }

  updateTitle() {
    let title = (this.$i18n.t('route.' + this.$route.name) || 'Untitled') + ' - Handyman PD Constructions';
    Object.keys(this.$route.params).forEach(key => {
      title = (this.$i18n.t('routeParams.' + this.$route.name + '.' + key + '.' + this.$route.params[key]) || 'Untitled') + ' - ' + title;
    })
    document.title = title;

    const metaDescElement = document.head.querySelector('meta[name=description]');
    if (metaDescElement) {
      const description = this.$i18n.t('meta.description.' + this.$route.name).toString();
      metaDescElement.setAttribute('content', description);
    }

    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.setAttribute('lang', (this.$i18n.locale || '').substring(0, 2))
    }
  }

  onAppBarNavClick() {
    this.drawer = !this.drawer;
  }
}
</script>

import { PluginObject, reactive } from 'vue';
import I18n from 'vue-i18n';
import VueRouter from 'vue-router';

interface JSONmsOptions {
  filePath?: string;
  i18n: I18n;
  router: VueRouter,
}

declare global {
  interface Window {
    jsonMs: any;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $jms(str: string, params?: {[key: string]: any}): any;
    $jmsPath(filepath: string): string;
    $jmsState: {
      data: any;
    };
  }
}

function getValueByPath(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return current;
}

const state: { data: any, settings: any } = reactive(window.jsonMs || {
  data: {},
  settings: {},
});

const JSONms: PluginObject<JSONmsOptions> = {
  // @ts-ignore
  install(Vue, options: JSONmsOptions) {
    const { i18n, router } = options;
    window.parent.postMessage({ name: 'jsonms', type: 'init' }, '*');

    router.afterEach((to, from) => {
      if (from.name) {
        window.parent.postMessage({ name: 'jsonms', type: 'route', data: {
            name: to.name,
          } }, '*');
      }
    })

    window.addEventListener('message', (event) => {
      if (event.data.name === 'jsonms') {
        switch (event.data.type) {
          case 'init':
            // eslint-disable-next-line no-case-declarations
            const init = JSON.parse(event.data.data);
            i18n.locale = init.locale;
            Vue.set(state, 'settings', init.settings);
            break;
          case 'data':
            // eslint-disable-next-line no-case-declarations
            const data = JSON.parse(event.data.data);
            Object.keys(data).forEach(key => {
              Vue.set(state.data, key, data[key]);
            });
            break;
          case 'section':
            try {
              const section = JSON.parse(event.data.data);
              // eslint-disable-next-line no-case-declarations
              const route = router.getRoutes().find(item => item.name === section.name);
              if (route && route.name !== router.currentRoute.name) {
                router.replace(route);
              }
            }
            catch (e) {
              console.error(e);
            }
            break;
          case 'locale':
            i18n.locale = event.data.data;
            break;
          case 'reload':
            window.location.reload();
            break;
        }
      }
    });

    const applyParams = (str: string, params?: {[key: string]: string}) => {
      if (!params) {
        return str;
      }
      const keys = Object.keys(params);
      keys.forEach(key => {
        str = str.replaceAll('{' + key + '}', params[key]);
      })
      return str;
    }

    const jms = function (str: string, params?: {[key: string]: string}) {
      const item = getValueByPath(state, 'data.' + str);
      if (item === undefined) {
        return null;
      }

      if (Array.isArray(item)) {
        return item;
      } else if (typeof item === 'object' && item !== null && item[i18n.locale] !== undefined) {
        return applyParams(item[i18n.locale] || 'Undefined');
      }

      return item !== undefined
          ? typeof item === 'string' ? applyParams(item, params) : item
          : null;
    }
    Vue.prototype.$jms = jms;

    Vue.prototype.$jmsPath = function(filepath: string | any) {
      if (filepath == null) {
        return null;
      }
      const path = (
          typeof filepath === 'object' && filepath[i18n.locale]
              ? filepath[i18n.locale].path
              : typeof filepath === 'object' && filepath.path
      );
      return (path && state.settings.publicUrl + path) || path;
    }

    Vue.prototype.$jmsState = state;

    Vue.component('jms-item', {
      props: {
        path: {
          type: String,
          required: true
        },
        tag: {
          type: String,
          default: 'span'
        }
      },
      render(h) {
        const translation = jms(this.path);

        // Create an array to hold the VNodes
        const nodes = [];
        let lastIndex = 0;

        // Find all placeholders in the translation string
        const regex = /{(.*?)}/g;
        let match;

        // Iterate through all matches
        while ((match = regex.exec(translation)) !== null) {
          const key = match[1]; // Extract the key without braces
          const slotContent = this.$slots[key]; // Get the slot content by key

          // Push the text before the match
          if (lastIndex < match.index) {
            nodes.push(translation.slice(lastIndex, match.index));
          }

          // If slot content exists, push it as a VNode
          if (slotContent) {
            nodes.push(...slotContent); // Spread the slot content VNodes
          }

          lastIndex = regex.lastIndex; // Update lastIndex to the end of the current match
        }

        // Push any remaining text after the last match
        if (lastIndex < translation.length) {
          nodes.push(translation.slice(lastIndex));
        }

        // Render the specified tag with the constructed VNodes
        return h(this.tag, {}, nodes);
      }
    });

    // For some reason, Vue enters 72 times in this
    // watch so I placed a timeout here..
    let localeTimeout: any;
    Vue.mixin({
      watch: {
        '$i18n.locale'(newLocale, oldLocale) {
          clearTimeout(localeTimeout);
          localeTimeout = setTimeout(() => {
            window.parent.postMessage({ name: 'jsonms', type: 'locale', data: newLocale }, '*');
          });
        }
      }
    });
  },
};

export default JSONms;

import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        background: '#F9F9F9',
        primary: '#333333',
        secondary: '#424242',
        accent: '#d50302',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        text: '#FF0000',
      },
      dark: {
        background: '#333333',
        primary: '#000000',
        secondary: '#424242',
        accent: '#d50302',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        text: '#FF0000',
      },
    },
  },
});

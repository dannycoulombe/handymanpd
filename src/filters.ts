import Vue from 'vue'
import * as marked from 'marked'

Vue.filter('markdown', function (str: string) {
  if (str !== null && typeof str === 'object') {
    return Object.values(str).map((val: any) => marked.parse(val || ''))
  }
  return marked.parse(str || '');
})

Vue.filter('nl2br', function (str: string) {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }
  const breakTag = '<br />';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
})

Vue.filter('excerpt', function (str: string, limit = -1) {
  if (str.length <= limit) {
    return str;
  }
  return str.substring(0, limit === -1 ? 99999999999999 : limit) + '...';
})

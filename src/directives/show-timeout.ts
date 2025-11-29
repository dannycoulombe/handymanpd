import Vue, { DirectiveBinding } from 'vue';

const applyCallback = (el: HTMLElement, binding: DirectiveBinding<any>) => {

  const delay = Array.isArray(binding.value)
    ? binding.value[0]
    : binding.value;

  const transition = Array.isArray(binding.value)
    ? binding.value[1]
    : 'fade';

  el.classList.add('show-timeout');
  el.classList.add('show-timeout-' + transition + '-hide');
  setTimeout(() => {
    el.classList.add('show-timeout-' + transition + '-show');
    el.classList.add('show-timeout-show');
  }, delay);
}

Vue.directive('show-timeout', {
  bind: applyCallback,
});

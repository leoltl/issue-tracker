var trackedElements = new Map();

function isInView(DOMel, vnode) {
  const { top, right, bottom, left } = DOMel.getBoundingClientRect();
  const clientHeight = window.innerHeight || document.documentElement.clientHeight;
  const clientWidth  = window.innerWidth || document.documentElement.clientWidth;
  if (
    bottom > 0 &&
    right > 0 &&
    top < clientHeight - clientHeight * 0.25 &&
    left < clientWidth
  ) {
    vnode.context.$emit("isInView");
  } else {
    vnode.context.$emit("isNotInView");
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function handleisInView() {
  this.isInView = true;
  this.isInViewOnce = true;
}

function handleisNotInView() {
  this.isInView = false;
}

const debouncedCheckElementsInView = debounce(() => {
    trackedElements.forEach(isInView)
  }, 100)

const registerListeners = (function() {
  var registered = [];
  return function () {
    if (registered.length == 0) {
        registered = ["DOMContentLoaded", "load", "scroll", "resize"].map(function(
          event
        ) {
          window.addEventListener(
            event,
            debouncedCheckElementsInView)
        });
      }
  }
})()


export default {
  directives: {
    inView: {
      bind: function(el, binding, vnode) {
        if (!trackedElements.has(el)) {
          trackedElements.set(vnode, el);
        }
        if (!binding.modifiers.preventAutoAdd) {
          el.dataset.inviewAnimate= binding.value || 'true';
        }
        registerListeners();
      }
    }
  },
  data() {
    return {
      isInView: undefined,
      isInViewOnce: false
    };
  },
  created() {
    this.$on("isInView", handleisInView);
    this.$on("isNotInView", handleisNotInView);
  },
  beforeDestroy() {
    this.$off("isInView", handleisInView);
    this.$off("isNotInView", handleisNotInView);
    ["DOMContentLoaded", "load", "scroll", "resize"].forEach(function(
        event
      ) {
        window.removeEventListener(
          event,
          debouncedCheckElementsInView)
      });
  }
};
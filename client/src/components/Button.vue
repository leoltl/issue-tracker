<template>
  <button 
    class="button" 
    :class="[cssClass, {loading: isLoading}]"
    @click="handleClick">
      <span class="loader" v-if="isLoading"></span>
      <slot v-else></slot>
    </button>
</template>

<script>
import { computed, ref } from '@vue/composition-api';

export default {
    props:['hasAsync', 'type', 'width'],
    setup(props, context) {
        const DEFAULT = {
            type: 'submit',
            hasAsync: false,
        }
        const buttonType = computed(() => props.type || DEFAULT.type)
        const cssClass = computed(() => {
            switch(buttonType.value){
                case 'search':
                case 'submit':
                case 'connectConsultant':
                    return 'primary'
                default:
                    return 'secondary'
            }
        })
        
        let isLoading = ref(false);
        const handleClick = function (e) { 
            if (context.listeners.click && !isLoading.value) {
                if (!props.hasAsync) {
                    context.emit('click', e)
                    return 
                }
                const resetLoadingStateCallback = function setLoadingFalse() { isLoading.value = false }
                isLoading.value = true
                context.emit('click', e, resetLoadingStateCallback)
            }
        }
        return {
            buttonType,
            message,
            cssClass,
            isLoading,
            handleClick
        }
    }
}
</script>

<style lang="scss" scoped>

// .primary {
//   width: 100%;
//   height: $button-height-sm;
//   font-size: $text-font-size-lg;
//   font-weight: $text-font-weight-lg;
//   border: none;
//   position: relative;
//   color: $text-color-white;
//   background-color: $ele-ui-color-danger;
//   border-radius: 0.25rem;
//     @include respond-below(sm) {
//         font-size: $text-font-size-sm;
//     }
// }

@keyframes spinner {
  to {transform: rotate(360deg);}
}

.loading {
    .loader::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        // width: $button-height-sm / 2 * 1.2;
        // height: $button-height-sm / 2 * 1.2;
        // margin-left: -$button-height-sm / 4 * 1.2;
        // margin-top: -$button-height-sm / 4 * 1.2;
        border-radius: 50%;
        border: 2px solid #ccc;
        border-top-color: $ele-ui-color-danger;
        animation: spinner .6s linear infinite;
    }
}
</style>
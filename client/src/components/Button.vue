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
            cssClass,
            isLoading,
            handleClick
        }
    }
}
</script>

<style lang="scss" scoped>
$btn-height: 28px;
$btn-primary-color: #0046be;
$btn-primary-text: #fff;
button {
    position: relative;
    height: $btn-height;
    width: 100%;
    border: none;
    cursor: pointer;
    font-family: 'Muli', sans-serif;
    -webkit-box-shadow: 2px 2px 5px 0px rgba(143,143,143,1);
    -moz-box-shadow: 2px 2px 5px 0px rgba(143,143,143,1);
    box-shadow: 2px 2px 5px 0px rgba(143,143,143,1);
    border-radius: 5px;
    background-color: $btn-primary-color;
    color: $btn-primary-text
}

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
        width: $btn-height / 2 * 1.2;
        height: $btn-height / 2 * 1.2;
        margin-left: -$btn-height / 4 * 1.2;
        margin-top: -$btn-height / 4 * 1.2;
        border-radius: 50%;
        border: 2px solid #ccc;
        border-top-color: $btn-primary-color;
        animation: spinner .6s linear infinite;
    }
}
</style>
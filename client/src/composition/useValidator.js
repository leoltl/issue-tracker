import { ref, watch } from "@vue/composition-api"

function useValidator(startValue, validators, onValidate) {
    const input = ref(startValue);
    const errors = ref([])
    watch(input, value => {
        errors.value = validators.map(validator => validator(value))
        onValidate(value);
    })
    return {
        input,
        errors,
    }
}

export default useValidator;
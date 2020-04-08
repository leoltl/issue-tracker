<script>
import { computed, watch } from '@vue/composition-api';
import { isRequired, minLength } from '../Validators'
import useValidator from '@/composition/useValidator';
import GenericInput from '../GenericInput';

export default {
    name: "InputPassword",
    mixins: [GenericInput],
    setup(props, { emit }) {
        const { input, errors } = useValidator(
            props.value, 
            [isRequired(), minLength(8)], 
            value => emit("input", value)
        );
        const computedLabel = computed(() => props.label || "Password" )
        const computedType = computed(() => props.type || "password")
        watch(() => props.value, val => {
            input.value = val
            emit('input', val)
        })
        return {
            input,
            errors,
            computedLabel,
            computedType
        }
    }
}
</script>
<script>
import { computed } from '@vue/composition-api';
import { isRequired, minLength } from '../Validators'
import useValidator from '@/composition/useValidator';
import GenericInput from '../GenericInput';

export default {
    name: "InputUsername",
    mixins: [GenericInput],
    setup(props, { emit }) {
        const { input, errors } = useValidator(
            props.value, 
            [isRequired(), minLength(2)], 
            value => emit("input", value)
        );
        const computedLabel = computed(() => props.label || "Username" )
        return {
            input,
            errors,
            computedLabel
        }
    }
}
</script>
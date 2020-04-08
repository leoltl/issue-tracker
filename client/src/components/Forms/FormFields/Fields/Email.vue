<script>
import { computed } from '@vue/composition-api';
import { isEmail, isRequired } from '../Validators';
import useValidator from '@/composition/useValidator';
import GenericInput from '../GenericInput';

export default {
    name: "InputEmail",
    mixins: [GenericInput],
    setup(props, { emit }) {
        const { input, errors } = useValidator(
            props.value, 
            [isRequired(), isEmail() ], 
            value => emit("input", value)
        );
        const computedLabel = computed(() => props.label || "Email" )
        return {
            input,
            errors,
            computedLabel
        }
    }
}
</script>

<style>

</style>
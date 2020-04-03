<script>
import { computed } from '@vue/composition-api';
import { isRequired, minLength } from './Validators'
import useValidator from '@/composition/useValidator';
import GenericInput from './GenericInput';
export default {
    name: "InputName",
    mixins: [GenericInput],
    setup(props, { emit }) {
        const { input, errors } = useValidator(
            props.value, 
            [isRequired(), minLength(1)], 
            value => emit("input", value)
        );
        const computedLabel = computed(() => props.label || "Name" )
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
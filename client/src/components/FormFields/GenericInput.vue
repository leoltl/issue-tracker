<template>
    <div>
        <label>
            {{ computedLabel }}:
            <input :type="computedType" v-model="input" :name="computedLabel"/>
        </label>
        <ShowError v-if="input" :errors="errors" />
    </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import useValidator from '@/composition/useValidator';
import ShowError from './ShowError';
export default {
    name: "Input",
    props: ["value", "label"],
    components: {
        ShowError
    },
    setup(props, { emit }) {
        const { input, errors } = useValidator(
            props.value, 
            [], 
            value => emit("input", value)
        );
        const computedLabel = computed(() => props.label || "Field" )
        const computedType = computed(() => props.type || "text")
        return {
            input,
            errors,
            computedLabel,
            computedType
        }
    }
}
</script>

<style>

</style>
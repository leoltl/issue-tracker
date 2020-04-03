<template>
    <div>
        <label>
            {{ computedLabel }}:
            <input type="text" v-model="input" :name="computedLabel"/>
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
<template>
    <div class="form-field-group">
        <label for="computedLabel">{{ computedLabel }}:<span class="asterisk" v-if="required">*</span></label>
        <input :type="computedType" v-model="input" :name="computedLabel"/>
        <ShowError v-if="input" :errors="errors" />
    </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import useValidator from '@/composition/useValidator';
import ShowError from './ShowError';
export default {
    name: "Input",
    props: ["value", "label", "required"],
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
    input {
        border: none;
        border-bottom: 1px solid black;
        padding-bottom: 5px;
    }
    label {
        margin-bottom: 5px;
        color: #666;
        font-size: 0.8rem;
    }
    .asterisk {
        color: red;
    }
</style>
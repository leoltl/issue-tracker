<template>
    <div class="form-field-group">
        <label for="computedLabel">{{ computedLabel }}:<span class="asterisk" v-if="required">*</span></label>
        <select :type="computedType" v-model="input" :name="computedLabel" @change="handleChange">
          <option value="" selected disabled hidden>Choose here</option>
          <option 
            v-for="option of options" 
            :value="option.value || option" 
            :key="option.value || option">
            {{ option.name || option }}
          </option>
        </select>
    </div>
</template>

<script>
import { computed, watch, ref } from '@vue/composition-api';
export default {
    name: "Input",
    props: ["value", "label", "required", "options"],
    setup(props, { emit }) {
        const input = ref(null)
        const computedLabel = computed(() => props.label || "Field" )
        const computedType = computed(() => props.type || "text")
        
        watch(() => props.value, val => {
            input.value = val
            emit('input', val)
        })

        function handleChange(e) {
            emit('input', e.target.value)
        }

        return {
            input,
            computedLabel,
            computedType,
            handleChange
        }
    }
}
</script>

<style>
    select {
        margin: 5px 0;
        padding: 5px;
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
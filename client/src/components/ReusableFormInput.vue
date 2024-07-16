<template lang="">
  <div>
    <a-form-item
      v-for="field in formFields"
      :key="field.name"
      :name="field.name"
      :rules="field.rules"
    >
      <label :for="field.htmlFor" class="w-full mb-2 font-semibold text-xl"
        >{{ field.label }}
      </label>
      <a-input
        :id="field.htmlFor"
        :type="field.name"
        v-bind="field.props"
        v-model:value="formState[field.name]"
      />
    </a-form-item>
  </div>
</template>
<script>
export default {
  name: 'ReusableFormInput',
  props: {
    formFields: {
      type: Array,
      default: () => [],
    },
    formState: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

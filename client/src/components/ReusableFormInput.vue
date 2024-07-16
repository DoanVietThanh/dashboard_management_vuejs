<template lang="">
  <div>
    <a-form-item
      v-for="field in formFields"
      :key="field.name"
      :name="field.name"
      :rules="field.rules"
    >
      <div v-if="field.type == 'a-select'">
        <label :for="field.htmlFor" class="w-full mb-2 font-semibold text-xl"
          >{{ field.label }}
        </label>
        <a-select v-model:value="formState[field.name]">
          <a-select-option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </a-select-option>
        </a-select>
      </div>
      <div v-else>
        <label :for="field.htmlFor" class="w-full mb-2 font-semibold text-xl"
          >{{ field.label }}
        </label>
        <a-input
          :id="field.htmlFor"
          :type="field.name"
          v-bind="field.props"
          v-model:value="formState[field.name]"
        />
      </div>
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

<style>
.ant-modal-wrap {
  height: 100vh !important;
  width: 100vw !important;
  overflow-y: hidden !important;
}

.ant-modal-content {
  border-radius: 40px;
  height: 80vh !important;
  overflow-y: auto !important;
}
</style>

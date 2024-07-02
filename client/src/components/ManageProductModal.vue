<template>
  <a-modal
    :visible="open"
    :title="type === 'create' ? 'Create Product' : 'Update Product'"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      labelAlign="left"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[
          { required: true, message: 'Please input product name!' },
          { min: 4, message: 'Length of name is more than 4' },
        ]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item
        label="Price"
        name="price"
        :rules="[{ required: true, message: 'Please input product price!' }]"
      >
        <a-input v-model:value="formState.price" type="number" min="0" />
      </a-form-item>

      <a-form-item
        label="Description"
        name="description"
        :rules="[
          { required: true, message: 'Please input product description!' },
          { min: 4, message: 'Length of description is more than 4' },
        ]"
      >
        <a-input v-model:value="formState.description" />
      </a-form-item>

      <a-form-item
        label="Brand"
        name="brand"
        :rules="[
          { required: true, message: 'Please input product brand!' },
          { min: 4, message: 'Length of brand is more than 4' },
        ]"
      >
        <a-input v-model:value="formState.brand" />
      </a-form-item>

      <a-form-item
        label="URL Image"
        name="urlImage"
        :rules="[
          { required: true, message: 'Please input product image URL!' },
        ]"
      >
        <a-input v-model:value="formState.urlImage" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 20, span: 16 }">
        <a-button
          type="primary"
          html-type="submit"
          :loading="submitting"
          :disabled="submitting"
        >
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ManageProductModal',
  props: {
    title: {
      type: String,
      default: 'Manage Product',
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    type: {
      type: String,
      default: 'create',
      required: true,
      validator: function (value) {
        return ['create', 'update'].includes(value);
      },
    },
    product: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formState: {
        name: '',
        price: '',
        description: '',
        brand: '',
        urlImage: '',
      },
      submitting: false,
    };
  },
  watch: {
    product(newVal) {
      if (newVal) {
        this.formState = { ...newVal };
      } else {
        this.resetFormState();
      }
    },
  },
  methods: {
    resetFormState() {
      this.formState = {
        name: '',
        price: '',
        description: '',
        brand: '',
        urlImage: '',
      };
    },
    handleCancel() {
      this.$emit('update:open', false);
    },
    async onFinish(values) {
      if (this.submitting) return;
      this.submitting = true;

      if (this.type === 'create') {
        try {
          const response = await axios.post(
            'https://66781b960bd45250561d86d1.mockapi.io/products',
            values
          );
          if (response.status === 201) {
            alert('Add success');
            this.$emit('productAdded');
            this.$emit('update:open', false);
          } else {
            alert('Add fail');
          }
        } catch (error) {
          console.error('Error adding product:', error);
          alert('Add fail');
        } finally {
          this.submitting = false;
        }
      } else if (this.type === 'update') {
        try {
          const response = await axios.put(
            `https://66781b960bd45250561d86d1.mockapi.io/products/${this.product.id}`,
            values
          );
          if (response.status === 200) {
            alert('Update success');
            this.$emit('productUpdated');
            this.$emit('update:open', false);
          } else {
            alert('Update fail');
          }
        } catch (error) {
          console.error('Error updating product:', error);
          alert('Update fail');
        } finally {
          this.submitting = false;
        }
      }
    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo);
      this.submitting = false;
    },
  },
};
</script>

<style scoped>
/* Add any styles you need here */
</style>

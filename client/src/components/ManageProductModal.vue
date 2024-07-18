<template>
  <a-modal
    :visible="open"
    :title="type === 'create' ? 'Create Product' : 'Update Product'"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-form
      ref="productFormRef"
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <div class="max-h-[60vh] overflow-y-auto">
        <ReusableFormInput :formFields="formFields" :formState="formState" />
      </div>
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
import { notification } from 'ant-design-vue';
import ReusableFormInput from '../components/ReusableFormInput.vue';
import { manageProductFormFieldsRules } from '../validations/product.validation.js';
import {
  createProductService,
  updateProductService,
} from '../services/product.service';

export default {
  name: 'ManageProductModal',
  components: {
    ReusableFormInput,
  },
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
      formFields: manageProductFormFieldsRules,
      formState: {
        name: '',
        price: '',
        description: '',
        urlImage: '',
      },
      submitting: false,
    };
  },
  watch: {
    product(newVal) {
      if (newVal) {
        this.formState = { ...newVal, name: newVal.productName };
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
    openNotificationWithIcon(type, message, description) {
      return notification[type]({
        message,
        description,
        duration: 3,
      });
    },
    handleCancel() {
      this.resetFormState();
      this.$refs.productFormRef.resetFields();
      this.$emit('update:open', false);
    },
    async onFinish(values) {
      if (this.submitting) return;
      this.submitting = true;
      if (this.type === 'create') {
        await createProductService(values)
          .then((response) => {
            this.openNotificationWithIcon(
              'success',
              'Success',
              response.message
            );
            this.$emit('productAdded');
            this.$emit('update:open', false);
          })
          .catch((error) => {
            this.openNotificationWithIcon('error', 'Error', error.message);
          })
          .finally(() => {
            this.submitting = false;
          });
      } else if (this.type === 'update') {
        await updateProductService(this.product.id, values)
          .then((response) => {
            this.$emit('productUpdated');
            this.$emit('update:open', false);
            this.openNotificationWithIcon(
              'success',
              'Success',
              response.message
            );
          })
          .catch((error) => {
            this.openNotificationWithIcon('error', 'Error', error.message);
          })
          .finally(() => {
            this.submitting = false;
          });
      }
    },
    onFinishFailed(errorInfo) {
      this.submitting = false;
    },
  },
};
</script>

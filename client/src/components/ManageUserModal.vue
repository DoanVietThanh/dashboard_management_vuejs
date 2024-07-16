<template>
  <a-modal
    :visible="open"
    :title="type === 'create' ? 'Create User' : 'Update User'"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <ReusableFormInput :formFields="formFields" :formState="formState" />

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
import { manageUserFormFieldsRules } from '../validations/user.validation.js';
import { createUserService, updateUserService } from '../services/user.service';

export default {
  name: 'ManageUserModal',
  components: {
    ReusableFormInput,
  },
  props: {
    title: {
      type: String,
      default: 'Manage User',
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
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formFields: manageUserFormFieldsRules,
      formState: {
        userName: '',
        email: '',
        password: '',
        role: '',
        address: '',
        phoneNumber: '',
      },
      submitting: false, // Track the submission state
    };
  },
  watch: {
    user(newVal) {
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
        userName: '',
        email: '',
        password: '',
        role: '',
        address: '',
        phoneNumber: '',
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
      this.$emit('update:open', false);
    },
    async onFinish(values) {
      if (this.submitting) return; // Prevent double submission
      this.submitting = true;

      console.log('🚀 ~ onFinish ~ values:', values);
      if (this.type === 'create') {
        await createUserService(values)
          .then((response) => {
            this.openNotificationWithIcon(
              'success',
              'Success',
              response.message
            );
            this.$emit('userAdded');
            this.$emit('update:open', false);
          })
          .catch((error) => {
            this.openNotificationWithIcon('error', 'Error', error.message);
          })
          .finally(() => {
            this.submitting = false;
          });
      } else if (this.type === 'update') {
        await updateUserService(this.user.id, values)
          .then((response) => {
            this.$emit('userUpdated');
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
      console.log('Failed:', errorInfo);
      this.submitting = false; // Reset submitting state on failure
    },
  },
};
</script>

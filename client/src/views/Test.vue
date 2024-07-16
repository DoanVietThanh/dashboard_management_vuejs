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

      <a-form-item
        label="User Name"
        name="userName"
        :rules="[
          { required: true, message: 'Please input your user name!' },
          { min: 4, message: 'Length of user name is more than 4' },
        ]"
      >
        <a-input v-model:value="formState.userName" />
      </a-form-item>
      <a-form-item
        label="Email"
        name="email"
        :rules="[
          { required: true, message: 'Please input your email!' },
          {
            type: 'email',
            message: 'Email is wrong format. Email should be abc@gmail.com',
          },
          { validator: validateEmailExistence },
        ]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Length of password is more than 8' },
        ]"
      >
        <a-input
          :disabled="type === 'update'"
          v-model:value="formState.password"
        />
      </a-form-item>

      <a-form-item
        label="Role"
        name="role"
        :rules="[{ required: true, message: 'Please chose role!' }]"
      >
        <a-select
          ref="select"
          v-model:value="formState.role"
          style="width: 100%"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="admin">admin</a-select-option>
          <a-select-option value="user">user</a-select-option>
          <a-select-option value="userAdmin">Manage User</a-select-option>
          <a-select-option value="productAdmin">Manage Product</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="Address"
        name="address"
        :rules="[
          { required: true, message: 'Please input your address!' },
          { min: 8, message: 'Length of address is more than 8' },
        ]"
      >
        <a-input v-model:value="formState.address" />
      </a-form-item>

      <a-form-item
        label="Phone Number"
        name="phoneNumber"
        :rules="[
          {
            required: true,
            message: 'Please input your phone number!',
          },
          { min: 8, message: 'Length of phone number is 10 chars' },
        ]"
      >
        <a-input v-model:value="formState.phoneNumber" />
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

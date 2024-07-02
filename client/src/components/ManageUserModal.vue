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
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      labelAlign="left"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
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
        <a-input v-model:value="formState.password" />
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
        label="Phone"
        name="phone"
        :rules="[
          { required: true, message: 'Please input your phone!' },
          { min: 8, message: 'Length of phone is 10 chars' },
        ]"
      >
        <a-input v-model:value="formState.phone" />
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
  name: 'ManageUserModal',
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
      formState: {
        email: '',
        password: '',
        role: '',
        address: '',
        phone: '',
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
        email: '',
        password: '',
        role: '',
        address: '',
        phone: '',
      };
    },
    handleCancel() {
      this.$emit('update:open', false);
    },
    async onFinish(values) {
      if (this.submitting) return; // Prevent double submission
      this.submitting = true;

      if (this.type === 'create') {
        try {
          const response = await axios.post(
            'https://66781b960bd45250561d86d1.mockapi.io/users',
            values
          );
          if (response.status === 201) {
            alert('Add success');
            this.$emit('userAdded');
            this.$emit('update:open', false);
          } else {
            alert('Add fail');
          }
        } catch (error) {
          console.error('Error adding user:', error);
          alert('Add fail');
        } finally {
          this.submitting = false;
        }
      } else if (this.type === 'update') {
        try {
          const response = await axios.put(
            `https://66781b960bd45250561d86d1.mockapi.io/users/${this.user.id}`,
            values
          );
          if (response.status === 200) {
            alert('Update success');
            this.$emit('userUpdated');
            this.$emit('update:open', false);
          } else {
            alert('Update fail');
          }
        } catch (error) {
          console.error('Error updating user:', error);
          alert('Update fail');
        } finally {
          this.submitting = false;
        }
      }
    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo);
      this.submitting = false; // Reset submitting state on failure
    },
  },
};
</script>

<template>
  <div
    class="h-screen w-screen flex justify-center items-center bg-slate-300 shadow-2xl"
  >
    <div class="bg-white w-[400px] h-auto border p-8 rounded-lg">
      <h1 class="text-4xl text-center font-bold text-orange-700 mb-8">
        FPT Software
      </h1>
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finish-failed="onFinishFailed"
      >
        <ReusableFormInput :formFields="formFields" :formState="formState" />
        <a-form-item>
          <button
            type="submit"
            class="border rounded-xl bg-orange-500 text-white py-2 w-full text-xl"
          >
            Submit
          </button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { notification } from 'ant-design-vue';
import { loginUser } from '../services/user.service.js';
import { loginFormFieldsRules } from '../validations/user.validation.js';
import ReusableFormInput from '../components/ReusableFormInput.vue';

export default {
  name: 'SignIn',
  components: {
    ReusableFormInput,
  },
  data() {
    return {
      formFields: loginFormFieldsRules,
      formState: {
        email: 'admin@gmail.com',
        password: '123456789',
      },
    };
  },
  mounted() {
    localStorage.clear();
  },
  methods: {
    async onFinish(values) {
      await loginUser(values.email, values.password)
        .then((response) => {
          if (response.data.role == 'user') {
            this.openNotificationWithIcon(
              'error',
              'Error',
              "You don't have permission"
            );
            return;
          }
          console.log('🚀 ~ .then ~ response:', response);
          this.openNotificationWithIcon('success', 'Success', response.message);
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('role', response.data.role);
          this.$router.push({ name: 'dashboard' });
        })
        .catch((error) => {
          this.openNotificationWithIcon('error', 'Error', error.message);
        });
    },
    openNotificationWithIcon(type, message, description) {
      return notification[type]({
        message,
        description,
        duration: 3,
      });
    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo);
    },
  },
};
</script>

<style>
.ant-row {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ant-form-item-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

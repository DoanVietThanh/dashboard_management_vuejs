<template>
  <div class="h-screen w-screen flex justify-center items-center bg-[#F5F5F5]">
    <div class="bg-white text-center w-[400px] h-auto border p-8 rounded-lg">
      <h1 class="text-4xl font-bold text-blue-700 mb-8">Please Sign In</h1>
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        labelAlign="left"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        @finish="onFinish"
        @finish-failed="onFinishFailed"
      >
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            { required: true, message: 'Email is mandatory' },
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
            { required: true, message: 'Password is mandatory' },
            { min: 8, message: 'Length of password is more than 8' },
          ]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="formState.remember">
            Remember me
          </a-checkbox>
        </a-form-item>

        <a-form-item>
          <button
            type="submit"
            class="border rounded-xl bg-blue-600 text-white py-2 w-full text-xl"
          >
            Submit
          </button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { notification } from 'ant-design-vue';

export default {
  name: 'SignIn',
  data() {
    return {
      userList: [],
      formState: {
        email: 'admin@gmail.com',
        password: '123456789',
        remember: true,
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onFinish(values) {
      if (this.userList.length > 0) {
        const findUser = this.userList.find(
          (user) => user.email === values.email
        );

        if (findUser) {
          if (findUser.password === values.password) {
            localStorage.setItem('user', JSON.stringify(findUser));
            localStorage.setItem('role', findUser.role);
            this.$router.push({ name: 'dashboard' });
          } else {
            this.openNotificationWithIcon(
              'error',
              'Error',
              'Wrong email or password'
            );
          }
        } else {
          this.openNotificationWithIcon(
            'error',
            'Error',
            'Wrong email or password'
          );
        }
      }
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
    loadData() {
      axios
        .get('https://66781b960bd45250561d86d1.mockapi.io/users')
        .then((response) => {
          console.log('🚀 ~ .then ~ response:', response);
          this.userList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
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

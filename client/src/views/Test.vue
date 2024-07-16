<!-- <template>
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
          v-for="field in formFields"
          :key="field.name"
          :name="field.name"
          :label="field.label"
          :rules="field.rules"
        >
          <a-input
            :type="field.name"
            v-model:value="formState[field.name]"
            v-bind="field.props"
          />
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
import { notification } from 'ant-design-vue';
import { loginUser } from '../services/user.service.js';
import ReusableForm from '../components/ReusableFormInput.vue';

export default {
  name: 'SignIn',
  components: {
    ReusableForm,
  },
  data() {
    return {
      formFields: [
        {
          label: 'Email',
          name: 'email',
          type: 'a-input',
          rules: [
            { required: true, message: 'Email is mandatory' },
            {
              type: 'email',
              message:
                'Email is in wrong format. Email should be abc@gmail.com',
            },
            { validator: this.validateEmailExistence },
          ],
        },
        {
          label: 'Password',
          name: 'password',
          type: 'a-input-password',
          rules: [
            { required: true, message: 'Password is mandatory' },
            {
              min: 8,
              message: 'Length of password should be more than 8 characters',
            },
          ],
        },
      ],
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
</style> -->

const validUserRules = {
  email: {
    htmlFor: 'Email Target',
    label: 'Email',
    name: 'email',
    type: 'a-input',
    rules: [
      { required: true, message: 'Email is mandatory' },
      {
        type: 'email',
        message: 'Email is in wrong format. Email should be abc@gmail.com',
      },
    ],
  },
  password: {
    htmlFor: 'PasswordTarget',
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
  userName: {
    htmlFor: 'UserName Target',
    label: 'User Name',
    name: 'userName',
    type: 'a-input',
    rules: [
      { required: true, message: 'Please input your user name!' },
      { min: 4, message: 'Length of user name is more than 4' },
    ],
  },
  role: {
    htmlFor: 'Role Target',
    label: 'Role',
    name: 'role',
    type: 'a-select',
    options: [
      {
        label: 'User',
        value: 'user',
      },
      {
        label: 'Admin',
        value: 'admin',
      },
      {
        label: 'Manage User',
        value: 'userAdmin',
      },
      {
        label: 'Manage Product',
        value: 'productAdmin',
      },
    ],
    rules: [{ required: true, message: 'Please select your role!' }],
  },
  address: {
    htmlFor: 'Address Target',
    label: 'Address',
    name: 'address',
    type: 'a-input',
    rules: [
      { required: true, message: 'Please input your address!' },
      { min: 8, message: 'Length of address is more than 8' },
    ],
  },
  phoneNumber: {
    htmlFor: 'PhoneNumber Target',
    label: 'Phone Number',
    name: 'phoneNumber',
    type: 'a-input',
    rules: [
      { required: true, message: 'Phone number is mandatory' },
      { min: 10, message: 'Length of phone number should be more than 10' },
      { pattern: /^0[1-9][0-9]{8}$/, message: 'Invalid phone number format!' },
    ],
  },
};

const loginFormFieldsRules = [validUserRules.email, validUserRules.password];

const manageUserFormFieldsRules = [
  validUserRules.email,
  validUserRules.password,
  validUserRules.userName,
  validUserRules.role,
  validUserRules.address,
  validUserRules.phoneNumber,
];

export { loginFormFieldsRules, manageUserFormFieldsRules };

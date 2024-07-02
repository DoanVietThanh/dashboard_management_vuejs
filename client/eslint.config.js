import pluginVue from 'eslint-plugin-vue';

export default [
  //   ...pluginVue.configs['flat/essential'],
  //   ...pluginVue.configs['flat/strongly-recommended'],
  //   ...pluginVue.configs['flat/recommended'],
  {
    extends: [
      'plugin:vue/vue3-essential',
      'plugin:vue/vue3-strongly-recommended',
      'plugin:vue/vue3-recommended',
    ],
    rules: {
      'vue/no-v-model-argument': 'off',
      // Add other custom rules here
    },
  },
];

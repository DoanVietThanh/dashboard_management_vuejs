<template lang="">
  <div
    class="flex justify-center items-center h-screen w-screen overflow-hidden bg-slate-400"
  >
    <div
      class="text-3xl font-semibold text-center bg-white px-8 py-4 rounded-xl shadow-xl"
    >
      <h1 class="text-red-500">You are not allowed to access this page</h1>
      <button
        @click="backToLogin()"
        class="text-orange-500 p-4 bg-slate-100 rounded-lg shadow-md hover:opacity-70"
      >
        Back to login
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Unauthorization',
  methods: {
    backToLogin() {
      this.$router.push({ name: 'signin' });
    },
  },
};
</script>

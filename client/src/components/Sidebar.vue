<template>
  <div class="bg-white border-r-2 h-screen flex flex-col justify-between">
    <div>
      <div class="text-2xl p-4 text-center text-[#5F617E] bg-white">
        <router-link
          :to="{ name: 'dashboard' }"
          class="flex items-center gap-2"
        >
          <img
            alt="logo"
            src="https://static.ybox.vn/2020/2/1/1581927973887-1581308594585-FPT_Software_Logo.png"
          />
        </router-link>
      </div>
      <div class="flex flex-col p-4 gap-4">
        <router-link
          v-if="currentRole === 'admin' || currentRole === 'userAdmin'"
          :to="{ name: 'dashboard/manage-users' }"
          class="shadow-md flex items-center gap-4 border p-4 rounded-lg hover:bg-gray-200 hover:text-black text-[#5F617E] transition-colors"
          active-class="active"
        >
          <v-icon name="fa-user-friends" />
          Manage Users
        </router-link>
        <router-link
          v-if="currentRole === 'admin' || currentRole === 'productAdmin'"
          :to="{ name: 'dashboard/manage-products' }"
          class="shadow-md flex items-center gap-4 border p-4 rounded-lg hover:bg-gray-200 hover:text-black text-[#5F617E] transition-colors"
          active-class="active"
        >
          <v-icon name="bi-boxes" />
          Manage Products
        </router-link>
      </div>
    </div>
    <div
      @click="logout()"
      class="m-4 shadow-md flex gap-4 border p-4 rounded-lg bg-red-400 text-white text-[#5F617E] transition-colors cursor-pointer"
    >
      <v-icon name="hi-logout" />
      Logout
    </div>
  </div>
</template>

<script>
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import { FaUserFriends, BiBoxes, HiLogout } from 'oh-vue-icons/icons';

// Add the icons to be used
addIcons(FaUserFriends, BiBoxes, HiLogout);
export default {
  name: 'Sidebar',
  components: {
    'v-icon': OhVueIcon,
  },
  data() {
    return {
      currentRole: localStorage.getItem('role'),
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'signin' });
    },
  },
};
</script>

<style>
.active {
  background-color: #e0e0e0;
  color: black;
}
</style>

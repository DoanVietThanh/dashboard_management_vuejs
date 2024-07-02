<template>
  <div class="flex h-screen w-screen overflow-hidden">
    <div class="w-1/6">
      <Sidebar />
    </div>
    <div class="flex-1 flex flex-col">
      <header
        class="bg-white flex justify-between items-center gap-8 border-b-2"
      >
        <h1 class="text-xl p-4 bg-white m-0 flex items-center gap-2">
          <v-icon name="bi-calendar-week" scale="1.5" />
          {{ new Date().toDateString() }}
        </h1>
        <div class="text-xl p-4 bg-white flex items-center gap-2">
          <v-icon
            name="fa-user-alt"
            animation="pulse"
            speed="slow"
            fill="green"
            scale="1.5"
          />
          {{ currentUser.email }}
        </div>
      </header>
      <div
        v-if="isDashboardRoute"
        class="flex justify-center items-center h-full p-4 text-2xl uppercase font-bold text-orange-500"
      >
        Welcome to dashboard !
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import { FaUserAlt, BiCalendarWeek } from 'oh-vue-icons/icons';

// Add the icons to be used
addIcons(FaUserAlt, BiCalendarWeek);

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    'v-icon': OhVueIcon,
  },
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('user')),
    };
  },
  computed: {
    isDashboardRoute() {
      return this.$route.path === '/dashboard';
    },
  },
};
</script>

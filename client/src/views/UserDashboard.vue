<template>
  <div class="container h-full p-8 overflow-y-auto bg-slate-100">
    <div class="bg-white p-4 rounded-lg">
      <div class="flex justify-between mb-4">
        <h1 class="text-xl">User Management</h1>
        <a-button @click="showModal" class="flex items-center gap-2 shadow">
          <v-icon name="la-plus-circle-solid" />
          <span>Create</span>
        </a-button>
      </div>
      <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
        <!-- Custom Role Render -->
        <template #role="{ text }">
          <span v-if="text === 'admin'">Admin</span>
          <span v-if="text === 'productAdmin'">Manage Product</span>
          <span v-if="text === 'userAdmin'">Manage User</span>
          <span v-if="text === 'user'">User</span>
        </template>
        <!-- Custom Action Render -->
        <template #action="{ record }">
          <div class="flex gap-4 items-center">
            <a-button
              class="bg-red-500 text-white hover:text-white"
              @click="handleDelete(record.id)"
            >
              <v-icon name="bi-trash" />
            </a-button>
            <a-button type="primary" @click="handleUpdate(record)">
              <v-icon name="fa-edit" />
            </a-button>
          </div>
        </template>
      </a-table>
    </div>
    <ManageUserModal
      :type="type"
      :title="title"
      :open="isModalOpen"
      :user="currentUser"
      @update:open="isModalOpen = $event"
      @userAdded="loadData"
      @userUpdated="loadData"
    />
  </div>
</template>

<script>
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import { FaEdit, BiTrash, LaPlusCircleSolid } from 'oh-vue-icons/icons';
import ManageUserModal from '../components/ManageUserModal.vue';
import {
  getAllUsersService,
  deleteUserService,
} from '../services/user.service';

addIcons(FaEdit, BiTrash, LaPlusCircleSolid);

export default {
  components: {
    ManageUserModal,
    'v-icon': OhVueIcon,
  },
  data() {
    return {
      title: 'Manage User',
      isModalOpen: false,
      type: 'create', // or 'update'
      currentUser: null, // Store the current user for updating
      dataSource: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'User Name',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: 'Phone Number',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          slots: { customRender: 'role' },
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          slots: { customRender: 'action' },
        },
      ],
    };
  },
  methods: {
    async loadData() {
      try {
        const response = await getAllUsersService();
        // this.dataSource = response.data.filter(
        //   (user) =>
        //     user.role !== localStorage.getItem('role') && user.role !== 'admin'
        // );
        this.dataSource = response.data;
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    openNotificationWithIcon(type, message, description) {
      return notification[type]({
        message,
        description,
        duration: 3,
      });
    },
    async handleDelete(id) {
      if (confirm('Are you sure you want to delete this user?')) {
        await deleteUserService(id)
          .then((res) => {
            this.openNotificationWithIcon(
              'success',
              'Delete success',
              res.message
            );
          })
          .catch((error) => {
            this.openNotificationWithIcon('error', 'Error', error.message);
          })
          .finally(() => {
            this.loadData();
          });
      }
    },
    handleUpdate(record) {
      this.type = 'update';
      this.title = 'Update User';
      this.currentUser = record; // Set the current user for the modal
      this.isModalOpen = true;
    },
    showModal() {
      this.type = 'create';
      this.title = 'Create User';
      this.currentUser = {
        userName: '',
        email: '',
        password: '',
        role: '',
        address: '',
        phoneNumber: '',
      };
      this.isModalOpen = true;
    },
    roleClass(role) {
      switch (role) {
        case 'Admin':
          return 'text-red-500';
        case 'User':
          return 'text-green-500';
        default:
          return 'text-gray-500';
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

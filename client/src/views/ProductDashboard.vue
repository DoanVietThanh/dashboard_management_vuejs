<template>
  <div class="container h-full p-8 overflow-y-auto bg-slate-100">
    <div class="bg-white p-4 rounded-lg">
      <div class="flex justify-between mg-4">
        <h1 class="text-2xl">Product Management</h1>
        <a-button @click="showModal" class="flex items-center gap-2 shadow">
          <v-icon name="la-plus-circle-solid" />
          <span>Create</span>
        </a-button>
      </div>
      <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
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
    <ManageProductModal
      :type="type"
      :title="title"
      :open="isModalOpen"
      :product="currentProduct"
      @update:open="isModalOpen = $event"
      @productAdded="loadData"
      @productUpdated="loadData"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import { FaEdit, BiTrash, LaPlusCircleSolid } from 'oh-vue-icons/icons';
import ManageProductModal from '../components/ManageProductModal.vue';

addIcons(FaEdit, BiTrash, LaPlusCircleSolid);

export default {
  components: {
    ManageProductModal,
    'v-icon': OhVueIcon,
  },
  data() {
    return {
      title: 'Manage Product',
      isModalOpen: false,
      type: 'create', // or 'update'
      currentProduct: null, // Store the current user for updating
      dataSource: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Brand',
          dataIndex: 'brand',
          key: 'brand',
        },
        {
          title: 'UrlImage',
          dataIndex: 'urlImage',
          key: 'urlImage',
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
        const response = await axios.get(
          'https://66781b960bd45250561d86d1.mockapi.io/products'
        );
        this.dataSource = response.data;
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    async handleDelete(id) {
      try {
        if (confirm('Are you sure you want to delete this product?')) {
          const res = await axios.delete(
            `https://66781b960bd45250561d86d1.mockapi.io/products/${id}`
          );
          if (res.status === 200) {
            alert('Delete product success');
          }
        }
        this.loadData();
      } catch (error) {
        console.error('Error deleting Product:', error);
      }
    },
    handleUpdate(record) {
      this.type = 'update';
      this.title = 'Update User';
      this.currentProduct = record;
      this.isModalOpen = true;
    },
    showModal() {
      this.type = 'create';
      this.title = 'Create Product';
      this.currentProduct = {
        name: '',
        price: '',
        description: '',
        brand: '',
        urlImage: '',
      };
      this.isModalOpen = true;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

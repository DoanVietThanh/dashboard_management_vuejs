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
        <template #price="{ record }">
          <span class="font-semibold text-yellow-700">
            $ {{ record.price.toLocaleString() }}
          </span>
        </template>

        <template #urlImage="{ record }">
          <div class="flex justify-center">
            <img
              :src="record.urlImage"
              :alt="record.productName"
              class="w-20 h-20 object-cover shadow-md rounded-lg"
            />
          </div>
        </template>

        <template #action="{ record }">
          <div class="flex gap-4 items-center justify-end">
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
import { notification } from 'ant-design-vue';
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import { FaEdit, BiTrash, LaPlusCircleSolid } from 'oh-vue-icons/icons';
import ManageProductModal from '../components/ManageProductModal.vue';
import {
  getAllProductsService,
  deleteProductService,
} from '../services/product.service';
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
          title: 'Product Name',
          dataIndex: 'productName',
          key: 'productName',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          align: 'center',
          slots: { customRender: 'price' },
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Image',
          dataIndex: 'urlImage',
          key: 'urlImage',
          align: 'center',
          slots: { customRender: 'urlImage' },
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          align: 'right',
          slots: { customRender: 'action' },
        },
      ],
    };
  },
  methods: {
    async loadData() {
      try {
        const response = await getAllProductsService();
        console.log('🚀 ~ loadData ~ response:', response);
        this.dataSource = response.data;
      } catch (error) {
        this.openNotificationWithIcon('error', 'Error', 'Error loading data');
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
      if (confirm('Are you sure you want to delete this product?')) {
        await deleteProductService(id)
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

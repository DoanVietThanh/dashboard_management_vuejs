<template>
  <div class="text-3xl text-red-400">
    <div><Button type="primary">Button</Button></div>
    <a-table :dataSource="dataSource" :columns="columns" />
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
export default {
  name: 'HomeView',
  components: {
    Button,
  },
  data() {
    return {
      dataSource: [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ],

      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ],
    };
  },
};
</script>

<style></style>

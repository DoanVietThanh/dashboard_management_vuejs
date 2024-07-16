const validProductRules = {
  name: {
    htmlFor: 'Name Target',
    label: 'Name',
    name: 'name',
    type: 'a-input',
    rules: [
      { required: true, message: 'Please input product name!' },
      { min: 4, message: 'Length of name is more than 4' },
    ],
  },
  price: {
    htmlFor: 'Price Target',
    label: 'Price',
    name: 'price',
    type: 'a-input',
    rules: [{ required: true, message: 'Please input product price!' }],
  },
  description: {
    htmlFor: 'Description Target',
    label: 'Description',
    name: 'description',
    type: 'a-input',
    rules: [
      { required: true, message: 'Please input product description!' },
      { min: 4, message: 'Length of description is more than 4' },
    ],
  },
  urlImage: {
    htmlFor: 'URL Image Target',
    label: 'URL Image',
    name: 'urlImage',
    type: 'a-input',
    rules: [{ required: true, message: 'Please input product image URL!' }],
  },
};

const manageProductFormFieldsRules = [
  validProductRules.name,
  validProductRules.price,
  validProductRules.description,
  validProductRules.urlImage,
];

export { manageProductFormFieldsRules };

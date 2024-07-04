const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAllProductsService = async () => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
};

const createProductService = async (product) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productName: product.name.trim(),
      price: product.price,
      description: product.description.trim(),
      urlImage: product.urlImage.trim(),
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
};

const updateProductService = async (productId, product) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productName: product.name.trim(),
      price: product.price,
      description: product.description.trim(),
      urlImage: product.urlImage.trim(),
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
};

const deleteProductService = async (productId) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
};

export {
  getAllProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
};

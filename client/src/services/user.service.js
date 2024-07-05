const BASE_URL = import.meta.env.VITE_BASE_URL;

const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
};

const getAllUsersService = async () => {
  const response = await fetch(`${BASE_URL}/users`, {
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

const createUserService = async (user) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
};

const updateUserService = async (userId, data) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const result = await response.json();
  return result;
};

const deleteUserService = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const result = await response.json();
  return result;
};

export {
  loginUser,
  getAllUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
};

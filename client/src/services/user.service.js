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
    console.log('🚀 ~ loginUser ~ error:', error);
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
};

const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const error = await response.json();
    console.log('🚀 ~ loginUser ~ error:', error);
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
};

export { loginUser, getAllUsers };

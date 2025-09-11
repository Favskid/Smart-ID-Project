import api from "./apiClient";

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { access_token } = response.data;

    if (access_token) {
      localStorage.setItem("authToken", access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// Register function
export const register = async (userData) => {
  try {
    // Ensure the data structure matches backend expectations
    const registrationData = {
      email: userData.email,
      password: userData.password,
      staffId: userData.staffID, // Note: backend expects 'staffId' not 'staffID'
      department: userData.department
    };

    const response = await api.post("/auth/register", registrationData);
    const { access_token } = response.data;

    if (access_token) {
      localStorage.setItem("authToken", access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    }

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

// Get user profile
export const getProfile = async () => {
  try {
    const response = await api.get("/get/profile");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error.response?.data || error.message);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/update/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Failed to update profile:", error.response?.data || error.message);
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("authToken");
  delete api.defaults.headers.common["Authorization"];
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

// Get stored token
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Add profile photo
export const addProfilePhoto = async (photoFile) => {
  try {
    const formData = new FormData();
    formData.append('profilePhoto', photoFile);
    
    const response = await api.post("/add/profilePhoto", formData, {
      headers: {
        'Content-Type': undefined, // Let browser set the Content-Type with boundary
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to upload profile photo:", error.response?.data || error.message);
    throw error;
  }
};

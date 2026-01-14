import api from "./axios";

// ✅ AUTH
export const signup = async (signupData) => {
  const response = await api.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await api.post("/auth/onboarding", userData);
  return response.data;
};

// ✅ USERS
export const getUserFriends = async () => {
  const response = await api.get("/users/friends");
  return response.data;
};

export const getRecommendedUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getOutgoingFriendReqs = async () => {
  const response = await api.get("/users/outgoing-friend-requests");
  return response.data;
};

export const sendFriendRequest = async (userId) => {
  const response = await api.post(`/users/friend-request/${userId}`);
  return response.data;
};

export const getFriendRequests = async () => {
  const response = await api.get("/users/friend-requests");
  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await api.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
};

// ✅ STREAM
export const getStreamToken = async () => {
  const response = await api.get("/chat/token");
  return response.data;
};

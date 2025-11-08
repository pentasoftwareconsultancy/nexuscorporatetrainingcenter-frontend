const storageService = {
  // 🔹 Save logged-in user data
  saveUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  // 🔹 Get stored user
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // 🔹 Remove user (logout)
  removeUser: () => {
    localStorage.removeItem("user");
  },

  // 🔹 Optional: token functions if you use JWT
  saveToken: (token) => localStorage.setItem("token", token),
  getToken: () => localStorage.getItem("token"),
  removeToken: () => localStorage.removeItem("token"),
};

export default storageService;

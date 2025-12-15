export interface User {
  username: string;
  balance: number;
  isAdmin: boolean;
}

const ADMIN_CREDENTIALS = {
  username: "Никита",
  password: "2010",
};

const STORAGE_KEY = "rgb_user_session";

export const login = (username: string, password: string): User | null => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const user: User = {
      username: ADMIN_CREDENTIALS.username,
      balance: 0,
      isAdmin: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
};

export const updateUserBalance = (newBalance: number) => {
  const user = getCurrentUser();
  if (user) {
    user.balance = newBalance;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
};

export const addToBalance = (amount: number) => {
  const user = getCurrentUser();
  if (user) {
    user.balance += amount;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
};

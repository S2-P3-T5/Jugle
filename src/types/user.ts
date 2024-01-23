export type User = {
  id: string;
  type: UserType;
};

export type UserType = "employee" | "employer";

export type SignupForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  type: UserType;
};

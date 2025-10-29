interface CrateUser {
  patient: {
    name: string;
    email: string;
    profilePhoto?: string;
    address?: string;
  };
  password: string;
}

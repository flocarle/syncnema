import { axiosClient } from "./axiosClient";

export const create = async ({ id, email }: { id: string; email: string }) =>
  await axiosClient.post<{ message: string }>("/users", {
    user: {
      externalId: id,
      email,
    },
  });

export const deleteUser = async ({ id }: { id: string }) =>
  await axiosClient.delete<{ message: string }>(`/users/${id}`);

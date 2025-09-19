import { prisma } from "../../config/db";
import { Prisma, User } from "@prisma/client";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  console.log(createdUser);
  return createdUser;
};

const getAllFromDb = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      Post: true,
      status: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  return result;
};

const getUserById = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      role: true,
      email: true,
      phone: true,
      status: true,
      Post: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const deleteUserById = async (id: number) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};
export const UserServices = {
  createUser,
  getAllFromDb,
  getUserById,
  deleteUserById,
};

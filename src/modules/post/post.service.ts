import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
    include: {
      author: true,
    },
  });
  return result;
};
const getAllPosts = async (page: number, limit: number): Promise<Post[]> => {
  console.log(page, limit);
  const result = await prisma.post.findMany({});
  return result;
};
const getPostById = async (id: number): Promise<Post | null> => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deletePostById = async (id: number) => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};
export const PostService = {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
};

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
const getAllPosts = async (
  page: number,
  limit: number,
  search?: string,
  isFeatured?: boolean,
  tags?: string[]
) => {
  console.log(page, limit);
  const skip = (page - 1) * limit;
  console.log(tags);

  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      tags && tags.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };
  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  const total = await prisma.post.count({ where });
  return {
    data: result,
    pagination: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};
const getPostById = async (id: number): Promise<Post | null> => {
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return await tx.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
  });
};

const deletePostById = async (id: number) => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

const getPostStats = async () => {
  console.log("i was here");
  return await prisma.$transaction(async (tx) => {
    const aggregates = await tx.post.aggregate({
      _count: { _all: true },
      _max: {
        views: true,
      },
      _sum: {
        views: true,
      },
      _avg: {
        views: true,
      },
      _min: {
        views: true,
      },
    });

    const featuredCount = await tx.post.count({
      where: {
        isFeatured: true,
      },
    });
    const topFeatured = await tx.post.findFirst({
      where: {
        isFeatured: true,
      },
      orderBy: {
        views: "desc",
      },
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastWeekPostCount = await tx.post.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    });

    return {
      stats: {
        totalPosts: aggregates?._count ?? 0,
        totalViews: aggregates?._sum.views ?? 0,
        avgViews: aggregates?._avg.views ?? 0,
        minViews: aggregates?._min.views ?? 0,
        maxViews: aggregates?._max.views ?? 0,
      },
      featured: {
        count: featuredCount,
        topPost: topFeatured,
      },
      lastWeekPostCount,
    };
  });
};
export const PostService = {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
  getPostStats,
};

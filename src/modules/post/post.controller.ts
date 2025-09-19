import { NextFunction, Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PostService.createPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const result = await PostService.getAllPosts(page, limit);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await PostService.getPostById(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await PostService.deletePostById(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
};

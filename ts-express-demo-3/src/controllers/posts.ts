import { Response, Request, NextFunction, Application } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const getPosts = async (req: Request, res: Response, nest: NextFunction) => {
  try {
    const result: AxiosResponse = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    const posts: Post[] = result.data;

    return res.status(200).json({
      message: posts,
    });
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
    });
  }
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;

  try {
    const result: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    const post: Post = result.data;

    return res.status(200).json({
      message: post,
    });
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
    });
  }
};

const updatePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const title: string = req.body.title ?? null;
  const body: string = req.body.body ?? null;

  try {
    const response: AxiosResponse = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        ...(title && { title }),
        ...(body && { body }),
      }
    );
    // return response
    return res.status(200).json({
      message: response.data,
    });
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
    });
  }
};

const deletePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const result: AxiosResponse = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    return res.status(200).json({
      message: 'Post deleted',
    });
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
    });
  }
};

const addPost = async (
  req: Request<{}, {}, { title: string; body: string }>,
  res: Response,
  next: NextFunction
) => {
  const title: string = req.body.title;
  const body: string = req.body.body;

  try {
    const result: AxiosResponse = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        title,
        body,
      }
    );

    const post: Post = result.data;

    return res.status(201).json({
      message: post,
    });
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
    });
  }
};

export default { getPosts, getPost, updatePost, deletePost, addPost };

import { Request, Response } from 'express';
import Forum, { IForum } from '../model/forum.model'; 


export const createForumPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, question, answer } = req.body;

   
    if (!user || !question || !answer) {
      res.status(400).json({ message: 'User, question, and answer are required' });
      return;
    }

    const newForumPost: IForum = new Forum({
      user,
      question,
      answer,
      timestamp: new Date(),
    });

    await newForumPost.save();
    res.status(201).json(newForumPost);
  } catch (error) {
    console.error('Error creating forum post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getAllForumPosts = async (_: Request, res: Response): Promise<void> => {
  try {
    const forumPosts: IForum[] = await Forum.find().populate('user', 'username');
    res.status(200).json(forumPosts);
  } catch (error) {
    console.error('Error getting forum posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getForumPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const forumPostId: string = req.params.id;
    const forumPost: IForum | null = await Forum.findById(forumPostId).populate('user', 'username');

    if (!forumPost) {
      res.status(404).json({ message: 'Forum post not found' });
      return;
    }

    res.status(200).json(forumPost);
  } catch (error) {
    console.error('Error getting forum post by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

import { Request, Response } from "express";
import Group, { IGroup } from "../model/group.model";
import mongoose from "mongoose";

export const createGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, creator } = req.body;
    const newGroup: IGroup = new Group({
      name,
      creator: mongoose.Types.ObjectId.createFromHexString(creator),
      posts: [],
    });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllGroups = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const groups: IGroup[] = await Group.find().populate("creator", "username");
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error getting groups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGroupById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.id;
    const group: IGroup | null = await Group.findById(groupId).populate({
        path: "posts.user",
        select: "username", 
      }).populate({
        path: "posts.comments.user",
        select: "username",
        });
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.status(200).json(group);
  } catch (error) {
    console.error("Error getting group by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateGroupById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.id;
    const { name }: { name: string } = req.body;
    const updatedGroup: IGroup | null = await Group.findByIdAndUpdate(
      groupId,
      { name },
      { new: true }
    );
    if (!updatedGroup) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error("Error updating group by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteGroupById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.id;
    const deletedGroup: IGroup | null = await Group.findByIdAndDelete(groupId);
    if (!deletedGroup) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.status(200).json(deletedGroup);
  } catch (error) {
    console.error("Error deleting group by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addPostToGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.id;
    const {
      user,
      content,
      attachment,
    }: { user: string; content: string; attachment?: string } = req.body;
    const post = {
      user: mongoose.Types.ObjectId.createFromHexString(user),
      content,
      attachment,
      comments: [],
      upvotes: [],
      downvotes: [],
      totalUpvotes: 0,
      totalDownvotes: 0,
    };
    const updatedGroup: IGroup | null = await Group.findByIdAndUpdate(
      groupId,
      { $push: { posts: post } },
      { new: true }
    );
    if (!updatedGroup) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
  } catch (error) {
    console.error("Error adding post to group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePostInGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.groupId;
    const postId: string = req.params.postId;
    const { content, attachment }: { content: string; attachment?: string } =
      req.body;
    const updatedGroup: IGroup | null = await Group.findOneAndUpdate(
      { _id: groupId, "posts._id": postId },
      {
        $set: { "posts.$.content": content, "posts.$.attachment": attachment },
      },
      { new: true }
    );
    if (!updatedGroup) {
      res.status(404).json({ message: "Group or post not found" });
      return;
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error("Error updating post in group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePostFromGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.groupId;
    const postId: string = req.params.postId;
    const updatedGroup: IGroup | null = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { posts: { _id: postId } } },
      { new: true }
    );
    if (!updatedGroup) {
      res.status(404).json({ message: "Group or post not found" });
      return;
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error("Error deleting post from group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCommentToPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.groupId;
    const postId: string = req.params.postId;
    const { user, content }: { user: string; content: string } = req.body;
    const comment = {
      user: mongoose.Types.ObjectId.createFromHexString(user),
      content,
      timestamp: new Date(),
      upvotes: [],
      downvotes: [],
    };
    const updatedGroup: IGroup | null = await Group.findOneAndUpdate(
      { _id: groupId, "posts._id": postId },
      { $push: { "posts.$.comments": comment } },
      { new: true }
    );
    if (!updatedGroup) {
      res.status(404).json({ message: "Group or post not found" });
      return;
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error("Error adding comment to post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCommentInGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.groupId;
    const postId: string = req.params.postId;
    const commentId: string = req.params.commentId;
    const { content }: { content: string } = req.body;
    const updatedGroup: IGroup | null = await Group.findOneAndUpdate(
      { _id: groupId, "posts._id": postId, "posts.comments._id": commentId },
      { $set: { "posts.$[post].comments.$[comment].content": content } },
      {
        new: true,
        arrayFilters: [{ "post._id": postId }, { "comment._id": commentId }],
      }
    );
    if (!updatedGroup) {
      res.status(404).json({ message: "Group, post, or comment not found" });
      return;
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error("Error updating comment in group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a comment from a post in the group
export const deleteCommentFromPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.groupId;
    const postId: string = req.params.postId;
    const commentId: string = req.params.commentId;
    const updatedGroup: IGroup | null = await Group.findOneAndUpdate(
      { _id: groupId, "posts._id": postId },
      { $pull: { "posts.$.comments": { _id: commentId } } },
      { new: true }
    );
    if (!updatedGroup) {
      res.status(404).json({ message: "Group, post, or comment not found" });
      return;
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error("Error deleting comment from post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const upvotePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.groupId;
    const postId: string = req.params.postId;
    const userId: string = req.body.userId;
    const group = await Group.findById(groupId);
    if (group) {
      await group.upvote(
        mongoose.Types.ObjectId.createFromHexString(postId),
        mongoose.Types.ObjectId.createFromHexString(userId)
      );
      res.status(200).json({ message: "Post upvoted successfully" });
    }
  } catch (error) {
    console.error("Error upvoting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const downvotePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.groupId;
    const postId: string = req.params.postId;
    const userId: string = req.body.userId;
    const group = await Group.findById(groupId);
    if (group) {
      await group.downvote(
        mongoose.Types.ObjectId.createFromHexString(postId),
        mongoose.Types.ObjectId.createFromHexString(userId)
      );
      res.status(200).json({ message: "Post upvoted successfully" });
    }
  } catch (error) {
    console.error("Error downvoting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const upvoteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.groupId;
    const postId: string = req.params.postId;
    const commentId: string = req.params.commentId;
    const userId: string = req.body.userId;
    const group = await Group.findById(groupId);
    if (group) {
      await group.upvoteComment(
        mongoose.Types.ObjectId.createFromHexString(postId),
        mongoose.Types.ObjectId.createFromHexString(commentId),
        mongoose.Types.ObjectId.createFromHexString(userId)
      );
      res.status(200).json({ message: "Comment upvoted successfully" });
    }
  } catch (error) {
    console.error("Error upvoting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const downvoteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId: string = req.params.groupId;
    const postId: string = req.params.postId;
    const commentId: string = req.params.commentId;
    const userId: string = req.body.userId;
    const group = await Group.findById(groupId);
    if (group) {
      await group.downvoteComment(
        mongoose.Types.ObjectId.createFromHexString(postId),
        mongoose.Types.ObjectId.createFromHexString(commentId),
        mongoose.Types.ObjectId.createFromHexString(userId)
      );
      res.status(200).json({ message: "Comment downvoted successfully" });
    }
  } catch (error) {
    console.error("Error downvoting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

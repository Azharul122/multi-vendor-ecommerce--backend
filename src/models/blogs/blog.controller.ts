import { Request, Response } from 'express';
import catchError from '../../utils/catchError';
import { blogServices } from './blog.services';

// create blog
const createBlog = catchError(async (req: Request, res: Response) => {
  const blog = req.body;
  const result = await blogServices.createBlog(blog);

  res.status(201).json({
    success: true,
    message: 'Blog craeted',
    data: result,
  });
});

//  fetch all blogs
const blogs = catchError(async (req: Request, res: Response) => {
  const data = await blogServices.blogs();
  res.status(200).json({
    success: true,
    message: 'Blogs fatched',
    data,
  });
});

// fetch single blog
const blogById=catchError(
    async(req:Request,res:Response)=>{
        const {blogId}=req.params
        const data=await blogServices.blogById(blogId)
        res.status(200).json({
            success:true,
            message:"Blogs datails fathed",
            data
        })
    }
)

// Update blog
const updateBlog=catchError(
    async(req:Request,res:Response)=>{
        const {blogId}=req.params
        const payload=req.body
        const data=await blogServices.updateBlog(payload,blogId)
        res.status(200).json({
            success:true,
            message:"Blog updated",
            data
        })
    }
)

// Delete blog
const deleteBlog=catchError(
    async(req:Request,res:Response)=>{
        const {blogId}=req.params
        const data=await blogServices.deleteBlog(blogId)
        res.status(200).json({
            success:true,
            message:"Blog deleted",
            data
        })
    }
)

// export
export const blogController = {
  createBlog,
  blogs,
  blogById,
  updateBlog,
  deleteBlog,
};

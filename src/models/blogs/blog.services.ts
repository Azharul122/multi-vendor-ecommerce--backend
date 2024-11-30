import { blogInterface } from './blog.interface';
import { Blog } from './blog.model';
import { blogValidationSchema } from './blog.validation';

// create blog admin only
const createBlog = async (payload: blogInterface) => {
  const validateBlog = blogValidationSchema.parse(payload);
  const result = await Blog.create(validateBlog);
  return result;
};

// Read All blogs
const blogs = async () => {
  const data = await Blog.find({});
  return data;
};

// read single blog
const blogById = async (id: string) => {
  const blog = await Blog.findById({ _id: id });
  if (!blog) {
    throw new Error('Blog not found');
  }
  return blog;
};

// Update blog
const updateBlog = async (payload: blogInterface, id: string) => {
  //   const validateBlog = blogValidationSchema.parse(payload);
  const blogByIdData = await Blog.findByIdAndUpdate(id, payload);
  if (!blogByIdData) {
    throw new Error('Blog not found');
  }
  return blogByIdData;
};

// Delete blog
const deleteBlog = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error('Blog not found');
  }
  blog.isDeleted = true;
  //   const result = await Blog.findByIdAndDelete(id);
  // if(user.role=="admin"){
  //     blog.deleteOne()
  // }
  blog.save();
  return blog;
};

export const blogServices = {
  createBlog,
  blogs,
  blogById,
  updateBlog,
  deleteBlog,
};

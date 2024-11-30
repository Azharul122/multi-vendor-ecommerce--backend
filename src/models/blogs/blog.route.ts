import express from 'express';
import { blogController } from './blog.controller';

const router = express.Router();

router.post('/create-blog', blogController.createBlog);
router.get('/all-blogs', blogController.blogs);
router.get('/:blogId', blogController.blogById);
router.put('/update-blog/:blogId', blogController.updateBlog);
router.delete('/delete-blog/:blogId', blogController.deleteBlog);

export const blogRouter = router;

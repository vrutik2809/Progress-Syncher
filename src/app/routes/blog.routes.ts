import { Router } from 'express';
import * as blogController from '../controllers/blog.controller';
const router = Router();

router.get('/:user_id/blogs/:blog_id', blogController.getBlog);

router.patch('/:user_id/blogs/:blog_id', blogController.updateProgressBlog);

export { router as blogRouter };
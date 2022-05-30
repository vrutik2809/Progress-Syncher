import { Request, Response } from "express";
import * as models from "../db/models";
import { ProgressSync } from "../utils/classes";
import { roundOff } from "../utils/calc";
import { Model } from "sequelize/types";

const setMarginalProgress = async (blog_id: any, blog: Model<any, any> | null) => {
    try {
        const blogContent = await models.BlogContent.findAll({
            where: {
                blog_id,
            },
        })

        let sum: number = 0;
        for (let i = 0; i < blogContent.length; i++) {
            sum += Number(blogContent[i].getDataValue('progress'));
        }

        const ans = sum / blogContent.length;
        const updatedBlog = await blog?.update({
            progress: roundOff(ans, 2)
        })

        return updatedBlog;
    } catch (e) {
        throw e;
    }
}

export const getBlog = async (req: Request, res: Response) => {
    try {
        //TODO check for user existence
        const blog = await models.Blog.findOne({
            where: {
                id: req.params.blog_id,
                user_id: req.params.user_id
            },
        })
        if (!blog) {
            return res.status(404).send({
                message: `Blog with id: ${req.params.blog_id} and user_id: ${req.params.user_id} not found`
            })
        }
        const blogContent = await models.BlogContent.findAll({
            where: {
                blog_id: req.params.blog_id,
            }
        })
        return res.status(200).send({blog, blogContent});
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

export const updateProgressBlog = async (req: Request, res: Response) => {
    try {
        //TODO check for user existence
        const blog = await models.Blog.findOne({
            where: {
                id: req.params.blog_id,
                user_id: req.params.user_id
            }
        })
        if (!blog) {
            return res.status(404).send({
                message: `Blog with id: ${req.params.blog_id} and user_id: ${req.params.user_id} not found`
            })
        }
        const blogContent = await models.BlogContent.findOne({
            where: {
                blog_id: req.params.blog_id,
                index: req.body.component_index,
                component_id: req.body.component_id
            }
        })
        if (!blogContent) {
            return res.status(404).send({
                message: `Blog with id: ${req.params.blog_id} and index: ${req.body.component_index} and component_id: ${req.body.component_id} not found`
            });
        }
        const component = await models.Component.findOne({
            where: {
                id: req.body.component_id
            }
        })
        if (!component) {
            return res.status(404).send({
                message: `Component with id ${req.body.component_id} not found`
            });
        }
        const progObj = new ProgressSync(component?.getDataValue('name'), req.body.params);
        if (!progObj.isComponentValid()) {
            return res.status(400).send({
                message: `Component ${component?.getDataValue('name')} is not supported`
            });
        }
        const err = progObj.isBodyValid();

        if (err !== true) {
            return res.status(400).send(err);
        }
        const newProgress = progObj.getProgress();
        if(newProgress <= Number(blogContent.getDataValue('progress'))){
            return res.status(200).send({blog, blogContent});
        }
        const updatedBlogContent = await blogContent?.update({
            progress: newProgress
        })
        const updatedBlog = await setMarginalProgress(req.params.blog_id, blog);
        return res.status(200).send({updatedBlog, updatedBlogContent});
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}
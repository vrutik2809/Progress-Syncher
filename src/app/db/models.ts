import sequelize from "../config/db.config";
import { Sequelize, DataTypes } from "sequelize";

export const Blog = sequelize.define("blogs", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    progress:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("now")
    },
    updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("now")
    }
});

export const Component = sequelize.define("components", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("now")
    },
    updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("now")
    }
});

export const BlogContent = sequelize.define("blog_contents",{
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
    progress:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("now")
    },
    updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("now")
    }
});
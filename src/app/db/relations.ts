import * as models from './models';

models.Blog.belongsToMany(models.Component, {
    through: 'blog_contents',
    foreignKey: 'blog_id',
    otherKey: 'component_id'
})

models.Component.belongsToMany(models.Blog, {
    through: 'blog_contents',
    foreignKey: 'component_id',
    otherKey: 'blog_id'
})
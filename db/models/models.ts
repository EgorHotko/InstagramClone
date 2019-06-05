const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Hashtag = require('./hashtag');


User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
Post.belongsToMany(Hashtag, {
    through: "PostHashtag",
    foreignKey: "postId",
    timestamps: false 
});
Hashtag.belongsToMany(Post, {
    through: "PostHashtag",
    foreignKey: "hashtagId",
    timestamps: false 
});

export { User, Post, Comment, Hashtag };
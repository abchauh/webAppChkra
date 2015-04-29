//Posts and LikePost Collection
Posts = new Mongo.Collection("posts");

var schemas = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        optional: true
    },
    content: {
        type: String,
        label: "Content"
    },
	parentType: {
		type: String,
		label: "Parent Type",
		optional: true
	},
	parentID: {
		type: Number,
		label: "Parent ID",
		optional: true
	},
	url: {
		type: String,
		label: "URL",
		optional: true
	},
	status: {
		type: String,
		label: "Status",
		optional: true
	},
	slug: {
		type: String,
		label: "Slug",
		optional: true
	},
    tags: {
        type: String,
        label: "Tags",
        optional: true
    },
    imageId: {
        type: String,
        label: "Image",
        optional: true,
    },
    /* AUTOVALUE */
    appId: {
        type: String,
        label: "App Id",
        autoValue: function() {
            if (this.isInsert)
                return App.id;
        },
    },
    createdAt: {
        type: Date,
        label: "Created Date",
        autoValue: function() {
            if (this.isInsert)
                return new Date;
        },
        denyUpdate: true,
        optional: true
    },
    updatedAt: {
        type: Date,
        label: "Updated Date",
        autoValue: function() {
            return new Date();
        },
        optional: true
    },
    createdUserId: {
        type: String,
        label: "Created by",
        autoValue: function() {
            if (this.isInsert)
                return Meteor.user()._id;
        },
        denyUpdate: true,
        optional: true
    },
    updatedUserId: {
        type: String,
        label: "Updated by",
        autoValue: function() {
            return Meteor.user()._id;
        },
        optional: true
    },
    blogId: {
        type: String,
        label: "Blog Id",
        optional: true
    },
});

Posts.attachSchema(schemas);

Posts.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'posts', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'posts', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'posts', 'remove');
        return result;
    },
});

//activate groundDB for posts collection to work offline
Ground.Collection(Posts);

Posts.helpers({
    image: function() {
        return Images.findOne(this.imageId);
    },
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});



//LikePost Collection

LikePost = new Mongo.Collection("likePost");

var schemas = new SimpleSchema({
    itemId:{
        type:String,
        label: 'ItemId',
        optional: true,
    },
    order:{
        type:String,
        label: 'Order',
        optional: true,
    },

    /* AUTOVALUE */
    appId: {
        type: String,
        label: "App Id",
        autoValue: function() {
            if (this.isInsert)
                return App.id;
        },
    },
    createdAt: {
        type: Date,
        label: "Created Date",
        autoValue: function() {
            if (this.isInsert)
                return new Date;
        },
        denyUpdate: true,
        optional: true
    },
    updatedAt: {
        type: Date,
        label: "Updated Date",
        autoValue: function() {
            return new Date();
        },
        optional: true
    },
    createdUserId: {
        type: String,
        label: "Created by",
        autoValue: function() {
            if (this.isInsert)
                return Meteor.user()._id;
        },
        denyUpdate: true,
        optional: true
    },
    updatedUserId: {
        type: String,
        label: "Updated by",
        autoValue: function() {
            return Meteor.user()._id;
        },
        optional: true
    },
});

LikePost.attachSchema(schemas);

LikePost.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'likePost', 'insert');
        return true;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'likePost', 'update');
        return true;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'likePost', 'remove');
        return true;
    },
});

//activate groundDB for likePost collection to work offline
/* uncomment to use
 Ground.Collection(LikePost);
 */

/* register helper for default relations */
LikePost.helpers({

    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});
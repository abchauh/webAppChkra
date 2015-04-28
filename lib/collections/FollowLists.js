/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

FollowLists = new Mongo.Collection("followLists");

var schemas = new SimpleSchema({
    userId:{
type:String,
label: 'User ID',
optional: true,
},
profileName:{
type:String,
label: 'User Name',
optional: true,
},
users:{
type:String,
label: 'Users followed',
optional: true,
},
usersFollowing:{
type:String,
label: 'FollowingUsers(de-norm)',
optional: true,
},
campaigns:{
type:String,
label: 'Campaigns Following',
optional: true,
},
causes:{
type:String,
label: 'Causes',
optional: true,
},
likedPosts:{
type:String,
label: 'LikedPosts',
optional: true,
},
projects:{
type:String,
label: 'Projects',
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

FollowLists.attachSchema(schemas);

FollowLists.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'followLists', 'insert');
        return true;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'followLists', 'update');
        return true;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'followLists', 'remove');
        return true;
    },

});

//activate groundDB for followLists collection to work offline
/* uncomment to use
 Ground.Collection(FollowLists);
 */

/* register helper for default relations */
FollowLists.helpers({
    
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

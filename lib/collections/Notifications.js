/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Notifications = new Mongo.Collection("notifications");

var schemas = new SimpleSchema({
    userId:{
type:String,
label: 'User ID',
optional: true,
},
ownerID:{
type:String,
label: 'Owner ID',
optional: true,
},
seenAt:{
type:Date,
label: 'Seen At',
optional: true,
},
readAt:{
type:Date,
label: 'Read At',
optional: true,
},
sentAt:{
type:Date,
label: 'Sent At',
optional: true,
},
subject:{
type:String,
label: 'Subject',
optional: true,
},
detail:{
type:String,
label: 'Notification Detail',
optional: true,
},
filesAtt:{
type:String,
label: 'Files Attached',
optional: true,
},
notType:{
type:String,
label: 'Notification Type',
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

Notifications.attachSchema(schemas);

Notifications.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'notifications', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'notifications', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'notifications', 'remove');
        return result;
    },
});

//activate groundDB for notifications collection to work offline
/* uncomment to use
 Ground.Collection(Notifications);
 */

/* register helper for default relations */
Notifications.helpers({
    
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Messages = new Mongo.Collection("messages");

var schemas = new SimpleSchema({
    ownerId:{
type:String,
label: 'ownerID',
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
msgDetail:{
type:String,
label: 'Message',
optional: true,
},
filesAtt:{
type:String,
label: 'Files Attached',
optional: true,
},
msgType:{
type:String,
label: 'Type of Message',
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

Messages.attachSchema(schemas);

Messages.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'messages', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'messages', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'messages', 'remove');
        return result;
    },
});

//activate groundDB for messages collection to work offline
/* uncomment to use
 Ground.Collection(Messages);
 */

/* register helper for default relations */
Messages.helpers({
    
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

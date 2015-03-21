/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Votes = new Mongo.Collection("votes");

var schemas = new SimpleSchema({
    userId:{
type:String,
label: 'user id',
optional: true,
},
votedItem:{
type:String,
label: 'Voted Item',
optional: true,
},
votedItemID:{
type:String,
label: 'Voted Item ID',
optional: true,
},
votedAt:{
type:Date,
label: 'Voted At',
optional: true,
},
votedOrDemoted:{
type:String,
label: 'Voted / Demoted',
optional: true,
},
status:{
type:String,
label: 'Status',
optional: true,
},
statusChsngedBy:{
type:String,
label: 'Status Changed by UserID',
optional: true,
},
statusChangedAt:{
type:Date,
label: 'Status Changed At',
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

Votes.attachSchema(schemas);

Votes.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'votes', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'votes', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'votes', 'remove');
        return result;
    },
});

//activate groundDB for votes collection to work offline
/* uncomment to use
 Ground.Collection(Votes);
 */

/* register helper for default relations */
Votes.helpers({
    
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

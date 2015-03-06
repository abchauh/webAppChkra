/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Onwers = new Mongo.Collection("onwers");

var schemas = new SimpleSchema({
    foundersID:{
type:String,
label: 'FoundersID',
optional: true,
},
ownedItemType:{
type:String,
label: 'OwnedItemType',
optional: true,
},
ownedItemId:{
type:String,
label: 'OwnedItemId',
optional: true,
},
admins:{
type:String,
label: 'Admins',
optional: true,
},
organisers:{
type:String,
label: 'Organisers',
optional: true,
},
contributers:{
type:String,
label: 'Contributers',
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

Onwers.attachSchema(schemas);

Onwers.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'onwers', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'onwers', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'onwers', 'remove');
        return result;
    },
});

//activate groundDB for onwers collection to work offline
/* uncomment to use
 Ground.Collection(Onwers);
 */

/* register helper for default relations */
Onwers.helpers({
    
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

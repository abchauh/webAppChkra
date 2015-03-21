/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Owners = new Mongo.Collection("owners");

var schemas = new SimpleSchema({
    itemID:{
type:String,
label: 'Owned Item ID',
},
itemTye:{
type:String,
label: 'ItemTye',
optional: true,
},
primaryOwner:{
type:String,
label: 'PrimaryOwner',
optional: true,
},
coOwners:{
type:String,
label: 'CoOwners',
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

Owners.attachSchema(schemas);

Owners.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'owners', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'owners', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'owners', 'remove');
        return result;
    },
});

//activate groundDB for owners collection to work offline
/* uncomment to use
 Ground.Collection(Owners);
 */

/* register helper for default relations */
Owners.helpers({
    
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

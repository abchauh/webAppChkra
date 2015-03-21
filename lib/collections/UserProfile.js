/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

UserProfile = new Mongo.Collection("userProfile");

var schemas = new SimpleSchema({
    userId:{
type:String,
label: 'UserID',
},
fname:{
type:String,
label: 'First Name',
optional: true,
},
lname:{
type:String,
label: 'Last Name',
optional: true,
},
displayName:{
type:String,
label: 'Display Name',
optional: true,
},
userBio:{
type:String,
label: 'User Bio',
optional: true,
},
location:{
type:String,
label: 'Location',
optional: true,
},
image:{
type:String,
label: 'Image',
optional: true,
},
avatar:{
type:String,
label: 'Avatar',
optional: true,
},
dob:{
type:Date,
label: 'Date of Birth',
optional: true,
},
sex:{
type:String,
label: 'Sex',
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

UserProfile.attachSchema(schemas);

UserProfile.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'userProfile', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'userProfile', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'userProfile', 'remove');
        return result;
    },
});

//activate groundDB for userProfile collection to work offline
/* uncomment to use
 Ground.Collection(UserProfile);
 */

/* register helper for default relations */
UserProfile.helpers({
    
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

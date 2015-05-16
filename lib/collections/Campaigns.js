/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Campaigns = new Mongo.Collection("campaigns");

var schemas = new SimpleSchema({
    headerImg: {
        type: String,
        label: 'Header Image',
        optional: true,
    },
    ctype: {
        type: String,
        label: 'Campaign Type',
        optional: true,
    },
    title: {
        type: String,
        label: 'Title',
        optional: true,
    },
    location: {
        type: String,
        label: 'Campaign Location',
        optional: true,
    },
    tlocation: {
        type: String,
        label: 'Target location',
        optional: true,
    },
    causes: {
        type: String,
        label: 'Causes',
        optional: true,
    },
    shortdscrption: {
        type: String,
        label: 'Short Description',
        optional: true,
    },
    longdscrption: {
        type: String,
        label: 'Long Description',
        optional: true,
    },
    story: {
        type: String,
        label: 'Story',
        optional: true,
    },
    /* AUTOVALUE */
    pubstatus: {    
        type: String,
        label: 'Publish Status',
        optional: true,
    },
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

Campaigns.attachSchema(schemas);

Campaigns.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'campaigns', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'campaigns', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'campaigns', 'remove');
        return result;
    },
});

//activate groundDB for campaigns collection to work offline
/* uncomment to use
 Ground.Collection(campaigns);
 */

/* register helper for default relations */
Campaigns.helpers({
    image: function() {
        return Images.findOne(this.headerImg);
    },
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

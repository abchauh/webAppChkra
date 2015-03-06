/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Projects = new Mongo.Collection("projects");

var schemas = new SimpleSchema({
    userId:{
type:String,
label: 'UserId',
optional: true,
},
title:{
type:String,
label: 'Title',
optional: true,
},
shortDesc:{
type:String,
label: 'Short Description',
optional: true,
},
lingDesc:{
type:String,
label: 'Long Description',
optional: true,
},
coverImg:{
type:String,
label: 'Cover Image',
optional: true,
},
imgSrcText:{
type:String,
label: 'Image Source Text',
optional: true,
},
status:{
type:String,
label: 'Status',
optional: true,
},
projStart:{
type:Date,
label: 'Start Date',
optional: true,
},
projEnd:{
type:Date,
label: 'Project End Date',
optional: true,
},
projLastUpdate:{
type:Date,
label: 'Last Updated',
optional: true,
},
projCountry:{
type:String,
label: 'Country',
optional: true,
},
projCity:{
type:String,
label: 'City',
optional: true,
},
projWeb:{
type:String,
label: 'Website',
optional: true,
},
projFacebook:{
type:String,
label: 'Facebook',
optional: true,
},
projSocialLinks:{
type:String,
label: 'SocialMediaLinks',
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

Projects.attachSchema(schemas);

Projects.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'projects', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'projects', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'projects', 'remove');
        return result;
    },
});

//activate groundDB for projects collection to work offline
/* uncomment to use
 Ground.Collection(Projects);
 */

/* register helper for default relations */
Projects.helpers({
    
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

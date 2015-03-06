/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Causes = new Mongo.Collection("causes");

var schemas = new SimpleSchema({
    title:{
type:String,
label: 'Title',
optional: true,
},
tag:{
type:String,
label: 'Tag',
optional: true,
},
type:{
type:String,
label: 'Type',
optional: true,
},
shortDesc:{
type:String,
label: 'Short Description',
optional: true,
},
longDesc:{
type:String,
label: 'Long Description',
optional: true,
},
imgThumb:{
type:String,
label: 'Thumbnail Image',
optional: true,
},
imgLarge:{
type:String,
label: 'Large Image',
optional: true,
},
galleries:{
type:String,
label: 'Galleries',
optional: true,
},
causeStart:{
type:Date,
label: 'Cause Started',
optional: true,
},
causeEnd:{
type:Date,
label: 'Cause End Date',
optional: true,
},
causeStatus:{
type:String,
label: 'Status',
optional: true,
},
causeUpdated:{
type:Date,
label: 'Last Updated',
optional: true,
},
causeWeb:{
type:String,
label: 'Website',
optional: true,
},
causeSocialMedia:{
type:String,
label: 'Social Media Links',
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

Causes.attachSchema(schemas);

Causes.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'causes', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'causes', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'causes', 'remove');
        return result;
    },
});

//activate groundDB for causes collection to work offline
/* uncomment to use
 Ground.Collection(Causes);
 */

/* register helper for default relations */
Causes.helpers({
    
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

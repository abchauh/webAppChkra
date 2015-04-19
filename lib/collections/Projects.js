/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Projects = new Mongo.Collection("projects");

var schemas = new SimpleSchema({
    title:{
type:String,
label: 'Title',
},
headerImg:{
type:String,
label: 'Header Image',
optional: true,
},
about:{
type:String,
label: 'About',
optional: true,
},
supporters:{
type:String,
label: 'Supporters',
optional: true,
},
promoteCount:{
type:String,
label: 'Promote',
optional: true,
},
sharedCount:{
type:String,
label: 'Share',
optional: true,
},
country:{
type:String,
label: 'Country',
optional: true,
},
city:{
type:String,
label: 'City',
optional: true,
},
ownerid:{
type:String,
label: 'ownerid',
optional: true,
},
ownernickname:{
type:String,
label: 'Owner',
optional: true,
},
type:{
type:String,
label: 'Type',
optional: true,
},
linkedToBlocks:{
type:String,
label: 'Links to other blocks',
optional: true,
},
status:{
type:String,
label: 'Status',
optional: true,
},
imgs:{
type:String,
label: 'Images',
optional: true,
},
thumbnail:{
type:String,
label: 'Thumbnail',
optional: true,
},
contributers:{
type:String,
label: 'Contributers',
optional: true,
},
organisers:{
type:String,
label: 'Organisers',
optional: true,
},
admins:{
type:String,
label: 'Administrators',
optional: true,
},
tags:{
type:String,
label: 'Tags, Keywords',
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
// uncomment to use
Ground.Collection(Projects);


/* register helper for default relations */
Projects.helpers({
    
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

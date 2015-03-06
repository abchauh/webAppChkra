/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Camps = new Mongo.Collection("camps");

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
longDesc:{
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
    causes:{
        type: [Object],
        label: 'List of Causes',
        optional: true,
    },
    "causes.$.name":{
        type:String,
        label: 'List of Causes',
        optional: true,
    },
    "causes.$.causeId":{
        type:String,
        label: 'List of Causes',
        optional: true,
    },
    "causes.$.order":{
        type:Number,
        label: 'List of Causes',
        optional: true,
    },
campCreatedAt:{
type:Date,
label: 'Created At',
optional: true,
},
campEndDate:{
type:Date,
label: 'Campaign End Date',
optional: true,
},
campLastUpdate:{
type:Date,
label: 'Last Updated',
optional: true,
},
address:{
type:String,
label: 'Address',
optional: true,
},
country:{
type:String,
label: 'Country',
optional: true,
},
city:{
type:String,
label: 'City/Town',
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

Camps.attachSchema(schemas);

Camps.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'camps', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'camps', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'camps', 'remove');
        return result;
    },
});

//activate groundDB for camps collection to work offline
/* uncomment to use*/
 Ground.Collection(Camps);
 

/* register helper for default relations */
Camps.helpers({
    image: function() {
        return Images.findOne(this.coverImg);
    },
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

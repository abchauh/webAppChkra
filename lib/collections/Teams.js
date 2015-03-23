/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Teams = new Mongo.Collection("teams");

var schemas = new SimpleSchema({
    title:{
        type:String,
        label: 'Title',
    },
    employeeid:{
        type:String,
        label: 'Employee',
        optional: true,
    },
    job:{
        type:String,
        label: 'Job-Field',
        optional: true,
    },
    top:{
        type:String,
        label: 'status -top or not',
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
        role:{
        type:String,
        label: 'Title',
    },
});

Teams.attachSchema(schemas);

Teams.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'teams', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'teams', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'teams', 'remove');
        return result;
    },
});

//activate groundDB for teams collection to work offline
/* uncomment to use
 Ground.Collection(Teams);
 */

/* register helper for default relations */
Teams.helpers({
    employee: function() {
return Employees.findOne(this.employeeid);
},
    job: function() {
    return Jobs.findOne(this.job);
    },

    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});

Interests = new Mongo.Collection('interests');

Interests.allow({
  insert: function(userId, doc) {
    return doc.interestName && doc.owner && doc.owner === userId;
  },
  update: function(userId, doc, fields, modifier) {
    return doc.owner === userId;
  },
  remove: function(userId, doc) {
    return doc.owner === userId;
  }
});
var transformAvatar = function(fileObj, readStream, writeStream) {
  // Transform the image into a 150x150px thumbnail
  gm(readStream, fileObj.name()).resize('150', '150').stream().pipe(writeStream);
};

Avatars = new FS.Collection('avatars', {
  stores: [new FS.Store.GridFS('avatars', {
    transformWrite: transformAvatar
  })],
  filter: {
    allow: {
      contentTypes: ['image/*'] // allow only images in this collection
    }
  }
});

var checkPermission = function() {
  //var userId = arguments[0];
  //var file = arguments[1];
  //return userId && file.metadata && file.metadata.owner === userId;
  return true;
};

Avatars.allow({
  insert: checkPermission,
  update: checkPermission,
  remove: checkPermission,
  download: checkPermission
});

// Avatars.after.remove(function(userId, doc) {
//   var userAvatars = Meteor.users.findOne(userId).avatars;
//   var index = userAvatars.indexOf(doc._id);
//   userAvatars.splice(index, 1);
//   Meteor.users.update({
//     _id: this.userId
//   }, {
//     $set: {
//       'avatars': userAvatars
//     }
//   })
// });
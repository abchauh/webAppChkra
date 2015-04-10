// Meteor.publish("avatars", function(ids) {
//   ids = typeof ids === 'string' ? [ids] : ids;
//   check(userId, [String]);
//   return Avatars.find({
//     $query: {
//       _id: {
//         $in: ids
//       }
//     },
//     $orderby: {
//       uploadedAt: -1
//     }
//   });
// });

Meteor.publish("avatars", function() {
  return Avatars.find({});
});
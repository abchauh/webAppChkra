var Cropper = function () {
  var cropperContext = Template.instance().$(".img-container > img");
  return cropperContext.cropper.apply(cropperContext, arguments);
};

Template.ImageCropper.onRendered(function () {
  Cropper({
    aspectRatio: 1,
    preview: ".image-preview",
    guides: false,
    responsive: true,
    zoomable: false
  });
});

Template.ImageCropper.events({
  'click .save-image': function () {
    var canvas = Cropper('getCroppedCanvas');

    if (canvas && canvas.toBlob) {
      canvas.toBlob(function (blob) {
        Avatars.insert(blob, function (err, res) {
          if (err) {
            console.log(err);
          } else {
            Meteor.users.update({
              _id: Meteor.userId()
            }, {
              $set: {
                'profile.image': res._id,
                'profile.upgraded': new Date()
              },
              $push: {
                'avatars': res._id
              }
            });
          }
        });
      });
    }
  }
});


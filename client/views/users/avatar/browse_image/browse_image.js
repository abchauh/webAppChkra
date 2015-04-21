var getFileName = function (path) {
  if (_.isString(path)) {
    var index = _.first(_.reject([
      path.lastIndexOf('\\'),
      path.lastIndexOf('/')
    ], function (val) {
      return val === -1;
    }));
    if (index) {
      path = path.substring(index + 1);
    }
  }
  return path;
};

//converts file to url
var readFile = function (file, onFileLoaded, onError) {
  var imageType = /image.*/;
  if (file.type.match(imageType)) {
    var reader = new FileReader();
    reader.onload = function (e) {
      onFileLoaded(reader.result);
    };
    reader.onerror = function (error) {
      onError(error);
    }
  } else {
    onError(new Error('Incorrect file type'));
  }

  reader.readAsDataURL(file);
};

Template.Step1.onCreated(function () {
  this.subscribe('avatars');
  this.image = new ReactiveVar(false);
});

Template.Step1.onRendered(function () {
  var self = this;

  $('.modal.avatar-picker').on('hidden.bs.modal', function () {
    self.$('#avatar-picker-filename').val('');
    self.image.set(false);
  });
});

Template.Step1.events({
  'focus #avatar-picker-filename': function (e, tmpl) {
    e.target.blur();
    tmpl.find('#avatar-picker-file').click();
  },
  'change #avatar-picker-file': function (e, tmpl) {
    tmpl.find('#avatar-picker-filename').value = getFileName(e.target.value);
    tmpl.image.set(false);

    readFile(e.target.files[0], function (url) {
      tmpl.image.set({path: url});
    }, function (error) {
      alert(error.message);
    });
  },
  'click .avatar-ready-image': function (e, tmpl) {
    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        'profile.image': this._id,
        'profile.upgraded': new Date()
      }
    });
  },
  'click .close-avatar-modal-btn': function (e, tmpl) {
    $('.modal').hide();
  }
});

Template.Step1.helpers({
  avatars: function () {
    var avatars = Avatars.find({
      _id: {
        $in: Meteor.user().avatars
      }
    });
    return avatars;
  },
  image: function () {
    return Template.instance().image.get();
  }
});
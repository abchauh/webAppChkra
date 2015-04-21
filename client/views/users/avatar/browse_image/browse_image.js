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
    };
    reader.readAsDataURL(file);
  } else {
    onError(new Error('Incorrect file type'));
  }
};

var resetDialogContext = function (tmpl) {
  tmpl.$('#avatar-picker-filename').val('');

  var control = tmpl.$('#avatar-picker-file');
  control.replaceWith(control.clone(true));

  tmpl.image.set(false);
};

Template.Step1.onCreated(function () {
  this.subscribe('avatars');
  this.image = new ReactiveVar(false);
});

Template.Step1.onRendered(function () {
  var self = this;

  $('.modal.avatar-picker').on('hidden.bs.modal', function () {
    resetDialogContext(self);
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
    var file = e.target.files[0];
    if (file) {
      readFile(file, function (url) {
        tmpl.image.set({path: url});
      }, function (error) {
        alert(error.message);
      });
    }
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
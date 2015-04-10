var getFileName = function(path) {
  if (_.isString(path)) {
    var index = _.first(_.reject([
      path.lastIndexOf('\\'),
      path.lastIndexOf('/')
    ], function(val) {
      return val === -1;
    }));
    if (index) {
      path = path.substring(index + 1);
    }
  }
  return path;
};

var clear = function(tmpl) {
  tmpl.find('input').value = '';
};

Template.Step1.events({
  'focus #avatar-picker-filename': function(e, tmpl) {
    e.target.blur();
    tmpl.find('#avatar-picker-file').click();
  },
  'change #avatar-picker-file': function(e, tmpl) {
    tmpl.find('#avatar-picker-filename').value = getFileName(e.target.value);
    var avatarImage = e.target.files[0];
    avatarImage.metadata = {
      owner: Meteor.userId()
    };
    Avatars.insert(avatarImage, function(err, res) {
      clear(tmpl);
      !!err && console.log(err);
      !!res && Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.image': res._id,
          'profile.upgraded': new Date()
        }
      });
    });
  },
  'click #avatar-picker-url-btn': function(e, tmpl) {
    e.preventDefault();
    var imgUrl = $('#avatar-picker-url').val();
    var file = new FS.File({
      name: 'image.jpg'
    });
    console.log(file);
    file.attachData(imgUrl, {type: "image/*"},function(err) {
      console.log('attachData');
      if (!err) {
        console.log('file ===>', file);
        Avatars.insert(file, function(err, res) {
          $('#avatar-picker-url').val('');
          !!err && console.log(err);
          console.log('res', res);
        });
      }
    });
  },
  'click .avatar-ready-image': function(e, tmpl) {
    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        'profile.image': this._id,
        'profile.upgraded': new Date()
      }
    });
  },
  'click .close-avatar-modal-btn': function(e, tmpl) {
    $('.modal').hide();
  }
});

Template.Step1.helpers({
  avatars: function() {
    var avatars = Avatars.find();
    return Avatars.find();
  }
});

Template.Step1.onCreated(function() {
  this.subscribe('avatars');
});
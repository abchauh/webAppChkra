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
    console.log(avatarImage);
    Avatars.insert(avatarImage, function(err) {
      clear(tmpl);
      if (err) {
        console.log(err);
      }
    });
  },
  'click #avatar-picker-url-btn': function(e, tmpl) {
    e.preventDefault();
    var imgUrl = $('#avatar-picker-url').val();
    var file = new FS.File({
      name: 'image.jpg'
    });
    file.attachData(imgUrl, function(err) {
      if (!err) {
        Avatars.insert(file, function(err, res) {
          $('#avatar-picker-url').val('');
          !!err && console.log(err);
          console.log('res', res);
        });
      }
    });
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
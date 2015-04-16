AdminMessages = {};

AdminMessages.config = function(options) {
  check(options, {
    to: Match.Optional([String]),
    from: Match.Optional(String),
    footer: Match.Optional(String),
    sendingHours: Match.Optional(Number),
    lastNDays: Match.Optional(Number)
  });
  options.sendingHours = options.hours || 17;
  options.footer = options.footer || 'copyright © PT. Piyiku Global Sinergi.';
  options.from = options.from || 'system@meteoris.com';
  options.to = options.to || ['nazaryablonskiy@gmail.com'];
  options.lastNDays = options.lastNDays || 1;
  this.configData = options;
}

AdminMessages.config({});

AdminMessages.render = function(users) {
  var template = Handlebars.templates['messages'];
  return template(users);
}

AdminMessages.send = function(users) {
  users = Array.isArray(users) ? users : [users];
  var send = 0;
  var rendered = this.render({
    items: users,
    footer: this.configData.footer
  });
  for (var i = 0; i < this.configData.to.length; i++) {
    send += !Email.send({
      from: this.configData.from,
      to: this.configData.to[i],
      subject: 'Recently registered',
      html: rendered
    });
  }
  return send;
};

AdminMessages.getRecentlyRegisteredUsers = function(lastNDays) {
  var to = new Date();
  var from = new Date();
  lastNDays = lastNDays || this.configData.lastNDays;
  from.setDate(to.getDate() - lastNDays);
  return Meteor.users.find({
    createdAt: {
      $gte: from,
      $lt: to
    }
  });
}

AdminMessages.trySendMessage = function(nDays) {
  check(nDays, Match.Optional(Number));
  var recentUsers = this.getRecentlyRegisteredUsers(nDays);
  if (recentUsers.count() > 0) {
    return this.send(recentUsers.fetch());
  } else {
    return 0;
  }
}

AdminMessages.init = function(){
  console.log('init timer');
  var now = new Date();
  var later = new Date();
  later.setMinutes(0);
  later.setHours(this.configData.sendingHours);
  Meteor.setTimeout(function(){
    AdminMessages.trySendMessage();
    Meteor.setInterval(function(){
      AdminMessages.trySendMessage();
    }, 24*60*60*1000);
  }, (later-now));
}

AdminMessages.init();
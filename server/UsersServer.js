Meteor.publishComposite('users', function(doc) {
    console.log('subscribing some Users');
    return {
        find: function() {
            return Meteor.users.find(doc);
        },
        children: [
        ],
    }
});

Meteor.methods({
    'Users.insert': function(doc) {
        console.log('inserting user...');
        validateParams(doc);
        Accounts.createUser(doc);
        return true;
    },
     //movved
    'usersUpdateServer': function(_id, t){
        var name = t.find('#name').value;
        //var acctType = t.find('#acctType').value;
        var acctType = "1";

        //var fName = t.find('#fName').value;
        var fName = "sdfdsfsdffdsfdsf3434";

        var lName = t.find('#lName').value;
        
        var bio = t.find('#bio').value;
        var country = t.find('#country').value;
        var city = t.find('#city').value;
        var address = t.find('#address').value;
        var ImgThumb = t.find('#ImgThumb').value;
        var ImgLarge = t.find('#ImgLarge').value;
        var ImgHeader = t.find('#ImgHeader').value;
        var Avatar = t.find('#Avatar').value;
        var dob = t.find('#dob').value;
        var sex =  t.find('#sex').value;
        // var userTypeChanged =  Meteor.users.findOne({_id: _id}, {profile: 1}).profile.userTypeChanged;
        // var user_acctType = Meteor.users.findOne({_id: _id}, {profile: 1}).profile.acctType;
        
        // if (userTypeChanged == "1") {
        //     doc.profile.acctType = user_acctType;
        // }
        // doc.profile.userTypeChanged = 1; //only just before update
        
        Meteor.users.update(_id, {$set: {'profile.name': name, 'profile.acctType': acctType,
                    'profile.fName': fName, 'profile.lName' : lName,
                    'profile.bio': bio,
                    'profile.country': country,
                    'profile.city': city,
                    'profile.address': address,
                    'profile.ImgThumb': ImgThumb,
                    'profile.ImgLarge': ImgLarge,
                    'profile.ImgHeader': ImgHeader,
                    'profile.Avatar': Avatar,
                    'profile.dob': dob,
                    'profile.sex': sex,
            
        }}
        );
        return "sdfdf";
    }
});


function validateParams(params) {
    for (var key in params) {
        if (key == "profile") {
            for (var keyProfile in params[key]) {
                value = params[key][keyProfile];
                console.log(value);
                if (value == "") {
                    throw new Meteor.Error('Please enter your ' + keyProfile, keyProfile);
                }
            }
        } else if (key == "email") {
            value = params[key];
            if (!validateEmail(value))
                throw new Meteor.Error('Please format email ' + key, key);

        } else {
            value = params[key];
            console.log(value);
            if (value == "")
                throw new Meteor.Error('Please enter your ' + key, key);
        }
    }

}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function get_visitor_ip(uid) {
    var k, ret, s, ss, _ref, _ref1, _ref2, _ref3;
    ret = {};
    if (uid != null) {
        _ref = Meteor.default_server.sessions;
        for (k in _ref) {
            ss = _ref[k];
            if (ss.userId === uid) {
                s = ss;
            }
        }
        if (s) {
            ret.forwardedFor = (_ref1 = s.socket) != null ? (_ref2 = _ref1.headers) != null ? _ref2['x-forwarded-for'] :
                    void 0 :
                    void 0;
            ret.remoteAddress = (_ref3 = s.socket) != null ? _ref3.remoteAddress :
                    void 0;
        }
    }
    return ret.forwardedFor ? ret.forwardedFor : ret.remoteAddress;
}

/* auto insert into Meteor.users "@" and "admin" when collection still empty */
Meteor.startup(function() {
    var users = Meteor.users.find();
    if (users.count() == 0) {
        Accounts.createUser({
            email: "admin@meteoris.me",
            password: "admin",
            profile:{
                name: "admin",
                mugenRoleGroupId: "1"
            }
        });
        Accounts.createUser({
            email: "demo@meteoris.me",
            password: "demo",
            profile:{
                name: "demo",
                mugenRoleGroupId: "2"
            }
        });
    }
    
   /* Accounts.createUser({
            email: "dfd3434emo@dfmetddeoris.me",
            password: "df3243dddemo",
            profile:{
                name: "s6j8demo",
                mugenRoleGroupId: "1",
                lastLogin: new Date(),
                
                bio: "sxzdds2",
                country: "UK",
                city: "Leicester",
                address: "s6j8demosxxce2",
                ImgThumb: "s6j8dem24zzo",
                ImgLarge: "s6j2221128demo",
                ImgHeader: "s2226j8demo",
                Avatar: "22s6j8demo",
                dob: "s6j8demo",
                sex: "Male",
                lastLogin: new Date(),
            }
        });
*/
});

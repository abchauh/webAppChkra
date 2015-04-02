UsersController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        this.subs.subscribe('mugenRoleGroups', {}, {sort: {name: 1}});
        this.subscription = this.subs.subscribe('users', this.getCriteria(), sort);
    },
    /* event searching data by user input with parameter */
    search: function(t) {
        Router.go(Router.current().route.getName(), {limit: this.limit()}, {query: "q=" + t.find('#search').value});
    },
    /* @override getCriteria */
    getCriteria: function() {
        var search = this.params.query.q ? this.params.query.q : "";
        return {
            $or: [
                {'profile.name': {$regex: search, $options: 'i'}},
                {'emails.address': {$regex: search, $options: 'i'}},
                {'profile.acctType': {$regex: search, $options: 'i'}},
                {'profile.fName': {$regex: search, $options: 'i'}},
                {'profile.lName': {$regex: search, $options: 'i'}},
                
                {'profile.bio': {$regex: search, $options: 'i'}},
                {'profile.country': {$regex: search, $options: 'i'}},
                {'profile.city': {$regex: search, $options: 'i'}},
                {'profile.address': {$regex: search, $options: 'i'}},
                {'profile.ImgThumb': {$regex: search, $options: 'i'}},
                {'profile.ImgLarge': {$regex: search, $options: 'i'}},
                {'profile.ImgHeader': {$regex: search, $options: 'i'}},
                {'profile.Avatar': {$regex: search, $options: 'i'}},
                {'profile.dob': {$regex: search, $options: 'i'}},
                {'profile.sex': {$regex: search, $options: 'i'}},
                
            ]
        };
    },
    login: function(t) {
        var email = t.find('#email').value;
        var password = t.find('#password').value;

        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
            } else {
                MeteorisFlash.set('success', 'login success');
                Router.go('sitesIndex');
            }
        });
    },
    loginWithFacebook: function() {
        Meteor.loginWithFacebook({
            requestPermissions: ['publish_actions']
        }, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
            } else {
                MeteorisFlash.set('success', 'login success');
                Router.go('sitesIndex');
            }
        });
    },
    register: function(t) {
        var email = t.find('#email').value;
        var password = t.find('#password').value;
        var name = t.find('#name').value;
        var doc = {
            email: email,
            password: password,
            profile: {
                name: name,
                mugenRoleGroupId: "1",
                createdAt: new Date(TimeSync.serverTime()),
                updatedAt: new Date(TimeSync.serverTime()),
            }
        };

        Accounts.createUser(doc, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            } else {
                MeteorisFlash.set('success', 'register success');
                Router.go('sitesIndex');
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        var doc = {
            email: t.find('#email').value,
            password: t.find('#password').value,
            profile: {
                name: t.find('#name').value,
                createdAt: new Date(TimeSync.serverTime()),
                updatedAt: new Date(TimeSync.serverTime()),
                acctType: t.find('#acctType').value, 
                fName: t.find('#fName').value,
                lName: t.find('#lName').value,
                
                 bio: t.find('#bio').value,
                country: t.find('#country').value,
                city: t.find('#city').value,
                address: t.find('#address').value,
                ImgThumb: t.find('#ImgThumb').value,
                ImgLarge: t.find('#ImgLarge').value,
                ImgHeader: t.find('#ImgHeader').value,
                Avatar: t.find('#Avatar').value,
                dob: t.find('#dob').value,
                sex: t.find('#sex').value,
                lastLogin: t.find('#lastLogin').value,
            }
        };
        var mugenRoleGroupId = t.find('#mugenRoleGroupId').value ? t.find('#mugenRoleGroupId').value : null;
        if (mugenRoleGroupId)
            doc.profile.mugenRoleGroupId = mugenRoleGroupId;
        return doc;
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Meteor.users.find(this.getCriteria(), sort);

        return this.render('usersIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('usersView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    }, /* event inserting data */
    insert: function(t) {
        if (this._post) {
            //set inserted doc
            var doc = this._getDoc(t);

            Meteor.call('Users.insert', doc, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                } else {
                    MeteorisFlash.set('success', 'Success Inserting Users');
                    Router.go('usersIndex');
                }
            });
        }
        return this.render('usersInsert', {});
    },
    /* event updating data */
    update: function(t) {
        var _id = this.getId();
        var model = this._loadModel(_id);

        if (this._post) {
            this.updateUser(_id, t);
            Router.go('usersIndex');
        }
        return this.render('usersUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Meteor.users.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Users");
        });
    },
    profile: function() {
        return this.render('usersProfile', {
            data: {
                model: this._loadModel(Meteor.user()._id),
            }
        });
    },
    changeProfile: function(t) {
        var _id = Meteor.userId();
        this.updateUser(_id, t);
    },
    updateUser: function(_id, t) {
        // TODO: Replace `_.pairs`, `_.reject` and `_.object` with `_.omit` when comes new underscore version
        // Collect data from template
        var doc =  _.pairs({
            'emails.0.address': (t.find('#email') || {}).value,
            'profile.name': (t.find('#name') || {}).value,
            'profile.displayName': (t.find('#displayName') || {}).value,
            'profile.updatedAt': new Date(TimeSync.serverTime()),
            'profile.acctType': (t.find('#acctType') || {}).value,
            'profile.fName': (t.find('#fName') || {}).value,
            'profile.lName': (t.find('#lName') || {}).value,
            'profile.bio': (t.find('#bio') || {}).value,
            'profile.country': (t.find('#country') || {}).value,
            'profile.city': (t.find('#city') || {}).value,
            'profile.address': (t.find('#address') || {}).value,
            'profile.ImgThumb': (t.find('#ImgThumb') || {}).value,
            'profile.ImgLarge': (t.find('#ImgLarge') || {}).value,
            'profile.ImgHeader': (t.find('#ImgHeader') || {}).value,
            'profile.Avatar': (t.find('#Avatar') || {}).value,
            'profile.dob': (t.find('#dob') || {}).value,
            'profile.sex': (t.find('#sex') || {}).value,
            'profile.lastLogin': new Date(TimeSync.serverTime()),
            'profile.mugenRoleGroupId': (t.find('#mugenRoleGroupId') || {}).value
        });
        // Remove undefined values
        doc = _.object(_.reject(doc, function(val) {
            return _.isUndefined(val[1]);
        }));
        Meteor.users.update(_id, {$set: doc}, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Updating Users");
        });
    },
    changePassword: function(t) {
        var oldPassword = t.find('#oldPassword').value;
        var newPassword = t.find('#newPassword').value;
        var confirmNewPassword = t.find('#confirmNewPassword').value;
        var errMessage;

        if (newPassword != confirmNewPassword) {
            errMessage = 'New Password and Password Confirmation must be equal';
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        } else if (newPassword.length < 6) {
            errMessage = 'New Password at least has 6 min length';
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        } else if (oldPassword === newPassword) {
            errMessage = 'New Password can\'t be the same as Old Password';
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }
        Accounts.changePassword(oldPassword, newPassword, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err.message);
            } else {
                MeteorisFlash.set('success', 'Password successfully changed');
                $('#change_password_form')[0].reset();
                t.find('#oldPassword').focus();
            }
        });
    },
    _loadModel: function(_id) {
        return Meteor.users.findOne(_id);
    },
    forgetPassword: function(t) {
        if (this._post) {
            var email = t.find('#email').value.toLowerCase();
            if (email != "") {
                Accounts.forgotPassword({email: email}, function(err) {
                    if (err) {
                        if (err.message === 'User not found [403]') {
                            MeteorisFlash.set('danger', 'This email does not exist.');
                        } else {
                            MeteorisFlash.set('danger', 'We are sorry but something went wrong.');
                        }
                    } else {
                        MeteorisFlash.set('success', 'Email Sent. Check your mailbox.');
                    }
                });

            }
            return false;
        }

        return this.render('usersForgetPassword', {
            data: {
            }
        });
    },
    resetPassword: function(t) {
        if (this._post) {
            var token = this.params.token;
            var password = t.find('#password').value;
            Accounts.resetPassword(token, password, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', 'We are sorry but something went wrong.');
                } else {
                    MeteorisFlash.set('success', 'Your password has been changed. Welcome back!');
                    Router.go('sitesIndex');
                }
            });
        }

        return this.render('usersResetPassword', {
            data: {
            }
        });
    },
});
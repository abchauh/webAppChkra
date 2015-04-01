UserProfileController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        this.subscription = this.subs.subscribe('userProfile', this.getCriteria(), sort);
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
                {userId: {$regex: search, $options: 'i'}},
                {fname: {$regex: search, $options: 'i'}},
                {lname: {$regex: search, $options: 'i'}},
                {displayName: {$regex: search, $options: 'i'}},
                {userBio: {$regex: search, $options: 'i'}},
                {location: {$regex: search, $options: 'i'}},
                {image: {$regex: search, $options: 'i'}},
                {avatar: {$regex: search, $options: 'i'}},
                {dob: {$regex: search, $options: 'i'}},
                {sex: {$regex: search, $options: 'i'}},
            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = UserProfile.find(this.getCriteria(), sort);

        return this.render('userProfileIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('userProfileView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            userId: t.find('#userId').value,
            fname: t.find('#fname').value,
            lname: t.find('#lname').value,
            displayName: t.find('#displayName').value,
            userBio: t.find('#userBio').value,
            location: t.find('#location').value,
            image: t.find('#image').value,
            avatar: t.find('#avatar').value,
            dob: t.find('#dob').value? new Date(t.find('#dob').value):null,
            sex: t.find('#sex').value,
        };
    },
    /* uploading file using cfs:fileSystem package + cfs:ejson */
    _uploadImage: function() {
        var imageId = null;
        var file = $('#image').get(0).files[0];
        if (file) {
            var image = Images.insert(file, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
            });
            imageId = image._id;
        }

        return imageId;
    },
    /* event inserting data */
    insert: function(t) {
        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            //var imageId = this._uploadImage();

            //set inserted doc
            var doc = this._getDoc(t);
            //doc.imageId = imageId;

            UserProfile.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting UserProfile");
                Router.go('userProfileView', {_id: _id});
            });
        }
        return this.render('userProfileInsert', {});
    },
    /* event updating data */
    update: function(t) {
        var _id = this.getId();
        var model = this._loadModel(_id);

        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            //var imageId = this._uploadImage();

            //remove old image if user inputting new image        
            //if (imageId && model.imageId)
            //Images.remove(model.imageId);

            //set updated doc
            var doc = this._getDoc(t);
            //doc.imageId = imageId ? imageId : model.imageId;

            UserProfile.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating UserProfile");
            });
            Router.go('userProfileView', {_id: _id});
        }
        return this.render('userProfileUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        UserProfile.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing UserProfile");
        });
    },
    _loadModel: function(_id) {
        return UserProfile.findOne(_id);
    },
});
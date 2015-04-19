BlogController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        this.subs.subscribe('posts', {});
        this.subscription = this.subs.subscribe('blog', this.getCriteria(), sort);

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
                {title: {$regex: search, $options: 'i'}},
{headerImg: {$regex: search, $options: 'i'}},
{about: {$regex: search, $options: 'i'}},
{supporters: {$regex: search, $options: 'i'}},
{promoteCount: {$regex: search, $options: 'i'}},
{sharedCount: {$regex: search, $options: 'i'}},
{country: {$regex: search, $options: 'i'}},
{city: {$regex: search, $options: 'i'}},
{ownerid: {$regex: search, $options: 'i'}},
{ownernickname: {$regex: search, $options: 'i'}},
{type: {$regex: search, $options: 'i'}},
{linkedToBlocks: {$regex: search, $options: 'i'}},
{status: {$regex: search, $options: 'i'}},
{imgs: {$regex: search, $options: 'i'}},
{thumbnail: {$regex: search, $options: 'i'}},
{contributers: {$regex: search, $options: 'i'}},
{organisers: {$regex: search, $options: 'i'}},
{admins: {$regex: search, $options: 'i'}},
{tags: {$regex: search, $options: 'i'}},

            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Blog.find(this.getCriteria(), sort);

        return this.render('blogIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('blogView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            title: t.find('#title').value,
headerImg: t.find('#headerImg').value,
about: t.find('#about').value,
supporters: t.find('#supporters').value,
promoteCount: t.find('#promoteCount').value,
sharedCount: t.find('#sharedCount').value,
country: t.find('#country').value,
city: t.find('#city').value,
ownerid: t.find('#ownerid').value,
ownernickname: t.find('#ownernickname').value,
type: t.find('#type').value,
linkedToBlocks: t.find('#linkedToBlocks').value,
status: t.find('#status').value,
imgs: t.find('#imgs').value,
thumbnail: t.find('#thumbnail').value,
contributers: t.find('#contributers').value,
organisers: t.find('#organisers').value,
admins: t.find('#admins').value,
tags: t.find('#tags').value,

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
            //doc.blogId = "testimg";

            Blog.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting Blog");
                Router.go('blogView', {_id: _id});
            });
        }
        return this.render('blogInsert', {});
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

            Blog.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating Blog");
            });
            Router.go('blogView', {_id: _id});
        }
        return this.render('blogUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Blog.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Blog");
        });
    },
    _loadModel: function(_id) {
        return Blog.findOne(_id);
    },
});
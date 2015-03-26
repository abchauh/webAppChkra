Meteor.publishComposite('newsFeed', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some NewsFeed with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return NewsFeed.find(doc, sort);
        },
        children: [
            /* return all related Users */
            {
                find: function(collection) {
                    return Meteor.users.find({
                        $or: [
                            {_id: collection.createdUserId},
                            {_id: collection.updatedUserId},
                        ]
                    });
                }
            },
            
        ],
    }
});


Meteor.methods({
    "NewsFeed.insert": function(doc) {
        var _id = NewsFeed.insert(doc);
        return {
            _id: _id,
        }
    },
    "insertUpdatMsgs": function () {
        console.log("inserting Updated Messages");
        var uALength = UpdateArticle.find().count();
        var uFLength = NewsFeed.find().count();
        var uA_ids = UpdateArticle.find({createdUserId:"R89M42qQqMhyhpo93"}).fetch();
        var nF_ids = NewsFeed.find({}).fetch();
        var uArticlerr = [];
        var newsFeedExisting = [];
        var newFeed =[];

        for (i = 0; i < uFLength; i++) {
            newsFeedExisting.push(nF_ids[i].postID);
        }
        for (i = 0; i < uALength; i++) {
            uArticlerr.push(uA_ids[i]._id);
        }
        //serching in array of updateArticles using i fromm Feed array newsFeedExisting
        //console.log("Length of Feed Array :"+uFLength);
        for (i = 0; i < uFLength; i++) {
            //checking updateArticles
            findNewFeed = uArticlerr.indexOf(newsFeedExisting[i]);
            if (findNewFeed > -1) {console.log("found "+i)}
            else {
                //check if newFeed already has it
                var chkNewFeed = newFeed.indexOf(newsFeedExisting[i]);
                if (chkNewFeed < 0) {
                    //console.log("top found:"+i)
                    newFeed.push(newsFeedExisting[i]._id);
                }
                chkNewFeed = -1;
            }
        }
        //searching in array of newsFeedExisting using i from updateArticles
        //console.log("Length of updateArticles array :"+uArticlerr);
        for (i = 0; i < uALength; i++) {
            //checking updateArticles
            findNewFeed = uArticlerr.indexOf(newsFeedExisting[i]);
            if (findNewFeed > -1) {console.log("found "+i)}
            else {
                //check if newFeed already has it
                var chkNewFeed = newFeed.indexOf(newFeed[i]);
                if (chkNewFeed < 0) {
                    //console.log("below found:"+i)
                    newFeed.push(uArticlerr[i]._id);
                }
                chkNewFeed = -1;
            }
        }
        Array.prototype.unique = function() {
            var a = this.concat();
            for(var i=0; i<a.length; ++i) {
                for(var j=i+1; j<a.length; ++j) {
                    if(a[i] === a[j])
                        a.splice(j--, 1);
                }
            }

            return a;
        };

        console.log("newsFeedExisting "+newsFeedExisting);
        console.log("uArticlerr "+uArticlerr);
        //console.log("newFeed "+ newFeed);
        newFeedArrayMerged = newsFeedExisting.concat(uArticlerr); // Merges both arrays
console.log(newFeedArrayMerged);
        //
        //for (i = 0; i < uALength; i++) {
        //    console.log(i + "- uArticle_id: " + uA_ids[i]._id + " !! uA_type: "+ uA_ids[i].type);
        //    //if (uA_ids[i]._id == nF_ids[i].postID) {console.log("@I am in both.")}
        //    uArticlerr.push(uA_ids[i]._id);
        //
        //    if (i < uFLength) {
        //        uF_PostId = nF_ids[i].postID
        //        console.log("nF_id: "+ nF_ids[i]._id+" !! nF_postID: "+ nF_ids[i].postID);
        //    }
        //    indexOfFoundArt = uArticlerr.indexOf(uF_PostId);
        //
        //    if (indexOfFoundArt < 0) {console.log("not found "+indexOfFoundArt)} else console.log("Found @ "+indexOfFoundArt);
        //
        //}

        console.log(newFeed);


        return uA_ids;

        //oneArticle = UpdateArticle.findOne({createdUserId: "YsTMuctxHCPkzEBRX"});
        //oneArticle = UpdateArticle.findOne({createdUserId: "Prb22LcfM2LSSKdiX"});
        //
        //console.log(arti);
        //var arti = {postID: oneArticle._id}
        //console.log("ds: " + NewsFeed.find({postID: arti._id}).count());

        //if (NewsFeed.find({postID: arti._id}).count() == 0){
        //    //NewsFeed.insert(arti);
        //    console.log("Added .........");
        //}
        //else {
        //    //
        //    console.log("exists  exit");
        //};

    }
});

/* observing collection */
/* uncomment to use
 var query = NewsFeed.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */
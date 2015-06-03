Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    // only allow posting if user is logged in

    return !! userId; // cast to bool
    // could be written as
    // if (userId == true) {
    //   return true;
    // }
    // return false;
  }
})

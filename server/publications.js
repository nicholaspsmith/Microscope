Meteor.publish('posts', function (author) {
  return Posts.find({
    flagged: false,
    author: author
  },
  {
    fields: {
      flagged: false
    }
  });
});
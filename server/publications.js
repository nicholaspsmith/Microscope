Meteor.publish('posts', function () {
  return Posts.find({
    flagged: false
  },
  {
    fields: {
      flagged: false
    }
  });
});
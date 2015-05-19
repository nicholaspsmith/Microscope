if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope',
    author: 'bob-smith',
    category: 'JavaScript',
    flagged: false
  });
  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com',
    author: 'bob-smith',
    category: 'JavaScript',
    flagged: false
  });
  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com',
    author: 'will-smith',
    category: 'JavaScript',
    flagged: false
  });
  Posts.insert({
    title: 'The Flagged Book',
    url: 'http://flag.com',
    author: 'jim-finnegan',
    flagged: true
  });
}

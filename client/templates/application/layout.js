Template.layout.helpers({
  pageTitle: function () { return Session.get('pageTitle'); }
});


Tracker.autorun( function() {
  var newTitle = Session.get('pageTitle');
  console.log('Value is: ' + newTitle);
  // alert('The new title is: \"' + newTitle + '\"');
  
});

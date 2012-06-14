var User = Backbone.Model.extend({});

var Users = Backbone.Collection.extend({
 model: User,
   url: 'http://localhost:9393/fruits'
});
var users = new Users;

var UserView = Backbone.View.extend({

  handleNewUser: function(data) {
    var selectField = $('select[name=newFruit]');
    users.create({content: selectField.val()});
    //inputField.val('');
  }

  , render: function() {
    // var data = fruits.map(function(fruit) { return fruit.get('content') + '\n'});
    // var result = data.reduce(function(memo,str) { return memo + str }, '');
    // $("#chatHistory").text(result);
		$(this.el).html();
    return this;
  }

});

users.bind('add', function(user) {
  users.fetch({success: function(){view.render();}});
});

var view = new FruitView({el: $('#user')});

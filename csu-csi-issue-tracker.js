Issues = new Meteor.Collection('issues');

if (Meteor.is_client) {
    Template.hello.greeting = function () {
        return "Welcome to the issue tracker.";
    };

    Template.issueList.issues = function () {
        return Issues.find();
    };

    Template.addIssue.events = {
        'click input:button': function (evt) {
            var name = $('#new-issue').val();
            console.log("Adding new issue: " + name);
            Issues.insert({name: name, status: 'New'});
        }
    };

    Template.issueList.events = {
        'click a': function (evt) {
            console.log("Marking issues " + this._id + " as fixed");
            Issues.update(this._id, {$set: {status: 'Fixed'}});
        }
    };

    Template.issueList.is_new = function () {
        return this.status === "New";
    };

}

if (Meteor.is_server) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
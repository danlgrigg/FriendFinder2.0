//Load routes
var friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });
  //Post route to display friend match
  app.post("/api/friends", function(req, res) {
    var newFriend = req.body;
    console.log(newFriend);
    // friendsData.push(newFriend);
    // res.json(newFriend);
    //New variable to store the best friend match so far as we loop through the array of friends
    var bestFriend = {
      name: "",
      photo: "",
      totalDiff: Infinity
    }
    //Loop through array of friends
    for (let i = 0; i < friendsData.length; i++) {
      var currentFriend = friendsData[i];
      var scoreDiff = 0;
      //Loop through the survey scores of current friend
      for (let j = 0; j < currentFriend.scores.length; j++) {
        //Store each survey score  in a new variable to then determine the difference and add them together
        var currentFriendScore = parseInt(currentFriend.scores[j]);
        var newFriendScore = parseInt(newFriend.scores[j]);
        // console.log(currentUserScore, currentFriendScore);
        scoreDiff += Math.abs(currentFriendScore - newFriendScore);
        console.log(scoreDiff);
      }//Set condition to find the lower of current friend score difference and the current best friend score difference and push to the best friend object
      if (scoreDiff < bestFriend.totalDiff){
        bestFriend.name = currentFriend.name;
        bestFriend.photo = currentFriend.photo
        bestFriend.totalDiff = scoreDiff;
        
      }
    }
    
    friendsData.push(newFriend);
    res.json(bestFriend);
  });
};

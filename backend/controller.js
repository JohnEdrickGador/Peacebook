import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


// get user model registered in Mongoose
const User = mongoose.model("User");
const Post = mongoose.model("Post");

const signUp = (req, res) => {
  const newuser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  });

  console.log("New user: ");
  console.log(newuser);

  newuser.save((err) => {
    if (err) { return res.send({ success: false }); }
    else { return res.send({ success: true }); }
  });
}

const login = (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  User.findOne({ email }, (err, user) => {
    // check if email exists
    if (err || !user) {
      //  Scenario 1: FAIL - User doesn't exist
      console.log("user doesn't exist");
      return res.send({ success: false });
    }

    // check if password is correct
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        // Scenario 2: FAIL - Wrong password
        console.log("wrong password");
        return res.send({ success: false });
      }

      console.log("Successfully logged in");

      // Scenario 3: SUCCESS - time to create a token
      const tokenPayload = {
        _id: user._id
      }

      const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

      // return the token to the client
      return res.send({ success: true, token, username: `${user.firstname} ${user.lastname}`, id: user._id });
    })
  })
}

const checkIfLoggedIn = (req, res) => {

  if (!req.cookies || !req.cookies.authToken) {
    // Scenario 1: FAIL - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  // Token is present. Validate it
  return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
      if (err) {
        // Scenario 2: FAIL - Error validating token
        return res.send({ isLoggedIn: false });
      }

      const userId = tokenPayload._id;

      // check if user exists
      return User.findById(userId, (userErr, user) => {
        if (userErr || !user) {
          // Scenario 3: FAIL - Failed to find user based on id inside token payload
          return res.send({ isLoggedIn: false });
        }

        // Scenario 4: SUCCESS - token and user id are valid
        console.log("user is currently logged in");
        return res.send({ isLoggedIn: true });
      });
    });
}

const SubmitPost = (req, res) => {
  const newPost = new Post({
    content: req.body.content,
    authorId: req.body.authorId,
    authorName: req.body.authorName,
    date: req.body.date
  })

  console.log(req.body.authorName)

  console.log("New post: ");
  console.log(newPost);
  newPost.save((err) => {
    if (err) { return res.send({ success: false }); }
    else { return res.send({ success: true }); }
  });
  
}

const GetFriends = (req,res) => {
  User.findById(req.body.userId, (err,user) => {
    if (err){ 
      console.log(err) 
    }
    else{
      res.json(user)
    }
  })
}

const GetUserPosts = (req,res) => {
  Post.find({authorId:req.body.userId}, (err,posts) => {
    if (err) {
      console.log(err)
    }
    else{
      res.json(posts)
    }
  })
}



const GetPosts = (req,res) => {
    var authorsList = req.body.friends;
    authorsList.push(req.body.userId);
    Post.find({authorId:{$in:authorsList}},(err, posts) => {
      if (err) {
        console.log("error occurred")
      } 
      else {
        res.json(posts);
      }
    }).sort({date: -1});
    }


const EditPost = (req,res) => {
  var postId = req.body.id;
  var newContent = req.body.content;

  //update the post
  Post.updateOne({_id:postId},
    {content:newContent},
    (err,output) => {
      if (!err) {
        console.log(output)
      }
    })
}

const DeletePost = (req,res) => {
  var postId = req.body.id;
  Post.deleteOne({_id:postId},(err,users) => {
    if (err) {
      console.log(err)
    }
    else{
      res.json(users)
    }
  })

}

const Search = (req,res) => {
  let value = req.body.value
  User.find({$or:[{firstname:{$regex:value, $options: "i"}},{lastname:{$regex:value, $options: "i"}}]}, (err, users) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(users)
    }
  })
}

const RecommendFriends = (req, res) => {
  let friends = req.body.friendList
  let user = req.body.userId
  friends.push(req.body.userId)
  User.count({}, (err, number) => {
    if (err) {
      console.log(err)
    }
    else {
      User.find({_id:user},(err,response) => {
        if (err) {
          console.log(err)
        }
        else{
          var requests = response[0].requests
          var notifications = response[0].notifications.map(notification => notification.userId)
          User.find({$and:[{_id:{$nin:friends}},{_id:{$nin:requests}},{_id:{$nin:notifications}}]}, (err, users) => {
            if (err) {
              console.log(err)
            }
            else {
              res.json(users)
            }
          }).limit(5)
        }
      })
      
    }
  })
}

const SendFriendRequest = (req,res) => {
    const receiver = req.body.receiver;
    const sender = req.body.sender;
    console.log(receiver)
    User.updateOne({_id:receiver}, {$push:{notifications:{userId:sender,notifType:"FriendRequest"}}},(err,output) => {
      if (err) {
        console.log(err);
      }
    })
    User.updateOne({_id:sender}, {$push : {requests:receiver}},(err,output) => {
      if (err) {
        console.log(err);
      }
    })
}

const ViewStats = (req, res) => {
  const userId = req.body.userId;
  User.findById(userId, (err,user) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(user)
    }
  })
}

const AcceptRequest = (req, res) => {
  const newFriend = req.body.newFriend;
  const notifId = req.body.notifId;
  const user = req.body.userId;
  //add new friend to user's friends list
  User.updateOne({_id:user},{$push:{friends:newFriend}},(err,output) => {
    if (err) {
      console.log(err)
    }
  })

  User.updateOne({_id:user},{$pull:{notifications:{_id:notifId}}},(err,output) => {
    if (err) {
      console.log(err);
    }
  })

  User.updateOne({_id:newFriend},{$pull:{requests:user}},(err,output) => {
    if (err) {
      console.log(err);
    }
  })

  User.updateOne({_id:newFriend},{$push:{friends:user}},(err,output) => {
    if (err) {
      console.log(err);
    }
  })
}

const RejectRequest = (req,res) => {
  const newFriend = req.body.newFriend;
  const notifId = req.body.notifId;
  const user = req.body.userId;
  //remove from user notifications
  User.updateOne({_id:user},{$pull:{notifications:{_id:notifId}}},(err,output) => {
    if (err) {
      console.log(err);
    }
  })

  //remove from sender's requests
  User.updateOne({_id:newFriend},{$pull:{requests:user}},(err,output) => {
    if (err) {
      console.log(err);
    }
  })
}

export { signUp, login, checkIfLoggedIn, SubmitPost, GetPosts, EditPost, GetFriends, GetUserPosts, DeletePost,Search,RecommendFriends,SendFriendRequest,ViewStats, AcceptRequest, RejectRequest}
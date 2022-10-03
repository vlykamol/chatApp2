const roomTemplate = require("../model/room");
const room = require("../model/room");


module.exports = {
  
  createRoom: (req, res) => {
    const room = new roomTemplate({
      roomName: req.body.roomName,
      admin: req.body._id,
      members: [],
    });
    room.save().then((data) => {
      console.log(req.body._id, "created new room: ", data.roomName);
      res.json(data)
    }).catch((err) => {
      console.log("err while creating room", err);
      res.send("error while creating new room")
    });
  },
  
  joinRoom: (req, res) => {
    room.findOneAndUpdate({ roomName: req.body.roomName }, { $push: { members:  {_id : req.body._id} } }).then((data) => {
      console.log(req.body._id, "joined new room : ", data.roomName);
      res.json(data)
    }).catch((err) => {
      console.log("err while joining room", err);
      res.send({error : "error while joining room"})
    });
  },
  
  getAllRooms: (req, res) => {
    const admin_id = req.params._id;
    room.find({$or: [{members: {
        "$elemMatch": { _id : admin_id}
      } },{admin: admin_id}]}).populate({path:'members', populate :{ path : "_id", select: {"_id": 1, "firstName": 1}}}).then((data) => {
        res.send(data)
      }).catch((err) => {
        console.log("error at getting all rooms : ", err)
        res.send({error : "error while getting all rooms"})
      });
  },

  getRoom : (req, res) =>{
    const roomName = req.params.roomName
    room.find({roomName:roomName}).then(data => {
      console.log('rooms', data)
      res.send(data)
    }).catch(err => {
      console.log('findinf room error', err)
      res.send({error : "error while getting a room"})
    })
  }
};

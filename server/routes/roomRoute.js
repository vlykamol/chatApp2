const express = require('express')
const { getAllRooms, getRoom, joinRoom, createRoom } = require('../controller/roomController')

const router = express.Router()

router.post('/createRoom', createRoom)
router.post('/joinRoom', joinRoom)
router.get('/:roomName', getRoom)
router.get('/getAllRooms/:_id', getAllRooms)

module.exports = router
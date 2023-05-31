const express= require ("express")
const app = express()
const cors=require("cors")
app.use(cors())
app.use(express.json())
const {ChatRoom} = require("./database/chatIndex") 
const { v4: uuidv4 }= require("uuid")
const conn= require("./database/index.js")

// messaging subserver
const http = require("http")
const {Server} = require ("socket.io")

const server = http.createServer(app)
const io = new Server(server)

io.on("connection",(socket)=>{
  socket.on("createaroom",(data)=>{
    const uniqueId = uuidv4()
    const workerId = data.workerId.toString()
    const clientId = data.clientId.toString()
    const sqlSelect=`SELECT * FROM chatrooms WHERE clientId =? AND workersId = ? ;` 
    conn.query(sqlSelect,[clientId,workerId],(error,result)=>{
      if(error){
        console.log(error)
      }
      if (result.length){
         console.log(result)
         return
      }
      else{
        const arrayOfUsers =[workerId,clientId]
        const sql = `INSERT INTO chatrooms(roomId,clientId,workersId) values(?,?,?) ` 
        conn.query(sql,[uniqueId,clientId,workerId],(err,results)=>{
        if(err){
          console.log(err)
        }
        console.log(results)
        })
     ChatRoom.create({
        uniqueId: uniqueId,
        users: arrayOfUsers,
        messages : []
    }).then(results=>{
        console.log(results)
        
    }).catch(err=>{
        console.log(err)
        
    })
      }
    })
    
  })
})


io.on('connection', (socket) => {
  console.log("connected to the messaging functionality")
  socket.on("receive", async ({uniqueId,workerId,clientId,senderClient,messageText,createdAt}) => {
    const jsonMessage = {}
    if (senderClient){
       jsonMessage.sender = clientId
       jsonMessage.receiver = workerId
    }else if(!senderClient){
       jsonMessage.sender = workerId
       jsonMessage.receiver = clientId
    }
    jsonMessage.messageText = messageText
    jsonMessage.createdAt = createdAt
     await ChatRoom.updateOne({uniqueId:uniqueId},{$push:{'messages':jsonMessage}}) 
  })
})

io.on('connection',(socket)=>{
  const uniqueId = socket.handshake.query.uniqueId
  console.log(uniqueId)
  async function getMessages(){
    const responce = await  ChatRoom.findOne({uniqueId: uniqueId})
    return responce
  }
  getMessages()
  .then(res=>{
    console.log(res.messages)
    socket.emit("messages",res.messages)
  })
  .catch(err=>{
    console.log(err)
  }) 
})

server.listen(5000, () => {
  console.log("messaging server Listening on 5000")
})
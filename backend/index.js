const express = require("express")
const cors = require ("cors")
const conn = require("./database")
const app = express()


const workerRouter = require ('./routers/routerWorker.js')
const clientRouter= require('./routers/routerClient.js')
const reviewRouter = require("./routers/routerReviews")
const taskRouter = require("./routers/routerTasks")
const reportsOftheClientRouter = require("./routers/routerReportsOfTheClients")
const reportsOftheWorkerRouter = require("./routers/routerReportsOfTheWorkers")
const chatroomsRouter = require('./routers/chatroomsRouter.js')
const paymentRouter = require('./routers/paymentRouter.js')

app.use(express.json())
app.use(cors())



app.use('/payments',paymentRouter)
app.use('/clients',clientRouter)
app.use('/workers',workerRouter)
app.use('/reviews',reviewRouter)
app.use('/chatboxes',chatroomsRouter)

app.use('/tasks',taskRouter)
app.use('/reportsofclients',reportsOftheClientRouter)
app.use('/reportsofworkers',reportsOftheWorkerRouter)

app.listen(4000,()=>console.log("connected on 4000"))
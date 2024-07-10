
import express from  "express"
import cors from "cors"
import mongoDb from "./modals_database/db.js"
import register from "./Api/registration.js"

const app = express()

app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(cors())
mongoDb()



app.use('/api', register)

app.listen(4000,()=>{
    console.log("server started !")
})
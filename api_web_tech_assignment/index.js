const mongoose = require("mongoose")
const app = require("./app")
const port = 3001;
const API = "mongodb+srv://root:root123@cluster0.hzhvoqr.mongodb.net/api_web_tech_assignment?retryWrites=true&w=majority"
async function main(){
    await mongoose.connect(API)
    console.log("Connected to Database api_web_tech_assignment")
    app.listen(port , ()=>{console.log(`Server is live at ${port}`)})
}

main()
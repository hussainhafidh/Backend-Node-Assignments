const app = require("./app");
const mongoose = require("mongoose")
const port = 8000;


mongoose.connect("mongodb://127.0.0.1:27017/10xmanagement",{ useNewUrlParser: true, useUnifiedTopology: true })
.catch(err => console.log(err))
.then(() => console.log("database is connected"))


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
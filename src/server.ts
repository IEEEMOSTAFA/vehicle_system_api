
import express from "express"
import config from "./config"
import app from "./app";



const port = config.port;

// app.get('/', (req, res) => {
//   res.send('Welcome to Vehicle System API.........!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

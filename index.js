const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ message: "hi" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log("server is ready on", PORT);

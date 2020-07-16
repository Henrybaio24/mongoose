const env = require("dotenv").config(),
  app = require("./app"),
  port = process.env.PORT || 3000;

app.listen(port, function(error){
  if(error) return console.log(error);
  console.log(`Servidor corriendo en el puerto: ${port}`);
})
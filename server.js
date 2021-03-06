const express = require('express'); 
const app = express();

app.listen(3000, function(){
    console.log('listening to port 3000');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

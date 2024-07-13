import http from 'http';
import app from './app/app.js';


const PORT  = process.env.PORT || 6666; 


// You are creating the server based on the server from the express application.
const server = http.createServer(app);
// Creating the server on express application.
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`));


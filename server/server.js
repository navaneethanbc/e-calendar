const app = require("./app");
const port = 3001;
const host = "127.0.0.0";
const server = app.listen(port, host, () => {
  console.log(`Node server:${server.address().port()}`);
});

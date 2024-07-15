
const connection = require("./config/database");
import {app} from "./app";
require("dotenv").config();
connection();
const port = process.env.PORT || process.env._PORT;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { server };

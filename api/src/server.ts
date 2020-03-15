import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log('GitBitsDun API server listening on port ' + port);
})
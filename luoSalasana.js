let hash = require("crypto").createHash("SHA256").update("yourpassword").digest("hex");

console.log(hash);

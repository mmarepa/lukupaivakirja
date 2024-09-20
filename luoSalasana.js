let hash = require("crypto").createHash("SHA256").update("toukka123").digest("hex");

console.log(hash);
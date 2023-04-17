const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Add any custom server-side logic here, if needed

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require("dotenv").config(); // Omogućava učitavanje varijabli iz .env fajla
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const searchRoutes = require("./routes/searchRoutes");
const errorHandler = require("./utils/errorHandler");
const Search = require("./models/Search");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Preporučeno je da koristite express.json() umesto body-parser-a

// Povezivanje sa MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

// Rute
app.use("/api", searchRoutes);

// Globalni error handler
app.use(errorHandler);

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");



const app = express();

const placesRoutes = require("./routes/places-routes");

app.use("/api/places", placesRoutes);

// manejo de errores

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next();
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "Error desconocido",
  });
});

app.listen(3000);

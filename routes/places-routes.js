const express = require("express");
const router = express.Router();

const placesController = require("../controllers/places-controller");

router.get("/", placesController.getAllPlaces);

router.get("/:pid", placesController.getidPlaces);

router.get("/users/:uid", placesController.getUserPlaces);

router.post("/", placesController.savePlace);

router.patch("/:pid", placesController.updatePlace);

router.delete("/:pid", placesController.deletePlace);


module.exports = router;

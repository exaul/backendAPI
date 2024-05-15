const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Rotonda",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Centro civico",
    creator: "u2",
  },
];

const getAllPlaces = (req, res, next) => {
  res.json({ place: DUMMY_PLACES });
};

const getidPlaces = (req, res, next) => {
  const place = DUMMY_PLACES.find((p) => {
    return p.id === req.params.pid;
  });
  if (!place) {
    const error = new Error("lugar no existe para el id especificado");
    error.code = 404;
    next(error);
  } else {
    res.json({ place });
  }
};
const getUserPlaces = (req, res, next) => {
  const places = DUMMY_PLACES.find((p) => {
    return p.creator === req.params.uid;
  });
  if (!places) {
    const error = new HttpError(
      "Lugar no existe para el usuario especificado.",
      404
    );
    throw error;
  }
  res.json({ places });
};
const savePlace = (req, res, next) => {
  const { title, creator } = req.body;
  const id = uuidv4();
  const createdPlace = { id, title, creator };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title } = req.body;
  const placeId = req.params.pid;

  const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place: updatedPlace });
};
const deletePlace = (req, res, next) => {
  const placeid = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeid);
  res.status(200).json({ message: "lugar borrado" });
};
exports.getAllPlaces = getAllPlaces;
exports.getidPlaces = getidPlaces;
exports.getUserPlaces = getUserPlaces;
exports.savePlace = savePlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

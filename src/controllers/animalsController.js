import createHttpError from "http-errors";
import { Animal } from "../models/animal.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const getAnimals = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    type,
    status,
    breed,
    sex,
    sortBy = "createdAt",
    sortOrder = "desc",
    minPrice,
    maxPrice,
    search,
  } = req.query;

  const skip = (page - 1) * perPage;

  const animalsQuery = Animal.find();

  if (type) {
    animalsQuery.where("type").equals(type);
  }

  if (status) {
    animalsQuery.where("status").equals(status);
  }

  if (breed) {
    const breeds = breed.split(",");
    animalsQuery.where("breed").in(breeds);
  }

  if (sex) {
    animalsQuery.where("sex").equals(sex);
  }

  if (minPrice) {
    animalsQuery.where("price").gte(Number(minPrice));
  }

  if (maxPrice) {
    animalsQuery.where("price").lte(Number(maxPrice));
  }

  if (search) {
    animalsQuery.where({ $text: { $search: search } });
  }

  animalsQuery.sort({
    [sortBy]: sortOrder,
  });

  const [totalItems, animals] = await Promise.all([
    animalsQuery.clone().countDocuments(),
    animalsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    animals,
  });
};

export const getAnimalById = async (req, res) => {
  const { animalId } = req.params;

  const animal = await Animal.findById(animalId);
  if (!animal) {
    throw createHttpError(404, "Animal not found");
  }

  res.status(200).json(animal);
};

export const createAnimal = async (req, res) => {
  const animal = await Animal.create({
    ...req.body,
  });

  if (req.files?.length) {
    const photoResults = await Promise.all(
      req.files.map((file) => saveFileToCloudinary(file.buffer, animal._id)),
    );

    animal.images = photoResults.map((result) => result.secure_url);
    await animal.save();
  }

  res.status(201).json(animal);
};

export const deleteAnimal = async (req, res) => {
  const { animalId } = req.params;
  const animal = await Animal.findByIdAndDelete(animalId);

  if (!animal) {
    throw createHttpError(404, "Animal not found");
  }

  res.status(200).json(animal);
};

export const updateAnimal = async (req, res) => {
  const { animalId } = req.params;
  const updateData = {
    ...req.body,
  };

  if (req.files?.length > 0) {
    const photoResults = await Promise.all(
      req.files.map((file) => saveFileToCloudinary(file.buffer, animalId)),
    );

    updateData.images = photoResults.map((result) => result.secure_url);
  }

  const animal = await Animal.findByIdAndUpdate(animalId, updateData, {
    new: true,
  });

  if (!animal) {
    throw createHttpError(404, "Animal not found");
  }

  res.status(200).json(animal);
};

export const getFiltersController = async (req, res) => {
  const { type } = req.query;

  const animals = await Animal.find({ type });

  const breeds = [...new Set(animals.map((animal) => animal.breed))];

  const prices = animals.map((animal) => animal.price);

  const filters = {
    breeds,
    price: {
      min: Math.min(...prices),
      max: Math.max(...prices),
    },
  };
  res.status(200).json(filters);
};

import { Animal } from "../models/animal.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export async function addToFavorites(req, res) {
  const { animalId } = req.body;

  const user = await User.findById(req.user._id);

  if (!user.favorites.includes(animalId)) {
    user.favorites.push(animalId);
    await user.save();
  }

  res.status(200).json({
    message: "animal is added",
    favorites: user.favorites,
  });
}

export async function removeFromFavorites(req, res) {
  const { animalId } = req.body;

  const user = await User.findById(req.user._id);

  user.favorites = user.favorites.filter((id) => id.toString() !== animalId);

  await user.save();

  res.status(200).json({
    message: "Animal is removed",
    favorites: user.favorites,
  });
}

export async function getFavorites(req, res) {
  const user = await User.findById(req.user._id);
  const favorites = user.favorites;

  res.status(200).json({ favorites });
}

export async function getFavoriteAnimals(req, res) {
  const user = await User.findById(req.user._id);

  const animals = await Animal.find({
    _id: { $in: user.favorites },
  });

  res.status(200).json(animals);
}

export async function clearFavorites(req, res) {
  const user = await User.findById(req.user._id);
  user.favorites = [];

  await user.save();

  res.status(200).json({
    message: "Favorites cleared",
    favorites: user.favorites,
  });
}

export async function getUserRequests(req, res) {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const requests = await Request.find({
    _id: { $in: user.requests },
  }).populate("animalId");

  res.status(200).json(requests);
}

export async function removeUserRequest(req, res) {
  const { reqId } = req.params;
  const user = await User.findById(req.user._id);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  user.requests = user.requests.filter((id) => id.toString() !== reqId);

  await user.save();

  const request = await Request.findById(reqId);

  if (!request) {
    throw createHttpError(404, "Request not found");
  }

  await Animal.findByIdAndUpdate(request.animalId, {
    status: "available",
  });

  await Request.findByIdAndDelete(reqId);

  res.status(200).json({
    message: "Request removed successfully",
  });
}

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isOldPasswordValid) {
    throw createHttpError(401, "Old password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();

  res.status(200).json({
    message: "Password changed successfully",
  });
};

export const changeName = async (req, res) => {
  const { name } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  user.name = name;
  await user.save();

  res.status(200).json(user);
};

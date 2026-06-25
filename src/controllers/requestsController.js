import createHttpError from "http-errors";
import { Animal } from "../models/animal.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";

export const getRequests = async (req, res) => {
  const requests = await Request.find();

  res.status(200).json(requests);
};

export const updateRequest = async (req, res) => {
  const { reqId } = req.params;
  const request = await Request.findByIdAndUpdate(reqId, req.body, {
    returnDocument: "after",
  });

  if (!request) {
    throw createHttpError(404, "Request not found");
  }

  res.status(200).json(request);
};

export const deleteRequest = async (req, res) => {
  const { reqId } = req.params;

  const request = await Request.findByIdAndDelete(reqId);

  if (!request) {
    throw createHttpError(404, "Request not found");
  }

  res.status(200).json(request);
};

export const createRequest = async (req, res) => {
  const { email, animalId } = req.body;

  const existingRequest = await Request.findOne({
    email,
    animalId,
  });

  if (existingRequest) {
    return res.status(409).json({
      message: "Request already exists",
    });
  }

  const animal = await Animal.findById(animalId);

  if (!animal) {
    throw createHttpError(404, "Animal not found");
  }

  if (animal.status !== "available") {
    throw createHttpError(409, "Animal is already reserved");
  }

  animal.status = "reserved";
  await animal.save();

  const newRequest = await Request.create(req.body);

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(201).json({
      request: newRequest,
      isUserRegistered: false,
    });
  }

  existingUser.requests.push(newRequest);

  await existingUser.save();

  return res.status(201).json({
    request: newRequest,
    isUserRegistered: true,
  });
};

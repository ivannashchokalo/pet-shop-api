import { Animal } from "../models/animal.js";
import { Request } from "../models/request.js";

export const statisticsController = async (req, res) => {
  const [
    animalsAvailableCount,
    happyOwnersCount,
    reservedCount,
    soldCount,
    availableDogsCount,
    availableCatsCount,
    availableBirdsCount,
    availableRodentsCount,
  ] = await Promise.all([
    Animal.countDocuments({ status: "available" }),
    Request.countDocuments({ status: "closed" }),
    Animal.countDocuments({ status: "reserved" }),
    Animal.countDocuments({ status: "sold" }),
    Animal.countDocuments({ type: "dog", status: "available" }),
    Animal.countDocuments({ type: "cat", status: "available" }),
    Animal.countDocuments({ type: "bird", status: "available" }),
    Animal.countDocuments({ type: "rodent", status: "available" }),
  ]);

  res.status(200).json({
    animalsAvailableCount,
    happyOwnersCount,
    availableDogsCount,
    availableCatsCount,
    availableBirdsCount,
    availableRodentsCount,
    reservedCount,
    soldCount,
  });
};

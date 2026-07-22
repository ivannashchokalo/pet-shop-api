import { Animal } from "../models/animal.js";
import { Request } from "../models/request.js";

export const statisticsController = async (req, res) => {
  const animalsAvailableCount = await Animal.countDocuments({
    status: "available",
  });

  const dogsCount = await Animal.countDocuments({ type: "dog" });
  const catsCount = await Animal.countDocuments({ type: "cat" });
  const birdsCount = await Animal.countDocuments({ type: "bird" });
  const rodentsCount = await Animal.countDocuments({ type: "rodent" });

  const happyOwnersCount = await Request.countDocuments({ status: "closed" });

  const reservedCount = await Animal.countDocuments({
    status: "reserved",
  });
  const soldCount = await Animal.countDocuments({
    status: "sold",
  });
  const availableDogsCount = await Animal.countDocuments({
    type: "dog",
    status: "available",
  });
  const availableCatsCount = await Animal.countDocuments({
    type: "cat",
    status: "available",
  });
  const availableBirdsCount = await Animal.countDocuments({
    type: "bird",
    status: "available",
  });

  const availableRodentsCount = await Animal.countDocuments({
    type: "rodent",
    status: "available",
  });

  res.status(200).json({
    dogsCount,
    catsCount,
    birdsCount,
    rodentsCount,
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

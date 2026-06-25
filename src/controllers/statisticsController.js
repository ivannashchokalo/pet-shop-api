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

  res.status(200).json({
    dogsCount,
    catsCount,
    birdsCount,
    rodentsCount,
    animalsAvailableCount,
    happyOwnersCount,
  });
};

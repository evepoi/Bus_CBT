import { lawQuestions } from "./law";
import { vehicleQuestions } from "./vehicle";
import { safetyQuestions } from "./safety";
import { serviceQuestions } from "./service";

export const questions = [
  ...lawQuestions,
  ...vehicleQuestions,
  ...safetyQuestions,
  ...serviceQuestions
];
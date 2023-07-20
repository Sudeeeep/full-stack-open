interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter(
    (item) => item > 0
  ).length;
  const average: number =
    dailyExerciseHours.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success: boolean = average >= target;
  const percentage: number = (average / target) * 100;

  let rating: number, ratingDescription: string;

  if (percentage >= 100) {
    rating = 3;
    ratingDescription = "Congrats! Daily target reached";
  } else if (percentage >= 75 && percentage < 100) {
    rating = 2;
    ratingDescription =
      "You're close! Little more effort needed to reach daily target";
  } else {
    rating = 1;
    ratingDescription = "Long way to go to reach daily target";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface Exercise {
  target: number;
  dailyHours: number[];
}

export const parseArguments = (args: string[]): Exercise => {
  if (args.length < 4) throw new Error("not enough arguments");

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map((hours) => Number(hours));

  if (isNaN(target) || dailyHours.some((hours) => isNaN(hours))) {
    throw new Error("Please provide arguments as numbers");
  }

  const hasInvalidDailyHours = dailyHours.some((hours) => hours > 24);

  if (target > 24 || hasInvalidDailyHours) {
    throw new Error("Maximum hours per day is 24");
  }

  return {
    target,
    dailyHours,
  };
};

try {
  const { target, dailyHours } = parseArguments(process.argv);
  console.log(exerciseCalculator(dailyHours, target));
} catch (error) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

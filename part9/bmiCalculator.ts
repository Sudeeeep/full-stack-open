interface Measurements {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Measurements => {
  if (args.length < 4) throw new Error("not enough arguments");
  if (args.length > 4) throw new Error("too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const bmiCalculator = (height: number, weight: number): string => {
  const bmi: number = Number((weight / (height / 100) ** 2).toFixed(1));

  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi >= 18.5 && bmi <= 25) {
    return "Normal (healthy weight)";
  }
  if (bmi > 25 && bmi <= 30) {
    return "Overweight";
  }
  if (bmi > 30) {
    return "Obese";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

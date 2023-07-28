import { CoursePart } from "../types";
import { Part } from "./Part";

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  console.log(courseParts);
  return (
    <div>
      {courseParts.map((part, index) => (
        <div key={index}>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>

          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

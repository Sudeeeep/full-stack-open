import { CoursePart } from "../types";

export const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>{`Project exercises ${part.groupProjectCount}`}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>{part.description}</p>
          <p>{part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>{part.description}</p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </div>
      );

    default:
      return assertNever(part);
  }
};

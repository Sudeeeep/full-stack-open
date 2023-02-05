const Header = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};

const Total = ({ parts }) => {
  console.log(parts);
  const total = parts.reduce(
    (sum, currentValue) => sum + currentValue.exercises,
    0
  );

  return (
    <div>
      <p>Total number of exercises {total}</p>
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div>
            <Header key={course.name} name={course.name} />
            <Content key={course.parts} parts={course.parts} />
            <Total key={course.id} parts={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;

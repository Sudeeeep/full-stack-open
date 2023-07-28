import { Name } from "../types";

export const Header = (props: Name) => {
  console.log(props);
  return <h1>{props.name}</h1>;
};

import styled from "styled-components";

export const Button = styled.button`
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.2rem;
  background-color: ${(props) => (props.$secondary ? "#ff2777" : "#FF7E50")};
  color: #fef6ff;
  cursor: pointer;
`;

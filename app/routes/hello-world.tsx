import * as React from "react";

interface NewComponentProps {
  name: string;
}
const NewComponent: React.FC<NewComponentProps> = ({ name }) => {
  return (
    <>
      <h1> hello NewComponent</h1>
    </>
  );
};

export default NewComponent;

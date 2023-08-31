import { Button, Toolbar, useRedirect } from "react-admin";

export const CustomCancelButton = () => {
  const redirect = useRedirect();

  const handleClick = () => {
    redirect("/posts");
  };

  return <Button label="Cancel" onClick={handleClick} />;
};

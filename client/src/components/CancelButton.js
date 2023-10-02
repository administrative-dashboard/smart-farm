import { Button, Toolbar, useRedirect } from "react-admin";

export const CustomCancelButton = () => {
  const redirect = useRedirect();

  const handleClick = () => {
    redirect("/dashboard");
  };

  return <Button label="Cancel" onClick={handleClick} />;
};

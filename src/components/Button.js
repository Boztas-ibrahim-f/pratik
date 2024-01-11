import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export function PurpleButton({ children, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };
  return (
    <Button
      backgroundColor="purple.700"
      m={5}
      p={5}
      color="white"
      _hover={{ backgroundColor: "purple.500" }}
      onClick={handleClick}
    >
      {" "}
      {children}{" "}
    </Button>
  );
}
PurpleButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export function OrangeButton({ children, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };
  return (
    <Button
      backgroundColor="purple.500"
      m={5}
      p={5}
      color="white"
      _hover={{ backgroundColor: "purple.700" }}
      onClick={handleClick}
    >
      {" "}
      {children}{" "}
    </Button>
  );
}
OrangeButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

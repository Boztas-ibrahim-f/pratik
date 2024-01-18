import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Grid,
} from "@chakra-ui/react";
import Logo from "../Ted.jpg";
import alışveriş from "../Alışveriş sepetiniz boştur..jpg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Basket() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const handleBasket = localStorage.getItem("basket");
  const storedBasket = JSON.parse(handleBasket);

  const handleRemoveFromCart = (urunId) => {
    const updatedCart = cart.filter((urun) => urun.id !== urunId);
    setCart(updatedCart);

    localStorage.setItem("basket", JSON.stringify(updatedCart));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      h="100%"
    >
      <Heading
        w="full"
        h="20"
        display="flex"
        justifyContent="space-between"
        p="0,5%"
        bgColor="gray.100"
      >
        <Image
          src={Logo}
          w={150}
          mt={2}
          ml="5%"
          onClick={() => navigate("/")}
          cursor="pointer"
        />
        <Button
          colorScheme="purple"
          m="15px 2% 0 0"
          onClick={() => navigate("/profile")}
        >
          Profil
        </Button>
      </Heading>
      {storedBasket?.length > 0 ? (
        <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
          "2xl": "repeat(5, 1fr)",
        }}
        gap={3}
        px={{
          base:"12%",
          xl : "8%",
          "2xl" : "4%"
        }}
        m="3"
        >
          {storedBasket?.map((urun, index) => (
            <Card
              key={index}
              maxW="sm"
              display="flex"
              justifyContent="center"
              variant="unstyled"
              h="100%"
              minH="700px"
              maxH="800px"
              gap={3}
            >
              <CardBody >
                <Image src={urun.image} borderRadius="lg" w="100%" />
                <Stack p="19px 13px 13px 13px" spacing="3" borderTop="1px "  borderTopRadius="50">
                  <Heading size="md">{urun.title}</Heading>
                  <Text maxH="250px" overflow="hidden" fontSize="17" fontFamily="aling" fontWeight="800">
                    This sofa is perfect for modern tropical spaces, baroque
                    inspired spaces, earthy toned spaces and for people who love
                    a chic design with a sprinkle of vintage design.This sofa is perfect for modern tropical spaces, baroque
                    inspired spaces, earthy toned spaces and for people who love
                   
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    {urun.fiyat} TL
                  </Text>
                </Stack>
              </CardBody>
              <CardFooter p={3}>
                <ButtonGroup spacing="2" w="full">
                  <Button w="50%" variant="solid" colorScheme="blue" onClick={() => {}}>
                    Ekle
                  </Button>
                  <Button
                  w="50%"
                    variant="ghost"
                    bgColor="gray.200"
                    onClick={() => handleRemoveFromCart(urun.id)}
                  >
                    Çıkart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Image src={alışveriş} pt="10%" />
        </Box>
      )}
    </Box>
  );
}

export default Basket;

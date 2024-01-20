import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  Flex,
  Grid,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import data from "../data/data.json";
import logo from "../Ted.jpg";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { OrangeButton, PurpleButton } from "../components/Button";

function Home() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(
        data.filter((urun) =>
          urun.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (urun) => {
    setCart([...cart, urun]);
    localStorage.setItem("basket", JSON.stringify([...cart, urun]));
  };

  const handleRemoveFromCart = (urunId) => {
    const updatedCart = cart.filter((urun) => urun.id !== urunId);
    setCart(updatedCart);

    localStorage.setItem("basket", JSON.stringify(updatedCart));
  };

  return (
    <Box w="full">
      <Flex
        justifyContent="center"
        alignItems="center"
        gap="20px"
        w="100%"
        background={"gray.100"}
        flexWrap={{
          base: "wrap",
          md: "nowrap",
        }}
        display="flex"
        h={{
          lg: "70px",
          "2xl": "80px",
        }}
      >
        <Image
          src={logo}
          w={150}
          mt={2}
          mx={{
            base: "25%",
            md: "5%",
            lg: "10%",
            xl: "9%",
            "2xl": "10%",
          }}
        />

        <Input
          variant="outline"
          placeholder="Ara..."
          focusBorderColor="purple.400"
          w="md"
          onChange={handleChange}
          value={searchTerm}
        />
        <ButtonGroup
          mx={{
            base: "15%",
            md: "5%",
            lg: "8%",
            xl: "8%",
            "2xl": "5%",
          }}
        >
          {!user ? (
            <PurpleButton to="/sign-in">Giriş Yap</PurpleButton>
          ) : (
            <PurpleButton to="/basket">Sepet</PurpleButton>
          )}
          {!user ? (
            <OrangeButton to="/sign-up">Kayıt Ol </OrangeButton>
          ) : (
            <OrangeButton to="/profile">Profile</OrangeButton>
          )}
        </ButtonGroup>
      </Flex>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
          "2xl": "repeat(5, 1fr)",
        }}
        gap={5}
        px={{
          base: "12%",
          xl: "8%",
          "2xl": "4%",
        }}
        mt="50px"
        w="full"
        placeItems="center"
      >
        {filteredData.map((urun) => {
          return (
            <Card
              key={urun.id}
              maxW="sm"
              h="100%"
              minH="700px"
              maxH="800px"
              variant="undstyled"
              mb={9}
              border="1px solid black"
              p="20px"
            >
              <Image
                width="100%"
                src={urun.image}
                alt={urun.title}
                borderRadius="lg"
              />
              <Stack spacing="3" display="flex" h="full">
                <Box mt="4" ml="2">
                  <Text fontSize="25px" fontWeight="600">
                    {urun.title}
                  </Text>
                  <Box overflow="hidden">
                    {urun.inStock ? (
                      <Text fontStyle="arial" fontWeight={500} fontSize="15">
                        Lorem ipsum odor amet, consectetuer adipiscing elit.
                        Scelerisque iaculis cras semper potenti; iaculis turpis
                        nisl facilisi. Fames mauris natoque ac dolor fermentum
                        congue. Blandit himenaeos penatibus quam varius nulla
                        euismod hendrerit interdum. Porta platea ipsum ornare
                        felis
                      </Text>
                    ) : (
                      <Text
                        fontSize="xl"
                        textColor="gray.600"
                        fontFamily="cursive"
                      >
                        Yakın zamanda tekrardan stockta.
                      </Text>
                    )}
                  </Box>
                </Box>
                <Box
                  height="full"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Text color="blue.600" fontSize="2xl">
                    {urun.fiyat} TL
                  </Text>
                  <Text mt="2" color="gray.600">
                    {urun.inStock ? "In Stock" : "Out of Stock"}
                  </Text>
                </Box>
              </Stack>
              <CardFooter justifyContent="center" w="full" px="0">
                {user ? (
                  urun.inStock ? (
                    <ButtonGroup spacing="2" w="full">
                      <Button
                        variant="solid"
                        w="100%"
                        colorScheme="blue"
                        isDisabled={
                          cart.findIndex((data) => data.id === urun.id) !== -1
                            ? true
                            : false
                        }
                        onClick={() => handleAddToCart(urun)}
                      >
                        Ekle
                      </Button>
                      <Button
                        variant="ghost"
                        w="100%"
                        bgColor="gray.200"
                        onClick={() => handleRemoveFromCart(urun.id)}
                        isDisabled={
                          cart.findIndex((data) => data.id === urun.id) === -1
                            ? true
                            : false
                        }
                      >
                        Çıkart
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <ButtonGroup spacing="2" w="full">
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        w="100%"
                        style={{
                          opacity: urun.inStock ? 1 : 0.5,
                          cursor: urun.inStock ? "pointer" : "not-allowed",
                        }}
                      >
                        Ekle
                      </Button>
                      <Button
                        variant="ghost"
                        bgColor="gray.200"
                        w="100%"
                        style={{
                          opacity: urun.inStock ? 1 : 0.5,
                          cursor: urun.inStock ? "pointer" : "not-allowed",
                        }}
                      >
                        Çıkart
                      </Button>
                    </ButtonGroup>
                  )
                ) : (
                  <Box display="none"></Box>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Home;

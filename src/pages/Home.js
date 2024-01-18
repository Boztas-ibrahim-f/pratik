import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import data from "../data/data.json";
import LoremIpsum from "react-lorem-ipsum";
import logo from "../Ted.jpg";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { OrangeButton, PurpleButton } from "../components/Button";

function Home() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const [menuVisible, setMenuVisible] = useState(isLargeScreen);
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
  const filteredData = data.filter((urun) =>
    urun.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (urun) => {
    setCart([...cart, urun]);
    console.log(urun.sayı);
    localStorage.setItem("basket", JSON.stringify([...cart, urun]));
  };

  const handleRemoveFromCart = (urunId) => {
    const updatedCart = cart.filter((urun) => urun.id !== urunId);
    setCart(updatedCart);

    localStorage.setItem("basket", JSON.stringify(updatedCart));
  };

  return (
    <>
    <Box>
      <Flex
        justifyContent="space-between"
        align="center"
        w="100%"
        bg="gray.100"
        flexWrap={{
          base: "wrap",
          md: "nowrap"
        }}
        display="flex"
        h={{
          lg: "70px",
          "2xl": "80px"
        }}
      >
        <Image src={logo} w={150} mt={2} mx={{
          base : "25%",
          md: "5%",
          lg: "10%",
          xl:"9%",
          "2xl": "10%"
        }} />

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
          base : "15%",
          md: "5%",
          lg: "8%",
          xl: "8%",
          "2xl": "5%"
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
      </Flex></Box>
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
        {filteredData.map((urun) => (
          <Card
            key={urun.id}
            maxW="sm"
            h="100%"
            minH="700px"
            maxH="800px"
            variant="undstyled"
            mb={9}
          >
            <Image
              width="100%"
              src={urun.image}
              alt={urun.title}
              borderRadius="lg"
            />
            <Stack  spacing="3" display="flex" h="full">
              <Box borderTop="1px" borderRadius="50" p="6">
                <Heading size="md" pb="4">
                  {urun.title}
                </Heading>
                <Box maxH="200px" overflow="hidden">
                  {urun.inStock ? (
                    <Text fontStyle="arial" fontWeight={500} fontSize="15">
                      <LoremIpsum p={1} />
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
                justifyContent="flex-end"
                flexDirection="column"
              >
                <Text color="blue.600" fontSize="2xl">
                  {urun.fiyat} TL
                </Text>
                <Text mt="2" color="gray.600">
                  {urun.inStock ? "In Stock" : "Out of Stock"}
                </Text>
              </Box>
            </Stack>
            <CardFooter justifyContent="center" w="full">
              {user ? (
                urun.inStock ? (
                  <ButtonGroup spacing="2" w="full">
                    <Button
                      variant="solid"
                      w="50%"
                      colorScheme="blue"
                      disabled={!urun.inStock}
                      onClick={() => handleAddToCart(urun)}
                    >
                      Ekle
                    </Button>
                    <Button
                      variant="ghost"
                      w="50%"
                      bgColor="gray.200"
                      onClick={() => handleRemoveFromCart(urun.id)}
                    >
                      Çıkart
                    </Button>
                  </ButtonGroup>
                ) : (
                  <ButtonGroup spacing="2" w="full">
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      w="50%"
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
                      w="50%"
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
        ))}
      </Grid>
    </>
  );
}

export default Home;

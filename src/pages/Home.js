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
} from "@chakra-ui/react";

import data from "../data/data.json";
import LoremIpsum from "react-lorem-ipsum";
import logo from "../Ted.jpg";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { OrangeButton, PurpleButton } from "../components/Button";


function Home( ) {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
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
    console.log("Ürün sepete eklendi:", urun);
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        align="center"
        w="100%"
        bg="gray.100"
      >
        <Image src={logo} w={150} mt={2} ml="5%" />

        <Input
          variant="outline"
          placeholder="Ara..."
          focusBorderColor="purple.400"
          w="md"
          onChange={handleChange}
          value={searchTerm}
        />
        <ButtonGroup>
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
        p={1}
        m="3"
      >
        {filteredData.map((urun) => (
          <Card key={urun.id} maxW="sm" p="5">
            <Image
              width="100%"
              src={urun.image}
              alt={urun.title}
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3" display="flex" h="full">
              <Box>
                <Heading size="md">{urun.title}</Heading>
                <Text>
                  <LoremIpsum p={1} />
                </Text>
              </Box>
              <Spacer />
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
            <Divider />
            <CardFooter justifyContent="center">
              {user ? (
                <ButtonGroup spacing="2">
                  <Button
                    variant="solid"
                    colorScheme="orange"
                    onClick={() => handleAddToCart(urun)}
                  >
                    Ekle
                  </Button>
                  <Button
                    variant="ghost"
                    colorScheme="brand"
                    onClick={() => {}}
                  >
                    Çıkart
                  </Button>
                </ButtonGroup>
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

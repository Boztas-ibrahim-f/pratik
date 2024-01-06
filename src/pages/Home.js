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
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Flex justifyContent="space-between" align="center">
        <Image src={logo} w={150} mt={2} ml={5} />
        <Input 
        variant='outline' 
        placeholder='Outline' 
        w="md"  
        />
        <ButtonGroup>
          <Button 
          as={Link}
          to="/profile"
          colorScheme="purple"
          mt={5}
          >
            Profile</Button>
      {false ? <Button  as={Link} 
          to="/sign-in"
          colorScheme="orange"
          m={5}>Sepete Git </Button> :   <Button 
          as={Link} 
          to="/sign-in"
          colorScheme="orange"
          m={5}
          >
            Giriş Yap
          </Button>}
        </ButtonGroup>
      </Flex>
      <Grid
       templateColumns={{base:"repeat(1, 1fr)", md:'repeat(2, 1fr)',lg:"repeat(3, 1fr)", xl:"repeat(4, 1fr)", "2xl":"repeat(5, 1fr)"}}
        gap={5}
        p={1}
        m="3"
      >
        {data.map((urun) => (
          <Card key={urun.id} maxW="sm" p="5">
              <Image
                width="100%"
                src={urun.image}
                alt={urun.title}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3" display="flex" h="full">
                {/* //Stok sayılarını kutunun alt tarafına alıncak */}
                <Box>
                  <Heading size="md">{urun.title}</Heading>
                  <Text >
                    <LoremIpsum p={1} />
                  </Text>
                </Box>
                <Spacer />
                <Box height="full" display="flex" justifyContent="flex-end" flexDirection="column" >
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
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="orange">
                  Buy now
                </Button>
                <Button variant="ghost" colorScheme="brand">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </>
  );
}

export default Home;

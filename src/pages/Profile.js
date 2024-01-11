import { Box, Button, Flex, Grid, GridItem, Image, Input, InputGroup } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import {auth} from "../firebase";
import React from "react";
import { useState } from "react";
import { OrangeButton } from "../components/Button";
import Logo from "../Ted.jpg";


function Profile() {
  const [menuVisible, setMenuVisible] = useState(false);
  const user = auth.currentUser;
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });

  console.log(user);

  

  const authClick = async () => {
    await signOut(auth)
  };
  return (
    <Grid
      templateAreas={`"header header" "nav main"`}
      gridTemplateRows={"100px 1fr 30px"}
      gridTemplateColumns={"100% 1fr"}
      height="100vh"
      width="100%"
      color="blackAlpha.700"
      fontWeight="bold"
      backgroundColor="yellow"
    >
      <GridItem
        display="flex"
        justifyContent="space-between"
        area={"header"}
        backgroundColor="pink"
      >
        <Image src={Logo} h={50} w={150} mt={6} ml="11%" borderRadius="full" />
        <OrangeButton to="/">Ana Sayfa</OrangeButton>
      </GridItem>
      <Flex>
        <GridItem
          width="50%"
          height="100%"
          area={"nav"}
          backgroundColor="black"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Box
            display="flex"
            width="full"
            justifyContent="center"
            backgroundColor="white"
            mt={10}
          >
            <Image
              src="https://www.glassium.com/img/products/yt0108-yuvarlak-cam-tablo-kirilmaz-ev-dekorasyonu-1_07.04.2023_eb41548.jpg"
              w={100}
              h={100}
              alignItems="center"
              borderRadius="full"
            />
          </Box>
          <Button colorScheme="purple" onClick={() => setMenuVisible(!true)}> Bilgilerimi Göster</Button>
          <Button colorScheme="purple" onClick={() => setMenuVisible(!false)}>Bilgilerimi Değiştir</Button>
          <Button colorScheme="blue" mt="auto" onClick={authClick}>Çıkış Yap</Button>
        </GridItem>
        <GridItem width="full" height="full" backgroundColor="red" >
          {menuVisible ?<Flex
            alignItems="center"
            mt="39"
            backgroundColor="yellowgreen"
            gap="3"
            width="full"
            height="auto"
            border="2"
          >
            <Box
              border="2"
              borderColor="black"
              borderBottomStyle="solid"
              backgroundColor="blue"
              height="min-content"
              borderRadius={30}
              width="full"
              p={10}
            >
              <InputGroup flexDirection="column" border={1} shadow={2} borderStyle="solid" >
              <Input backgroundColor="violet" placeholder="İsim "/>
              <Input backgroundColor="violet" placeholder="Email "/>
              <Input backgroundColor="violet" type="number" placeholder="Telefon numarası"/>
              </InputGroup>
              <Box width="full" display="flex" justifyContent="end" >
              <OrangeButton >Değiştir</OrangeButton></Box>
            </Box>
          </Flex>:<Flex
            alignItems="center"
            mt="39"
            backgroundColor="yellowgreen"
            gap="3"
            width="full"
            height="auto"
            border="2"
          >
            <Box
              border="2"
              borderColor="black"
              borderBottomStyle="solid"
              backgroundColor="blue"
              height="min-content"
              borderRadius={30}
              width="full"
              p={10}
              m={5}
            >
              <Box backgroundColor="pink.200" border={2} borderStyle="solid" borderRadius={30} p={3}>
                <Box border={2} borderColor="black" display="flex" justifyContent="start">
                  <Box width="30%">İsim </Box>
                  <Box>: { user.displayName }dsa</Box>
                </Box>
                <Box my={3} border={2} display="flex" >
                  <Box width="30%">Email: </Box>
                  <Box>: { user.email }dsa</Box>
                </Box>
                <Box border="2" borderColor="black" display="flex">
                  <Box w="30%">Telefon</Box>
                  <Box>: { user.phoneNumber }das</Box>
                </Box>
              </Box>
              
            </Box>
          </Flex>}
        </GridItem>
      </Flex>
    </Grid>
  );
}

export default Profile;

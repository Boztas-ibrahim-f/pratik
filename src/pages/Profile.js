import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import { OrangeButton } from "../components/Button";
import Logo from "../Ted.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [veri, setVeri] = useState({
    displayName: "",
    email: "",
    number: null,
  });
  const md = useBreakpointValue({ base: false, sm: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const handleChange = (e, field) => {
    setVeri({ ...veri, [field]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: veri.displayName,
          email: veri.email,
          phoneNumber: veri.number,
        });
        toast.success("Profil başarıyla güncellendi");
        setVeri({
          displayName: "",
          email: "",
          number: "",
        });
        setUser(auth.currentUser);
      } catch (error) {
        console.error("Error updating user profile:", error.message);
        toast.error("Profil güncellenirken bir hata oluştu");
      }
    }
  };
  const deleteUser = async () => {
    navigate("/");
    await signOut(auth);
    toast.success("Kullanıcı silme işlemi başarılı.");
    await user.delete(auth);
  };
  const authClick = async () => {
    navigate("/");
    await signOut(auth);
    toast.success("Başarılı şekilde çıkış yapıldı");
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
      bg="gray.100"
    >
      <GridItem display="flex" justifyContent="space-between" area={"header"}>
        <Image
          src={Logo}
          h={70}
          w={150}
          mt={6}
          ml={{
            base: "25%",
            sm: "40%",
            md: "7%",
            lg: "10%",
          }}
          borderRadius="full"
          onClick={() => navigate("/")}
          cursor="pointer"
        />
        {md ? (
          <OrangeButton to="/">Ana Sayfa</OrangeButton>
        ) : (
          <Button display="none">Ana Sayfa</Button>
        )}
      </GridItem>
      {md ? (
        <Flex>
          <GridItem
            width="40%"
            height="100%"
            area={"nav"}
            display="flex"
            flexDirection="column"
            pl={5}
            gap={2}
          >
            <Box display="flex" width="full" justifyContent="center" mt={10}>
              <Image
                src="https://www.glassium.com/img/products/yt0108-yuvarlak-cam-tablo-kirilmaz-ev-dekorasyonu-1_07.04.2023_eb41548.jpg"
                w={100}
                h={100}
                alignItems="center"
                borderRadius="full"
              />
            </Box>
            <Button colorScheme="purple" onClick={() => setMenuVisible(!true)}>
              Bilgilerimi Göster
            </Button>
            <Button colorScheme="purple" onClick={() => setMenuVisible(!false)}>
              Bilgilerimi Değiştir
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => navigate("/reset-password")}
            >
              Şifremi Yenile
            </Button>
            <Box display="flex" flexDirection="column" gap={1} mt="auto">
              <Button colorScheme="blue" onClick={deleteUser}>
                Hesabımı Sil
              </Button>
              <Button colorScheme="blue" onClick={authClick}>
                Çıkış Yap
              </Button>
            </Box>
          </GridItem>
          <GridItem width="full" height="full">
            {menuVisible ? (
              <Flex
                alignItems="center"
                mt="50"
                p="10px 10px 0 5"
                gap="3"
                width="full"
                height="auto"
              >
                <Box height="min-content" borderRadius={30} width="full" p={10}>
                  <form onSubmit={handleSubmit}>
                    <InputGroup
                      flexDirection="column"
                      shadow={2}
                      borderStyle="solid"
                      border="2"
                      gap={2}
                    >
                      <Input
                        focusBorderColor="purple.400"
                        variant="flushed"
                        placeholder="İsim"
                        value={veri.displayName}
                        onChange={(e) => handleChange(e, "displayName")}
                      />
                      <Input
                        focusBorderColor="purple.400"
                        variant="flushed"
                        placeholder="Email"
                        value={veri.email}
                        onChange={(e) => handleChange(e, "email")}
                      />
                    </InputGroup>
                    <Box
                      width="full"
                      display="flex"
                      justifyContent="end"
                      mt={4}
                    >
                      <Button colorScheme="blue" type="submit">
                        Değiştir
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Flex>
            ) : (
              <Flex
                alignItems="center"
                mt="39"
                width="full"
                height="auto"
                gap="10"
              >
                <Box height="min-content" width="full" p={10} m={5}>
                  <Box
                    border={2}
                    borderStyle="solid"
                    borderColor="blue.400"
                    borderRadius={30}
                    px={5}
                  >
                    <Box alignItems="end" display="flex">
                      <Box width="30%" mt={3}>
                        İsim{" "}
                      </Box>
                      <Box>: {user.displayName}</Box>
                    </Box>
                    <Box my={3} display="flex">
                      <Box width="30%">Email </Box>
                      <Box>: {user.email}</Box>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            )}
          </GridItem>
        </Flex>
      ) : (
        <>
          <Box borderRightRadius="50" display="inline">
            <Button
              ref={btnRef}
              colorScheme="blue"
              onClick={onOpen}
              width="10p"
              pl="3"
              display="flex"
            >
              Menu
            </Button>
            <GridItem width="full" height="full">
              {menuVisible ? (
                <Flex alignItems="center" gap="3" width="full" height="auto">
                  <Box height="min-content" width="full" p={10}>
                    <form onSubmit={handleSubmit}>
                      <InputGroup
                        flexDirection="column"
                        shadow={2}
                        borderStyle="solid"
                        border="2"
                        gap={2}
                      >
                        <Input
                          focusBorderColor="purple.400"
                          variant="flushed"
                          placeholder="İsim"
                          value={veri.displayName}
                          onChange={(e) => handleChange(e, "displayName")}
                        />
                        <Input
                          focusBorderColor="purple.400"
                          variant="flushed"
                          placeholder="Email"
                          value={veri.email}
                          onChange={(e) => handleChange(e, "email")}
                        />
                      </InputGroup>
                      <Box
                        width="full"
                        display="flex"
                        justifyContent="end"
                        mt={4}
                      >
                        <Button colorScheme="blue" type="submit">
                          Değiştir
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Flex>
              ) : (
                <Flex
                  alignItems="center"
                  mt="50"
                  width="full"
                  height="auto"
                  gap="10"
                >
                  <Box height="max-content" width="full">
                    <Box
                      borderStyle="solid"
                      borderColor="blue.400"
                      pl={10}
                      flexWrap="wrap"
                    >
                      <Box alignItems="end" display="flex" flexWrap="wrap">
                        <Box width="25%" pt={3}>
                          İsim
                        </Box>
                        :<Box> {user.displayName}</Box>
                      </Box>
                      <Box
                        py={3}
                        display="flex"
                        alignItems="end"
                        flexWrap="wrap"
                      >
                        <Box width="25%">Email </Box>:<Box> {user.email}</Box>
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              )}
            </GridItem>
          </Box>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader mt={6}>
                <Box
                  display="flex"
                  width="full"
                  justifyContent="center"
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
              </DrawerHeader>

              <DrawerBody
                w="100%"
                display="flex"
                flexDirection="column"
                gap={2}
                mt={6}
              >
                <Button
                  colorScheme="purple"
                  onClick={() => {
                    navigate("/");
                    onClose();
                  }}
                >
                  Ana Sayfa
                </Button>

                <Button
                  colorScheme="purple"
                  onClick={() => {
                    setMenuVisible(!true);
                    onClose();
                  }}
                >
                  Bilgilerimi Göster
                </Button>
                <Button
                  colorScheme="purple"
                  onClick={() => {
                    setMenuVisible(!false);
                    onClose();
                  }}
                >
                  Bilgilerimi Değiştir
                </Button>
                <Button
                  colorScheme="purple"
                  onClick={() => navigate("/reset-password")}
                >
                  Şifremi Yenile
                </Button>
              </DrawerBody>

              <DrawerFooter
                display="flex"
                flexDirection="column"
                gap={1}
                mt="auto"
                w="full"
              >
                <Button colorScheme="blue" onClick={deleteUser} w="full">
                  Hesabımı Sil
                </Button>
                <Button colorScheme="blue" onClick={authClick} w="full">
                  Çıkış Yap
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Grid>
  );
}
export default Profile;

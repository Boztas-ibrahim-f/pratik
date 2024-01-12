import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { OrangeButton } from "../components/Button";
import Logo from "../Ted.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [veri, setVeri] = useState({
    displayName: "",
    email: "",
    number: "",
  });
  const navigate = useNavigate();

  console.log(auth.currentUser);
  console.log(veri);

  const updateUserProfile = async () => {
    if (user) {
      try {
        await auth.updateCurrentUser({
          displayName: veri.displayName,
          email: veri.email,
          phoneNumber: veri.number,
        });
        toast.success("Profil başarıyla güncellendi");

        setUser(auth.currentUser);
      } catch (error) {
        console.error("Error updating user profile:", error.message);
        toast.error("Profil güncellenirken bir hata oluştu");
      }
    }
  };

  const handleChange = (e, field) => {
    setVeri({ ...veri, [field]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVeri({
        displayName: "",
        email: "",
        number: "",
      });
    try {
      await updateUserProfile();

      
    } catch (error) {
      console.error("Error updating user profile:", error.message);
      toast.error("Profil güncellenirken bir hata oluştu");
    }
  };

  const authClick = async () => {
    await signOut(auth);
    toast.success("Başarılı şekilde çıkış yapıldı");
    navigate("/");
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
    >
      <GridItem display="flex" justifyContent="space-between" area={"header"}>
        <Image src={Logo} h={50} w={150} mt={6} ml="11%" borderRadius="full" />
        <OrangeButton to="/">Ana Sayfa</OrangeButton>
      </GridItem>
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
            {" "}
            Bilgilerimi Göster
          </Button>
          <Button colorScheme="purple" onClick={() => setMenuVisible(!false)}>
            Bilgilerimi Değiştir
          </Button>
          <Button colorScheme="blue" mt="auto" onClick={authClick}>
            Çıkış Yap
          </Button>
        </GridItem>
        <GridItem width="full" height="full" >
          {menuVisible ? (
            <Flex
              alignItems="center"
              mt="50"
              p={10,10,0,5}
              gap="3"
              width="full"
              height="auto"
            >
              <Box height="min-content" borderRadius={30} width="full" p={10}>
                <form onSubmit={handleSubmit} >
                    <InputGroup
                      flexDirection="column"
                      shadow={2}
                      borderStyle="solid"
                      border="2"
                      gap={2}
                      
                      
                    >
                      <Input
                      focusBorderColor='purple.400'
                      variant='flushed'
                        placeholder="İsim"
                        value={veri.displayName}
                        onChange={(e) => handleChange(e, "displayName")}
                      />
                      <Input
                      focusBorderColor='purple.400'
                      variant='flushed'
                        placeholder="Email"
                        value={veri.email}
                        onChange={(e) => handleChange(e, "email")}
                      />
                      <Input
                      focusBorderColor='purple.400'
                      variant='flushed'
                        type="number"
                        placeholder="Telefon numarası"
                        value={veri.number}
                        onChange={(e) => handleChange(e, "number")}
                      />
                    </InputGroup>
                    <Box
                      width="full"
                      display="flex"
                      justifyContent="end"
                      mt={4}
                    >
                      <OrangeButton type="submit">Değiştir</OrangeButton>
                    
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
              <Box
                height="min-content"
                width="full"
                p={10}
                m={5}
              >
                <Box border={2} borderStyle="solid" borderColor="blue.400" borderRadius={30}  px={5}>
                  <Box
                   alignItems="end"
                    display="flex"
                    
                  >
                    <Box width="30%" mt={3} >İsim </Box>
                    <Box >: {user.displayName}dsa</Box>
                  </Box>
                  <Box my={3}  display="flex">
                    <Box width="30%">Email </Box>
                    <Box>: {user.email}dsa</Box>
                  </Box>
                  <Box  my={3} display="flex">
                    <Box w="30%">Telefon</Box>
                    <Box>: {user.phoneNumber}das</Box>
                  </Box>
                </Box>
              </Box>
            </Flex>
          )}
        </GridItem>
      </Flex>
    </Grid>
  );
}

export default Profile;

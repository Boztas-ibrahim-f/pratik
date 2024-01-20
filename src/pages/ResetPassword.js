import React, { useEffect } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Box, Button, Flex, Image, Input } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Ted.jpg";

function ResetPassword() {
  const [newMAil, setNewMail] = useState();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setNewMail(e.target.value);
  };
  const onClickResetPassword = async () => {
    await sendPasswordResetEmail(auth, newMAil)
      .then(() => {
        setNewMail();
        toast.success(
          "Başarılı şekilde Şifre yenilemesi için mesaj gönderildi."
        );
      })
      .catch((error) => {
        toast.error("Yenileme yapılamadı. Lütfen tekrar deneyiniz !");
        console.error("Hata mesajı", error.message);
      });
  };
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

  return (
    <>
      {user ? (
        <Flex
          bg="gray.100"
          w="full"
          h="100vh"
          align="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            src={Logo}
            w={200}
            mb={5}
            onClick={() => navigate("/")}
            cursor="pointer"
          />
          <Box
            h={{
              base: "45%",
              lg: "40%",
              "2xl": "20%",
            }}
            w={{
              base: "85%",
              md: "50%",
              lg: "40%",
              xl: "30%",
            }}
            bg="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            p={5}
            borderRadius={50}
            boxShadow="2xl"
          >
            <Box fontSize="3xl" textColor="gray.700">
              E Posta
            </Box>
            <Box display="flex" w="100%" flexDirection="column" gap={1} my={2}>
              <Input
                type="email"
                onChange={handleChange}
                value={newMAil}
                variant="filled"
                placeholder="Email adresini giriniz "
              />
              <Button colorScheme="orange" onClick={onClickResetPassword}>
                Şifremi Sıfırla
              </Button>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              gap={3}
            >
              <Link to="/profile">Profile Gitmek İçin Tıklayınız.</Link>
              <Link to="/">Anasayfaya Gitmek İçin Tıklayınız</Link>
            </Box>
          </Box>
        </Flex>
      ) : (
        <Flex
          bg="gray.100"
          w="full"
          h="100vh"
          align="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            src={Logo}
            w={200}
            mb={5}
            onClick={() => navigate("/")}
            cursor="pointer"
          />
          <Box
            w="30%"
            bg="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            p={5}
            borderRadius={50}
            boxShadow="2xl"
          >
            <Box fontSize="3xl" textColor="gray.700">
              E Posta
            </Box>
            <Box display="flex" w="100%" flexDirection="column" gap={1} my={2}>
              <Input
                type="email"
                onChange={handleChange}
                value={newMAil}
                variant="filled"
                placeholder="Email adresini giriniz "
              />
              <Button colorScheme="orange" onClick={onClickResetPassword}>
                Şifremi Sıfırla
              </Button>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              gap={3}
            >
              <Link to="/sign-in">Giriş Yapmak İçin Tıklayınız.</Link>
              <Link to="/sign-up">Üye Olmak İçin Tıklayınız</Link>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default ResetPassword;

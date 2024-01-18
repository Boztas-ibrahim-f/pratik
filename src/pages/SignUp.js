import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Text,
  Link,
  Grid,
  Image,
} from "@chakra-ui/react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../Ted.jpg";

function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      navigate("/profile");

      toast.success("Başarılı şekilde giriş yapıldı");
    } catch (error) {
      toast.error("Bir hata oluştu tekrar deneyiniz", error.massage);
    }
  };

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(1, 1fr))">
      <Flex
        bg="gray.100"
        align="center"
        justify="center"
        h="100vh"
        w="100%"
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
          bg="white"
          p={6}
          rounded="md"
          borderRadius={50}
          boxShadow="2xl"
          w={{
            base: "80%",
            sm: "50%",
            md: "40%",
            lg: "30%"

          }}
          h={{
            base: "55%",
            md: "60%",
            lg: "50%",
            
          }}
        >
          <Formik
            initialValues={{
              displayName: "",
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              handleSignUp(values);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="name">İsim</FormLabel>
                    <Field
                      as={Input}
                      id="displayName"
                      name="displayName"
                      type="text"
                      variant="filled"
                      placeholder="İsim"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      variant="filled"
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Şifre</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      placeholder="******"
                      validate={(value) => {
                        let error;
                        if (value.length < 6) {
                          error = "Password must contain at least 6 characters";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <Button type="submit" colorScheme="orange" width="full">
                    SignUp
                  </Button>
                  <Flex>
                    <Text>Daha önce kayıt oldun mu?<Link href="/sign-in" >Giriş Yap</Link></Text>
                  </Flex>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Grid>
  );
}

export default SignUp;

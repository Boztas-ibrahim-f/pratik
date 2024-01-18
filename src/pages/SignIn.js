import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Grid,
  Image,
} from "@chakra-ui/react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../Ted.jpg";

function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Başarılı şekilde giriş yapıldı.");
      navigate("/");
    } catch (error) {
      toast.error("Giriş yapılamadı. Lütfen tekrar deneyiniz !");
    }
  };

  return (
    <Grid templateColumns="repeat(1, 1fr)">
      <Flex
        bg="gray.100"
        align="center"
        justify="center"
        flexDirection="column"
        h="100vh"
        w="100%"
      >
        <Image
          src={Logo}
          w={200}
          mb={5}
          onClick={() => navigate("/")}
          cursor="pointer"
        ></Image>
        <Box
          bg="white"
          p={6}
          rounded="md"
          borderRadius={50}
          w={{
            base: "85%",
            md: "50%",
            lg: "40%",
            xl: "30%",
          }}
          h={{
            base: "45%",
            lg: "60%"
            
          }}
          boxShadow="2xl"

        >
          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false,
            }}
            onSubmit={(values) => {
              handleSignIn(values);
            }}
            
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start" display="flex">
                  <FormControl w="full">
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
                  <Field
                    as={Checkbox}
                    id="rememberMe"
                    name="rememberMe"
                    colorScheme="purple"
                  >
                    Remember me?
                  </Field>
                  <Button type="submit" colorScheme="orange" width="full">
                    Giriş
                  </Button>
                  <Box display="flex" justifyContent="space-between" w="full">
                    <Link to="/reset-password">Şifremi Unuttum ?</Link>
                    <Link to="/sign-up">Kayıt olmadın mı? Kayıt Ol</Link>
                  </Box>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Grid>
  );
}

export default SignIn;

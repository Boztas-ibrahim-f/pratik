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
} from "@chakra-ui/react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      toast.success("Başarılı şekilde giriş yapıldı");
      navigate("/profile");
    } catch (error) {
      toast.error("Bir hata oluştu tekrar deneyiniz", error.massage);
    }
  };

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(1, 1fr))">
      <Flex bg="gray.100" align="center" justify="center" h="100vh" w="100%">
        <Box bg="white" p={6} rounded="md" borderRadius={50}>
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
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Field
                      as={Input}
                      id="displayName"
                      name="displayName"
                      type="text"
                      variant="filled"
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
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
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
                    <Text>Daha önce kayıt oldun mu?</Text>
                    <Link href="/sign-in">Giriş Yap</Link>
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

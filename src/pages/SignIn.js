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
  Link,
  Grid
} from "@chakra-ui/react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignIn() {
  
  const navigate = useNavigate();
  const handleSignIn = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success('Successfully created!');
      navigate("/");
    } catch (error) {
      toast.error('This is an error!');
    }
  };

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(1, 1fr))">
      <Flex bg="gray.100" align="center" justify="center" h="100vh" w="100%">
        <Box bg="white" p={6} rounded="md" borderRadius={50}>
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
                  <Field
                    as={Checkbox}
                    id="rememberMe"
                    name="rememberMe"
                    colorScheme="purple"
                  >
                    Remember me?
                  </Field>
                  <Button type="submit" colorScheme="orange" width="full">
                    Login
                  </Button>
                  <Flex>
                    <Link mr={10} href="/reset-password">
                      Şifremi Unuttum?
                    </Link>
                    <Link href="/sign-up">Kayıt olmadın mı? Kayıt Ol</Link>
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

export default SignIn;

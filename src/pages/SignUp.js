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
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  console.log(name)
  console.log(email)
  console.log(password)


  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(1, 1fr))">
      <Flex bg="gray.100" align="center" justify="center" h="100vh" w="100%">
        <Box bg="white" p={6} rounded="md" borderRadius={50}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      type="name"
                      variant="filled"
                      value={name}
                      onChange={e => setName(e.currentTarget.value)}
                      
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
                      value={email}
                      onChange={e => setEmail(e.currentTarget.value)}
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
                      value={password}
                      onChange={e=>setPassword(e.currentTarget.value)}
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

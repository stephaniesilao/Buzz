import {
    Link as ChakraLink,
    Button,
    Input,
    FormControl,
    FormLabel,
    Heading, Container, Box, Card,  CardBody,  Text, Image, HStack
  } from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';
import firebaseApp from '../firebaseConfig'; 
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import {useState, useEffect} from "react";
import Swal from 'sweetalert2';
import "../Style.css";

  
function Register() {

    const [name, setName] = useState ('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [confirmPassword, setConfirmPassword] = useState ('');

    let navigate = useNavigate();

    const auth = getAuth(firebaseApp);

    useEffect(()=>{
       
        onAuthStateChanged(auth, (user)=>{
            if(user){
              navigate('/');
            }
        })
    
    },[])

    const handleRegistration = ()=> {
        if(
            name !=='' &&
            email !=='' &&
            password !== '' &&
            confirmPassword !== '' &&
            password===confirmPassword
        ){

           
            createUserWithEmailAndPassword(auth, email, password).then(
                (userCredential)=> {
                    const user = userCredential.user;

                    updateProfile(auth.currentUser, { 
                        displayName:name
                    });

                    navigate("/");
                });

            Swal.fire({
                title: "Registration successful!",
                
                icon: "success",
                confirmButtonColor: "#3085d6",
              });
        }
         else {
            Swal.fire({
                title: "Registration failed!",
                text: "Please try again",
                icon: "error",
                confirmButtonColor: "#3085d6",
              });
        }
    }

    return ( 
      <div className='backgroundReg' >
        <HStack>
        <Heading size='xl' mb={5} color="#fff"  >Welcome to  </Heading>
        <Image  mt='-5' boxSize='200px'  src="https://toolsmetric.com/wp-content/uploads/2022/01/Buzz-Logo-1-1200x1200.png"  />
        </HStack>

        <Container mt='-180' maxW="750px" p={40}>     
        <Text fontSize='2xl'  mb={2} color="#fff">Create your <span style={{color:'#1DA1F2'}}>Buzz</span> account:</Text>


        {/* Login Form */}
        <Card>
          <CardBody>
          <FormControl>
              <FormLabel>Name</FormLabel>
              <Input 
              type='text' 
              onChange={(e)=>{
                setName(e.target.value)
              }}
              value={name} />
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type='email'
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              value={email} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type='password' 
               onChange={(e)=>{
                setPassword(e.target.value)
              }}
              value={password} />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input 
              type='password' 
              onChange={(e)=>{
                setConfirmPassword(e.target.value)
              }}
              value={confirmPassword} />
            </FormControl>
            <Text fontSize='xs'>By signing up, you agree to the <span style={{color:'#1E90FF'}}> Terms of Service</span> and <span style={{color:'#1E90FF'}}>Privacy Policy</span> , including  <span style={{color:'#1E90FF'}}>Cookie Use</span>.</Text>
            <Button mt={5} colorScheme='twitter' onClick={handleRegistration}>Create account</Button> 
            <Box mt={5} >
            <Link to="/login" className='line' >
            <ChakraLink>
               Already have an account? Login here.
              </ChakraLink></Link>
            </Box>
          </CardBody>
        </Card>

      </Container>


      </div>
       
    )
}
export default Register;
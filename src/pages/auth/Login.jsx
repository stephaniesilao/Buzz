import {
  Link as ChakraLink,
  Button,
  Input,
  FormControl,
  FormLabel,
  Center, Container, Box, Card, CardBody, Text
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import firebaseApp from '../firebaseConfig';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import "../Style.css";



function Login() {

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');

  let navigate = useNavigate();

  useEffect(()=>{
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user)=>{
        if(user){
          navigate('/');
        }
    })

},[])

  const handleLogin= ()=> {
    if(email!== '' && password!==''){
      const auth = getAuth(firebaseApp);
      signInWithEmailAndPassword(auth, email, password)
      .then(()=>{
        navigate('/');
      })
      .catch((error)=>{
        Swal.fire({
          title: "Invalid email or password",
          text: "Please try again",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      });

    } else {
      Swal.fire({
        title: "Missing Fields!",
        text: "Please try again",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  }

  return (
    <div className="backgroundReg min-vh-100">
     <Center><img style={{width:"300px", height:"170px"}} src="https://toolsmetric.com/wp-content/uploads/2022/01/Buzz-Logo-1-1200x1200.png"  /></Center>
     <Center fontSize='md' mt="-10"   color="#fff">Share your thoughts. Connect with people.</Center>
     <Container maxW="500px" >
      <br/>

      {/* Login Form */}
      <Card mt="-3">
        <CardBody>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input 
            type='email'
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            value={email}  />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password' 
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            value={password}/>
          </FormControl>
          <Text className='line'  >Forgot Password?</Text>

          <Button mt={5} colorScheme='twitter' onClick={handleLogin} >Login</Button>
          <Box mt={5} >
            <Link to="/register"  >
              <ChakraLink>
                Don't have an account? Register here
              </ChakraLink>
            </Link>
          </Box>
        </CardBody>
      </Card>

      

    </Container>
    

    
    </div>
    
   

  )
}
export default Login;
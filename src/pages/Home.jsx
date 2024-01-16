import { Container, Button, Card, Text, Flex, Box, Spacer, FormControl, FormLabel, Input, Divider, Image, HStack, Avatar, AvatarBadge, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons'
import Post from './Post';
import Trends from './Trends';
import firebaseApp from './firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, addDoc, collection, Timestamp, onSnapshot } from 'firebase/firestore';
import './Style.css';
import Swal from 'sweetalert2'



function Home() {

    let navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    const [userProfile, setUserProfile] = useState('');
    const [post, setPost] = useState('');
    const [posts, setPosts] = useState([]);



    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {

        //for  Authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {

                setUserProfile({
                    email: user.email,
                    name: user.displayName
                })
            } else {
                navigate('/login');
            }
        });

        //Retrieve tweets


        onSnapshot(collection(db, "posts"), snapshot => {
            setPosts(snapshot.docs.map(t => t.data()));
        });



    }, [])


    const createPost = () => {
        setButtonLoading(true);
        if (post !== '') {

            const postData = {
                body: post,
                user_email: userProfile.email,
                name: userProfile.name,
                date_posted: Timestamp.now()
            };

            addDoc(collection(db, "posts"), postData).then(() => {
                setPost('');
                setButtonLoading(false);
            })
        } else {
            alert("empty!").then(() => {
                setButtonLoading(false);
            });
        }
    }



    const logout = () => {
        signOut(auth).then(() => {
            navigate('/login');
        })
    }

    const click = () => {
        Swal.fire({
            title: "Underdevelopment!",
            confirmButtonColor: "#3085d6",
        });
    }

    return (
        

      


            <Container maxW="1200px" className='flex-container d-flex flex-column min-vh-100'  >
                <nav className="navbar d-flex justify-content-between navbar-dark bg-dark">
                    <a className="navbar-brand ms-3" style={{ color: '#1DA1F2', fontWeight: 'bold', fontSize: '25px' }} href="#">Buzz</a>
                    <a style={{ color: '#1DA1F2', fontSize: '25px', fontWeight: 'bold' }}>Buzz Feed</a>
                    <input className="rounded mr-sm-2 me-2" type="search" placeholder="Explore" aria-label="Search"></input>
                    {/* <i style={{color:'#fff'}}  className="bi bi-search color"></i> */}
                </nav>
                <Flex className='d-flex justify-content-between'>
                    {/* Profile */}
                    <Box mt='10' w="250px" borderRadius="5" >
                        <Card p={2}>
                            <HStack>
                                <Menu >
                                    <MenuButton className='text-bold ' ><Avatar src='https://bit.ly/broken-link' /></MenuButton>
                                    <MenuList>
                                        <input type="file" />
                                        <br />
                                        <button>Upload</button>
                                        {/* <MenuItem as='a' onClick={uploadPic}  >Upload</MenuItem> */}
                                    </MenuList>
                                </Menu>
                                <Menu >
                                    <MenuButton className='text-bold' ml='140'>...</MenuButton>
                                    <MenuList>
                                        <MenuItem as='a' onClick={logout}>Log out</MenuItem>
                                    </MenuList>
                                </Menu>
                            </HStack>
                            <Text fontWeight="bold" >{userProfile.name}</Text>
                            <Text mt='-5' >{userProfile.email}</Text>
                        </Card>

                        <Card color="##1A202C" mt="10px" fontSize={25} >
                            <div style={{marginLeft:'10px'}}  className="bi-house-door-fill" onClick={click}><span style={{ marginLeft: '20px' }}>Home</span></div>
                            <div style={{marginLeft:'10px'}}  className="bi bi-person" onClick={click}><span style={{ marginLeft: '20px' }}>Profile</span></div>
                            <div style={{marginLeft:'10px'}}  className="bi bi-bell" onClick={click}><span style={{ marginLeft: '20px' }}>Notifications</span></div>
                            <div style={{marginLeft:'10px'}} className=" bi bi-envelope-heart" onClick={click}><span style={{ marginLeft: '20px' }}>Messages</span></div>
                            <div style={{marginLeft:'10px'}} className=" bi bi-gear" onClick={click}><span style={{ marginLeft: '20px' }}>Settings</span></div>

                        </Card>



                    </Box>
                    {/* ---- */}

                    {/* Feed */}
                    <Box w="550px" mt='10' >
                        <Card p={2} pt='7'>
                            <FormControl>
                                <HStack direction='row' spacing={5}>
                                    <Avatar mt='-5' >
                                        <AvatarBadge boxSize='1.25em' bg='green.500' />
                                    </Avatar>
                                    <FormLabel mt='' color="#718096" >What's up, {userProfile.name}? </FormLabel>
                                </HStack>
                                <Input mt='3' disabled={buttonLoading} type='text' onChange={(e) => { setPost(e.target.value) }} value={post} placeholder='Type something' />
                            </FormControl>
                            <HStack color='#1DA1F2' mt="-10px" >
                                <HStack mt="10px">
                                    <i class="bi bi-image"></i>
                                    <i class="bi bi-emoji-smile-fill"></i>
                                    <i class="bi bi-filetype-gif"></i>
                                    <i class="bi bi-paperclip"></i>
                                </HStack>
                                <Button style={{ marginLeft: '400px' }} isLoading={buttonLoading} w="100px" colorScheme="twitter" mt={5} size="sm" onClick={createPost} >Post</Button>
                            </HStack>
                        </Card>

                        <Divider w='455px' ml='45' my={2}  ></Divider>


                        {
                            posts.map((postRecord) => (
                                <Post
                                    key={postRecord.id}
                                    body={postRecord.body}
                                    email={postRecord.user_email}
                                    name={postRecord.name}
                                    date_posted={postRecord.date_posted.toDate().toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                ></Post>
                            ))

                        }


                    </Box>

                    {/* ------ */}

                    <Trends></Trends>

                </Flex>
                <footer className="margin p-5 text-center text-secondary  mt-auto ">
                    Copyright © 2024. All rights reserved.
                    <br />
                    <small className="fw-bold">Developed by: STEPHANIE SILAO</small>
                </footer>

            </Container>


   

    )
}

export default Home;
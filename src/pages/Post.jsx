import { Card, Text, Avatar, HStack, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import "bootstrap-icons/font/bootstrap-icons.css";
import './Style.css';

function Post({ body, name, date_posted }) {
    return (
        <Card className='bg-light text-dark ' borderEndRadius='5' w='550px' mt={2} px={2} pt={2} >
            <HStack>
                <Avatar mt='-5' h='30px' w="30px" src='https://bit.ly/broken-link' />
                <Text mt='-1' fontWeight="bold" >{name}</Text>
                <Text fontSize="xs" color="gray" >{date_posted} <i class="bi bi-globe-americas"></i> </Text>
                <Menu >
                    <MenuButton ml='258px' mt='-5'>...</MenuButton>
                    <MenuList>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Edit</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Text mt="-18px" ml='40px' >{body}</Text>
            <HStack mt='-18px' className='spaceAround'>
                <i class="bi bi-heart"></i>
                <i class="bi bi-chat"></i>
                <i class="bi bi-repeat"></i>
                <i class="bi bi-reply"></i>
            </HStack>


        </Card>

    )
}

export default Post;
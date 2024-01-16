import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './Style.css';


function Layout() {
    return (
        <ChakraProvider>

            <div >
                <Outlet></Outlet>
                
            </div>

        </ChakraProvider>

    )
}

export default Layout;
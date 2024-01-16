import { Box, Card, Text, Avatar, HStack } from '@chakra-ui/react';
import "bootstrap-icons/font/bootstrap-icons.css";

function Trends() {


    return (
        <Box mt='10' w="350px" borderRadius="5" >
            <Card p={2}>
                <h2 style={{ fontWeight: 'bold' }}>Trends for you</h2>
            </Card>
            <Card p={2}>
                <a href="https://x.com/buitengebieden/status/1746566267186598217?s=20">
                    <div style={{color:'gray', fontSize:'13px'}}>Trending in Philippines</div>
                    <div style={{fontWeight:'bold'}}>#CuteVids</div>
                </a>
                <a href="https://x.com/bestnardokath_/status/1745091510868033766?s=20">
                    <div style={{color:'gray'}}>Trending in Philippines</div>
                    <div style={{fontWeight:'bold'}}>#KathNielBreakUp</div>
                </a>
                <a href="https://x.com/TheFigen_/status/1746886763006628330?s=20">
                    <div style={{color:'gray'}}>Trending in Philippines</div>
                    <div style={{fontWeight:'bold'}}>#Animals</div>
                </a>
            </Card>
           
        </Box>
    )
}
export default Trends;
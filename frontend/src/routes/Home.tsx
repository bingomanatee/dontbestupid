import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Box layerStyle="page" id="homepage">
      <Box layerStyle="container">
        <Heading textStyle="displayHead">Don’t Be Stupid</Heading>
        <Box layerStyle="heroText">
          <Text textStyle="display">
            <span className="keep-together">
              The party trivia game that takes&nbsp;
            </span>
            <span className="keep-together">EVERYTHING YOU HAVE</span>
            <br />
            <span className="keep-together">for guessing the&nbsp;</span>
            <span className="keep-together">DUMBEST ANSWER </span>
          </Text>
        </Box>
        <Flex align="center" w="100R" direction="column">
          <Button as={Link} to="/cats" display>
            Let's play a game!
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

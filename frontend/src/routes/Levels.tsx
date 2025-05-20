import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useCallback, useRef } from 'react';
import { Prompt } from '../components/Prompt';
import { useLevelState } from '../state/level.state';
import { RangeSlider } from '../components/RangeSlider';

const SmartIcon = function ({ level, threshold, image }) {
  return (
    <Box
      layerStyle="levelIcon"
      bgImage={`url('/img/${level < threshold ? image + '_bw' : image}.png')`}
    ></Box>
  );
};

export default function Levels() {
  const [state, level] = useLevelState();
  // @ts-ignore
  const navigate = useNavigate();
  const saveAndContinue = useCallback(() => {
    state.acts.persistLevel();
    navigate('/quiz');
  }, [state]);
  const startRef = useRef(state.value.level ?? 1);
  return (
    <Box layerStyle="page" id="homepage">
      <Box
        layerStyle="container"
        w="100%"
        direction="column"
        justifyContent="center"
      >
        <Heading textStyle="displayHeadSub">Don’t Be Stupid</Heading>
        <Prompt>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="stretch"
            gap={{ base: 1, md: 4, lg: 6 }}
            justify="stretch"
            w="full"
          >
            <Text textStyle="prompt" flex={1} textAlign="center">
              Choose your difficulty level.
            </Text>
          </Flex>
        </Prompt>
        <Box layerStyle="container">
          <RangeSlider
            defaultValue={[startRef.current]}
            marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            min={1}
            max={10}
            step={1}
            maxWidth="800px"
            flex={0}
            onChange={state.acts.saveLevel}
          />
        </Box>
        <center>
          <Flex
            mt={8}
            maxW="800px"
            w="100%"
            justify="space-around" // or "space-between"
            align="center"
          >
            <SmartIcon image="stupid" threshold={0} level={level} />
            <SmartIcon image="norm" threshold={4} level={level} />
            <SmartIcon image="smart" threshold={7} level={level} />
          </Flex>
        </center>
      </Box>
      <Box layerStyle="floatingFooter">
        <Flex align="center" w="100%" direction={'column'}>
          <Button // @ts-ignore
            display
            onClick={saveAndContinue}
            disabled={level == -1}
          >
            {state.acts.levelButtonPrompt()}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

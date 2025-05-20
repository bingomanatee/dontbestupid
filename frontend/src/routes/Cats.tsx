import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { CatGrid } from '../components/CatGrid';
import { useCatState } from '../state/cats.state';
import { useCallback } from 'react';

export function Prompt({ children }) {
  return (
    <Box layerStyle="prompt" data-role="prompt" id="prompt">
      {children}
    </Box>
  );
}

export default function Cats() {
  const [state, cats, chosen] = useCatState();
  // @ts-ignore
  const navigate = useNavigate();
  const saveAndContinue = useCallback(() => {
    console.log('save and continue');
    state.acts.saveChoices();
    navigate('/levels');
  }, [state]);

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
            <Box flex={1}>
              <Text textStyle="prompt" flex={1}>
                Click on the categories you want to be quizzed on.
              </Text>
            </Box>

            <Box>
              <Flex gap={3}>
                <Button normal onClick={state.acts.pickAll}>
                  <Text>Pick All</Text>
                </Button>
                <Button onClick={state.acts.clearAll} normal>
                  Clear
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Prompt>
        <CatGrid cats={cats} state={state} chosen={chosen} />
      </Box>
      <Box layerStyle="floatingFooter">
        <Flex align="center" w="100%" direction={'column'}>
          <Button // @ts-ignore
            display
            onClick={saveAndContinue}
            disabled={!chosen.size}
          >
            {state.acts.saveButtonPrompt()}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

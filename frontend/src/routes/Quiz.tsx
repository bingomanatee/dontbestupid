import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useCallback, useEffect } from 'react';
import { Prompt } from '../components/Prompt';
import { STATE, useQuizState } from '../state/quiz.state';
import { CatBanner } from '../components/CatBanner';
import { StartBanner } from '../components/StartBanner';
import { QuizSteps } from '../components/QuizSteps';
import { QuestionBanner } from '../components/QuestionBanner';

export default function Quiz() {
  const [state, value] = useQuizState();
  const { status, current } = value;
  const navigate = useNavigate();

  useEffect(() => {
    if (status === STATE.QUIZ_COMPLETE) {
      navigate('/results');
    }
  }, [status]);

  useEffect(() => {
    state.acts.resetQuiz();
  }, [state]);

  return (
    <Box layerStyle="page" id="quiz">
      <Box
        layerStyle="container"
        w="100%"
        direction="column"
        justifyContent="center"
      >
        <Heading textStyle="displayHeadSub">Don’t Be Stupid</Heading>
        <CatBanner />
        {status == STATE.QUIZTITLE ? <StartBanner /> : null}
        {current ? <QuestionBanner /> : null}
      </Box>
      <Box layerStyle="floatingFooter">
        <Prompt>
          <Flex direction="column">
            {status === STATE.QUIZ ? <QuizSteps /> : null}
            <Text textStyle="prompt">
              Choose an answer to continue. Do not choose a stupid answer.
            </Text>
          </Flex>
        </Prompt>
      </Box>
    </Box>
  );
}

import { STATE, useQuizState } from '../state/quiz.state';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { shuffle } from 'lodash-es';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

export function QuestionBanner() {
  const [state, value] = useQuizState();

  const currentQuestion = state.acts.currentQuestion();

  const answers = useMemo(
    () => currentQuestion?.answers ?? [],
    [currentQuestion],
  );

  if (!currentQuestion) return null;

  return (
    <center>
      <Box layerStyle="questionBanner">
        <Box layerStyle="questionBannerQuestion">
          <Text textStyle="questBannerQuestion">
            {currentQuestion.question}
          </Text>
        </Box>
        <SimpleGrid
          columns={[1, 1, 1, 2, answers.length]}
          columnGap={3}
          rowGap={2}
        >
          {answers.map((answer, index) => {
            return (
              <Box
                layerStyle="questionBannerAnswer"
                onClick={() => {
                  state.acts.choose(currentQuestion._id, { index, answer });
                }}
              >
                <Text textStyle="questionBannerAnswer">{answer}</Text>
              </Box>
            );
          })}
        </SimpleGrid>
        <Box layerStyle="prompt">
          <Text textStyle="promptMinor">
            Difficulty level&nbsp;<b>{currentQuestion.difficulty}</b>&nbsp;out
            of 10
          </Text>
        </Box>
      </Box>
    </center>
  );
}

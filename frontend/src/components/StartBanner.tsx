import { useQuizState } from '../state/quiz.state';
import { Box, Button, Text } from '@chakra-ui/react';

export function StartBanner() {
  const [state, value] = useQuizState();
  return (
    <Box layerStyle="startBanner" id="start-banner">
      <Text textStyle="displayHead">Start the Quiz</Text>
      <Button display onClick={state.acts.startQuiz}>
        Ask the first Question
      </Button>
    </Box>
  );
}

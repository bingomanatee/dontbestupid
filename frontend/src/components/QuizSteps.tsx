import { Steps } from '@chakra-ui/react';
import { QUIZ_LENGTH, useQuizState } from '../state/quiz.state';

const stepNumbers: number[] = [];
for (let i = 1; i <= QUIZ_LENGTH; ++i) stepNumbers.push(i);

export function QuizSteps() {
  const [state, value] = useQuizState();

  return (
    <Steps.Root
      step={value.quests.length - 1}
      count={QUIZ_LENGTH}
      colorPalette="theme"
    >
      <Steps.List>
        {stepNumbers.map((step, index) => (
          <Steps.Item key={index} index={index} title={`Question ${step}`}>
            <Steps.Indicator />
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  );
}

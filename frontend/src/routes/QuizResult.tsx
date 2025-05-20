import { Box, Button, Flex, Heading, Table, Text } from '@chakra-ui/react';

import { useEffect } from 'react';
import { Prompt } from '../components/Prompt';
import { useQuizState } from '../state/quiz.state';
import type { QuizResult } from '../types';
import { Link } from 'react-router-dom';

function resultFrom(r: QuizResult) {
  switch (r.result) {
    case 'stupid':
      return 'You picked the STUPID ANSWER and lost all your points';
      break;

    case 'wrong':
      return `sorry the write answer was "${r.correctResponse}"`;
      break;

    case 'correct':
      return 'Correct!';
      break;

    case 'not found':
      return 'System Error';
      break;

    default:
      return '';
  }
}

function resultStyle(r: QuizResult) {
  switch (r.result) {
    case 'stupid':
      return { bg: 'stupidResult', color: 'white' };
      break;

    case 'wrong':
      return { bg: 'wrongResult' };
      break;

    case 'correct':
      return { bg: 'correctResult' };
      break;

    default:
      return {};
  }
}

function ResultTable() {
  const [state, value] = useQuizState();
  const { status, results } = value;

  if (!results.length) return null;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>
            <Text textStyle="reportText">question</Text>
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Text textStyle="reportText">Your Response</Text>
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Text textStyle="reportText">Result</Text>
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Text textStyle="reportText">Points</Text>
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {results.map((r: QuizResult) => (
          <Table.Row>
            <Table.Cell>
              <Text textStyle="reportText">{r.question}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text textStyle="reportText">{r.answer}</Text>
            </Table.Cell>
            <Table.Cell {...resultStyle(r)}>
              <Text textStyle="reportText">{resultFrom(r)}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text textStyle="reportText">{r.points}</Text>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default function QuizResult() {
  const [state, value] = useQuizState();
  const { results } = value;

  useEffect(() => {
    state.acts.resolveQuiz();
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
        <Heading textStyle="displayHead">Final Results</Heading>
        <Box py={8}>
          <ResultTable />
        </Box>
        <Prompt>
          <Flex direction="column">
            <Text textStyle="prompt">
              Your final score was &nbsp;
              <Text as="span" fontSize="xxl">
                {results[results.length - 1]?.points}
              </Text>
              &nbsp;Points.
            </Text>
            <Text textStyle="prompt">Play Again?</Text>
            <Button display as={Link} to="/">
              Start Over
            </Button>
          </Flex>
        </Prompt>
      </Box>
    </Box>
  );
}

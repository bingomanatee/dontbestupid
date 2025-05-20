import type { Question } from '../types';
import { Box, List, Text } from '@chakra-ui/react';

export function QuestSummary({ quest }: { quest: Question }) {
  console.log('question:', quest);
  return (
    <List.Item>
      <Box layerStyle="questionListItem">
        <Text textStyle="questionListId">id: {quest._id}</Text>
        <Text textStyle="questionListQuestion">
          &quot;{quest.question}&quot;
        </Text>
        <Box layerStyle="questionListDiff">
          <Text textStyle="questionListDiff">
            Difficulty&nbsp;{quest.difficulty}
          </Text>
        </Box>
      </Box>
    </List.Item>
  );
}

import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  NativeSelect,
  Text,
} from '@chakra-ui/react';
import { useQuestState } from '../../state/quests.state';
import { RangeSlider } from '../../components/RangeSlider';
import { useCatState } from '../../state/cats.state';
import { useEffect } from 'react';
import { QuestSummary } from '../../components/QuestSummary';

export default function AdminQuests() {
  const [state, quests, value] = useQuestState();
  const [catState, cats] = useCatState();

  useEffect(() => {
    if (!cats.length) return catState.load;
    console.log('looking for questions about', value.catName, 'in', cats);
    if (state.value.catName) {
      const match = cats.find(
        (c) => c.name.toLowerCase() === state.value.catName.toLowerCase(),
      );
      if (match) {
        state.acts.load(match.id);
        return;
      }
    }
    state.acts.load('');
  }, [value.difficulty, value.catName, cats]);

  console.log('quests:', quests);
  return (
    <Box layerStyle="page">
      <Box layerStyle="pageInner">
        <Heading textStyle="displayHeadSub">Don't Be Stupid: Manager</Heading>
        <Heading textStyle="displayHead">Questions</Heading>
        <Box layerStyle="pageContent">
          <Box layerStyle="adminForm">
            <Flex gap={8} layerStyle="adminFormRow">
              <Text textStyle="adminFormLabel">Category</Text>
              <NativeSelect.Root>
                <NativeSelect.Field onChange={state.acts.setCat}>
                  <option unselectable value="">
                    SELECT
                  </option>
                  {cats.map((c) => (
                    <option value={c.name} key={c.id}>
                      {c.name}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Flex>
            <Flex gap={8} layerStyle="adminFormRow">
              <Text textStyle="adminFormLabel">Difficulty</Text>
              <Box minWidth="400px" flexGrow={1}>
                <RangeSlider
                  min={1}
                  max={10}
                  defaultValue={[5]}
                  step={1}
                  marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  onChange={state.acts.setDifficulty}
                />
                <Text>{state.value.difficulty}</Text>
              </Box>
            </Flex>
            <Flex gap={8} layerStyle="adminFormRow">
              <Text textStyle="adminFormLabel">Questions</Text>
              <Box minWidth="400px" flexGrow={1}>
                <RangeSlider
                  min={4}
                  max={20}
                  step={4}
                  defaultValue={[4]}
                  marks={[4, 8, 12, 16, 20]}
                  onChange={state.acts.setCount}
                />
                <Text>{state.value.count}</Text>
              </Box>
            </Flex>
            <Flex
              gap={8}
              w="100%"
              direction="row"
              justify="center"
              align="stretch"
            >
              <Button
                style={{ display: 'none' }}
                onClick={state.acts.init}
                admin
              >
                Seed Questions
              </Button>
              <Button
                onClick={state.acts.generate}
                admin
                disabled={value.pendingGenerations.length}
              >
                Generate
              </Button>
            </Flex>
          </Box>
          <List.Root variant="plain">
            {quests.slice(0, 8).map((q) => {
              return <QuestSummary key={q._id} quest={q} />;
            })}
          </List.Root>
        </Box>
      </Box>
    </Box>
  );
}

import { useQuizState } from '../state/quiz.state';
import { useCatState } from '../state/cats.state';
import { useMemo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Prompt } from './Prompt';
import { CatBannerItem } from './CatBannerItem';

const MAX_CATS = 4;

export function CatBanner() {
  const [state, value] = useQuizState();
  const [_catState, cats] = useCatState();
  const { level, chosenCats } = value;
  const currentCats = useMemo(
    () => cats.filter((cat) => chosenCats.has(cat.id)),
    [cats],
  );

  const hasSuffix = currentCats.length > MAX_CATS;
  return (
    <Box layerStyle="catBanner">
      <Prompt>
        <Flex direction="column">
          <Flex align="center" gap={12}>
            <Text textStyle="prompt">Questions are in these categories:</Text>{' '}
            <Flex align="center" gap={0}>
              {currentCats.slice(0, MAX_CATS).map((cat) => {
                return <CatBannerItem cat={cat} key={cat._id} />;
              })}
            </Flex>
            {hasSuffix ? (
              <Text textStyle="promptMinor">
                (and&nbsp;{currentCats.length - MAX_CATS}&nbsp;more)
              </Text>
            ) : null}
          </Flex>
        </Flex>
      </Prompt>
    </Box>
  );
}

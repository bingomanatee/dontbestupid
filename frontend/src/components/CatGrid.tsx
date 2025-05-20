import { Box, SimpleGrid } from '@chakra-ui/react';
import type { Category } from '../types';
import { CatTile } from './CatTile';

// AI assisted
type Props = { cats: Category[] };

export function CatGrid({ state, cats, chosen }) {
  if (!Array.isArray(cats)) {
    return null;
  }
  return (
    <Box layerStyle="catGridContainer">
      <SimpleGrid
        columnGap={0.5}
        rowGap={0.5}
        minChildWidth={{ base: 'fill', md: '300px' }}
        mx={4}
      >
        {cats.map((cat: Category) => {
          const isChosen = chosen.has(cat.id);

          return <CatTile isChosen={isChosen} cat={cat} state={state} />;
        })}
      </SimpleGrid>
    </Box>
  );
}

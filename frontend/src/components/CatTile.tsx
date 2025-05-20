import { Box, Text } from '@chakra-ui/react';

export function CatTile({ cat, isChosen, state }) {
  return (
    <Box
      key={cat.id}
      userSelect="none"
      cursor="pointer"
      layerStyle={isChosen ? 'categoryTileChosen' : 'categoryTile'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        state.acts.pick(cat.id);
      }}
    >
      {isChosen && (
        <Box
          className="categoryTileImage"
          layerStyle={
            isChosen ? 'categoryTileImageChosen' : 'categoryTileImage'
          }
          backgroundImage={`url(${cat.imageUrl})`}
        />
      )}
      <Box className="categoryTileOverlay" layerStyle="categoryTileOverlay" />
      <Box layerStyle="categoryTileContent">
        <Text
          textStyle={isChosen ? 'categoryButtonSelected' : 'categoryButton'}
        >
          {cat.name.replace(/.*:/, '')}
        </Text>
      </Box>
    </Box>
  );
}

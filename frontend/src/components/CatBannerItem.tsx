import { Box, Flex, Text } from '@chakra-ui/react';
import { CatAvatar } from './CatAvatar';

export function CatBannerItem({ cat }) {
  return (
    <Box layerStyle="catBannerItem">
      <Flex align="center" gap={2}>
        <CatAvatar cat={cat} size="md" />
        <Text textStyle="catTag">{cat.name.replace(/.*:/, '')}</Text>
      </Flex>
    </Box>
  );
}

import { Box } from '@chakra-ui/react';

export function Prompt({ children }) {
  return (
    <Box layerStyle="prompt" data-role="prompt" id="prompt">
      {children}
    </Box>
  );
}
import { Box, Text } from '@chakra-ui/react';

export default function AdminPanel({
  id = null,
  title = 'Dumb Developer forgot to put a title in this one',
  pre = null,
  post = null,
  children,
}) {
  return (
    <Box layerStyle="adminPanel" id={`admin_anel${id ?? Math.random()}`}>
      <Box layerStyle="adminPanelHeader">
        {pre ?? null}
        <Text textStyle="adminPanelTitle">{title}</Text>
        {post ?? null}
      </Box>
      <Box layerStyle="adminPanelBody">{children}</Box>
    </Box>
  );
}

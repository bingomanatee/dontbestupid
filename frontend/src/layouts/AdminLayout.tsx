import { Link, Outlet } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import { LiaBrainSolid } from 'react-icons/lia';

export default function AdminLayout() {
  return (
    <Box layerStyle="pageContainerAdmin">
      <Outlet />
      <Box layerStyle="adminIcon" id="adminIcon">
        <Link to="/">
          <span style={{ fontSize: '2rem', color: 'pink' }}>
            <LiaBrainSolid />
          </span>
          <Text textStyle="iconicText" color="gray.500">
            Quiz
          </Text>
        </Link>
      </Box>
    </Box>
  );
}

import { Link, Outlet } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import { LiaBrainSolid } from 'react-icons/lia';
import GoBack from '../components/GoBack';

export default function QuizLayout() {
  return (
    <Box layerStyle="pageContainer" id="pc">
      <Outlet />

      <Box layerStyle="adminIcon" id="adminIcon">
        <Link to="/admin">
          <span style={{ fontSize: '2rem' }}>
            <LiaBrainSolid />
          </span>
          <Text textStyle="iconicText">Admin</Text>
        </Link>
      </Box>

      <Box layerStyle="goBackIcon" id="backIcon">
        <GoBack size="2rem" />
      </Box>
    </Box>
  );
}

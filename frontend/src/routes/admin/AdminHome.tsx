import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AdminPanel from '../../components/AdminPanel';

export default function AdminHome() {
  return (
    <Box layerStyle="page" id="admin-hoepage">
      <Box layerStyle="pageInner">
        <Heading textStyle="displayHeadSub">Don't Be Stupid</Heading>
        <Heading textStyle="displayHead">Manager</Heading>
        <Box layerStyle="pageContent">
          <Box layerStyle="panelContainer" id="panel-container">
            <Flex
              id="panels"
              align="center"
              direction="row"
              justify="center"
              gap={2}
              w="100%"
            >
              <AdminPanel id="cat-panel" title="Categories">
                <Button as={Link} to="/admin/cats" admin>
                  View Categories
                </Button>
              </AdminPanel>
              <AdminPanel id="cat-panel" title="Questions">
                <Button as={Link} to="/admin/quests" admin>
                  View Questions
                </Button>
              </AdminPanel>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

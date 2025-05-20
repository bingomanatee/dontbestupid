import { Box, Button, Flex, Heading, List, Text } from '@chakra-ui/react';
import { useCatState } from '../../state/cats.state';
import { CatAvatar } from '../../components/CatAvatar';

console.log('updated file');

export default function AdminCats() {
  const [state] = useCatState();

  return (
    <Box layerStyle="page">
      <Box layerStyle="pageInner">
        <Heading textStyle="displayHeadSub">Don't Be Stupid: Manager</Heading>
        <Heading textStyle="displayHead">Categories</Heading>
        <Box layerStyle="pageContent">
          <Button onClick={state.current?.acts.init} admin>
            Seed Categories
          </Button>
          <Box layerStyle="listFrame">
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap="8"
              align="start"
              justify="stretch"
            >
              {state.current?.acts.columns().map((catList, colIndex) => (
                <List.Root key={colIndex} variant="plain" flex="1">
                  {catList.map((c: any) => (
                    <List.Item layerStyle="listItem" key={c.__id}>
                      <Flex gap="4" align="center">
                        <CatAvatar cat={c} />
                        <Text textStyle="adminListItem">{c.name}</Text>
                      </Flex>
                    </List.Item>
                  ))}
                </List.Root>
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

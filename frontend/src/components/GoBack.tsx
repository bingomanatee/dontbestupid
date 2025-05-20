import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
export default function GoBack({ url = '/', size = 'xl' }) {
  return (
    <Text fontSize={size} id="go-back">
      <Link to={url}>
        <IoMdArrowRoundBack />
      </Link>
    </Text>
  );
}

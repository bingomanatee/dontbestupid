import { Avatar } from '@chakra-ui/react';

export function CatAvatar({ cat, size = 'xl' }) {
  if (!cat?.imageUrl) {
    return 'no image';
  }
  return (
    <Avatar.Root size={size}>
      <Avatar.Fallback name={cat.name ?? '??'} />
      {cat.imageUrl && <Avatar.Image src={cat.imageUrl} />}
    </Avatar.Root>
  );
}

import { Input } from '@/shared/ui/kit/input';

interface BoardsSearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function BoardsSearchInput({
  value,
  onValueChange,
}: BoardsSearchInputProps) {
  return (
    <Input
      id='search'
      placeholder='Введите название доски...'
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className='w-full'
    />
  );
}

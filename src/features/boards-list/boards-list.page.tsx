import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import {
  TemplatesGallery,
  useTemplatesModal,
} from '@/features/board-templates';
import { useDebouncedValue } from '@/shared/lib/react';
import { Button } from '@/shared/ui/kit/button';

import { BoardCard } from './compose/board-card';
import { BoardItem } from './compose/board-item';
import { useBoardsFilters } from './model/use-boards-filters';
import { useBoardsList } from './model/use-boards-list';
import { useCreateBoard } from './model/use-create-board';
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from './ui/boards-list-layout';
import { BoardsSearchInput } from './ui/boards-search-input';
import { BoardsSidebar } from './ui/boards-sidebar';
import { BoardsSortSelect } from './ui/boards-sort-select';
import { type ViewMode, ViewModeToggle } from './ui/view-mode-toggle';

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const { setCursorElement, ...boardsQuery } = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebouncedValue(boardsFilters.search, 300),
  });

  const templatesModal = useTemplatesModal();

  const createBoard = useCreateBoard();

  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <BoardsListLayout
      templates={<TemplatesGallery />}
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title='Доски'
          description='Здесь вы можете просматривать и управлять своими досками'
          actions={
            <>
              <Button variant='outline' onClick={templatesModal.open}>
                Выбрать шаблон
              </Button>
              <Button
                onClick={createBoard.createBoard}
                disabled={createBoard.isPending}
              >
                <PlusIcon />
                Создать доску
              </Button>
            </>
          }
        />
      }
      filters={
        <BoardsListLayoutFilters
          sort={
            <BoardsSortSelect
              value={boardsFilters.sort}
              onValueChange={(value) => boardsFilters.setSort(value)}
            />
          }
          filters={
            <BoardsSearchInput
              value={boardsFilters.search}
              onValueChange={(value) => boardsFilters.setSearch(value)}
            />
          }
          actions={<ViewModeToggle value={viewMode} onChange={setViewMode} />}
        />
      }
    >
      <BoardsListLayoutContent
        isEmpty={boardsQuery.boards.length === 0}
        isPending={boardsQuery.isPending}
        isPendingNext={boardsQuery.isFetchingNextPage}
        cursorRef={setCursorElement}
        hasCursor={boardsQuery.hasNextPage}
        mode={viewMode}
        renderList={() =>
          boardsQuery.boards.map((board) => (
            <BoardItem key={board.id} board={board} />
          ))
        }
        renderGrid={() =>
          boardsQuery.boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))
        }
      />
    </BoardsListLayout>
  );
}

export const Component = BoardsListPage;

import { useBoardsList } from './model/use-boards-list';

import {
  BoardsListLayout,
  BoardsListLayoutHeader,
  BoardsListLayoutContent,
} from './ui/boards-list-layout';
import { ViewModeToggle, type ViewMode } from './ui/view-mode-toggle';
import { useState } from 'react';

import { BoardCard } from './compose/board-card';
import { BoardItem } from './compose/board-item';
import { BoardsSidebar } from './ui/boards-sidebar';

function BoardsListPage() {
  const { setCursorElement, ...boardsQuery } = useBoardsList({
    isFavorite: true,
  });

  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title='Избранные доски'
          description='Здесь вы можете просматривать и управлять своими избранными досками'
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

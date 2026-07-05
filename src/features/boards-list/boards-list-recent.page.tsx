import { useBoardsList } from './model/use-boards-list';

import {
  BoardsListLayout,
  BoardsListLayoutHeader,
  BoardsListLayoutContent,
  BoardsLayoutContentGroups,
  BoardsListLayoutList,
  BoardsListLayoutCards,
} from './ui/boards-list-layout';
import { ViewModeToggle, type ViewMode } from './ui/view-mode-toggle';
import { useState } from 'react';

import { useRecentGroups } from './model/use-recent-groups';
import { BoardCard } from './compose/board-card';
import { BoardItem } from './compose/board-item';
import { BoardsSidebar } from './ui/boards-sidebar';

function BoardsListPage() {
  const { setCursorElement, ...boardsQuery } = useBoardsList({
    sort: 'lastOpenedAt',
  });

  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const recentGroups = useRecentGroups(boardsQuery.boards);

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title='Последние доски'
          description='Здесь вы можете просматривать и управлять своими последними досками'
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
      >
        <BoardsLayoutContentGroups
          groups={recentGroups.map((group) => ({
            title: group.title,
            items: {
              list: (
                <BoardsListLayoutList>
                  {group.items.map((board) => (
                    <BoardItem key={board.id} board={board} />
                  ))}
                </BoardsListLayoutList>
              ),
              cards: (
                <BoardsListLayoutCards>
                  {group.items.map((board) => (
                    <BoardCard key={board.id} board={board} />
                  ))}
                </BoardsListLayoutCards>
              ),
            }[viewMode],
          }))}
        />
      </BoardsListLayoutContent>
    </BoardsListLayout>
  );
}

export const Component = BoardsListPage;

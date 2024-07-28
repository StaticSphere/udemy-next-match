import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "../actions/like-actions";
import ListsTab from "./ListsTab";

export default async function ListsPage({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParams.type);

  return (
    <div>
      <ListsTab likeIds={likeIds} members={members} />
    </div>
  );
}

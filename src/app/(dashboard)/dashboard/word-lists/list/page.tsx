import BookmarkWordlists from "./components/bookmark-wordlists";
import MyWordlists from "./components/my-wordlists";

export default function Page() {
  return (
    <div className="p-4 space-y-4">
      <BookmarkWordlists />
      <MyWordlists />
    </div>
  );
}

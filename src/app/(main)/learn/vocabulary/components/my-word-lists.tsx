import { ArrowRight, Folders } from "lucide-react";

import Box from "./box";
import { getMyWordLists } from "@/lib/server/queries/user/word-lists";
import MyWordListsCarousel from "./my-word-lists-carousel";

export default async function MyWordLists() {
  const data = await getMyWordLists();

  return (
    <Box className="group cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Folders />
          <span className="font-semibold">My Wordlists</span>
        </div>
        <ArrowRight className="group-hover:translate-x-4 transition-transform duration-300" />
      </div>
      <MyWordListsCarousel wordLists={data} />
    </Box>
  );
}

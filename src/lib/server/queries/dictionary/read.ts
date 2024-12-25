import { FindDTO, findFirst } from "../../services/dictionary";
import { scrapeLangeek } from "../../services/scraper";

export const read = async (dto: FindDTO) => {
  const found = await findFirst(dto);
  if (!found) {
    await scrapeLangeek(dto);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  return findFirst(dto);
};

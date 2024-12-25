import { FindDTO, findFirst } from "../../services/dictionary";
import { scrapeLangeek } from "../../services/scraper";

export const read = async (dto: FindDTO) => {
  const found = await findFirst(dto);
  if (!found) {
    try {
      await scrapeLangeek(dto);
    } catch (error) {
      console.log(error);
    }
  }
  return findFirst(dto);
};

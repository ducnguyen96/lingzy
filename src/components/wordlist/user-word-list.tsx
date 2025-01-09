import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { WordListEntity } from "@/lib/server/services/word-list";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import AddNewWordListDialog from "./add-new-wordlist-dialog";
import { noPhoto } from "@/config/placeholder";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  translationId: number;
  myWordLists: WordListEntity[];
  setMyWordLists: Dispatch<SetStateAction<WordListEntity[]>>;
}

const formSchema = z.object({
  selectedIds: z
    .array(z.number())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

export default function UserWordList(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [oldIds, setOldIds] = useState<number[]>([]);
  const { myWordLists, translationId, setOpen, setMyWordLists } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedIds: oldIds,
    },
  });

  const fetchMyWordList = async () => {
    const res = await fetch("/api/user/word-lists");
    const json = await res.json();

    setMyWordLists(json.data);

    const oldIds = [];
    for (let i = 0; i < json.data.length; i++) {
      const wordList = json.data[i];
      if (wordList.translationIds.includes(translationId)) {
        oldIds.push(wordList.id);
      }
    }
    setOldIds(oldIds);
    form.reset({ selectedIds: oldIds });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await fetch("/api/user/word-lists", {
      method: "PATCH",
      body: JSON.stringify({
        translationId,
        old: oldIds,
        new: values.selectedIds,
      }),
    });
    toast("Word added to your WordLists!");
    setOpen(false);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchMyWordList();
  }, []);

  return (
    <>
      <AddNewWordListDialog
        myWordLists={myWordLists}
        setMyWordLists={setMyWordLists}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="selectedIds"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormDescription>
                    Select the WordList you want to add this word to.
                  </FormDescription>
                </div>

                <ScrollArea className="h-60">
                  <div className="space-y-4">
                    {myWordLists.map((item, idx) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="selectedIds"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-center space-x-4 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                <div
                                  key={idx}
                                  className="flex items-center gap-2"
                                >
                                  <Image
                                    src={item.thumbnail || noPhoto}
                                    width={56}
                                    height={56}
                                    alt=""
                                    className="w-14 h-14 rounded-full"
                                  />
                                  <div className="flex flex-col gap-2">
                                    <span className="font-semibold">
                                      {item.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {item.description}
                                    </span>
                                  </div>
                                </div>
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </ScrollArea>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";
import AvatarUploadButton from "../avatar-upload-button";
import { Dispatch, SetStateAction, useState } from "react";

import { useGlobalLoading } from "../providers/global-loading-provider";
import { WordListEntity } from "@/lib/server/services/word-list";

interface Props {
  myWordLists: WordListEntity[];
  setMyWordLists: Dispatch<SetStateAction<WordListEntity[]>>;
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(50).optional(),
  thumbnail: z.string().optional(),
  isPublic: z.boolean().default(false),
});

export default function AddNewWordListDialog({
  myWordLists,
  setMyWordLists,
}: Props) {
  const title = "Add new WordList";
  const [open, setOpen] = useState(false);
  const { setLoading } = useGlobalLoading();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      isPublic: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await fetch("/api/user/word-lists", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        visibility: values.isPublic ? "public" : "private",
      }),
    });
    const json = await res.json();
    setMyWordLists([...myWordLists, json.data]);
    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <CirclePlus />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col items-center">
                    <FormControl>
                      <AvatarUploadButton
                        field={field}
                        setValue={form.setValue}
                        fieldName="thumbnail"
                      />
                    </FormControl>
                    <FormDescription>WordList's thumbnail.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Food" {...field} />
                  </FormControl>
                  <FormDescription>WordList's title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vegetables, fruits, dishes, ..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>WordList's description.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publicly</FormLabel>
                  <div className="flex items-center justify-between">
                    <FormDescription>
                      Do you want your word list to be public?
                    </FormDescription>
                    <FormControl>
                      <Switch onCheckedChange={field.onChange} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

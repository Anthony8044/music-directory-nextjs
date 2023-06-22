"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Star } from "lucide-react";
import { updateReviewStorage } from "@/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const FormSchema = z.object({
  review: z.string().min(10, {
    message: "Review must be at least 10 characters.",
  }),
  stars: z.string({
    required_error: "Please select a star rating to continue.",
  }),
});

export function TextareaReactHookForm({ trackId }: { trackId: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateReviewStorage({ trackId, data });
    window.location.reload();
  }

  return (
    <div>
      <div className="text-2xl font-semibold ">Write a Review</div>
      <div className="p-6 mt-6 rounded-lg bg-blue-50 border-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="stars"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1 Star">
                        <Star color={`#58db00`} fill="#58db00" size={18} />
                      </SelectItem>
                      <SelectItem value="2 Stars">
                        <div className="flex">
                          {[...Array(2)].map((a, index) => (
                            <Star
                              key={index}
                              color={`#58db00`}
                              fill="#58db00"
                              size={18}
                            />
                          ))}
                        </div>
                      </SelectItem>
                      <SelectItem value="3 Stars">
                        <div className="flex">
                          {[...Array(3)].map((a, index) => (
                            <Star
                              key={index}
                              color={`#58db00`}
                              fill="#58db00"
                              size={18}
                            />
                          ))}
                        </div>
                      </SelectItem>
                      <SelectItem value="4 Stars">
                        <div className="flex">
                          {[...Array(4)].map((a, index) => (
                            <Star
                              key={index}
                              color={`#58db00`}
                              fill="#58db00"
                              size={18}
                            />
                          ))}
                        </div>
                      </SelectItem>
                      <SelectItem value="5 Stars">
                        <div className="flex">
                          {[...Array(5)].map((a, index) => (
                            <Star
                              key={index}
                              color={`#58db00`}
                              fill="#58db00"
                              size={18}
                            />
                          ))}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write a review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a review..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

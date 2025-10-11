"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { SearchResult, sementicSearch } from "../actions";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { SearchFormData, searchSchema } from "./validation";

export const SearchForm = () => {
  const [results, setResults] = React.useState<Array<SearchResult>>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (values: SearchFormData) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await sementicSearch(values.query);
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center space-x-2"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input
                    placeholder="Search bookmarks..."
                    {...field}
                    disabled={isLoading}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-24">
            {isLoading ? <Spinner /> : <span>Search</span>}
          </Button>
        </form>
      </Form>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <span className="ml-2 text-gray-600">Searching...</span>
          </div>
        ) : hasSearched && results.length === 0 ? (
          <p className="text-gray-500">No results found.</p>
        ) : results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((result, index) => (
              <li
                key={index}
                className={`${
                  index < results.length - 1 ? "border-b" : ""
                } pb-2`}
              >
                <a
                  href={result.metadata.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="text-lg font-semibold">
                    {result.metadata.title}
                  </h2>
                </a>
                <p className="text-gray-700">{result.metadata.description}</p>
                <p className="text-sm text-gray-500">
                  Score: {result.score.toFixed(4)}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

const Spinner = () => {
  return (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border" />
  );
};

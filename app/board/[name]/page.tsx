import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchResult {
  title: string;
  link?: string;
  snippet?: string;
  href: string;
  site: string;
  date?: string;
  contents: string;
  image: string;
  path?: string;
  type: "search" | "news";
}

interface PageProps {
  decodedName: string;
  results: {
    search: SearchResult[];
    news: SearchResult[];
  };
}

const Tables = ({ results }: { results: SearchResult[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>title</TableHead>
          <TableHead>contents</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result: SearchResult, index: number) => (
          <TableRow key={index}>
            <TableCell href={result.href} target="_blank">
              {result.title}
            </TableCell>
            <TableCell>{result.contents}</TableCell>
          </TableRow>
        ))}
        {results.length === 0 && (
          <TableRow>
            <TableCell>검색 결과가 없습니다.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const BoardPage: React.FC<PageProps> = ({ decodedName, results }) => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
        {decodedName}
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-2 mb-6">
        검색 결과 및 해당 토픽으로 작성된 게시글입니다.
      </p>
      <Tabs defaultValue="search">
        <TabsList>
          <TabsTrigger value="search">search</TabsTrigger>
          <TabsTrigger value="news">news</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <Tables results={results.search} />
        </TabsContent>
        <TabsContent value="news">
          <Tables results={results.news} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

async function fetchSearchResults(decodedName: string): Promise<{
  results: {
    search: SearchResult[];
    news: SearchResult[];
  };
  error?: string;
}> {
  const query = encodeURIComponent(decodedName);

  // Define search types you want to fetch
  const searchTypes: ("search" | "news")[] = ["search", "news"];

  // Function to fetch based on search type
  const fetchByType = async (
    type: "search" | "news"
  ): Promise<SearchResult[]> => {
    const apiUrl = `/google/api/${type}?word=${query}`;

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error(`API 요청 실패 (${type}): ${res.statusText}`);
      }
      const data = await res.json();

      const results: SearchResult[] = data.items ?? [];

      return results;
    } catch (error: unknown) {
      console.error(`Google Custom Search API 오류 (${type}):`, error);
      return [];
    }
  };

  // Fetch all types in parallel
  const [searchResults, newsResults] = await Promise.all(
    searchTypes.map((type) => fetchByType(type))
  );

  return {
    results: {
      search: searchResults,
      news: newsResults,
    },
  };
}

const BoardPageWrapper = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const { results } = await fetchSearchResults(decodedName);

  return <BoardPage decodedName={decodedName} results={results} />;
};

export default BoardPageWrapper;

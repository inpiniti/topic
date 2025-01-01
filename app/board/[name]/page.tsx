import React from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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

const SearchTables = ({ results }: { results: SearchResult[] }) => {
  return (
    <Table>
      <TableBody>
        {results.map((result: SearchResult, index: number) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex flex-col gap-1">
                <div className="text-xs">{result.site}</div>
                <div className="text-xs">{result.path}</div>
                <a
                  className="text-base font-bold text-blue-500 leading-tight"
                  href={result.href}
                  target="_blank"
                >
                  {result.title}
                </a>
                <div>
                  <span className="text-xs line-clamp-1">{result.date}</span>
                  <span className="text-xs line-clamp-2">
                    {result.contents}
                  </span>
                </div>
              </div>
            </TableCell>
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

const NewsTables = ({ results }: { results: SearchResult[] }) => {
  return (
    <Table>
      <TableBody>
        {results.map((result: SearchResult, index: number) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex flex-row gap-4">
                <img
                  className="rounded-lg object-cover w-24 h-24"
                  src={result.image}
                  alt={result.title}
                />
                <div className="flex flex-col gap-1">
                  <div className="text-xs">{result.site}</div>
                  <a
                    className="text-base font-bold text-blue-500 leading-tight"
                    href={result.href}
                    target="_blank"
                  >
                    {result.title}
                  </a>
                  <div>
                    <span className="text-xs line-clamp-1">
                      {result.contents}
                    </span>
                    <span className="text-xs text-neutral-400 line-clamp-1">
                      {result.date}
                    </span>
                  </div>
                </div>
              </div>
            </TableCell>
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
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="board">게시글</TabsTrigger>
            <TabsTrigger value="search">search</TabsTrigger>
            <TabsTrigger value="news">news</TabsTrigger>
          </TabsList>
          <Button>글쓰기</Button>
        </div>
        <TabsContent value="search">
          <SearchTables results={results.search} />
        </TabsContent>
        <TabsContent value="news">
          <NewsTables results={results.news} />
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
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/google/${type}?word=${query}`;

    try {
      const res = await fetch(apiUrl);

      const data = await res.json();

      const results: SearchResult[] = data ?? [];

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

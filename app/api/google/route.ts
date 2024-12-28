// Disable TLS certificate verification (Development Only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { NextRequest, NextResponse } from 'next/server';
import googleTrends from 'google-trends-api';

export async function GET(request: NextRequest) {
  console.log('GET /api/google', request);

  try {
    const keywords = [
      '원피스',
      '나루토',
      '블리치',
      'google',
      '도쿄구울',
      '나의히어로아카데미아',
      '원펀맨',
      '데스노트',
      '카이지',
      '킹덤',
    ];

    // 5개씩 비교 하고
    // 비교한 녀석들 중에서도 5개씩 비교
    // 마지막 한 키워드가 남을때까지 반복
    const maxKeywords = [];
    let nextKeywords = keywords;
    while (nextKeywords.length > 0) {
      const currentKeywords = nextKeywords.slice(0, 5);
      nextKeywords = nextKeywords.filter(
        (keyword) =>
          !currentKeywords.some((current) => keyword.includes(current))
      );
      console.log('currentKeywords:', currentKeywords);
      const keyword = getKeyword(currentKeywords);
      console.log('keyword:', keyword);
      maxKeywords.push(keyword);
    }

    return NextResponse.json(maxKeywords);
  } catch (error) {
    console.error('Error fetching Google Trends data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// 구글 트렌드로 5개 키워드씩 비교해서 averages 리턴
const getKeyword = async (keywords: string[]) => {
  // 지난 30일
  const startTime = {
    지난30일: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 지난 30일
    // 지난 7일
    지난7일: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 지난 7일
    // 지난 1일
    지난1일: new Date(Date.now() - 1000 * 60 * 60 * 24), // 지난 1일
  };

  const geo = {
    한국: 'KR',
    미국: 'US',
    전체: '',
  };

  const trendsData = await googleTrends.interestOverTime({
    keyword: keywords,
    startTime: startTime.지난30일,
    geo: geo.전체,
  });

  const parsedData = JSON.parse(trendsData);
  const averages = parsedData?.default?.averages;
  // averages [1,2,3,4,5]
  // keywords ['a','b','c','d','e']
  // 라면 e 를 max 에 넣게

  let maxKeyword = '';
  let maxAverage = -Infinity;

  averages.forEach((avg: number, index: number) => {
    if (avg > maxAverage) {
      maxAverage = avg;
      maxKeyword = keywords[index];
    }
  });

  return maxKeyword;
};

// 구글 트렌드로 5개 키워드씩 비교해서 averages 리턴
const getAverages = async (keywords: string[]) => {
  // 지난 30일
  const startTime = {
    지난30일: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 지난 30일
    // 지난 7일
    지난7일: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 지난 7일
    // 지난 1일
    지난1일: new Date(Date.now() - 1000 * 60 * 60 * 24), // 지난 1일
  };

  const geo = {
    한국: 'KR',
    미국: 'US',
    전체: '',
  };

  const trendsData = await googleTrends.interestOverTime({
    keyword: keywords,
    startTime: startTime.지난30일,
    geo: geo.전체,
  });

  const parsedData = JSON.parse(trendsData);
  const averages = parsedData?.default?.averages;

  const result: { [key: string]: number } = {};
  for (let i = 0; i < keywords.length; i++) {
    result[keywords[i]] = averages[i];
  }
  return result;
};

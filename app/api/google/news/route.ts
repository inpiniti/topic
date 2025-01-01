import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
import iconv from "iconv-lite";

export async function GET(request: NextRequest) {
  try {
    const word = request.nextUrl.searchParams.get("word");

    const query = {
      q: String(word),
      tbm: "nws",
      sca_esv: "5077fa036b9a50a9",
      sxsrf: "ADLYWIJGB3H-I73zxDPtRnyiULSSOfPAuw:1735715810768",
      ei: "4ut0Z8jHLpW9vr0P7v6PyAw",
      ved: "0ahUKEwjIwNOi_dOKAxWVnq8BHW7_A8kQ4dUDCBA",
      uact: "5",
      oq: String(word),
      gs_lp:
        "Egxnd3Mtd2l6LXNlcnAiF-ydhOyCrOuFhCDsg4jtlbQg7J247IKsMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHSPsTUABYAHACeAGQAQCYAQCgAQCqAQC4AQPIAQCYAgKgAhGYAwCIBgGQBgqSBwEyoAcA",
      sclient: "gws-wiz-serp",
    };

    const queryString = new URLSearchParams(query).toString();

    const response = await fetch(
      `https://www.google.com/search?${queryString}`,
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
          "sec-ch-prefers-color-scheme": "light",
          "sec-ch-ua":
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          "sec-ch-ua-arch": '"x86"',
          "sec-ch-ua-bitness": '"64"',
          "sec-ch-ua-form-factors": '"Desktop"',
          "sec-ch-ua-full-version": '"131.0.6778.205"',
          "sec-ch-ua-full-version-list":
            '"Google Chrome";v="131.0.6778.205", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": '""',
          "sec-ch-ua-platform": '"Windows"',
          "sec-ch-ua-platform-version": '"10.0.0"',
          "sec-ch-ua-wow64": "?0",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "x-browser-channel": "stable",
          "x-browser-copyright":
            "Copyright 2024 Google LLC. All rights reserved.",
          "x-browser-validation": "Nbt54E7jcg8lQ4EExJrU2ugNG6o=",
          "x-browser-year": "2024",
          "x-client-data":
            "CIW2yQEIpbbJAQipncoBCJqRywEIk6HLAQiJo8sBCIWgzQEI7anOAQiEzM4BCMbPzgEIstPOAQj71c4BCMfYzgEIzNjOARj1yc0BGM7VzgE=",
          cookie:
            "HSID=A1yCNglB4Wwmlthjg; SSID=AjN4jV8738q-12i1X; APISID=2VXj9eizYYxFzknM/AsdGM7u0Dvrxlcnbm; SAPISID=Xg8RD7KWoHOluOSp/A_LLyIR3DygCVpQTP; __Secure-1PAPISID=Xg8RD7KWoHOluOSp/A_LLyIR3DygCVpQTP; __Secure-3PAPISID=Xg8RD7KWoHOluOSp/A_LLyIR3DygCVpQTP; SEARCH_SAMESITE=CgQIzpwB; SID=g.a000rghIRDYzqiHHFliCkNkRYNpMr4nRYu72d2xeu0tLwEykCx8e5RnGS2tiMS_b5lHDMBK7dwACgYKAUMSARESFQHGX2Miz1jwofMCgvY8MeWNTr_jqhoVAUF8yKoQ_cacBGteT_ZeYb0CsWLo0076; __Secure-1PSID=g.a000rghIRDYzqiHHFliCkNkRYNpMr4nRYu72d2xeu0tLwEykCx8eTZzMawjoE0IVsMIBpc9o9AACgYKAUkSARESFQHGX2MiTHxzD8r4wJgV9Hu5wSAuyhoVAUF8yKqAwoq9goCuPXMc3nTY42cV0076; __Secure-3PSID=g.a000rghIRDYzqiHHFliCkNkRYNpMr4nRYu72d2xeu0tLwEykCx8eV5ICfyTLkXTbyxPovE3zFAACgYKAUsSARESFQHGX2Mi-KJGQMPW7A84hyW8vYcVqRoVAUF8yKpPsnhYCtcCGyMgjAylY8X60076; OTZ=7885837_20_20__20_; AEC=AZ6Zc-Xvaxozobr_KJ5q_cSGus2ATc7OLPrXo9TTeL2EEMUVqJejynUhZ-8; NID=520=IdvKnV91284GU7Un2Y0w0fJLYP7ne4NHvDveg6_qeZUUfia5wyB5Wh-yAo-F-wCe_yh4icF1iR5oBekCAXDFwiXLr9CB3S13w8syvMGULZpkH8fbFsYba5ci7ClwwbuJpqE-LB9zuPy1QuWEBqez7yycPtvurCBSPF2BlfhSgSLYPN06_fpGrA1xBT_OAUC1hlPaU4ynVS1dAJ4RHehpj8QmHoOWnRII8kt--AY1qrhsq15iyQeuaF9B0CnxEL4RFHT3o3LmvVmVGZ30oLU1lpzWoi3BxdXr_ua2O5OA_ZbyDlWjUFqWOQx92x8fYEmGLsxjV10PlVWjwslj4goPAl04oOkOkQ9rcFHw2q0y5l27cWgxuyJZyz3x9pBOQooRUeXDqQANVhStem69XSSN3KLhlbT_XHdCSjyGuVZnM8I_EbVIGxfiQWgiBcSc56kw6DEAuo6oMTJlIh8xabGCbgtgDrpjx6XE68laM8NCTqT92_33VPmqs7iDJJ45TWB19eV5dhVXoevN9T7i6cQMIwOFHxtPscuL9K7UcvILaG9a4IODZdIsEN_i9MYyMxHC3iPHOEh6_jH8Ruld9RvoDZzUtto1UClSw6fPP-lVv55fnMtfx9B80lfQ5uNw-OjTcjNjwBH-VW4Dc6dsJfMoEc5AA1VOI8gzGiuA6sGmvc1cE3d69daMjm9ED5aqerOubrFjn_YbDYgXnwmRjo1boMmGkIW99fwnMMymslbEPjPXLRl_hopNMOQWsRuvVTC4ErfoqqLn-WDYK4_G7IEOsWHHCj7z8tdBQjOScsWztOw; __Secure-1PSIDTS=sidts-CjEB7wV3sQHOJTIXKRJKfULE9cFhpWBmdejr4YAld6nSi7UXmrXXvCQRgr1SqE8rHfr_EAA; __Secure-3PSIDTS=sidts-CjEB7wV3sQHOJTIXKRJKfULE9cFhpWBmdejr4YAld6nSi7UXmrXXvCQRgr1SqE8rHfr_EAA; DV=E7ZppFvx0DxRUAuW96t36_6uLnANQhkaJsH45ZPKQwAAAJAGHw3XbxbXMAAAAASIm0L1K13fFQAAAPob2FmvhbQoEAAAAA; SIDCC=AKEyXzU74ivi7MiP3svaTNqFwYnNqcH0sLAhMnlyC3rssubaB7KaFJFJ_eray81zJcCuH0Zyyyg; __Secure-1PSIDCC=AKEyXzVv6pRCytsjALDDRaFUxoVZbKTqJEZZlUqELdbmDSt4fS4q4TkVo4pRhocXbFzvkEMBPSg; __Secure-3PSIDCC=AKEyXzXdUiJb8qFeNstCxqObQMuNQhHXeH6fbU-7rYok3AnJ2kjLowO52_cbu4fhuuIknvBe-l7V",
          Referer: "https://www.google.com/",
          "Referrer-Policy": "origin",
        },
        body: null,
        method: "GET",
      }
    );

    const textBuffer = await response.arrayBuffer();
    const decodedHtml = iconv.decode(Buffer.from(textBuffer), "euc-kr"); // 인코딩 확인 후 변경
    const $ = load(decodedHtml);

    const divs = $("#main > div:not([class])").toArray();

    // 'data:image/jpeg;base64,/9j/ 시작해서 ' 으로 끝나는 텍스트 추출
    const imageRegex = /data:image\/jpeg;base64,\/9j\/[A-Za-z0-9+/=]+/g;
    const images = decodedHtml.match(imageRegex) || [];

    // JSON 변환
    const results = divs
      .map((div) => {
        const element = $(div);
        const href = `https://www.google.com${element
          .find("div > div > a")
          .attr("href")}`;

        const title = element
          .find("a > div > div > div > h3 > div")
          .text()
          .trim();
        const site = element
          .find("a > div > div > div:nth-child(2) > div")
          .text()
          .trim();

        const contents = element
          .find("a > div:nth-child(2) > div:nth-child(2) > div > div > div")
          .clone() // 요소 복제
          .find("span") // <span> 태그 찾기
          .remove() // <span> 태그 제거
          .end() // 원래 요소로 돌아가기
          .text() // 텍스트 추출
          .trim();

        const date = element
          .find(
            "a > div:nth-child(2) > div:nth-child(2) > div > div > div > span"
          )
          .text()
          .trim();

        return {
          href,
          site,
          title,
          date,
          contents,
        };
      })
      .filter((result) => result.title);

    return NextResponse.json(
      results.map((result, index) => {
        return {
          ...result,
          image: images[index],
        };
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json([]);
    } else {
      console.error(error);
      return NextResponse.json([]);
    }
  }
}

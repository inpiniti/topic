import { Daily } from "./Daily";
import { RealTime } from "./RealTime";

export default function Home() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        감자 토픽
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-2 mb-6">
        아래 토픽을 선택하면 관련 게시물을 확인 할 수 있습니다.
      </p>
      <div className="flex flex-col lg:flex-row gap-4">
        <RealTime />
        <Daily />
      </div>
    </div>
  );
}

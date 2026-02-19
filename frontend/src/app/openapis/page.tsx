"use client";

import PokemonItem from "@/components/openapis-list";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function OpenApisPage() {
  const [randoms, setRandoms] = useState(() =>
    Array.from({ length: 10 }, () => Math.floor(Math.random() * 1010) + 1)
  );
  const onNext = () => {
    const next = Array.from({ length: 10 }, () => Math.floor(Math.random() * 1010) + 1);
    setRandoms((prev) => [...prev, ...next]);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={randoms.length}
        hasMore={true}
        next={onNext}
        loader={<div>로딩중입니다</div>}
      >
        {randoms.map((id, index) => (
          <PokemonItem number={id} key={index} />
        ))}
      </InfiniteScroll>
    </>
  );
}

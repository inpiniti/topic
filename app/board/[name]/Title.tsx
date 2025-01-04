'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

export const Title = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel className="max-w-sm" setApi={setApi}>
        <CarouselContent className="-ml-1">
          {Array.from({ length: 55 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <div className="p-1">
                <h1
                  className={`${
                    current === index + 1 ? 'text-4xl' : 'text-xs'
                  } font-semibold`}
                >
                  {index + 1}
                </h1>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

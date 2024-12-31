'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useDateStore } from '@/app/store/dateStore';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Title = ({ date: newDate }: { date: string }) => {
  const { date, setDate } = useDateStore();

  useEffect(() => {
    setDate(new Date(newDate));
  }, []);

  const router = useRouter();

  const handlePreviousDayClick = () => {
    const newDate = dayjs(date).subtract(1, 'day').toDate();
    setDate(newDate);
    router.push(`/topic/daily/${dayjs(newDate).format('YYYY-MM-DD')}`);
  };

  const handleNextDayClick = () => {
    const newDate = dayjs(date).add(1, 'day').toDate();
    setDate(newDate);
    router.push(`/topic/daily/${dayjs(newDate).format('YYYY-MM-DD')}`);
  };

  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
      <Button onClick={handlePreviousDayClick} variant="ghost">
        <ChevronLeft />
      </Button>
      {dayjs(date).format('YYYY-MM-DD')}
      <Button onClick={handleNextDayClick} variant="ghost">
        <ChevronRight />
      </Button>
    </h1>
  );
};

'use client';

import { dailyGoalsAtom } from '@app/store/atoms';
import { useUserDailyGoalsQuery } from '@/graphql/graphql-types';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import PomodoroTimer from '@/app/components/timer/timer';
import Sidebar from '@/app/components/sidebar/sidebar';
import Calendar from '@/app/components/calendar/calendar';

const Dashboard = () => {
  const [, setDailyGoals] = useAtom(dailyGoalsAtom);
  const [{ data, fetching, error }] = useUserDailyGoalsQuery();

  useEffect(() => {
    if (data && data.userDailyGoals) {
      setDailyGoals(data.userDailyGoals);
    }
  }, [data]);

  return (
    <div className="flex h-full p-4" style={{ height: 'calc(100vh - 4rem)' }}>
      <Sidebar />
      <div className="flex flex-grow flex-col overflow-hidden pl-4">
        <PomodoroTimer />
        <div className="mb-4" />
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;

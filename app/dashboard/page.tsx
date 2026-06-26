'use client';

import { useQuery } from '@tanstack/react-query';
import { getWorkouts } from '@/services/workoutService';
import WorkoutCard from '@/components/workout/WorkoutCard';

export default function DashboardPage() {
  // Auth protection is now handled by middleware (see middleware.ts)
  const {
    data: workouts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts,
    staleTime: 0,
  });

  if (isLoading) {
    return <p className="text-white">Loading workouts...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-400">
        {error instanceof Error ? error.message : 'Failed to load workouts'}
      </p>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="mt-6 space-y-4">
        {workouts?.length === 0 && (
          <p className="text-gray-400">No workouts yet.</p>
        )}

        {workouts?.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </>
  );
}

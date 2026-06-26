import { apiFetch } from '@/lib/api';
import type { Workout } from '@/types/workout';
import type { WorkoutCreate } from '@/schemas/workout.schema';

export function getWorkouts() {
  return apiFetch<Workout[]>('/workouts');
}

export async function createWorkout(payload: WorkoutCreate) {
  return apiFetch<Workout>('/workouts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

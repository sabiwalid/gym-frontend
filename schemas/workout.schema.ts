import { z } from 'zod';

export const setCreateSchema = z.object({
  reps: z.number().min(1, 'Reps must be at least 1'),
  weight: z.number().min(0, 'Weight cannot be negative'),
});

export const exerciseSchema = z.object({
  name: z.string().min(1, 'Exercise name is required'),
  sets: z.array(setCreateSchema).min(1, 'Add at least one set'),
});

export const workoutCreateSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  exercises: z.array(exerciseSchema).min(1, 'Add at least one exercise'),
});

export type SetCreate = z.infer<typeof setCreateSchema>;
export type ExerciseCreate = z.infer<typeof exerciseSchema>;
export type WorkoutCreate = z.infer<typeof workoutCreateSchema>;

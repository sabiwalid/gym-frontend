export type WorkoutSet = {
  id: number;
  exercise_id: number;
  reps: number;
  weight: number;
};

export type Exercise = {
  id: number;
  workout_id: number;
  name: string;
  sets: WorkoutSet[];
};

export type Workout = {
  id: number;
  date: string;
  exercises: Exercise[];
};

'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { WorkoutCreate, SetCreate, ExerciseCreate } from '@/schemas/workout.schema';
import { createWorkout } from '@/services/workoutService';

const COMMON_EXERCISES = [
  'Barbell Bench Press',
  'Dumbbell Bench Press',
  'Incline Bench Press',
  'Decline Bench Press',
  'Machine Chest Press',
  'Cable Chest Fly',
  'Dumbbell Fly',
  'Barbell Back Squat',
  'Goblet Squat',
  'Leg Press',
  'Leg Extension',
  'Leg Curl',
  'Romanian Deadlift',
  'Conventional Deadlift',
  'Sumo Deadlift',
  'Barbell Row',
  'Dumbbell Row',
  'Machine Row',
  'Lat Pulldown',
  'Pull-ups',
  'Assisted Pull-ups',
  'Chin-ups',
  'Barbell Curl',
  'Dumbbell Curl',
  'Cable Curl',
  'Machine Curl',
  'Barbell Overhead Press',
  'Dumbbell Overhead Press',
  'Machine Overhead Press',
  'Lateral Raise',
  'Front Raise',
  'Reverse Fly',
  'Shrugs',
  'Barbell Skull Crushers',
  'Rope Tricep Extension',
  'Tricep Dips',
  'Close Grip Bench Press',
  'Tricep Pushdown',
  'Overhead Tricep Extension',
  'Leg Raise',
  'Cable Crunch',
  'Machine Crunch',
  'Ab Wheel Rollout',
  'Planks',
  'Russian Twists',
  'Incline Treadmill',
  'Flat Treadmill',
  'Stationary Bike',
  'Rowing Machine',
  'Elliptical',
  'Stair Climber',
  'Hanging Leg Raises',
  'Dumbbell Flyes',
  'Machine Flyes',
  'Plate Loaded Chest Press',
  'Smith Machine Squat',
  'Hack Squat',
  'V-Squat',
  'Pendulum Squat',
  'Belt Squat',
  'Bulgarian Split Squat',
  'Lunges',
  'Step-ups',
  'Calf Raises',
  'Seated Calf Raises',
  'Standing Calf Raises',
  'Machine Calf Raises',
  'Preacher Curl',
  'EZ Bar Curl',
  'Machine Preacher Curl',
  'Concentration Curl',
  'Cable Overhead Tricep Extension',
  'Tricep Rope Pushdown',
  'V-Bar Pushdown',
  'Straight Bar Pushdown',
  'Dumbbell Pullovers',
  'Chest Dips',
  'Decline Sit-ups',
  'Cable Woodchops',
  "Farmer's Carry",
  'Landmine Row',
  'T-Bar Row',
  'Seal Rows',
  'Machine Rows',
  'Assisted Machine Dips',
  'Weighted Dips',
  'Machine Lat Pulldown',
  'Wide Grip Pulldowns',
  'Close Grip Pulldowns',
  'Reverse Grip Pulldowns',
  'Assisted Pull-up Machine',
  'Resistance Band Pull-ups',
  'Face Pulls',
  'Reverse Pec Deck',
  'Machine Reverse Fly',
].sort();

type ExerciseDraft = ExerciseCreate;

type WorkoutLoggerFormValues = {
  date: string;
  currentExercise: {
    name: string;
    sets: SetCreate[];
  };
};

export default function WorkoutLoggerForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [workoutExercises, setWorkoutExercises] = useState<ExerciseDraft[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);

  const {
    register,
    getValues,
    setValue,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<WorkoutLoggerFormValues>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      currentExercise: { name: '', sets: [{ reps: 10, weight: 0 }] },
    },
  });

  const { fields: setFields, append: appendSet, remove: removeSet } = useFieldArray({
    control,
    name: 'currentExercise.sets',
  });

  const handleAddExercise = async () => {
    const valid = await trigger(['currentExercise.name', 'currentExercise.sets']);
    if (!valid) return;

    const draftExercise = getValues('currentExercise');
    setWorkoutExercises((prev) => [...prev, draftExercise]);

    setValue('currentExercise', { name: '', sets: [{ reps: 10, weight: 0 }] });
  };

  const handleRemoveExercise = (index: number) => {
    setWorkoutExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinishWorkout = async () => {
    if (workoutExercises.length === 0) {
      setApiError('Add at least one exercise before finishing the workout.');
      return;
    }

    try {
      setIsFinishing(true);
      setApiError(null);

      const payload: WorkoutCreate = {
        date: getValues('date'),
        exercises: workoutExercises,
      };

      await createWorkout(payload);
      router.push('/dashboard');
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : 'Failed to log workout',
      );
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Log Workout</h1>
        <p className="mt-2 text-gray-400">Record your exercises and progress</p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className="space-y-6"
      >
        {/* Date Input */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Workout Date
          </label>
          <input
            type="date"
            {...register('date')}
            className="w-full rounded-lg border border-gray-600 bg-[#1a1e1c] px-4 py-2 text-white outline-none focus:border-lime-400"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-400">{errors.date.message}</p>
          )}
        </div>

        {/* Current Exercise */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-white">Add Exercise</h2>

          <div className="rounded-lg border border-gray-600 bg-[#1a1e1c] p-4">
            {/* Exercise name */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-white">
                Exercise Name
              </label>
              <select
                {...register('currentExercise.name', {
                  required: 'Exercise name is required',
                })}
                className="w-full rounded-lg border border-gray-600 bg-[#1a1e1c] px-4 py-2 text-white outline-none focus:border-lime-400"
              >
                <option value="">Select an exercise</option>
                {COMMON_EXERCISES.map((exercise) => (
                  <option key={exercise} value={exercise}>
                    {exercise}
                  </option>
                ))}
              </select>
              {errors.currentExercise?.name && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.currentExercise.name.message}
                </p>
              )}
            </div>

            {/* Per-set rows */}
            <div className="space-y-2">
              <div className="grid grid-cols-[40px_1fr_1fr_auto] items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                <span>#</span>
                <span>Reps</span>
                <span>Weight (kg)</span>
                <span />
              </div>

              {setFields.map((field, i) => (
                <div key={field.id} className="grid grid-cols-[40px_1fr_1fr_auto] items-start gap-2">
                  <span className="pt-2 text-sm font-bold text-gray-500">{i + 1}</span>
                  <Input
                    type="number"
                    min="1"
                    placeholder="10"
                    error={errors.currentExercise?.sets?.[i]?.reps?.message}
                    {...register(`currentExercise.sets.${i}.reps`, {
                      valueAsNumber: true,
                      min: { value: 1, message: 'Min 1' },
                      required: 'Required',
                    })}
                  />
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="0"
                    error={errors.currentExercise?.sets?.[i]?.weight?.message}
                    {...register(`currentExercise.sets.${i}.weight`, {
                      valueAsNumber: true,
                      min: { value: 0, message: 'Min 0' },
                      required: 'Required',
                    })}
                  />
                  {setFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSet(i)}
                      className="mt-1 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white hover:bg-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => appendSet({ reps: 10, weight: 0 })}
                className="rounded border border-gray-500 px-3 py-1 text-sm font-bold text-gray-300 hover:bg-white/10"
              >
                + Add Set
              </button>
              <button
                type="button"
                onClick={handleAddExercise}
                disabled={isSubmitting || isFinishing}
                className="rounded bg-lime-400 px-3 py-2 text-sm font-bold text-black hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add To Workout
              </button>
            </div>
          </div>
        </div>

        {/* Workout Draft */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-white">
            Current Workout ({workoutExercises.length} exercises)
          </h2>

          <div className="space-y-3">
            {workoutExercises.length === 0 && (
              <p className="rounded-lg border border-dashed border-gray-600 p-4 text-sm text-gray-400">
                No exercises added yet. Add your first exercise above.
              </p>
            )}

            {workoutExercises.map((exercise, index) => (
              <div
                key={`${exercise.name}-${index}`}
                className="rounded-lg border border-gray-600 bg-[#1a1e1c] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{exercise.name}</p>
                    <div className="mt-2 space-y-1">
                      {exercise.sets.map((set, i) => (
                        <p key={i} className="text-sm text-gray-400">
                          Set {i + 1}: {set.reps} reps · {set.weight}kg
                        </p>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExercise(index)}
                    className="rounded bg-red-600 px-3 py-1 text-sm font-bold text-white hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {apiError && (
          <p className="rounded-lg bg-red-900/30 border border-red-600 px-4 py-3 text-red-400">
            {apiError}
          </p>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={handleFinishWorkout}
            isLoading={isFinishing}
            className="flex-1 bg-lime-400 py-3 text-lg font-bold text-black hover:bg-lime-300"
          >
            Finish Workout ⚡
          </Button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded-lg border border-gray-600 px-4 py-3 text-white font-bold hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

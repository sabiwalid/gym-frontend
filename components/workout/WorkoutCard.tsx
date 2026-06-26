import type { Workout } from '@/types/workout';

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <div className="rounded-xl bg-[#252a27] p-4 text-white shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{workout.date}</h3>
        <span className="text-sm text-lime-400">
          {workout.exercises.length} exercises
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {workout.exercises.map((exercise) => (
          <div key={exercise.id} className="rounded-lg bg-[#1f2421] p-3 text-sm">
            <p className="font-semibold">{exercise.name}</p>
            <div className="mt-2 space-y-1">
              {exercise.sets.map((set, i) => (
                <div key={set.id} className="flex items-center gap-3 text-gray-400">
                  <span className="w-12 text-xs font-bold text-gray-500">
                    SET {i + 1}
                  </span>
                  <span>{set.reps} reps</span>
                  <span>·</span>
                  <span className={set.weight === Math.max(...exercise.sets.map(s => s.weight)) && exercise.sets.length > 1 ? 'font-bold text-lime-400' : ''}>
                    {set.weight}kg
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Top set: {Math.max(...exercise.sets.map(s => s.weight))}kg ·{' '}
              {exercise.sets.length} sets total
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

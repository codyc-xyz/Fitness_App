export type SetDetail = {
  count: number;
};

interface ProgressRecord {
  workout_id: number;
  name: string;
  sets: number;
  reps: number;
  date: string;
  weight: number;
  unit: string;
  set_reps: SetDetail[];
  success: boolean;
}

export default ProgressRecord;

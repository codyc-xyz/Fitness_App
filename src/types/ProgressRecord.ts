export type SetDetail = {
  count: number;
};

interface ProgressRecord {
  workout_id: number;
  date: string;
  weight: number;
  unit: string;
  setDetails: SetDetail[];
  success: boolean;
}

export default ProgressRecord;

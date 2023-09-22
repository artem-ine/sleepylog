import SleepDurationPastWeek from "./SleepDurationPastWeek";
import CustomRange from "./CustomRange";
import SleepDurationPastMonth from "./SleepDurationPastMonth";
import AverageRatingPastWeek from "./AverageRatingWeek";
import AverageRatingPastMonth from "./AverageRatingMonthly";
import { useAuth } from "../../../utils/useAuth";

function Stats() {
  const { auth } = useAuth();
  console.log(auth.user);

  return (
    <div>
      <SleepDurationPastWeek />
      <SleepDurationPastMonth />
      <AverageRatingPastWeek />
      <AverageRatingPastMonth />
      <h1 className="text-sm font-bold">
        Looking for a specific period of time?
      </h1>
      <CustomRange />
    </div>
  );
}

export default Stats;

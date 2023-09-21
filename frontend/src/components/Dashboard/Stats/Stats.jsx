import SleepDurationPastWeek from "./SleepDurationPastWeek";
import SleepDurationCustomRange from "./SleepDurationCustomRange";
import SleepDurationPastMonth from "./SleepDurationPastMonth";
import AverageRatingPastWeek from "./AverageRatingWeek";
import { useAuth } from "../../../utils/useAuth";

function Stats() {
  const { auth } = useAuth();
  console.log(auth.user);

  return (
    <div>
      <h1>Stats!</h1>
      <SleepDurationPastWeek />
      <SleepDurationPastMonth />
      <SleepDurationCustomRange />
      <AverageRatingPastWeek />
    </div>
  );
}

export default Stats;

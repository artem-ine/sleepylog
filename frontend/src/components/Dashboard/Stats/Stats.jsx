import SleepDurationPastWeek from "./SleepDurationPastWeek";
import { useAuth } from "../../../utils/useAuth";

function Stats() {
  const { auth } = useAuth();
  console.log(auth.user);

  return (
    <div>
      <h1>Stats!</h1>
      <SleepDurationPastWeek logbookId={auth.user.logbook} />
    </div>
  );
}

export default Stats;

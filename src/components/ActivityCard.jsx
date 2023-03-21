
const ActivityCard = (props) => {
  const activity = props.activity;
  return (
    <div className="ActivityCard">
      <div>Name:{activity.name}</div>
      <div>Description: {activity.description}</div>
      {activity.count ? <div>Count: {activity.count}</div> : null}
      {activity.duration ? <div>Duration: {activity.duration}</div> : null}
    </div>
  );
};

export default ActivityCard;

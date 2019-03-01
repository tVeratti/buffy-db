import Season from './season';

export default ({ seasons, active }) => {
  return (
    <ul className="episodes__seasons">
      {seasons.map(s => {
        return (
          <Season key={s.number} season={s} isActive={s.number == active} />
        );
      })}
    </ul>
  );
};

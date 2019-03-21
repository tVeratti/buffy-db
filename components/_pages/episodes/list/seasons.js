import Season from './season';

export default ({ seasons, active, setOpen, setSeason }) => {
  return (
    <ul className="episodes__seasons">
      {seasons.map(s => {
        const onClick = () => {
          setOpen(true);
          setSeason(s);
        };
        return (
          <Season key={s} season={s} isActive={s == active} onClick={onClick} />
        );
      })}
    </ul>
  );
};

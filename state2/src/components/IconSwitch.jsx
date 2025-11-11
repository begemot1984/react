function IconSwitch({ icon, onSwitch }) {
  return (
    <div className="icon-switch">
      <button className="material-icons md-48" onClick={onSwitch}>
        {icon}
      </button>
    </div>
  );
}

export default IconSwitch;

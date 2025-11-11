function ProjectList({ projects }) {
  return (
    <div className="flex-container">
      {projects.map((item) => (
        <div className="flex-item">
          <img src={item.img} />
        </div>
      ))}
    </div>
  );
}

export default ProjectList;

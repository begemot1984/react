import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeSearchField } from "./skillSlice";

export default function SkillPage() {
  const dispatch = useAppDispatch();
  const skillState = useAppSelector((state) => {
    return state.skill;
  });

  return (
    <div>
      <label htmlFor="query" style={{ marginRight: "10px" }}>
        Поиск:
      </label>
      <input
        type="text"
        id="query"
        value={skillState.query}
        onChange={(e) => dispatch(changeSearchField(e.target.value))}
      />
      {skillState.status != "" && (
        <span style={{ marginBottom: "10px", marginLeft: "10px" }}>
          {skillState.status}
        </span>
      )}
      {skillState.skills.map((s) => {
        return (
          <div key={s.id} style={{ marginTop: "20px" }}>
            {s.id} - {s.name}
          </div>
        );
      })}
    </div>
  );
}

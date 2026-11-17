import type { TechGroup } from '../data/content';
import Chip from './Chip';

export default function TechGroups({ groups }: { groups: TechGroup[] }) {
  return (
    <div className="tech">
      {groups.map((group) => (
        <div className="group" key={group.title}>
          <h3 className="mono">{group.title}</h3>
          <div className="chips">
            {group.items.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

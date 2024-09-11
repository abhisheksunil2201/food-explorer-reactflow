import { Handle, Position } from "@xyflow/react";
import BowlIcon from "../../assets/bowl.png";

interface EntityNodeProps {
  data: {
    label: string;
  };
}

export default function EntityNode({ data }: EntityNodeProps) {
  return (
    <div className="bg-purple-100 border rounded shadow-2xl border-purple-300 p-2 flex items-center gap-2 w-40 font-mono">
      <Handle type="target" position={Position.Left} />
      <img src={BowlIcon} className="h-8 w-8 p-1" />
      <Handle type="source" position={Position.Right} />
      <span>{data.label}</span>
    </div>
  );
}

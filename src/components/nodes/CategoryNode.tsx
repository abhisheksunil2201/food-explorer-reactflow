import { Handle, Position } from "@xyflow/react";
import { HobbyKnifeIcon } from "@radix-ui/react-icons";

interface CategoryNodeProps {
  data: {
    label: string;
  };
}

export default function CategoryNode({ data }: CategoryNodeProps) {
  return (
    <div className="bg-purple-100 border rounded border-purple-200 shadow-2xl p-2 flex items-center gap-2 w-40 font-mono">
      <Handle type="target" position={Position.Left} />
      <HobbyKnifeIcon className="h-4 w-4" />
      <span>{data.label}</span>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

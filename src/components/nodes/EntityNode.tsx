import { Handle, Position } from "@xyflow/react";
import { DotFilledIcon } from "@radix-ui/react-icons";

interface EntityNodeProps {
  data: {
    label: string;
  };
}

export default function EntityNode({ data }: EntityNodeProps) {
  return (
    <div className="bg-purple-100 border rounded shadow-2xl border-purple-300 p-2 flex items-center gap-2 w-40">
      <Handle type="target" position={Position.Top} />
      <DotFilledIcon className="h-4 w-4" />
      <span>{data.label}</span>
    </div>
  );
}

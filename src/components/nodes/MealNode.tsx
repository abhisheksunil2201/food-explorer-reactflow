import { Handle, Position } from "@xyflow/react";
import RestaurantIcon from "../../assets/restaurant.png";

interface MealNodeProps {
  data: {
    label: string;
  };
}

export default function MealNode({ data }: MealNodeProps) {
  return (
    <div className="bg-green-100 border rounded border-green-300 shadow-2xl p-2 flex items-center gap-2 w-[400px] font-mono">
      <Handle type="target" position={Position.Left} />
      <img src={RestaurantIcon} className="h-8 w-8 p-1" />
      <span>{data.label}</span>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

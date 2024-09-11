import { Handle, Position } from "@xyflow/react";
import {
  CookieIcon,
  DoubleArrowRightIcon,
  ViewVerticalIcon,
} from "@radix-ui/react-icons";
import IngredientsIcon from "../../assets/ingredients.png";
import TagsIcon from "../../assets/tags.png";

interface OptionNodeProps {
  data: {
    label: string;
  };
}

const NodeImage = ({ label }: { label: string }) => {
  switch (label) {
    case "View Ingredients":
      return <img src={IngredientsIcon} className="w-6 h-6" />;
    case "View Tags":
      return <img src={TagsIcon} className="w-6 h-6" />;
    case "View Details":
      return <ViewVerticalIcon className="h-4 w-4" />;
    case "View Meals":
      return <CookieIcon className="h-4 w-4" />;
    default:
      return <DoubleArrowRightIcon className="h-4 w-4" />;
  }
};

export default function OptionNode({ data }: OptionNodeProps) {
  return (
    <div className="bg-white border rounded shadow-2xl border-b-2 p-2 flex items-center gap-2 w-60 font-mono">
      <Handle type="target" position={Position.Left} />
      <NodeImage label={data.label} />
      <span>{data.label}</span>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

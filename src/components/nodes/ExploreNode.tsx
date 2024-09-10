import { Handle, Position, type Node } from "@xyflow/react";
import { GlobeIcon } from "@radix-ui/react-icons";

type ExploreNode = Node<{ number: number }, "explore">;

export default function ExploreNode() {
  return (
    <div className="bg-white border rounded border-b-2 shadow-2xl p-4 flex items-center gap-3 w-40">
      <GlobeIcon className="h-6 w-6" />
      Explore
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

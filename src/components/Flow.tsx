import {
  ReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import ExploreNode from "./nodes/ExploreNode";
import CategoryNode from "./nodes/CategoryNode";
import MealNode from "./nodes/MealNode";
import OptionNode from "./nodes/OptionNode";
import EntityNode from "./nodes/EntityNode";
import {
  fetchCategories,
  fetchMealDetails,
  fetchMeals,
  fetchMealsByIngredient,
} from "../api";
import Sidebar from "./Sidebar";

const initialNodes: Node[] = [
  {
    id: "1",
    data: {},
    position: { x: 500, y: 500 },
    type: "explore",
  },
];

export default function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [showSidebar, setShowSidebar] = useState<any>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const nodeTypes: NodeTypes = {
    explore: ExploreNode,
    category: CategoryNode,
    meal: MealNode,
    option: OptionNode,
    entity: EntityNode,
  };

  const handleNodeClick = useCallback(
    async (
      _event: React.MouseEvent,
      node: Node<{
        label?: string;
        category?: string;
        ingredients?: string[];
        tags?: string[];
        mealId?: string;
        ingredient?: string;
      }>
    ) => {
      const nodeId = node.id;
      const nodeType = node.type;

      switch (nodeType) {
        case "explore": {
          const categories = await fetchCategories();
          const categoryNodes = categories
            .slice(0, 5)
            .map((category: any, index: number) => ({
              id: `category-${nodeId}-${crypto.randomUUID()}`,
              type: "category",
              data: { label: category.strCategory },
              position: {
                x: node.position.x + 200,
                y: node.position.y + index * 60 - 80,
              },
            }));
          setNodes((prevNodes) => [...prevNodes, ...categoryNodes]);
          setEdges((prevEdges) => [
            ...prevEdges,
            ...categoryNodes.map((categoryNode: any) => ({
              id: `edge-${nodeId}-${categoryNode.id}-${crypto.randomUUID()}`,
              source: nodeId,
              target: categoryNode.id,
            })),
          ]);
          break;
        }

        case "category": {
          const optionNode = {
            id: `option-${nodeId}`,
            type: "option",
            data: { label: "View Meals", category: node.data.label },
            position: {
              x: node.position.x + 200,
              y: node.position.y,
            },
          };
          setNodes((prevNodes) => [...prevNodes, optionNode]);
          setEdges((prevEdges) => [
            ...prevEdges,
            {
              id: `edge-${nodeId}-${optionNode.id}-${crypto.randomUUID()}`,
              source: nodeId,
              target: optionNode.id,
            },
          ]);
          break;
        }

        case "option":
          if (node.data.label === "View Meals") {
            const meals = node.data.category
              ? await fetchMeals(node.data.category || "")
              : await fetchMealsByIngredient(node.data.ingredient || "");
            const mealNodes = meals
              .slice(0, 5)
              .map(
                (meal: { strMeal: string; idMeal: string }, index: number) => ({
                  id: `meal-${nodeId}-${crypto.randomUUID()}`,
                  type: "meal",
                  data: { label: meal.strMeal, mealId: meal.idMeal },
                  position: {
                    x: node.position.x + 400,
                    y: node.position.y + index * 60 - 80,
                  },
                })
              );
            setNodes((prevNodes) => [...prevNodes, ...mealNodes]);
            setEdges((prevEdges) => [
              ...prevEdges,
              ...mealNodes.map((mealNode: any) => ({
                id: `edge-${nodeId}-${mealNode.id}-${crypto.randomUUID()}`,
                source: nodeId,
                target: mealNode.id,
              })),
            ]);
          } else if (node.data.label === "View Details") {
            const mealDetails = await fetchMealDetails(node.data.mealId || "");
            setSelectedMeal(mealDetails);
            setShowSidebar(true);
          } else if (node.data.label === "View Ingredients") {
            const ingredients = node.data.ingredients || [];
            const ingredientNodes = ingredients.map((ingredient, index) => ({
              id: `ingredient-${nodeId}-${crypto.randomUUID()}`,
              type: "entity",
              data: { label: ingredient },
              position: {
                x: node.position.x + 300,
                y: node.position.y + index * 60 - 80,
              },
            }));
            setNodes((prevNodes) => [...prevNodes, ...ingredientNodes]);
            setEdges((prevEdges) => [
              ...prevEdges,
              ...ingredientNodes.map((ingredientNode) => ({
                id: `edge-${nodeId}-${
                  ingredientNode.id
                }-${crypto.randomUUID()}`,
                source: nodeId,
                target: ingredientNode.id,
              })),
            ]);
          }
          break;

        case "meal": {
          const mealDetails = await fetchMealDetails(node.data.mealId || "");
          setSelectedMeal(mealDetails);
          const mealOptions = [
            {
              label: "View Ingredients",
              data: { ingredients: mealDetails?.ingredients },
            },
            { label: "View Tags", data: { tags: mealDetails?.tags } },
            { label: "View Details", data: { mealId: node.data.mealId } },
          ];

          const optionNodes = mealOptions.map((option, index) => ({
            id: `option-${nodeId}-${option.label}-${crypto.randomUUID()}`,
            type: "option",
            data: { label: option.label, ...option.data },
            position: {
              x: node.position.x + 450,
              y: node.position.y + index * 60 - 80,
            },
          }));
          setNodes((prevNodes) => [...prevNodes, ...optionNodes]);
          setEdges((prevEdges) => [
            ...prevEdges,
            ...optionNodes.map((optionNode) => ({
              id: `edge-${nodeId}-${optionNode.id}-${crypto.randomUUID()}`,
              source: nodeId,
              target: optionNode.id,
            })),
          ]);
          break;
        }

        case "entity": {
          if (node.id.startsWith("ingredient-")) {
            const optionNode = {
              id: `option-${nodeId}-${crypto.randomUUID()}`,
              type: "option",
              data: { label: "View Meals", ingredient: node.data.label },
              position: {
                x: node.position.x + 250,
                y: node.position.y,
              },
            };
            setNodes((prevNodes) => [...prevNodes, optionNode]);
            setEdges((prevEdges) => [
              ...prevEdges,
              {
                id: `edge-${nodeId}-${optionNode.id}-${crypto.randomUUID()}`,
                source: nodeId,
                target: optionNode.id,
              },
            ]);
          }
          break;
        }

        default:
          break;
      }
    },
    []
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
      >
        <Background color="black" />
      </ReactFlow>
      {selectedMeal && showSidebar && (
        <Sidebar meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
}

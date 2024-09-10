import {
  Cross2Icon,
  FileIcon,
  GlobeIcon,
  Link1Icon,
  VideoIcon,
} from "@radix-ui/react-icons";

interface SidebarProps {
  meal: {
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    ingredients: string[];
    strTags: string[];
    strCategory?: string;
    strArea?: string;
    strYoutube?: string;
    strSource?: string;
  };
  onClose: () => void;
}

export default function Sidebar({ meal, onClose }: SidebarProps) {
  return (
    <div className="fixed right-0 top-0 h-full bg-white shadow-2xl p-4 w-[35rem] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{meal.strMeal}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <Cross2Icon className="h-6 w-6" />
        </button>
      </div>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded-lg mb-4"
      />

      {meal.strTags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            Tags:
          </h3>
          <div className="flex flex-wrap gap-2">
            {meal.strTags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {meal.strCategory && (
        <p className="mb-2 flex items-center">
          <FileIcon className="mr-2" /> Category: {meal.strCategory}
        </p>
      )}

      {meal.strArea && (
        <p className="mb-2 flex items-center">
          <GlobeIcon className="mr-2" /> Area: {meal.strArea}
        </p>
      )}

      {meal.strYoutube && (
        <p className="mb-2">
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center"
          >
            <VideoIcon className="mr-2" /> Watch on YouTube
          </a>
        </p>
      )}

      {meal.strSource && (
        <p className="mb-4">
          <a
            href={meal.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center"
          >
            <Link1Icon className="mr-2" /> View Recipe Source
          </a>
        </p>
      )}

      <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc pl-5 mb-4">
        {meal.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
      <p className="text-sm">{meal.strInstructions}</p>
    </div>
  );
}

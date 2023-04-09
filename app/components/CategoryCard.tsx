import type { App, Category } from "~/utils/schema";
import AppCard from "./AppCard";

export default function CategoryCard({
  category,
  apps,
}: {
  category: Category;
  apps: App[];
}) {
  return (
    <div
      className="card shadow-xl"
      id={category.id || category.name}
      data-type="category"
      style={
        category.color
          ? { borderColor: category.color, borderWidth: "1px" }
          : {}
      }
    >
      <div className="card-body">
        <h2 className="card-title">{category.name}</h2>
        <div className="w-full grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
          {apps.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
}

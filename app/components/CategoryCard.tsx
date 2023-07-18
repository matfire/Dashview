import { Icon } from "@iconify/react";
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
        <h2 className="card-title space-x-2">
          {category.icon && <Icon icon={category.icon} />}
          {category.name}
        </h2>
        <div className="w-full flex flex-wrap justify-evenly gap-8 mt-2 items-center">
          {apps.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
}

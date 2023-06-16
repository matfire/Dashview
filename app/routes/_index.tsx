import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CategoryCard from "~/components/CategoryCard";
import { readFile } from "~/utils/fs.server";
import configSchema from "~/utils/schema";

export const meta: V2_MetaFunction = () => {
  return [{ title: "DashView" }];
};

export const loader: LoaderFunction = async () => {
  const data = (await readFile(process.env.CONFIG!)).toString();
  const config = configSchema.safeParse(JSON.parse(data));

  if (!config.success) {
    return json(
      {
        message: "could not parse the config file correctly",
        error: config.error,
      },
      { status: 400 }
    );
  }
  return json(config.data);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  if (data?.categories) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.categories.map((cat) => (
          <CategoryCard
            key={cat.id || cat.name}
            category={cat}
            apps={data.apps.filter(
              (e) => e.category === cat.name || e.category === cat.id
            )}
          />
        ))}
      </div>
    );
  }
  if (data.error) {
    return <div>
      <div className="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{data.message}</span>
        </div>
      </div>
      <ul>
        {data.error.issues.map((e) => (
          <li key={e.path.join()} className="p-4">
            <p>{e.message} at {e.path.join("=>")}</p>
          </li>
        ))}
      </ul>
    </div>
  }
}

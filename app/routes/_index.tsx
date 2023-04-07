import { json, LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CategoryCard from "~/components/CategoryCard";
import {readFile}  from "~/utils/fs.server"
import configSchema, { Config } from "~/utils/schema";


export const meta: V2_MetaFunction = () => {
  return [{ title: "DashView" }];
};

export const loader: LoaderFunction = async() => {
  const data = (await readFile(process.env.CONFIG!)).toString();
  const config = configSchema.safeParse(JSON.parse(data))

  if (!config.success) {
    return json({
      message:"could not parse the config file correctly",
      error: config.error
    }, {status: 500})
  }
  return json(config.data)

}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  console.log(data)

  if (data?.categories) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.categories.map((cat) => (
          <CategoryCard key={cat.id || cat.name} category={cat} apps={data.apps.filter((e) => e.category === cat.name || e.category === cat.id)} />
        ))}
      </div>
    )
  }
  if (data.error) {
    <p>something happened, check console</p>
  }
}

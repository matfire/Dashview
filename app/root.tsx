import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { userPrefs } from "./utils/cookie";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet", href: stylesheet
  }
]


export const loader: LoaderFunction = async({request}) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};
  return json({ themeColor: cookie.themeColor });
}


export default function App() {
  const {themeColor} = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body data-theme={themeColor || "dark"}>
        <Header />
        <main className="mt-4">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

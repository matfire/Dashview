import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect, useState } from "react"
import { userPrefs } from "~/utils/cookie";
import themes from "~/utils/themes.json"



export const loader: LoaderFunction = async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookie =
        (await userPrefs.parse(cookieHeader)) || {};
    return json({ themeColor: cookie.themeColor });
}

export const action: ActionFunction = async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookie =
        (await userPrefs.parse(cookieHeader)) || {};
    const bodyParams = await request.formData();
    cookie.themeColor = bodyParams.get("themeColor")

    return redirect("/settings", {
        headers: {
            "Set-Cookie": await userPrefs.serialize(cookie),
        },
    });
}




export default function Settings() {
    const { themeColor } = useLoaderData<typeof loader>();
    const transition = useTransition()
    const [theme, setTheme] = useState(themeColor || "");
    useEffect(() => {
        setTheme(themeColor || document?.documentElement?.getAttribute("data-theme") || "dark")
    }, [])

    const handleThemeChange = (ev) => {
        setTheme(ev.target.value)
        console.log(ev)
        document.documentElement.setAttribute("data-theme", ev.target.value)
    }
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Form method="POST">
                <div>
                    <select className="select" name="themeColor" id="themeColor" value={theme} onChange={handleThemeChange}>
                        {themes.map((e) => (<option key={e} >{e}</option>))}
                    </select>
                </div>
                <button disabled={transition.state === "submitting"} type="submit" className="btn btn-primary">            {transition.state === "submitting"
              ? "Saving..."
              : "Save"}</button>
            </Form>
        </div>
    )
}
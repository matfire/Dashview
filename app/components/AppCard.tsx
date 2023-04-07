import { useEffect, useState } from "react";
import { App } from "~/utils/schema";

export default function AppCard({app}: {app: App}) {
    const [timeout, setTimeoutValue] = useState<NodeJS.Timer | null>(null)
    const [offline, setOffline] = useState(true)
    
    const checkAvailability = async() => {
        try {
            const res = await fetch(app.url, {method:"head", mode:"no-cors"})
            setOffline(!((res.status >= 200 && res.status <= 400) || res.status === 0))
        } catch (error) {
            console.error(error)
            setOffline(true)
        }
    }

    useEffect(() => {
        if (!timeout) {
            setTimeoutValue(setInterval(checkAvailability, 1000));
        }
        return () => {
            if (timeout) {
                clearInterval(timeout)
            }
        }
    }, [])

    return (
        <div className="indicator" id={app.category ? `${app.category}-${app.name}` : app.name}>
            <span className={`indicator-item badge ${offline ? "badge-error" : "badge-success"} animate-pulse`}></span>
            <div className="flex justify-between p-4 min-h-8 shadow-md bg-neutral-800">
                {app.icon && <h1>Icon Here</h1>}
                {app.name}
                <a target="_blank" href={app.url}>&rarr;</a>
            </div>
        </div>
    )
}
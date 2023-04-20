import { useEffect, useState } from "react";
import type { App } from "~/utils/schema";

export default function AppCard({ app }: { app: App }) {
  const [timeout, setTimeoutValue] = useState<NodeJS.Timer | null>(null);
  const [offline, setOffline] = useState(true);

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const res = await fetch(app.url, { method: "head", mode: "no-cors" });
        setOffline(
          !((res.status >= 200 && res.status <= 400) || res.status === 0)
        );
      } catch (error) {
        console.error(error);
        setOffline(true);
      }
    };
    if (!timeout) {
      setTimeoutValue(setInterval(checkAvailability, 1000));
    }
    return () => {
      if (timeout) {
        clearInterval(timeout);
      }
    };
  }, [timeout, app.url]);

  return (
    <div
      className="indicator"
      id={app.category ? `${app.category}-${app.name}` : app.name}
    >
      <span
        className={`indicator-item badge ${
          offline ? "badge-error" : "badge-success"
        } animate-pulse`}
      ></span>
      <div className="flex justify-between p-4 min-h-8 shadow-md bg-neutral">
        {app.icon && <h1>Icon Here</h1>}
        <p className="text-neutral-content">{app.name}</p>
        <a target="_blank" href={app.url} rel="noreferrer">
          &rarr;
        </a>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function Calendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#000000" } },
      });
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Calendar</h1>
      <div className="w-full min-h-[600px]">
        <Cal
          calLink="your-organization"
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
          config={{ layout: "month_view" }}
        />
      </div>
    </div>
  );
}

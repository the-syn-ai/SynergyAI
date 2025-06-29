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
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Schedule a Call</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Book a free intro call to discuss how we can help automate your business
        </p>
        <div className="w-full min-h-[700px] rounded-lg border bg-card">
          <Cal
            calLink="synai-automations-i329dt/intro-call"
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
            config={{ layout: "month_view" }}
          />
        </div>
      </div>
    </div>
  );
}
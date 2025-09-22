import { Suspense } from "react";
import Analysis from "@/components/Analysis";

const AnalysisPage = () => {
  return (
    <Suspense fallback={<div>Loading . . .</div>}>
      <Analysis />
    </Suspense>
  );
};

export default AnalysisPage;

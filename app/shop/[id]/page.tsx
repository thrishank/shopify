import React from "react";
import CTA from "@/components/CTA";

function page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <div>
      <CTA id={id} />
    </div>
  );
}

export default page;

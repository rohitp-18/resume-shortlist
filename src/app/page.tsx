"use client";

import { JobsContext } from "@/components/contextProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

export default function Home() {
  const navigate = useRouter();
  return (
    <>
      <main>
        <div className="container flex justify-center items-center flex-col mx-auto p-4 bg-gray-100 min-h-screen">
          <h1 className="text-4xl text-center font-bold mb-4">
            AI Resume Selector
          </h1>
          <p className="text-lg mb-6 text-center">
            Welcome to the AI Resume Selector. This website helps you find the
            best job matches based on your resume using advanced AI algorithms.
          </p>
          <div className="flex space-x-4">
            <Button
              onClick={() => navigate.push("/jobs")}
              variant={"outline"}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Jobs
            </Button>
            <Button
              onClick={() => navigate.push("/short")}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Resume Shortlist
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

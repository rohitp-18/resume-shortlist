"use client";

import axios from "axios";
import React, { createContext, useState, ReactNode, useEffect } from "react";

export interface Job {
  id: number;
  name: string;
  description: string;
  perk: string[];
  location: string;
  salary: number;
  company: string;
}

interface JobsContextProps {
  jobs: Job[];
  addJob: (job: Job) => void;
  setJobs: (job: Job[]) => void;
}

const JobsContext = createContext<JobsContextProps | undefined>(undefined);

const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob = (job: Job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };

  useEffect(() => {
    // Example: Fetching data from Pinecone
    (async () => {
      const { data } = await axios.get("/api/v1/pine/");
      setJobs(data.map((job: any) => ({ id: job.id, ...job.metadata })));
    })();
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, addJob, setJobs }}>
      {children}
    </JobsContext.Provider>
  );
};

export { JobsProvider, JobsContext };

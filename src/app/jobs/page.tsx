"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/appSidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import JobCard from "@/components/jobCard";
import { Dialog } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import JobDescription from "@/components/jodDescription";
import Applyform from "@/app/interships/applyform";
import { Job, JobsContext } from "@/components/contextProvider";

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [apply, setApply] = React.useState(false);
  const [job, setJob] = React.useState(null);
  const [tempJobs, setTempJobs] = React.useState<Job[]>([]);
  const [name, setName] = React.useState("");
  const [filters, setFilters] = React.useState({
    location: "",
    role: "",
    type: "",
    stipend: "0",
  });
  const [skills, setSkills] = React.useState<string[]>([]);

  const jobsContext = React.useContext(JobsContext);
  if (!jobsContext) {
    return <div>Error: JobsContext is undefined</div>;
  }
  const { jobs } = jobsContext;

  function handleClick(job: any) {
    setOpen(true);
    setJob(job);
  }

  useEffect(() => {
    if (jobs) {
      setTempJobs(jobs);
    }
  }, [jobs]);

  React.useEffect(() => {
    const filteredJobs = jobs.filter((job: any) => {
      if (
        filters.location &&
        filters.location !== "all" &&
        job.location !== filters.location
      ) {
        return false;
      }
      if (filters.role && filters.role !== "all" && job.role !== filters.role) {
        return false;
      }
      if (
        filters.stipend &&
        filters.stipend !== "all" &&
        job.stipend < filters.stipend
      ) {
        return false;
      }
      if (skills.length) {
        const jobskills = job.skills.map((skill: any) => skill.value);
        if (!skills.some((skill) => jobskills.includes(skill))) {
          return false;
        }
      }
      // if (name) {
      return job.name.toLowerCase().includes(name.toLowerCase());
      // }
      // return true;
    });
    setTempJobs(filteredJobs);
  }, [filters, skills, name, jobs]);

  useEffect(() => {
    setTempJobs(
      jobs.filter((job) => job.name.toLowerCase().includes(name.toLowerCase()))
    );
  }, [name, jobs]);
  return (
    <main className="max-w-[1080px] py-10 bg-[#f8f8f8] dark:bg-[#202020] mx-auto relative">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "19rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar
          name={name}
          tempJobs={tempJobs}
          jobs={jobs}
          setTempJobs={setTempJobs}
          skills={skills}
          setSkills={setSkills}
          filters={filters}
          setFilters={setFilters}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 md:flex-row flex-col justify-between items-center gap-2 px-4">
            <h1 className="text-2xl font-bold">Jobs</h1>
            <div className="relative">
              <Input
                placeholder="Search"
                className="pl-9 max-w-[80vw] min-w-[300px]"
                type="search"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Search className="absolute top-1/2 left-2 opacity-90 transform -translate-y-1/2 w-4 h-4 text-muted text-black dark:text-white" />
            </div>
          </header>
          <Separator className="pl-2" />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex flex-col gap-4"></div>
            {tempJobs.map((job) => (
              <Card
                className="flex flex-col gap-4"
                onClick={() => handleClick(job)}
                key={job.id}
              >
                <JobCard job={job} />
              </Card>
            ))}
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <JobDescription setApply={setApply} />
      </Dialog>
      <Dialog open={apply} onOpenChange={() => setApply(false)}>
        <Applyform job={job} setOpen={setApply} />
      </Dialog>
    </main>
  );
}

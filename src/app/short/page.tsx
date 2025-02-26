"use client";

import { Job, JobsContext } from "@/components/contextProvider";
import JobCard from "@/components/jobCard";
import { Card } from "@/components/ui/card";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function Page() {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [tempJobs, setTempJobs] = React.useState<Job[]>([]);
  const [name, setName] = React.useState("");

  const jobsContext = React.useContext(JobsContext);
  if (!jobsContext) {
    return <div>Error: JobsContext is undefined</div>;
  }
  const { jobs } = jobsContext;

  async function handleClick(job: any) {
    setOpen(true);
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/short/", {
        description: job.description,
        company: job.id,
      });
      const { result } = response.data;
      setUsers(
        result.matches.map((user: any) => ({
          id: user.id,
          score: user.score,
          ...user.metadata,
        }))
      );
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (jobs) {
      setTempJobs(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    const temp2 = jobs.filter((job) => {
      return job.name.toLowerCase().includes(name.toLowerCase());
    });
    setTempJobs(temp2);
  }, [name, jobs]);
  return (
    <>
      <main>
        <section className="flex mx-auto py-10 max-w-[1080px] flex-col gap-5 justify-center items-center">
          <h1 className="text-3xl font-bold">All Jobs</h1>
          <div className="relative">
            <Input
              placeholder="Search"
              className="pl-9 max-w-[80vw] min-w-[300px]"
              type="search"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Search className="absolute top-1/2 left-2 opacity-90 transform -translate-y-1/2 w-4 text-black h-4 text-muted dark:text-white" />
          </div>
          <div className="w-full flex flex-col gap-5">
            {/* Render jobs here */}
            {tempJobs.map((job) => (
              <Card key={job.id} className="" onClick={() => handleClick(job)}>
                <JobCard job={job} />
              </Card>
            ))}
          </div>
        </section>
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Users who applied to this job</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">id</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="min-h-40">
                    {users.map((user: any) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="text-right">
                          {user.score}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>
                        Total {users.length} users
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}

export default Page;

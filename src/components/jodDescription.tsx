"use client";

import React from "react";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Banknote, Calendar, Clock, Hourglass, MapPin } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function JodDescription({
  setApply,
  job,
}: {
  setApply: React.Dispatch<React.SetStateAction<boolean>>;
  job: any;
}) {
  return (
    <>
      {job && (
        <DialogContent
          style={{ scrollbarWidth: "none" }}
          className="m-2 overflow-y-auto py-5 max-h-[95vh] md:min-w-[700px] min-w-[95vw]"
        >
          <DialogHeader>
            <DialogTitle className="text-lg mb-0">{job.name}</DialogTitle>
            <p
              style={{ marginTop: "0", marginBottom: "10px" }}
              className="opacity-80 mb-2"
            >
              {job.company}
            </p>

            <div className="flex md:flex-row flex-col mt-1 md:gap-8 gap-4">
              <div className="flex gap-2 opacity-95 items-center">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex gap-2 opacity-95 items-center">
                <Calendar className="w-4 h-4" />
                <span>3 Months</span>
              </div>
              <div className="flex gap-2 opacity-95 items-center">
                <Banknote className="w-4 h-4" />
                <span>$ {job.salary}</span>
              </div>
              <div className="flex gap-2 opacity-95 items-center">
                <Hourglass className="w-4 h-4" />
                <span>Apply by 33 Mar 2025</span>
              </div>
            </div>
            <div className="flex items-center w-28 mt-3 px-2 gap-2 rounded-md bg-blue-50">
              <Clock color="blue" className="w-3 h-3" />
              <span className="text-blue-500 text-sm">2 days ago</span>
            </div>
            <Separator className="mt-4" />
            <section className="pt-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Descriptions</h2>
                <p className="text-sm opacity-80">{job.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Skill's Required</h2>
                <div className="text-sm opacity-80 flex flex-wrap gap-2">
                  {job.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant={"secondary"}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Who Can Apply:</h2>
            <p className="text-sm opacity-80">
              Only those candidates can apply who:
            </p>
            <ul className="list-disc list-inside text-sm opacity-80">
              <li>are available for full time (in-office) internship</li>
              <li>
                can start the internship between 1st Jan'22 and 31st Jan'22
              </li>
              <li>are available for duration of 3 months</li>
              <li>have relevant skills and interests</li>
            </ul>
          </div> */}
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Perks</h2>
                <div className="flex flex-wrap gap-2">
                  {job.perks.map((perk: string, index: number) => (
                    <Badge key={index} variant={"secondary"}>
                      {perk}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">About Company name</h2>
                <p className="text-sm opacity-80">{job.about}</p>
              </div>
              <Separator />
              <div className="flex gap-4 justify-end">
                <Button
                  onClick={() => setApply(true)}
                  className="btn btn-primary"
                >
                  Apply Now
                </Button>
              </div>
            </section>
          </DialogHeader>
        </DialogContent>
      )}
    </>
  );
}

export default JodDescription;

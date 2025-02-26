import { Banknote, Building2, Calendar, Clock, MapPin } from "lucide-react";
import React from "react";
import { CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

function JobCard({ job }: any) {
  return (
    <CardContent>
      <div className="flex gap-4 my-2 items-center pb-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            <Building2 className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{job.name || "Title"}</h2>
          <p className="text-sm opacity-80">{job.company || "Company name"}</p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col mt-1 md:gap-8 gap-4">
        <div className="flex gap-2 items-center">
          <MapPin className="w-4 h-4" />
          <span>{job.loading || "Location"}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Calendar className="w-4 h-4" />
          <span>{job.duration || "3 Months"}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Banknote className="w-4 h-4" />
          <span>₹{job.salary || "1000"}</span>
        </div>
      </div>

      <Badge variant={"secondary"} className="mt-4 gap-2 px-2 py-1">
        <Clock className="w-4 h-4" />
        <span>2 days ago</span>
      </Badge>
    </CardContent>
  );
}

export default JobCard;

"use client";

import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { toast } from "sonner";

function Applyform({ job, setOpen }: any) {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("email", email);

      const data = await fetch("/api/v1/pine/", {
        method: "POST",
        body: file,
      });

      const res = await data.json();

      const { text } = res;

      const { data: response } = await axios.post("/api/v1/apply", {
        id: self.crypto.randomUUID(),
        name,
        email,
        text,
        company: job.id,
      });

      setOpen(false);
      toast("Form submitted successfully");
    } catch (error) {
      toast("Error submitting form");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DialogContent
      style={{ scrollbarWidth: "none" }}
      className="sm:mix-w-full overflow-y-auto py-5 max-h-[95vh] min-w-[500px]"
    >
      <DialogHeader>
        <DialogTitle className="text-lg mb-0">Job Title</DialogTitle>
      </DialogHeader>
      <section className="pt-6 flex flex-col gap-6">
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email address"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="resume">Resume</Label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              id="resume"
              className="input"
              required
              placeholder="Upload your resume"
            />
          </div>

          <Button type="submit" className="w-full self-end">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </section>
    </DialogContent>
  );
}

export default Applyform;

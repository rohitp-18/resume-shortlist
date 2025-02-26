"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MultiSelect } from "./multiSelect";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [skills, setSkills] = React.useState<string[]>([]);
  const [about, setAbout] = React.useState("");
  const [perks, setPerks] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      // await fetch("/api/v1/jobs", {
      //   method: "POST",
      //   body: formData,
      // });
      await axios.post("/api/v1/jobs", {
        id: self.crypto.randomUUID(),
        name,
        company,
        location,
        salary,
        description,
        skills,
        about,
        perks,
      });
      setOpen(false);
      setName("");
      setCompany("");
      setLocation("");
      setSalary("");
      setDescription("");
      setSkills([]);
      setAbout("");
      setPerks([]);

      toast.success("Job created successfully");
    } catch (error) {
      toast.error("Error creating job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <nav className="sticky top-0 z-50 left-0 w-full bg-opacity-20 backdrop-blur-md shadow-md p-4 flex justify-between items-center bg-background/40 dark:shadow-lg">
      <section className="max-w-6xl mx-auto flex items-center justify-between w-full space-x-4">
        <h2 className="text-xl font-bold italic">
          <a href="/">
            <span className="text-green-800">AI</span>
            <span className="text-red-800">JOBS</span>
          </a>
        </h2>

        <div className="md:flex hidden md:gap-5 gap-2 space-x-6">
          <a
            href="/"
            className={`no-underline hover:underline j=hidden md:flex flex-col items-center ${
              pathname === "/" ? "font-bold" : ""
            }`}
          >
            Home
          </a>
          <a
            href="/jobs"
            className={`no-underline hover:underline flex flex-col items-center ${
              pathname === "/jobs" ? "font-bold" : ""
            }`}
          >
            Jobs
          </a>
          <a
            href="/interships"
            className={` no-underline hover:underline hidden md:flex flex-col items-center ${
              pathname === "/interships" ? "font-bold" : ""
            }`}
          >
            Interships
          </a>
          <a
            href="/short"
            className={` no-underline hover:underline flex flex-col items-center ${
              pathname === "/short" ? "font-bold" : ""
            }`}
          >
            Resume shortlist
          </a>

          <Button className="md:flex hidden" onClick={() => setOpen(true)}>
            Create Job
          </Button>

          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() =>
              theme === "light" ? setTheme("dark") : setTheme("light")
            }
            className="md:flex hidden"
          >
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button className="md:hidden" onClick={() => setOpen(true)}>
            Create Job
          </Button>

          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() =>
              theme === "light" ? setTheme("dark") : setTheme("light")
            }
            className="md:hidden"
          >
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Drawer>
            <DrawerTrigger>
              <Menu className="h-6 w-6" />
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4 flex flex-col justify-center">
                <a
                  href="/"
                  className={`block py-2 ${
                    pathname === "/" ? "font-bold" : ""
                  }`}
                >
                  Home
                </a>
                <a
                  href="/jobs"
                  className={`block py-2 ${
                    pathname === "/jobs" ? "font-bold" : ""
                  }`}
                >
                  Jobs
                </a>
                <a
                  href="/interships"
                  className={`block py-2 ${
                    pathname === "/interships" ? "font-bold" : ""
                  }`}
                >
                  Interships
                </a>
                <a
                  href="/short"
                  className={`block py-2 ${
                    pathname === "/short" ? "font-bold" : ""
                  }`}
                >
                  Resume shortlist
                </a>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
          <DialogContent
            style={{ scrollbarWidth: "none" }}
            className="overflow-y-auto py-5 max-h-[95vh] min-w-[500px]"
          >
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Create Job
              </DialogTitle>
            </DialogHeader>
            <section className="p-4 flex flex-col gap-4">
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Roll Name</Label>
                  <Select onValueChange={(e) => setName(e)} value={name}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="e.g., Web Developer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-developer">
                        Web Developer
                      </SelectItem>
                      <SelectItem value="software-engineer">
                        Software Engineer
                      </SelectItem>
                      <SelectItem value="data-scientist">
                        Data Scientist
                      </SelectItem>
                      <SelectItem value="product-manager">
                        Product Manager
                      </SelectItem>
                      <SelectItem value="ux-designer">UX Designer</SelectItem>
                      <SelectItem value="qa-engineer">QA Engineer</SelectItem>
                      <SelectItem value="devops-engineer">
                        DevOps Engineer
                      </SelectItem>
                      <SelectItem value="mobile-developer">
                        Mobile Developer
                      </SelectItem>
                      <SelectItem value="system-administrator">
                        System Administrator
                      </SelectItem>
                      <SelectItem value="database-administrator">
                        Database Administrator
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <Input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="Enter your full name"
                  /> */}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    type="text"
                    id="company"
                    required
                    onChange={(e) => setCompany(e.target.value)}
                    className="input"
                    placeholder="Enter your company name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={location}
                    onValueChange={(e) => setLocation(e)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="e.g., Pune" />
                    </SelectTrigger>
                    <SelectContent
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="kolkata">Kolkata</SelectItem>
                      <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                      <SelectItem value="jaipur">Jaipur</SelectItem>
                      <SelectItem value="work-from-home">
                        Work from Home
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    type="text"
                    id="salary"
                    required
                    onChange={(e) => setSalary(e.target.value)}
                    className="input"
                    placeholder="Enter your salary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    required
                    rows={2}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input"
                    placeholder="Enter your job description"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="skills">Skills</Label>
                  <MultiSelect
                    options={[
                      { value: "html", label: "HTML" },
                      { value: "css", label: "CSS" },
                      { value: "javascript", label: "JavaScript" },
                      { value: "react", label: "React" },
                      { value: "node", label: "Node.js" },
                      { value: "typescript", label: "TypeScript" },
                      { value: "figma", label: "Figma" },
                      { value: "adobe-xd", label: "Adobe XD" },
                      { value: "sketch", label: "Sketch" },
                      { value: "invision", label: "InVision" },
                    ]}
                    value={skills}
                    onValueChange={setSkills}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    rows={2}
                    id="about"
                    required
                    onChange={(e) => setAbout(e.target.value)}
                    className="input"
                    placeholder="Enter about"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="perks">Perks</Label>
                  <MultiSelect
                    options={[
                      { value: "free-lunch", label: "Free Lunch" },
                      { value: "work-from-home", label: "Work from Home" },
                      { value: "part-time", label: "Part Time" },
                      { value: "flexible-hours", label: "Flexible Hours" },
                      { value: "health-insurance", label: "Health Insurance" },
                      { value: "paid-time-off", label: "Paid Time Off" },
                      { value: "remote", label: "Remote" },
                      { value: "stock-options", label: "Stock Options" },
                      { value: "training", label: "Training" },
                    ]}
                    value={perks}
                    onValueChange={setPerks}
                  />
                </div>
                <Button type="submit" className="w-full self-end">
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </section>
          </DialogContent>
        </Dialog>
      </section>
    </nav>
  );
};

export default Navbar;

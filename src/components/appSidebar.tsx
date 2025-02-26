import * as React from "react";
import { Filter } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { MultiSelect } from "./multiSelect";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  tempJobs: any;
  setTempJobs: (jobs: any) => void;
  jobs: any;
  name: string;
  skills: string[];
  filters: any;
  setFilters: (filters: any) => void;
  setSkills: (skills: string[]) => void;
}

export function AppSidebar({
  tempJobs,
  setTempJobs,
  jobs,
  name,
  filters,
  setFilters,
  skills,
  setSkills,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar className="md:flex hidden" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <Filter className="w-7 h-7" />
                <span className="ml-2 font-bold">AI JOBS</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent style={{ scrollbarWidth: "none" }}>
        <SidebarGroup>
          <SidebarMenu className="gap-4">
            <>
              <div>
                <Label className="font-bold text-md mb-1">Profile</Label>
                <Select
                  onValueChange={(e) => setFilters({ ...filters, role: e })}
                  value={filters.role}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="e.g., Web Developer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="web-developer">Web Developer</SelectItem>
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
              </div>
              <div>
                <Label className="font-bold text-md mb-1">Location</Label>
                <Select
                  onValueChange={(e) => setFilters({ ...filters, location: e })}
                  value={filters.location}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="e.g., Pune" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                    <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                    <SelectItem value="jaipur">Jaipur</SelectItem>
                    <SelectItem value="work-home">Work from Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3 mt-3">
                <div>
                  <Checkbox
                    id="work-home"
                    onChange={() =>
                      filters.location === "work-home"
                        ? setFilters({ ...filters, location: "all" })
                        : setFilters({ ...filters, location: "work-home" })
                    }
                    onCheckedChange={() =>
                      filters.location === "work-home"
                        ? setFilters({ ...filters, location: "all" })
                        : setFilters({ ...filters, location: "work-home" })
                    }
                    checked={filters.location === "work-home"}
                  />
                  <Label htmlFor="work-home" className="ml-2">
                    Work from Home
                  </Label>
                </div>
                <div>
                  <Checkbox id="part-time" />
                  <Label htmlFor="part-time" className="ml-2">
                    Part Time
                  </Label>
                </div>
              </div>
              <div>
                <Label className="font-bold text-md mb-1">
                  Desired minimun stipend
                </Label>
                <Select
                  onValueChange={(e) => setFilters({ ...filters, stipend: e })}
                  value={filters.stipend}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="e.g., 1000" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="1000">1000</SelectItem>
                    <SelectItem value="2000">2000</SelectItem>
                    <SelectItem value="5000">5000</SelectItem>
                    <SelectItem value="10000">10000</SelectItem>
                    <SelectItem value="15000">15000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-bold text-md mb-1">Skills</Label>
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
                  onValueChange={(e) => setSkills(e)}
                />
              </div>
            </>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaHandPointRight, FaSearch } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaFileAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Loader from "@/app/Loader";
import { useToast } from "@/components/ui/use-toast";
const Page = () => {
  const [complain, setComplain] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [date, setDate] =
    useState(
      {
        from: new Date(2023, 0, 20),
        to: addDays(new Date(2023, 0, 20), 20),
      });
  const handlefilter = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/admincomplainfilter?from=${date.from}&to=${date.to}`
      );
      const data = await res.data;
      setComplain(data.allComplain);
      setLoading(false);
      console.log(complain)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleLoad = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/adminallclosecomplain");
      const data = await res.data;
      setComplain(data.allComplain);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className=" absolute top-4 right-4">
        <Sheet>
          <SheetTrigger className=" bg-[#cd393e] w-10 h-10 flex justify-center items-center rounded-full">
            <RxHamburgerMenu size={20} color="white" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className={"text-center"}>Admin Dashboard</SheetTitle>
            </SheetHeader>
            <SheetDescription
              className={
                "flex mt-10 flex-col justify-center items-center gap-2"
              }
            >
              <Link href={"/dashboard"}>
                <Button
                  className={
                    "bg-[#cd393e] flex justify-center items-center gap-2"
                  }
                >
                  <MdSpaceDashboard />
                  Dashboard
                </Button>
              </Link>
              <Link href={"/complain"}>
                <Button
                  className={
                    "bg-[#cd393e] flex justify-center items-center gap-2"
                  }
                >
                  <FaFileAlt />
                  All Complain
                </Button>
              </Link>
              <Button
                className={
                  "bg-[#cd393e] flex justify-center items-center gap-2"
                }
              >
                <FaHandPointRight />
                Close Complain
              </Button>
              <Link href={"/users"}>
                <Button
                  className={
                    "bg-[#cd393e] flex justify-center items-center gap-2"
                  }
                >
                  <ImProfile />
                  All Users
                </Button>
              </Link>
              <Link href={"/closecomplain"}></Link>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex justify-center gap-2 items-center p-3">
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          </div>
        <Button onClick={handlefilter}>
          <FaSearch />
        </Button>
      </div>
      <Table className="w-[90%]  m-auto">
        <TableCaption>Active Complain</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S No.</TableHead>
            <TableHead>Flat No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Complain</TableHead>
            <TableHead>View Detail</TableHead>
            <TableHead>Was Assigned To</TableHead>
            <TableHead>Catogery</TableHead>
            <TableHead className={"text-center"}>Open Date/Time</TableHead>
            <TableHead className={"text-center"}>Close Date/Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complain.length > 0 &&
            complain.map((complain, index) => (
              <TableRow key={complain._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{complain.flatno}</TableCell>
                <TableCell>{complain.title}</TableCell>
                <TableCell>
                  {complain.complain.substring(0, 100)}
                  {complain.complain.length > 100 ? "...readmore" : ""}
                </TableCell>

                <Dialog>
                  <TableCell>
                    <DialogTrigger>
                      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50">
                        Detail
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className={"text-slate-500 text-left"}>
                        <DialogTitle className="text-black">
                          Flat no:{" "}
                          <div className=" text-base text-slate-500 ">
                            {complain.flatno}
                          </div>
                        </DialogTitle>
                        <div className=" font-semibold text-black">Title:</div>
                        {complain.title}
                      </DialogHeader>
                      <DialogDescription
                        className={"text-slate-500 flex gap-5 flex-col"}
                      >
                        <div className=" font-semibold text-black">
                          Complain:
                        </div>
                        <div className="w-[300px] break-words">
                          {complain.complain}
                        </div>
                        <div className="flex justify-center">
                          {complain.image.url && (
                            <Image
                              src={complain.image?.url || ""}
                              width={200}
                              height={200}
                              alt="image"
                            />
                          )}
                        </div>
                      </DialogDescription>
                      <DialogFooter
                        className={
                          "text-slate-500 flex flex-col justify-center items-center gap-2 "
                        }
                      >
                        <div className="flex gap-2 p-4">
                          <div>
                            {complain.category[0].toUpperCase() +
                              complain.category.substring(1)}
                          </div>
                          <div>
                            {complain.status[0].toUpperCase() +
                              complain.status.substring(1)}
                          </div>
                        </div>
                        <DialogClose>
                          <Button>Close</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </TableCell>
                </Dialog>
                <TableCell>{complain.assigned}</TableCell>
                <TableCell>
                  {complain.category[0].toUpperCase() +
                    complain.category.substring(1)}
                </TableCell>
                <TableCell className={"text-center gap-1 "}>
                  <div className="flex justify-center gap-1">
                    {new Date(complain.createdAt).getHours() < 12
                      ? new Date(complain.createdAt).getHours()
                      : new Date(complain.createdAt).getHours() - 12}
                    :{new Date(complain.createdAt).getMinutes()}
                    {new Date(complain.createdAt).getHours() < 12 ? (
                      <div>am</div>
                    ) : (
                      <div>pm</div>
                    )}
                  </div>
                  <div>
                    {new Date(complain.createdAt).getDate()}/
                    {new Date(complain.createdAt).getMonth()}/
                    {new Date(complain.createdAt).getFullYear()}
                  </div>
                </TableCell>
                <TableCell className=" text-center w-full flex flex-col  justify-center items-center gap-1">
                  <div className="flex gap-1">
                    {new Date(complain.closeTime).getHours() < 12
                      ? new Date(complain.closeTime).getHours()
                      : new Date(complain.closeTime).getHours() - 12}
                    :{new Date(complain.closeTime).getMinutes()}
                    {new Date(complain.closeTime).getHours() < 12 ? (
                      <div>am</div>
                    ) : (
                      <div>pm</div>
                    )}
                  </div>
                  <div>
                    {new Date(complain.closeTime).getDate()}/
                    {new Date(complain.closeTime).getMonth()}/
                    {new Date(complain.closeTime).getFullYear()}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Page;

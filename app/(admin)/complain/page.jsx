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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImProfile } from "react-icons/im";
import { FaFileAlt, FaHandPointRight } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Loader from "@/app/Loader";
const Page = () => {
  const [complain, setComplain] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const staffs = [
    {
      value: "Govind",
      label: "Govind",
    },
    {
      value: "R. V. Rao",
      label: "R. V. Rao",
    },
    {
      value: "Bablu",
      label: "Bablu",
    },
    {
      value: "Upender",
      label: "Upender",
    },
    {
      value: "Rakesh",
      label: "Rakesh",
    },
    {
      value: "Satyam barik",
      label: "Satyam barik",
    },
    {
      value: "Manbodh",
      label: "Manbodh",
    },
    {
      value: "Sukdev",
      label: "Sukdev",
    },
    {
      value: "Ban singh",
      label: "Ban singh",
    },
    {
      value: "Ashish",
      label: "Ashish",
    },
    {
      value: "Mantu",
      label: "Mantu",
    },
  ];
  const handleAssign = async (id, assigned) => {
    try {
      setLoading(true);
      const res = await axios.put("/api/adminassign", {
        id,
        assigned,
      });
      const data = await res.data;
      setLoading(false);
      if (data.success) {
        toast({
          variant: "default",
          title: data.message,
        });
      }
      if (!data.success) {
        toast({
          variant: "destructive",
          title: data.message,
        });
      }
      handleLoad();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = async (id, e) => {
    try {
      setLoading(true);
      const res = await axios.put("/api/adminupdatestatus", { id, e });
      const data = await res.data;
      setLoading(false);
      if (data.success) {
        toast({
          variant: "default",
          title: data.message,
        });
      }
      if (!data.success) {
        toast({
          variant: "destructive",
          title: data.message,
        });
      }
      handleLoad();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleLoad = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/adminallcomplain");
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
              <Link href={"/closecomplain"}>
                <Button
                  className={
                    "bg-[#cd393e] flex justify-center items-center gap-2"
                  }
                >
                  <FaHandPointRight />
                  Close Complain
                </Button>
              </Link>
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
            </SheetDescription>
          </SheetContent>
        </Sheet>
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
            <TableHead>Catogery</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
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
                <TableCell>
                  {complain.category[0].toUpperCase() +
                    complain.category.substring(1)}
                </TableCell>
                <TableCell className=" text-center w-full flex justify-center items-center gap-5">
                  <Select
                    value={complain.status}
                    disabled={loading}
                    onValueChange={(e) => handleChange(complain._id, e)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={complain.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="w-[200px]">
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="close">Close</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                {complain.status === "processing" ? (
                  <TableCell>
                    <Select
                      value={complain.assigned}
                      disabled={loading}
                      onValueChange={(e) => handleAssign(complain._id, e)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={"Assign Please"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="w-[200px]">
                          <SelectLabel>Assign Please</SelectLabel>
                          {staffs.map((staff, index) => (
                            <SelectItem key={index} value={staff.value}>
                              {staff.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                ) : (
                  <div></div>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Page;

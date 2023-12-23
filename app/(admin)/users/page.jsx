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
import { ImProfile } from "react-icons/im";
import { FaFileAlt, FaHandPointRight } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/app/Loader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { toast } = useToast();
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/admindeleteuser", { id });
      const data = await res.data;
      setLoading(false);
      handleLoad();
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = async (e, id) => {
    try {
      setLoading(true);
      const res = await axios.put("/api/adminupdaterole", { e, id });
      const data = await res.data;
      setLoading(false);
      handleLoad();
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleLoad = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/adminallusers");
      const data = await res.data;
      setUsers(data.alluser);
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
        <TableCaption>Active user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S No.</TableHead>
            <TableHead>Flat No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone No.</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className={"text-center"}>Delete User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user, index) => (
              <TableRow key={user._id}>
                <Dialog>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{user.flatno}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phno}</TableCell>
                  <TableCell>
                    <Select
                      disabled={loading}
                      onValueChange={(e) => {
                        handleChange(e, user._id);
                      }}
                      value={user.role}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Change Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className={"text-center"}>
                    <DialogTrigger>
                      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader
                        className={"p-2 flex justify-center items-center"}
                      >
                        <Button
                          onClick={() => {
                            handleDelete(user._id);
                          }}
                          className={"w-[60%]"}
                        >
                          Comfirm To Delete User
                        </Button>
                      </DialogHeader>
                    </DialogContent>
                  </TableCell>
                </Dialog>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Page;

"use client";
import React, { useEffect, useState } from "react";
import BottomNavbar from "../../Components/BottomNavbar";
import ProfileCardComponent from "../../Components/ProfileCardComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import Loader from "@/app/Loader";
const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLaoding] = useState(false);
  const handleLoad = async () => {
    try {
      setLaoding(true);
      const res = await axios.get("/api/profile");
      const data = await res.data;
      setLaoding(false);
      setName(data.userName);
      setEmail(data.userEmail);
    } catch (error) {
      console.log(error);
    } finally {
      setLaoding(false);
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className=" m-auto w-full">
      <div className="w-[90%] m-auto flex flex-col gap-4">
        <ProfileCardComponent
          name={name ? name : "User Name"}
          email={email ? email : "User Email"}
        />
        {/* <Card>
          <CardHeader className={"flex gap-2"}>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription className={"flex gap-6 py-2"}>
              <Link href={"/instagram"}>
                <FaInstagram size={27} />
              </Link>
              <Link href={"/instagram"}>
                <FaFacebook size={27} />
              </Link>
              <Link href={"/instagram"}>
                <SiGmail size={27} />
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className={"flex justify-end"}>
            <Dialog>
              <DialogTrigger className="border inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border-input bg-background hover:bg-accent hover:text-accent-foreground">
                Rate us
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Rate Us</DialogHeader>
                <DialogContent></DialogContent>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <div className="w-full flex justify-center">
          <BottomNavbar />
        </div> */}
      </div>
    </div>
  );
};

export default Page;

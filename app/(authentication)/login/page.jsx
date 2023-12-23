"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/app/Loader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const Page = () => {
  const [emailOrPhoneNo, setEmailOrPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const login = async () => {
    try {
      const type = document.getElementById("email");
      let res;
      setLoading(true);
      if (type.getAttribute("type") == "number") {
        res = await axios.post("/api/login", {
          phno: emailOrPhoneNo,
          password,
        });
      } else {
        res = await axios.post("/api/login", {
          email: emailOrPhoneNo,
          password,
        });
      }
      const data = await res.data;
      if (data.role === "admin") {
        Cookies.set("admintoken", "admin", {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      }
      setLoading(false);
      if (data.success) {
        toast({
          variant: "default",
          title: data.message,
        });
        router.push("/dashboard");
      }
      if (!data.success) {
        toast({
          variant: "destructive",
          title: data.message,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <div className=" flex flex-col  justify-center">
      <div className="w-full px-10 ">
        <div className="text-3xl tracking-wide font-bold font-serif">
          Welcome
        </div>
        <div className=" text-md px-1">Login to continue</div>
      </div>
      <div className="w-[80%] mt-10  flex gap-9 flex-col m-auto">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email / Ph no.</Label>
          <Input
            value={emailOrPhoneNo}
            onChange={(e) => {
              setEmailOrPhoneNo(e.target.value);
            }}
            type={
              String(emailOrPhoneNo[0]).match(/\d+/g) != null
                ? "number"
                : "text"
            }
            id="email"
            className="p-5 text-lg bg-slate-200  focus:bg-white "
            placeholder="Email / Ph no. "
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            className="p-5 text-lg bg-slate-200 focus:bg-white  "
            placeholder="Password"
          />
        </div>
      </div>
      <Button
        onClick={login}
        className="w-[80%] m-auto mt-10 shadow-lg bg-[#DC3E42] text-stone-200 text-lg font-bold tracking-wide"
        variant="primary"
        size="lg"
      >
        Login
      </Button>
      <div className="flex justify-center m-10">
        {"Don't have an account?"}{" "}
        <Link href="/register" className="text-[#DC3E42] px-1">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Page;

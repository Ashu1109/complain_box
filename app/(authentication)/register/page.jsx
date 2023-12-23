"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/app/Loader";
import { useRouter } from "next/navigation";
const Page = () => {
  const [name, setName] = useState("");
  const [flatno, setFlatno] = useState("");
  const [phno, setPhno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const register = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/register", {
        name,
        flatno,
        phno,
        email,
        password,
      });
      const data = await res.data;
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
    <div className=" flex flex-col justify-center">
      <div className="w-full px-10 ">
        <div className="text-3xl tracking-wide font-bold font-serif">
          Welcome
        </div>
        <div className=" text-md px-1">Register to continue</div>
      </div>
      <div className="w-[80%] mt-10  flex gap-9 flex-col m-auto">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            id="name"
            className="p-5 text-lg bg-slate-200 focus:bg-white"
            placeholder="Name"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="flatno">Flat no.</Label>
          <Input
            value={flatno}
            onChange={(e) => {
              setFlatno(e.target.value);
            }}
            type="text"
            id="flatno"
            className="p-5 text-lg bg-slate-200 focus:bg-white"
            placeholder="Flat no."
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="phno">Ph no.</Label>
          <Input
            value={phno}
            onChange={(e) => {
              setPhno(e.target.value);
            }}
            type="text"
            id="phno"
            className="p-5 text-lg bg-slate-200 focus:bg-white  "
            placeholder="Phone Number"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            id="email"
            className="p-5 text-lg bg-slate-200 focus:bg-white "
            placeholder="Email"
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
        onClick={register}
        className="w-[80%] m-auto mt-10 shadow-lg bg-[#DC3E42] text-stone-200 text-lg font-bold tracking-wide"
        variant="primary"
        size="lg"
      >
        Register
      </Button>
      <div className="flex justify-center m-10">
        Already have an account?{" "}
        <Link href="/login" className="text-[#DC3E42] px-1">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Page;

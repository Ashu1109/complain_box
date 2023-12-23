"use client";
import React from "react";
import { ClipboardIcon } from "@radix-ui/react-icons";

const Navbar = ({ admin = false }) => {
  return (
    <div className="w-full  p-10">
      <div className="flex w-full justify-between">
        <div className="flex">
          <div className="flex items-center">
            <ClipboardIcon
              color="white"
              className=" h-14 w-14 p-1 bg-[#DC3E42] rounded-full"
            />
            <div className="ml-4 ">
              <h1 className="text-2xl font-bold">Complain Box</h1>
              <p className="text-sm text-gray-500">
                We are here to help you, every step of the way
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

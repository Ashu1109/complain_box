import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
const ProfileCardComponent = ({ name, email }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const changePassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/changepassword", {
        oldPassword,
        newPassword,
      });
      const data = await res.data;
      setOldPassword("");
      setNewPassword("");
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end pt-10 items-center">
        <Dialog>
          <DialogTrigger
            disabled={loading}
            className="border inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            Change Password
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                {
                  "Make changes to your Password here. Click save when you're done."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Old Password
                </Label>
                <Input
                  id="name"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  type="password"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  New Password
                </Label>
                <Input
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  id="username"
                  type="password"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogClose
              onClick={changePassword}
              className="bg-[#cd393e] h-10 px-4 py-2 text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Save changes
            </DialogClose>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProfileCardComponent;

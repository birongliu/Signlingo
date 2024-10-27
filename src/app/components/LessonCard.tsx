import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface LessonCardProps {
  unit: string;
  description: string;
  onStart: () => void; // Pass function to start lesson
  type: string;
}

import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Switch } from "@/app/components/ui/switch";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const LessonCard: React.FC<LessonCardProps> = ({
  unit,
  description,
  onStart,
  type,
}) => {
  return (
    // <Card className="flex flex-col justify-between rounded-lg bg-feather-green p-2 shadow-md transition-all duration-300 hover:-translate-y-2 md:flex-row">
    //   <CardHeader className="mb-6 md:mb-0">
    //     {" "}
    //     <CardTitle className="text-white">{unit}</CardTitle>
    //     <CardDescription className="text-gray-100">
    //       {description}
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className="flex justify-center md:items-end">
    //     <Button
    //       className="max-h-14 w-full rounded-full border bg-white px-6 py-3 text-lg font-bold text-black transition-all duration-300 hover:scale-105 md:w-auto"
    //       onClick={onStart}
    //     >
    //       Start {type}
    //     </Button>
    //   </CardContent>
    // </Card>

    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onStart} className="w-full">
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;

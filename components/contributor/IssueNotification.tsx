"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface IssueNotificationProps {
  count: number;
  message?: string;
}

export const IssueNotification = ({ count, message = "Issues detected" }: IssueNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || count === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 lg:left-76 z-50">
      <div className="flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white text-red-600 flex items-center justify-center text-sm font-bold">
            N
          </div>
          <span className="font-medium">
            {count} {count === 1 ? 'Issue' : 'Issues'}
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-red-200 transition-colors"
          aria-label="Dismiss notification"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}; 
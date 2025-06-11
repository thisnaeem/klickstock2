"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";

export function MobileFilterToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
    
    // Get the filter sidebar container
    const sidebarContainer = document.getElementById("filter-sidebar-container");
    if (sidebarContainer) {
      if (!isOpen) {
        sidebarContainer.classList.remove("hidden");
        // Add fixed position for mobile overlay
        sidebarContainer.classList.add("fixed", "top-0", "left-0", "z-50", "h-full", "w-full");
        // Prevent body scrolling when sidebar is open
        document.body.style.overflow = "hidden";
      } else {
        sidebarContainer.classList.add("hidden");
        // Remove fixed position
        sidebarContainer.classList.remove("fixed", "top-0", "left-0", "z-50", "h-full", "w-full");
        // Restore body scrolling
        document.body.style.overflow = "";
      }
    }
  };

  // Close the sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) { // lg breakpoint is typically 1024px
        setIsOpen(false);
        const sidebarContainer = document.getElementById("filter-sidebar-container");
        if (sidebarContainer) {
          // Remove mobile overlay classes
          sidebarContainer.classList.remove("fixed", "top-0", "left-0", "z-50", "h-full", "w-full");
          // On desktop, the sidebar is always visible via CSS (lg:block)
          document.body.style.overflow = "";
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <button
      onClick={toggleFilters}
      className="w-full flex items-center justify-between px-4 py-3 bg-gray-800/80 rounded-lg text-white hover:bg-gray-700/80 transition-colors"
    >
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-5 h-5 text-indigo-400" />
        <span className="font-medium">Filters</span>
      </div>
      {isOpen ? (
        <X className="w-5 h-5 text-gray-400" />
      ) : (
        <span className="text-xs bg-indigo-600 rounded-full px-2 py-0.5">
          {isOpen ? "Close" : "Open"}
        </span>
      )}
    </button>
  );
} 
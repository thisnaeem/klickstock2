"use client";

import { useEffect, useState } from "react";

export function MobileOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkSidebarState = () => {
      const sidebarContainer = document.getElementById("filter-sidebar-container");
      if (sidebarContainer) {
        // Check if sidebar has mobile overlay classes (fixed positioning)
        const hasFixedPosition = sidebarContainer.classList.contains("fixed");
        setIsVisible(hasFixedPosition);
      }
    };

    // Check initial state
    checkSidebarState();

    // Set up a MutationObserver to watch for class changes on the sidebar
    const sidebarContainer = document.getElementById("filter-sidebar-container");
    if (sidebarContainer) {
      const observer = new MutationObserver(checkSidebarState);
      observer.observe(sidebarContainer, {
        attributes: true,
        attributeFilter: ["class"]
      });

      return () => observer.disconnect();
    }
  }, []);

  const handleOverlayClick = () => {
    // Close the sidebar by removing mobile overlay classes
    const sidebarContainer = document.getElementById("filter-sidebar-container");
    if (sidebarContainer) {
      sidebarContainer.classList.add("hidden");
      sidebarContainer.classList.remove("fixed", "top-0", "left-0", "z-50", "h-full", "w-full");
      document.body.style.overflow = "";
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-40 lg:hidden"
      onClick={handleOverlayClick}
      aria-hidden="true"
    />
  );
} 
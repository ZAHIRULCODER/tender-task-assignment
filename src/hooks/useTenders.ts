"use client";

import { useState } from "react";
import { Tender } from "../lib/types";

export function useTenders() {
  const [tenders, setTenders] = useState<Tender[]>([
    {
      id: "1",
      title: "Highway Bridge Construction",
      description: "Design and build a 2km suspension bridge over River Valley",
      status: "not-started",
      priority: "high",
      assignee: "John Carter",
      dueDate: "15 Mar 2024",
      comments: 5,
      attachments: 2,
    },
    {
      id: "2",
      title: "Urban Housing Development",
      description: "500-unit residential complex in downtown area",
      status: "in-progress",
      priority: "medium",
      assignee: "Alice Zhang",
      dueDate: "30 Sep 2023",
      comments: 18,
      attachments: 7,
    },
    {
      id: "3",
      title: "Solar Power Plant Installation",
      description: "50MW solar farm development in desert region",
      status: "not-started",
      priority: "medium",
      assignee: "Bob Wilson",
      dueDate: "10 Jan 2025",
      comments: 3,
      attachments: 4,
    },
    {
      id: "4",
      title: "Hospital Renovation Project",
      description: "Full modernization of City General Hospital facilities",
      status: "in-progress",
      priority: "high",
      assignee: "Sarah Johnson",
      dueDate: "28 Feb 2024",
      comments: 23,
      attachments: 9,
    },
    {
      id: "5",
      title: "Coastal Protection System",
      description: "Installation of sea walls and erosion control measures",
      status: "completed",
      priority: "high",
      assignee: "Michael Brown",
      dueDate: "15 Jun 2023",
      comments: 14,
      attachments: 6,
    },
    {
      id: "6",
      title: "Smart City Infrastructure",
      description: "IoT network deployment for city-wide monitoring",
      status: "in-progress",
      priority: "medium",
      assignee: "Emily Davis",
      dueDate: "01 Dec 2024",
      comments: 9,
      attachments: 5,
    },
    {
      id: "7",
      title: "Railway Track Upgrade",
      description: "Modernization of 200km mainline railway tracks",
      status: "not-started",
      priority: "low",
      assignee: "David Miller",
      dueDate: "30 Nov 2025",
      comments: 7,
      attachments: 3,
    },
    {
      id: "8",
      title: "Waste Management Facility",
      description: "Construction of recycling plant and landfill site",
      status: "in-progress",
      priority: "high",
      assignee: "Jessica Lee",
      dueDate: "14 Jul 2024",
      comments: 12,
      attachments: 8,
    },
    {
      id: "9",
      title: "University Campus Expansion",
      description: "New academic buildings and student housing",
      status: "not-started",
      priority: "medium",
      assignee: "Ryan Taylor",
      dueDate: "31 Aug 2026",
      comments: 2,
      attachments: 1,
    },
    {
      id: "10",
      title: "Data Center Construction",
      description: "Tier IV data center facility with 50,000 sqft capacity",
      status: "completed",
      priority: "low",
      assignee: "Mohammed Ali",
      dueDate: "20 May 2023",
      comments: 27,
      attachments: 11,
    },
    {
      id: "11",
      title: "Subway Tunnel Excavation",
      description: "Underground rail network expansion project",
      status: "todo",
      priority: "high",
      assignee: "Liam Nguyen",
      dueDate: "15 Oct 2024",
      comments: 6,
      attachments: 4,
    },
    {
      id: "12",
      title: "Green Energy Research Center",
      description: "Construction of sustainable materials testing facility",
      status: "todo",
      priority: "medium",
      assignee: "Sophia Martinez",
      dueDate: "05 Apr 2025",
      comments: 11,
      attachments: 5,
    },
  ]);

  const addTender = (tender: Omit<Tender, "id">) => {
    const newTender = {
      ...tender,
      id: Math.random().toString(36).substring(2, 9),
    };
    setTenders([...tenders, newTender]);
  };

  const updateTender = (updatedTender: Tender) => {
    setTenders(
      tenders.map((tender) =>
        tender.id === updatedTender.id ? updatedTender : tender
      )
    );
  };

  return {
    tenders,
    addTender,
    updateTender,
  };
}

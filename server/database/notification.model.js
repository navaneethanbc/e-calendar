const notifications = [
  {
    _id: "60d0fe4f5311236168a109d0",
    category: "Reminder",
    event_id: "60d0fe4f5311236168a109cc", // Branch Meeting
    description: "Reminder: Branch meeting tomorrow.",
    designated_time: "2024-08-31T09:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109d1",
    category: "Invite",
    event_id: "60d0fe4f5311236168a109cd", // Annual Review
    description: "You are invited to the annual review.",
    designated_time: "2024-12-08T09:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109d2",
    category: "Alert",
    event_id: "60d0fe4f5311236168a109ce", // System Update
    description: "Scheduled system update at midnight.",
    designated_time: "2024-09-15T00:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109d3",
    category: "Reminder",
    event_id: "60d0fe4f5311236168a109cf", // Quarterly Report
    description: "Reminder: Submit the quarterly report by Friday.",
    designated_time: "2024-10-04T09:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109d4",
    category: "Invite",
    event_id: "60d0fe4f5311236168a109d0", // Team Building
    description: "Join us for a team-building event next weekend.",
    designated_time: "2024-09-22T14:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109d5",
    category: "Reminder",
    event_id: "60d0fe4f5311236168a109d1", // Tax Filing
    description: "Reminder: Tax filing deadline is approaching.",
    designated_time: "2024-10-15T09:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109d6",
    category: "Alert",
    event_id: "60d0fe4f5311236168a109d2", // Server Maintenance
    description: "Server maintenance scheduled for this weekend.",
    designated_time: "2024-09-20T02:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109d7",
    category: "Reminder",
    event_id: "60d0fe4f5311236168a109d3", // Health Check
    description: "Health check-up appointment tomorrow.",
    designated_time: "2024-08-30T10:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109d8",
    category: "Invite",
    event_id: "60d0fe4f5311236168a109d4", // Workshop
    description: "You're invited to attend the workshop on React.",
    designated_time: "2024-11-05T09:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109d9",
    category: "Alert",
    event_id: "60d0fe4f5311236168a109d5", // Security Update
    description: "Important security update to be applied soon.",
    designated_time: "2024-09-18T08:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109da",
    category: "Reminder",
    event_id: "60d0fe4f5311236168a109d6", // Vacation Request
    description: "Reminder: Submit your vacation request for the year.",
    designated_time: "2024-10-01T09:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109db",
    category: "Invite",
    event_id: "60d0fe4f5311236168a109d7", // Conference
    description: "You're invited to the annual tech conference.",
    designated_time: "2024-11-20T09:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109dc",
    category: "Alert",
    event_id: "60d0fe4f5311236168a109d8", // Holiday
    description: "Office closed for the holiday season.",
    designated_time: "2024-12-24T00:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109dd",
    category: "Reminder",
    event_id: "60d0fe4f5311236168a109d9", // Project Deadline
    description: "Reminder: Project deadline is approaching.",
    designated_time: "2024-09-30T17:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109de",
    category: "Invite",
    event_id: "60d0fe4f5311236168a109da", // Holiday Party
    description: "You're invited to the holiday party.",
    designated_time: "2024-12-15T18:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109df",
    category: "Alert",
    event_id: "60d0fe4f5311236168a109db", // Office Closure
    description: "Office closure for maintenance work.",
    designated_time: "2024-10-10T00:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109e0",
    category: "Reminder",
    event_id: "60d0fe4f5311236168a109dc", // Invoice Submission
    description: "Reminder: Submit your invoices by the end of the month.",
    designated_time: "2024-09-30T12:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109e1",
    category: "Invite",
    event_id: "60d0fe4f5311236168a109dd", // Team Lunch
    description: "You're invited to a team lunch next Friday.",
    designated_time: "2024-09-13T12:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109e2",
    category: "Alert",
    event_id: "60d0fe4f5311236168a109de", // Deadline Extension
    description: "Project deadline has been extended.",
    designated_time: "2024-09-01T09:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109e3",
    category: "Reminder",
    event_id: "60d0fe4f5311236168a109df", // Document Review
    description: "Reminder: Review the documents before the meeting.",
    designated_time: "2024-09-04T09:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109e4",
    category: "Invite",
    event_id: "60d0fe4f5311236168a109e0", // Web Development Course
    description: "You're invited to a web development course next month.",
    designated_time: "2024-10-10T08:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109e5",
    category: "Alert",
    event_id: "60d0fe4f5311236168a109e1", // Annual Audit
    description: "Upcoming annual audit. Prepare necessary documents.",
    designated_time: "2024-11-01T09:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109e6",
    category: "Reminder",
    event_id: "60d0fe4f5311236168a109e2", // Training Session
    description: "Reminder: Training session starts at 10 AM.",
    designated_time: "2024-09-05T10:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109e7",
    category: "Invite",
    event_id: "60d0fe4f5311236168a109e3", // Strategy Meeting
    description: "You're invited to the strategy meeting next week.",
    designated_time: "2024-09-12T15:00:00Z",
  },
  {
    _id: "60d0fe4f5311236168a109e8",
    category: "Alert",
    event_id: "60d0fe4f5311236168a109e4", // New Policy
    description: "New company policy effective from next month.",
    designated_time: "2024-09-01T00:00:00Z",
  },
];

export default notifications;

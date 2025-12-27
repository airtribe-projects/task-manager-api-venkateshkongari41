const tasks = [
  {
    id: "1",
    title: "Design landing page",
    description:
      "Create wireframes and final assets for the marketing landing page.",
    completed: false,
    priority: "high",
    createdAt: new Date("2025-12-20T10:00:00Z"),
  },
  {
    id: "2",
    title: "API: authentication endpoints",
    description:
      "Implement login, register and refresh-token endpoints with validation.",
    completed: false,
    priority: "medium",
    createdAt: new Date("2025-12-21T14:30:00Z"),
  },
  {
    id: "3",
    title: "Set up CI pipeline",
    description: "Add lint, test, build and deploy steps on CI provider.",
    completed: true,
    priority: "high",
    createdAt: new Date("2025-12-19T09:15:00Z"),
  },
  {
    id: "4",
    title: "Mobile: onboarding screens",
    description: "Implement onboarding flow and local storage for preferences.",
    completed: false,
    priority: "low",
    createdAt: new Date("2025-12-22T16:45:00Z"),
  },
];

module.exports = tasks;

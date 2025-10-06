export const VALIDATION_RULES = {
  title: (value) => (!value ? "Title is required" : ""),
  description: (value) => (!value ? "Description is required" : ""),
  status: (value) => (!value ? "Status is required" : ""),
  priority: (value) => (!value ? "Priority is required" : ""),
  assignee: (value) => (!value ? "Assignee is required" : ""),
  reporter: (value) => {
    if (!value) return "Reporter is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Reporter email is invalid";
    return "";
  },
  category: (value) => (!value ? "Category is required" : ""),
};

export const CATEGORY_OPTIONS = [
  {
    value: "support",
    label: "Support",
  },
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
];

export const STATUS_OPTIONS = [
  {
    value: "",
    label: "",
  },
  {
    value: "open",
    label: "Open",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "closed",
    label: "Closed",
  },
];

export const PRIORITY_OPTIONS = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "urgent",
    label: "Urgent",
  },
];

export const ASSIGNEE_OPTIONS = [
  {
    value: "sai@tyujhgfji.com",
    label: "Sai Prasad",
  },
  {
    value: "shiva@kjkjhghrrg.com",
    label: "Shiva",
  },
  {
    value: "sahithi@kjhagekyhgfbegr.com",
    label: "Sahithi",
  },
  {
    value: "sahithi@tercstgvst.com",
    label: "Sahithi Test",
  },
  {
    value: "sai@kjahfkjhkfhrk.com",
    label: "Sai Test",
  },
  {
    value: "shiva@ahfkjhakfujhufkguh.com",
    label: "Shiva Test",
  },
  {
    value: "durga@kjhdgefyuegge.com",
    label: "Durga Test",
  },
];

export const ITEMS_PER_PAGE = 10;
export const PAGE = 1;

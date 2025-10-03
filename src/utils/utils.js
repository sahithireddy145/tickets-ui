import {
  ASSIGNEE_OPTIONS,
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "../features/constants/constants";

export function getStatusLabel(value) {
  const stausObj = STATUS_OPTIONS.find((option) => option.value === value);
  return stausObj.label;
}

export function getPriorityLabel(value) {
  const priorityObj = PRIORITY_OPTIONS.find((option) => option.value === value);
  return priorityObj.label;
}

export function getAssigneeLabel(value) {
  const assigneeObj = ASSIGNEE_OPTIONS.find((option) => option.value === value);
  return assigneeObj.label;
}

export function getCategoryLabel(value) {
  const categoryObj = CATEGORY_OPTIONS.find((option) => option.value === value);
  return categoryObj.label;
}

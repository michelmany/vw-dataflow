export type UserFilter = {
  columnKey: string;
  label: string;
  options: { label: string; value: string }[];
};

export const userFilters: UserFilter[] = [
  {
    columnKey: 'role',
    label: 'Role',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' },
    ],
  },
  {
    columnKey: 'team',
    label: 'Team',
    options: [
      { label: 'Design', value: 'design' },
      { label: 'Development', value: 'development' },
      { label: 'Finance', value: 'finance' },
      { label: 'HR', value: 'hr' },
      { label: 'Management', value: 'management' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Sales', value: 'sales' },
    ],
  },
  {
    columnKey: 'status',
    label: 'Status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
];

import { User } from '@libs/types';
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@libs/ui';
import { useState } from 'react';
import { userFilters } from '../table/userFilters';

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: Partial<User>) => void;
  onCancel?: () => void;
}

export function UserForm({ initialData, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(initialData || {});

  const handleChange = (key: keyof User, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      id="user-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name || ''}
          onChange={e => handleChange('name', e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={e => handleChange('email', e.target.value)}
          required
        />
      </div>

      {/* Role, Team and Status */}
      {userFilters.map(filter => (
        <div key={filter.columnKey} className="flex flex-col gap-2">
          <Label htmlFor={filter.columnKey}>{filter.label}</Label>
          <Select
            value={formData[filter.columnKey as keyof User]?.toString() || ''}
            onValueChange={value =>
              handleChange(filter.columnKey as keyof User, value)
            }
          >
            <SelectTrigger id={filter.columnKey} className="w-full">
              <SelectValue
                placeholder={`Select a ${filter.label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background border shadow-md">
              {filter.options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </form>
  );
}

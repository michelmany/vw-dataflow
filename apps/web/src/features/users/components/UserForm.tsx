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
import { useState, useEffect } from 'react';
import { userFilters } from '../table/userFilters';

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: Partial<User>) => void;
  onCancel?: () => void;
}

export function UserForm({ initialData, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(initialData || {});

  // Update form data when initialData changes
  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

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
      role="form"
      aria-label={initialData ? 'Edit user form' : 'Add new user form'}
    >
      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={e => handleChange('name', e.target.value)}
          required
          aria-describedby="name-required"
          aria-invalid={
            !formData.name && formData.name !== undefined ? 'true' : 'false'
          }
        />
        <span id="name-required" className="sr-only">
          Name is required
        </span>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={e => handleChange('email', e.target.value)}
          required
          aria-describedby="email-required email-format"
          aria-invalid={
            !formData.email && formData.email !== undefined ? 'true' : 'false'
          }
        />
        <span id="email-required" className="sr-only">
          Email address is required
        </span>
        <span id="email-format" className="sr-only">
          Please enter a valid email address
        </span>
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
            aria-label={`Select ${filter.label.toLowerCase()}`}
          >
            <SelectTrigger
              id={filter.columnKey}
              className="w-full"
              aria-describedby={`${filter.columnKey}-description`}
            >
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
          <span id={`${filter.columnKey}-description`} className="sr-only">
            Choose the user&apos;s {filter.label.toLowerCase()}
          </span>
        </div>
      ))}
    </form>
  );
}

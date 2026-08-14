'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './input';
import { cn } from '@/lib/utils/shared/class-merge';
import { PasswordInputProps } from '@/interfaces/auth';

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-muted-foreground hover:text-foreground focus:ring-ring absolute top-1/2 right-3 -translate-y-1/2 rounded-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };

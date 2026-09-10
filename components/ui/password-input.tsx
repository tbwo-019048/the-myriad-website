'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

/**
 * Password / verification-token input with a show/hide toggle.
 * Drop-in replacement for <Input type="password" />. Any className is applied
 * to the wrapper so layout classes keep working.
 */
function PasswordInput({ className, ...props }: React.ComponentProps<'input'>) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={cn('relative', className)}>
      <Input {...props} type={visible ? 'text' : 'password'} className="pr-10" />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? 'Hide' : 'Show'}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export { PasswordInput };

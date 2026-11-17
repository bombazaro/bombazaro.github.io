import type { ReactNode } from 'react';

type Props = { href: string; variant: 'main' | 'ghost'; external?: boolean; children: ReactNode };

export default function Button({ href, variant, external, children }: Props) {
  return (
    <a
      className={`btn btn-${variant}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

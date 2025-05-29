'use client';

import { ClerkLoaded, Waitlist } from '@clerk/nextjs';

export default function WaitlistPage() {
  return (
    <div className="w-full">
      <ClerkLoaded>
        <Waitlist
          appearance={{
            baseTheme: undefined,
            elements: {
              rootBox: 'w-full',
              card: 'bg-white shadow-none border-none w-full',
              headerTitle: 'text-2xl font-bold text-black',
              headerSubtitle: 'text-black/70',
              formFieldInput: 'h-12 bg-white/10 border-white/10 text-black placeholder-black/50 focus:ring-2 focus:ring-white/20 rounded-lg',
              formFieldLabel: 'text-black/80 text-sm',
              formFieldAction: 'text-black/60 hover:text-black/80 text-sm',
              formButtonPrimary: 'w-full bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] text-white hover:opacity-90 transition-opacity rounded-lg py-3 font-medium',
              footerActionLink: 'text-black/80 hover:text-black transition-colors',
              dividerLine: 'bg-black/20',
              dividerText: 'text-black/50',
              socialButtonsBlockButton: 'bg-white/10 border-white/10 text-black hover:bg-white/20 transition-colors rounded-lg',
              socialButtonsBlockButtonText: 'text-black/90',
              socialButtonsBlockButtonArrow: 'text-black/50',
              formHeader: 'text-center',
              formFieldSuccessText: 'text-green-400',
              formFieldWarningText: 'text-yellow-400',
              formFieldErrorText: 'text-red-400',
              footerAction: 'text-center',
              footer: 'flex justify-center',
              form: 'space-y-6',
              formField: 'space-y-2',
              formHeaderTitle: 'text-2xl font-bold',
              formHeaderSubtitle: 'text-sm',
            },
            variables: {
              colorPrimary: '#ffffff',
            },
          }}
          signInUrl="https://app.servantsuite.com/sign-in"
          afterJoinWaitlistUrl="https://servantsuite.com"
        />
      </ClerkLoaded>
    </div>
  );
}

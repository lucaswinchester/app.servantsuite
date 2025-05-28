'use client';

import { ClerkLoaded, SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="w-full">
      <ClerkLoaded>
        <SignUp
          appearance={{
            baseTheme: undefined,
            elements: {
              rootBox: 'w-full',
              card: 'bg-black/30 backdrop-blur-md shadow-xl border border-white/10 w-full rounded-2xl p-8',
              headerTitle: 'text-2xl font-bold text-white text-center',
              headerSubtitle: 'text-white/70 text-center',
              formFieldInput: 'h-12 bg-white/5 border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-white/20 rounded-lg',
              formFieldLabel: 'text-white/80 text-sm',
              formFieldAction: 'text-white/60 hover:text-white/80 text-sm',
              formButtonPrimary: 'bg-white text-black hover:bg-white/90 transition-colors rounded-lg',
              footerActionLink: 'text-white/80 hover:text-white transition-colors',
              dividerLine: 'bg-white/20',
              dividerText: 'text-white/50',
              socialButtonsBlockButton: 'bg-white/10 border-white/10 text-white hover:bg-white/20 transition-colors rounded-lg',
              socialButtonsBlockButtonText: 'text-white/90',
              socialButtonsBlockButtonArrow: 'text-white/50',
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
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          redirectUrl="/dashboard"
        />
      </ClerkLoaded>
    </div>
  );
}

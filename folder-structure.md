src/
├── app/
│ ├── (auth)/ # login + register (centered card layout)
│ ├── (dashboard)/ # protected chrome (header + main)
│ │ ├── student/ # student portal
│ │ └── mentor/ # mentor dashboard
│ ├── error.tsx # global error boundary
│ └── not-found.tsx # global 404
├── components/
│ ├── ui/ # ShadCN primitives
│ ├── forms/ # TextField, PasswordField, TextareaField, FieldError, SubmitButton, FormErrorBanner
│ ├── layout/ # header, theme toggle, protected route
│ └── common/ # empty-state, error-fallback
├── features/
│ ├── auth/ # schemas, forms, hooks (co-located)
│ ├── projects/ # student submit + my-project
│ └── review/ # mentor dashboard
├── hooks/ # shared (use-auth, use-debounced)
├── lib/
│ ├── api.ts # typed fetch wrapper (Bearer, 401 auto-logout)
│ ├── auth-storage.ts # token + user cache (localStorage)
│ ├── safe-redirect.ts # ?next= open-redirect guard
│ └── utils.ts # cn()
├── providers/ # auth + tanstack query
└── types/ # shared API types

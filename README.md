# Final Project: PassForge — React Password Manager

## Project Vision

**PassForge** is a modern password manager built with React — your personal forge to create and secure unbreakable passwords.
This 3-week final project will demonstrate a revolutionary user interface and advanced security features, while validating all required frontend development skills.

Just as a blacksmith transforms raw metal into a solid weapon, PassForge allows you to **generate cryptographically strong passwords**, de les **store them securely on the client side**, and **organize them intelligently**.

[Penpot Prototype](https://design.penpot.app/#/view?file-id=aadbbc88-0e4c-80b8-8006-e9b14bd20194&page-id=4e81a81c-fc00-80db-8006-e9c810142ee1&section=interactions&index=0&share-id=10e879d4-e5a6-801a-8007-0219f5cef3ca)
[Backend Repository](https://github.com/PassForgeTHP/Rails_Passforge)
[Api Link](https://passforge-api.onrender.com/)
[Extension Repository](https://github.com/PassForgeTHP/Extension_Passforge)
[Website link](https://pass-forge-en.netlify.app/)
[Projet Gestion link](https://github.com/orgs/PassForgeTHP/projects/1 )

---

### Technical Architecture
#### Tech Stack

```javascript
// Dependencies principales (Adapté pour certification)
{
  "next": "14.0.0",           // Framework React full-stack
  "react": "18.2.0",          // Library UI (JavaScript, pas TypeScript)
  "zustand": "4.4.0",         // State management (librairie externe)
  "lucide-react": "0.290.0",  // Icons moderne
  "recharts": "2.8.0",        // Charts et analytics (librairie externe)
  "framer-motion": "10.16.0"  // Animations (optionnel)
}

```

### Architecture Folder Structure

```
passforge/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/login/   # Auth pages
│   │   │   ├── page.jsx
│   │   │   └── login.module.css
│   │   ├── dashboard/      # Main app pages
│   │   │   ├── page.jsx
│   │   │   └── dashboard.module.css
│   │   ├── layout.jsx      # Root layout
│   │   └── globals.css     # Styles globaux
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Basic UI primitives
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css
│   │   ├── forms/         # Form components
│   │   └── layout/        # Layout components
│   ├── lib/               # Utilities & configuration
│   │   ├── crypto.js      # Encryption utilities
│   │   ├── storage.js     # IndexedDB wrapper
│   │   └── utils.js       # Helper functions
│   ├── stores/            # Zustand stores (state management)
│   └── hooks/             # Custom React hooks
├── public/                # Static assets
│   ├── favicon.ico
│   └── fonts/             # OpenDyslexic font pour accessibilité
└── styles/                # CSS design system
    ├── variables.css      # CSS custom properties
    └── themes.css         # Dark mode
```

---

## Core Features

### Password Management

**Essential Features : **
- Full CRUD for credentials (Create, Read, Update, Delete)
- Instant search with advanced filters
- Folder and tag organization
- Secure notes attached to accounts
- Change history tracking

### Security & Encryption

**Master Password System :**
- Authentication via master password
- Key derivation with PBKDF2 (Web Crypto API)
- Automatic session timeout
- Manual instant lock

### Password Generator

**Advanced Features:**
- Cryptographically secure password generation
- Full customization options
- Presets for different platforms
- Generated password history
- Real-time strength evaluation

### Analytics & Dashboard

**Security Metrics:**
- Global vault security score
- Weak / reused / old password detection
- Security improvement recommendations
- Usage statistics

### Import/Export

**Supported Formats:**
- Encrypted PassForge JSON
- Standard CSV (1Password, Bitwarden, LastPass)
- Browser imports (Chrome, Firefox)
- Selective export by folder/tag

---
## Detailed Security

### Storage Security

**IndexedDB Encryption Layer:**
- All sensitive data encrypted
- Minimal plaintext metadata for search
- Auto-purge after inactivity
- Secure key derivation and storage

---

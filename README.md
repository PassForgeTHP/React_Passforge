# Projet Final : PassForge - Gestionnaire de Mots de Passe React

## 🎓 **CERTIFICATION DÉVELOPPEUR FRONTEND**

**⚠️ IMPORTANT** : Ce projet constitue le **projet final de certification** pour l'obtention du certificat de **Développeur Frontend**. Toutes les fonctionnalités développées doivent strictement respecter les critères d'évaluation du référentiel d'activité présentés dans ce document.

---

## 🎯 Vision du Projet

**PassForge** est un gestionnaire de mots de passe moderne développé en React — votre **forge personnelle** pour créer et sécuriser des mots de passe indestructibles. Ce projet final de 3 semaines démontrera une interface utilisateur révolutionnaire et des fonctionnalités de sécurité avancées, tout en validant l'ensemble des compétences requises pour la certification frontend.

Comme un forgeron transforme le métal brut en arme solide, PassForge vous permet de **générer des mots de passe cryptographiquement robustes**, de les **stocker localement avec sécurité**, et de les **organiser intelligemment**.

### 🚀 Objectifs Pédagogiques
- Maîtriser React/Next.js 14 avec TypeScript
- Implémenter des concepts de sécurité web avancés
- Créer une UX/UI moderne et accessible
- Travailler en équipe avec méthodologie agile
- Déployer une application complète en production

### 🎖️ Objectifs d'Évaluation
- **Frontend Excellence** : Interface utilisateur impressionnante
- **Fonctionnalités Avancées** : Au-delà d'un CRUD basique
- **Sécurité** : Chiffrement client-side et bonnes pratiques
- **Collaboration** : Organisation équipe et code quality
- **Innovation** : Features uniques et différenciation

---

## 🏗️ Architecture Technique

### Stack Technologique

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

// ⚠️ CERTIFICATION : CSS Vanilla uniquement (pas de Tailwind)
// Utilisation de CSS Modules (.module.css) et CSS custom properties
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

## 📋 Fonctionnalités Core

### 🔐 Gestion des Mots de Passe

**Features Essentielles :**
- CRUD complet des credentials (Create, Read, Update, Delete)
- Recherche instantanée avec filtres avancés
- Organisation par dossiers et tags
- Notes sécurisées attachées aux comptes
- Historique des modifications

**Structure des Données :**
```typescript
interface Credential {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  tags: string[];
  folder?: string;
  createdAt: Date;
  updatedAt: Date;
  lastUsed?: Date;
  strength: PasswordStrength;
}

type PasswordStrength = 'weak' | 'medium' | 'strong' | 'excellent';
```

### 🛡️ Sécurité & Chiffrement

**Master Password System :**
- Authentification par mot de passe maître
- Dérivation de clé avec PBKDF2 (Web Crypto API)
- Session timeout automatique
- Verrouillage manuel instantané

**Chiffrement Local :**
```typescript
// Exemple d'implémentation
class PassForgeCrypto {
  async deriveKey(masterPassword: string, salt: Uint8Array): Promise<CryptoKey> {
    // PBKDF2 avec 100,000 iterations
  }

  async encrypt(data: string, key: CryptoKey): Promise<EncryptedData> {
    // AES-GCM encryption
  }

  async decrypt(encryptedData: EncryptedData, key: CryptoKey): Promise<string> {
    // AES-GCM decryption
  }
}
```

### 🎰 Générateur de Mots de Passe

**Features Avancées :**
- Générateur cryptographiquement sécurisé
- Options de personnalisation complètes
- Presets pour différents sites
- Historique des mots de passe générés
- Évaluation de force en temps réel

**Interface Générateur :**
```typescript
interface PasswordGeneratorOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
  customCharacters?: string;
  excludeCharacters?: string;
}
```

### 📊 Analytics & Dashboard

**Métriques de Sécurité :**
- Score de sécurité global du vault
- Mots de passe faibles/réutilisés/anciens
- Recommendations d'amélioration
- Statistiques d'usage

### 📤 Import/Export

**Formats Supportés :**
- JSON chiffré natif PassForge
- CSV standard (1Password, Bitwarden, LastPass)
- Import depuis navigateurs (Chrome, Firefox)
- Export sélectif par dossier/tag

#### **Solution Multi-Appareils : Export/Import Manuel** ⭐

**Problématique :** IndexedDB étant local au navigateur, les données ne sont pas automatiquement synchronisées entre appareils (PC, MacBook, téléphone).

**Solution Recommandée pour la Certification :**
Export/Import manuel d'un fichier JSON chiffré - Simple, sécurisé, et suffisant pour le MVP.

**Workflow Utilisateur :**
```
1. PC Bureau : Clic "Exporter le Vault"
   → Télécharge passforge-backup-2025-01-15.json (chiffré)

2. Transférer le fichier (USB, email, cloud personnel)

3. MacBook : Clic "Importer un Vault"
   → Upload passforge-backup-2025-01-15.json
   → Entre le master password
   → ✅ Tous les mots de passe restaurés !
```

**Implémentation :**

```javascript
// components/ExportButton.jsx
export default function ExportButton() {
  const credentials = usePassForgeStore((state) => state.credentials);

  const handleExport = async () => {
    // 1. Préparer les données
    const vaultData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      credentials: credentials
    };

    // 2. Chiffrer avec le master password
    const masterPassword = prompt('Entrez votre mot de passe maître pour sécuriser l\'export');
    const encryptedVault = await encryptVault(vaultData, masterPassword);

    // 3. Créer et télécharger le fichier JSON
    const blob = new Blob([JSON.stringify(encryptedVault, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `passforge-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    alert('✅ Vault exporté avec succès !');
  };

  return (
    <button onClick={handleExport} className="btn btn-primary">
      📥 Exporter le Vault
    </button>
  );
}

// components/ImportButton.jsx
export default function ImportButton() {
  const addMultipleCredentials = usePassForgeStore((state) => state.addMultipleCredentials);

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 1. Lire le fichier
    const fileContent = await file.text();
    const encryptedVault = JSON.parse(fileContent);

    // 2. Déchiffrer avec le master password
    const masterPassword = prompt('Entrez votre mot de passe maître');
    const vaultData = await decryptVault(encryptedVault, masterPassword);

    // 3. Importer dans le store
    addMultipleCredentials(vaultData.credentials);
    alert(`✅ ${vaultData.credentials.length} mots de passe importés !`);
  };

  return (
    <label className="btn btn-secondary">
      📤 Importer un Vault
      <input
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: 'none' }}
      />
    </label>
  );
}
```

**Format du Fichier Exporté (Chiffré) :**
```json
{
  "version": "1.0",
  "exportedAt": "2025-01-15T10:30:00.000Z",
  "algorithm": "AES-GCM",
  "pbkdf2": {
    "iterations": 100000,
    "hash": "SHA-256"
  },
  "salt": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
  "iv": "f1e2d3c4b5a6978685746352413021",
  "encryptedData": "9f8e7d6c5b4a32109f8e7d6c5b4a3210..."
}
```

**Sécurité :**
- ✅ Fichier chiffré avec le master password (AES-GCM)
- ✅ Même si volé, illisible sans le master password
- ✅ Pas de dépendance à un serveur tiers
- ✅ L'utilisateur contrôle où sont stockées ses données

**Avantages pour la Certification :**
- ✅ Simple à implémenter (2-3 heures)
- ✅ Reste 100% frontend (pas de backend)
- ✅ Démontrable facilement au jury
- ✅ Solution utilisée par des outils professionnels (KeePass)

**Note :** Une synchronisation cloud end-to-end encrypted est prévue en Phase 2 (après certification), où le serveur stockerait le vault chiffré sans jamais pouvoir le déchiffrer.

---

## 🎨 Design System & UI/UX

### Palette de Couleurs

```css
:root {
  /* Primary Brand */
  --primary-50: #f0f9ff;
  --primary-500: #3b82f6;
  --primary-900: #1e3a8a;

  /* Security Colors */
  --success: #22c55e;    /* Strong passwords */
  --warning: #f59e0b;    /* Medium security */
  --danger: #ef4444;     /* Weak passwords */

  /* Dark Theme */
  --dark-bg: #0f172a;
  --dark-surface: #1e293b;
  --dark-border: #334155;
}
```

### Components Design Principles

**Modern & Minimalist :**
- Design system basé sur Tailwind CSS
- Composants réutilisables avec variants
- Animations micro-interactions (Framer Motion)
- Responsive design mobile-first
- Dark mode natif

**Accessibility First :**
- WCAG 2.1 AA compliance
- Navigation clavier complète
- Screen reader optimized
- Focus management avancé

### Key UI Components

```typescript
// Exemple de composant Password Item
const PasswordItem = ({ credential, onEdit, onDelete }: Props) => {
  return (
    <motion.div
      className="group p-4 bg-white dark:bg-slate-800 rounded-lg border"
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaviconImage url={credential.url} />
          <div>
            <h3 className="font-medium">{credential.title}</h3>
            <p className="text-sm text-gray-500">{credential.username}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <PasswordStrengthBadge strength={credential.strength} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => copyPassword(credential)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Password
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(credential)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(credential)}
                className="text-red-600"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
```

---

## 📅 Roadmap 3 Semaines

### Semaine 1 : Foundation & Core (Sprint 1)

#### Jour 1-2 : Setup & Architecture
**Développeur Lead (Toto) :**
- [ ] Initialisation projet Next.js 14 + TypeScript
- [ ] Configuration Tailwind CSS + shadcn/ui
- [ ] Setup Zustand store architecture
- [ ] Configuration ESLint + Prettier
- [ ] Setup repository Git et CI/CD

**Développeur Frontend :**
- [ ] Création du design system
- [ ] Composants UI de base (Button, Input, Card, etc.)
- [ ] Layout principal avec sidebar navigation
- [ ] Page d'accueil et authentification UI

**Développeur Fullstack :**
- [ ] Implémentation Web Crypto API wrapper
- [ ] IndexedDB storage layer
- [ ] Master password authentication logic
- [ ] Session management et auto-lock

#### Jour 3-5 : Core Features
**Tous ensemble :**
- [ ] CRUD complet des credentials
- [ ] Formulaire d'ajout/édition passwords
- [ ] Liste des mots de passe avec recherche
- [ ] Chiffrement/déchiffrement fonctionnel
- [ ] Générateur de mots de passe basic

### Semaine 2 : Advanced Features (Sprint 2)

#### Jour 1-3 : Features Avancées
**Développeur Lead :**
- [ ] Import/Export functionality
- [ ] Advanced search avec filtres
- [ ] Organisation par folders et tags
- [ ] Password strength analyzer

**Développeur Frontend :**
- [ ] Dashboard analytics UI
- [ ] Advanced password generator
- [ ] Settings page complète
- [ ] Dark mode implementation
- [ ] Responsive mobile optimization

**Développeur Fullstack :**
- [ ] Security analytics engine
- [ ] Backup/restore system
- [ ] Performance optimizations
- [ ] Error handling et validation

#### Jour 4-5 : Polish & Testing
- [ ] Tests unitaires critiques
- [ ] Tests d'intégration crypto
- [ ] Bug fixes et optimizations
- [ ] Code review et refactoring

### Semaine 3 : Finalisation & Déploiement (Sprint 3)

#### Jour 1-2 : Advanced UI/UX
- [ ] Animations et micro-interactions
- [ ] Tooltips et guided tours
- [ ] Accessibility improvements
- [ ] Loading states et skeletons

#### Jour 3-4 : Deployment & Documentation
- [ ] Déploiement Vercel/Netlify
- [ ] Documentation technique
- [ ] Guide utilisateur
- [ ] Tests end-to-end

#### Jour 5 : Présentation
- [ ] Préparation démo
- [ ] Slides de présentation
- [ ] Live demo rehearsal
- [ ] Q&A preparation

---

## 👥 Organisation Équipe

### Répartition des Rôles

**🚀 Développeur Lead (Toto) :**
- Architecture globale du projet
- Setup tooling et configuration
- Features complexes (crypto, storage)
- Code review et quality assurance
- Coordination équipe

**🎨 Développeur Frontend :**
- Design system et composants UI
- Expérience utilisateur (UX flows)
- Responsive design et accessibilité
- Animations et interactions
- CSS avancé et theming

**⚡ Développeur Fullstack :**
- Logic business et state management
- API internes et data flow
- Performance et optimizations
- Testing et debugging
- Security implementation

### Méthodologie Agile

**Daily Standups (15min) :**
- What did you do yesterday?
- What will you do today?
- Any blockers or help needed?

**Sprint Planning (30min/semaine) :**
- Review previous sprint
- Plan next sprint tasks
- Estimate complexity
- Assign responsibilities

**Tools Collaboration :**
- **GitHub** : Version control + Project boards
- **Discord** : Communication quotidienne
- **Figma** : Design collaboration
- **Notion** : Documentation partagée

---

## 🛡️ Sécurité Détaillée

### Chiffrement Client-Side

**Master Password Workflow :**
```typescript
// 1. User enters master password
const masterPassword = "user_master_password";

// 2. Generate random salt (stored in IndexedDB)
const salt = crypto.getRandomValues(new Uint8Array(32));

// 3. Derive encryption key using PBKDF2
const key = await crypto.subtle.deriveKey(
  {
    name: "PBKDF2",
    salt: salt,
    iterations: 100000,
    hash: "SHA-256"
  },
  await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(masterPassword),
    "PBKDF2",
    false,
    ["deriveKey"]
  ),
  {
    name: "AES-GCM",
    length: 256
  },
  false,
  ["encrypt", "decrypt"]
);

// 4. Encrypt vault data
const encryptedVault = await crypto.subtle.encrypt(
  {
    name: "AES-GCM",
    iv: crypto.getRandomValues(new Uint8Array(12))
  },
  key,
  new TextEncoder().encode(JSON.stringify(vaultData))
);
```

### Storage Security

**IndexedDB Encryption Layer :**
- Toutes les données sensibles chiffrées
- Metadata minimal en plaintext pour search
- Auto-purge après inactivité
- Secure key derivation et storage

### Browser Security Features

**Content Security Policy :**
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline';
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;">
```

**Security Headers :**
- Strict-Transport-Security
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy: strict-origin

---

## 📊 Features Showcase pour Évaluation

### 🏆 Fonctionnalités Impressionnantes

**1. Smart Password Analysis :**
- Détection automatique mots de passe réutilisés
- Alerte mots de passe compromis (HaveIBeenPwned API)
- Score de sécurité global avec recommendations
- Timeline d'amélioration de la sécurité

**2. Advanced Search & Filters :**
- Recherche instantanée avec highlighting
- Filtres multiples (tags, folders, strength, date)
- Search suggestions intelligentes
- Keyboard shortcuts (cmd+k)

**3. UX Innovations :**
- One-click password copy avec auto-clear
- Favicon automatique pour visual recognition
- Drag & drop pour organisation
- Undo/Redo pour toutes les actions

**4. Security Dashboard :**
- Métriques de sécurité en temps réel
- Charts de progression
- Security score evolution
- Breach monitoring alerts

### 🎯 Démo Script (5 minutes)

1. **Introduction** (30s) : Vision et problème résolu
2. **Master Password** (30s) : Sécurité et chiffrement
3. **Core Features** (2min) : CRUD, search, generator
4. **Security Dashboard** (1min) : Analytics et insights
5. **Advanced Features** (1min) : Import/export, organization
6. **Conclusion** (30s) : Future roadmap vers MetaVault

---

## 🚀 Déploiement & Distribution

### Production Setup

**Vercel Deployment :**
```bash
# Build optimizations
npm run build
npm run start

# Environment variables
NEXT_PUBLIC_APP_URL=https://passforge.vercel.app
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

**Performance Optimizations :**
- Next.js 14 App Router optimizations
- Image optimization automatique
- Code splitting par route
- Service worker pour cache intelligent

### Demo Environment

**Live Demo Features :**
- Sample data pré-remplie
- Guided tour interactif
- Reset demo button
- Performance metrics display

---

## 📈 Référentiel de Certification Frontend

### 🎓 CRITÈRES D'ÉVALUATION OFFICIELS

---

### **C1.a : HTML/CSS - Intégration & Standards**

#### **Critères d'évaluation :**
- ✅ **Conformité maquette** : L'intégration est conforme à la maquette
- ✅ **Normes W3C** : Le code respecte les normes W3C et d'accessibilité
- ✅ **Validation** : Le code passe avec succès les tests du validateur
- ✅ **Code quality** : Le code est commenté et correctement indenté
- ✅ **Sémantique** : Les balises sémantiques sont utilisées à bon escient

#### **Implémentation PassForge :**
```html
<!-- ✅ Exemple de structure sémantique -->
<main>
  <article class="password-vault">
    <header>
      <h1>Mon Coffre-Fort</h1>
      <nav aria-label="Navigation principale">...</nav>
    </header>

    <section aria-labelledby="passwords-title">
      <h2 id="passwords-title">Mes Mots de Passe</h2>
      <!-- Liste des credentials -->
    </section>

    <aside aria-label="Statistiques de sécurité">
      <!-- Dashboard analytics -->
    </aside>
  </article>
</main>
```

**Checklist Validation :**
- [ ] HTML validé via [W3C Validator](https://validator.w3.org/)
- [ ] CSS validé via [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [ ] Code indenté avec 2 espaces (standard Next.js)
- [ ] Commentaires CSS par sections thématiques
- [ ] Balises `<header>`, `<main>`, `<nav>`, `<section>`, `<aside>`, `<footer>` utilisées

---

### **C1.b : Responsive Design Multi-devices**

#### **Critères d'évaluation :**
- ✅ **Adaptation écrans** : Le codage s'adapte aux différentes résolutions (mobile, tablette, desktop)
- ✅ **Compatibilité navigateurs** : Les propriétés sont compatibles avec les différents navigateurs
- ✅ **Fallbacks** : En cas d'incompatibilité, correction ou alternative avec documentation

#### **Implémentation PassForge :**
```css
/* ✅ Media queries mobile-first */
/* Mobile (320px - 768px) */
.password-item {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-sm);
}

/* Tablette (768px - 1024px) */
@media (min-width: 768px) {
  .password-item {
    flex-direction: row;
    padding: var(--spacing-md);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .password-item {
    padding: var(--spacing-lg);
  }

  .password-vault {
    display: grid;
    grid-template-columns: 250px 1fr 300px;
    gap: var(--spacing-xl);
  }
}

/* ✅ Fallback pour propriétés modernes */
.password-card {
  background: #ffffff; /* Fallback */
  background: var(--bg-primary); /* Custom property */

  display: flex; /* Fallback */
  display: grid; /* Modern */
  gap: 1rem; /* Avec fallback margin si besoin */
}
```

**Checklist Responsive :**
- [ ] Tests sur Chrome, Firefox, Safari, Edge
- [ ] Tests responsive : 320px, 768px, 1024px, 1920px
- [ ] Utilisation de `@supports` pour features modernes
- [ ] Documentation des fallbacks dans commentaires CSS

---

### **C1.c : Accessibilité & Diversité des Publics**

#### **Critères d'évaluation :**
- ✅ **Screen readers** : Attributs visuels correctement renseignés pour logiciels de lecture
- ✅ **Police dyslexie** : Police spécifique OpenDyslexic intégrée
- ✅ **Code couleur** : Informations importantes textuellement exprimées, pas uniquement par couleur
- ✅ **Navigation clavier** : Navigation complète au clavier (Tab, Enter, Espace, Échap)

#### **Implémentation PassForge :**

**1. Screen Readers (ARIA) :**
```html
<!-- ✅ Attributs ARIA pour accessibilité -->
<button
  aria-label="Copier le mot de passe dans le presse-papiers"
  aria-describedby="copy-tooltip"
>
  <CopyIcon aria-hidden="true" />
  <span class="sr-only">Copier</span>
</button>

<div
  role="alert"
  aria-live="polite"
  aria-atomic="true"
>
  Mot de passe copié avec succès
</div>

<!-- Badge force du mot de passe -->
<span
  class="strength-badge weak"
  role="status"
  aria-label="Force du mot de passe : Faible"
>
  Faible
</span>
```

**2. Police OpenDyslexic :**
```css
/* ✅ Intégration police dyslexie */
@font-face {
  font-family: 'OpenDyslexic';
  src: url('/fonts/OpenDyslexic-Regular.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Option utilisateur dans settings */
body.dyslexic-mode {
  font-family: 'OpenDyslexic', sans-serif;
}
```

**3. Code Couleur + Texte :**
```css
/* ✅ Force mot de passe : couleur + texte */
.strength-weak {
  background: var(--danger);
  color: white;
}
.strength-weak::before {
  content: "⚠️ "; /* Icon + texte */
}
```

**4. Navigation Clavier :**
```javascript
// ✅ Gestion focus et raccourcis clavier
const handleKeyDown = (e) => {
  // Cmd/Ctrl + K : Recherche
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    searchInputRef.current?.focus();
  }

  // Échap : Fermer modal
  if (e.key === 'Escape') {
    closeModal();
  }

  // Tab : Navigation focus trap dans modal
  if (e.key === 'Tab' && isModalOpen) {
    trapFocus(e);
  }
};
```

**Checklist Accessibilité :**
- [ ] Test avec VoiceOver (Mac) / NVDA (Windows)
- [ ] Navigation complète au clavier (aucune souris)
- [ ] Police OpenDyslexic téléchargée et intégrée
- [ ] Ratio contraste ≥ 4.5:1 (WCAG AA)
- [ ] Validation avec [WAVE](https://wave.webaim.org/)
- [ ] Validation avec [axe DevTools](https://www.deque.com/axe/)

---

### **C1.d : Architecture CSS Réutilisable**

#### **Critères d'évaluation :**
- ✅ **Nommage pertinent** : Classes CSS avec approche flexible et réutilisable
- ✅ **Organisation** : Code CSS organisé et commenté
- ✅ **Thématiques** : Classes regroupées par thématiques
- ✅ **Synthétique** : Code CSS sans répétitions (DRY)

#### **Implémentation PassForge :**

**1. System de Classes Utilitaires :**
```css
/* ===================================
   DESIGN SYSTEM - UTILITIES
   =================================== */

/* --- Spacing utilities --- */
.mt-sm { margin-top: var(--spacing-sm); }
.mt-md { margin-top: var(--spacing-md); }
.mt-lg { margin-top: var(--spacing-lg); }

.p-sm { padding: var(--spacing-sm); }
.p-md { padding: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }

/* --- Flexbox utilities --- */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-sm { gap: var(--spacing-sm); }
.gap-md { gap: var(--spacing-md); }

/* --- Typography utilities --- */
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-sm { font-size: 0.875rem; }
.text-md { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.font-medium { font-weight: 500; }
.font-bold { font-weight: 700; }

/* --- Screen reader only --- */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**2. Organisation Thématique :**
```css
/* ===================================
   COMPONENTS - BUTTONS
   =================================== */

/* Base button styles */
.btn {
  /* Réutilisable pour tous les boutons */
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

/* Button variants (DRY - héritage) */
.btn-primary {
  background: var(--primary-500);
  color: white;
}
.btn-danger {
  background: var(--danger);
  color: white;
}
.btn-ghost {
  background: transparent;
  color: var(--text-primary);
}

/* Button sizes */
.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.875rem;
}
.btn-md {
  padding: var(--spacing-sm) var(--spacing-md);
}
.btn-lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 1.125rem;
}

/* ===================================
   COMPONENTS - CARDS
   =================================== */

/* Base card (réutilisable) */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  transition: all var(--transition-normal);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Card variants */
.card-primary { border-left: 4px solid var(--primary-500); }
.card-danger { border-left: 4px solid var(--danger); }
```

**Checklist Architecture CSS :**
- [ ] Variables CSS pour toutes les valeurs répétées
- [ ] Classes utilitaires créées (spacing, flex, typography)
- [ ] Composants réutilisables avec variants
- [ ] Commentaires par sections thématiques
- [ ] Aucune duplication de code (DRY)
- [ ] Nommage BEM ou convention cohérente

---

### **C1.e : Référencement Naturel (SEO)**

#### **Critères d'évaluation :**
- ✅ **Hiérarchie** : Textes hiérarchisés et correctement titrés (H1, H2, H3...)
- ✅ **Expressions clés** : Mises en exergue (strong, em)
- ✅ **Schema.org** : Balisage d'enrichissement de contenu compris
- ✅ **Sémantique** : Balises `<article>`, `<aside>`, `<nav>` respectées
- ✅ **Meta tags** : Uniques par page, nombre de caractères optimisé
- ✅ **Canonical** : Pages canoniques renseignées
- ✅ **Alt & Title** : Attributs alternatifs des images et titres des liens présents
- ✅ **Performance** : Temps de chargement optimisés (images, sprites)
- ✅ **Favicon** : Intégré
- ✅ **Navigation** : Implémentée entre pages
- ✅ **Ancres** : Utilisées pour navigation intra-page

#### **Implémentation PassForge :**

**1. Hiérarchie & Sémantique :**
```html
<!-- ✅ Structure hiérarchique correcte -->
<main>
  <h1>PassForge - Gestionnaire de Mots de Passe Sécurisé</h1>

  <section>
    <h2>Mes Coffres-Forts</h2>

    <article>
      <h3>Coffre Personnel</h3>
      <p>
        Stockez vos <strong>mots de passe</strong> en toute
        <em>sécurité</em> avec un chiffrement AES-256.
      </p>
    </article>
  </section>

  <aside>
    <h2>Score de Sécurité</h2>
    <!-- Analytics -->
  </aside>
</main>
```

**2. Meta Tags (Next.js) :**
```javascript
// ✅ app/layout.jsx
export const metadata = {
  title: 'PassForge - Gestionnaire Mots de Passe Sécurisé | Chiffrement Client',
  description: 'PassForge : gestionnaire de mots de passe gratuit avec chiffrement AES-256 côté client. Forgez et stockez vos identifiants en toute sécurité. Open source.',
  keywords: 'gestionnaire mot de passe, password manager, chiffrement, sécurité, AES-256, open source',
  openGraph: {
    title: 'PassForge - Forgez vos mots de passe sécurisés',
    description: 'Gestionnaire de mots de passe avec chiffrement client-side',
    url: 'https://passforge.app',
    siteName: 'PassForge',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://passforge.app',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// ✅ app/dashboard/page.jsx
export const metadata = {
  title: 'Dashboard | PassForge',
  description: 'Gérez vos mots de passe et consultez vos statistiques de sécurité',
  alternates: {
    canonical: 'https://passforge.app/dashboard',
  },
};
```

**3. Images & Links :**
```html
<!-- ✅ Alt text descriptif -->
<img
  src="/logo.png"
  alt="PassForge - Logo du gestionnaire de mots de passe sécurisé"
  width="200"
  height="50"
  loading="lazy"
/>

<!-- ✅ Title sur les liens -->
<a
  href="/dashboard"
  title="Accéder à votre tableau de bord PassForge"
>
  Mon Dashboard
</a>
```

**4. Schema.org (JSON-LD) :**
```javascript
// ✅ app/layout.jsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PassForge",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": "Gestionnaire de mots de passe avec chiffrement AES-256 côté client",
    "author": {
      "@type": "Organization",
      "name": "PassForge Team"
    }
  })}
</script>
```

**5. Navigation & Ancres :**
```html
<!-- ✅ Navigation entre pages -->
<nav aria-label="Navigation principale">
  <ul>
    <li><a href="/">Accueil</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/settings">Paramètres</a></li>
  </ul>
</nav>

<!-- ✅ Ancres pour navigation intra-page -->
<nav aria-label="Table des matières">
  <ul>
    <li><a href="#passwords">Mes Mots de Passe</a></li>
    <li><a href="#security">Sécurité</a></li>
    <li><a href="#analytics">Statistiques</a></li>
  </ul>
</nav>

<section id="passwords">
  <h2>Mes Mots de Passe</h2>
</section>
```

**6. Performance Images :**
```javascript
// ✅ Next.js Image optimization
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Interface PassForge"
  width={1200}
  height={600}
  priority // Above fold
  quality={85} // Compression
/>

// ✅ Lazy loading
<img
  src="/icon.png"
  alt="Icon"
  loading="lazy"
/>
```

**Checklist SEO :**
- [ ] H1 unique par page
- [ ] Hiérarchie H1 > H2 > H3 respectée
- [ ] Meta title : 50-60 caractères
- [ ] Meta description : 150-160 caractères
- [ ] Canonical URL sur chaque page
- [ ] Alt text sur toutes les images
- [ ] Title sur tous les liens externes
- [ ] Favicon + Apple touch icon
- [ ] Schema.org JSON-LD implémenté
- [ ] Images optimisées (WebP, compression)
- [ ] Lighthouse SEO score > 90

---

### **C2.a : JavaScript - Interactivité & Animations**

#### **Critères d'évaluation :**
- ✅ **Syntaxes modernes** : ES5, ES6+ et fonctions natives maîtrisées
- ✅ **Manipulation DOM** : Contenu et style maîtrisés
- ✅ **Animations** : Améliorent l'expérience utilisateur
- ✅ **Cross-browser** : Comportements gérés sur différents navigateurs
- ✅ **Paradigmes** : Programmation procédurale, fonctionnelle, OOP, événementielle

#### **Implémentation PassForge :**

**1. Syntaxes ES6+ :**
```javascript
// ✅ Destructuring, spread, arrow functions
const PasswordItem = ({ credential, onEdit, onDelete }) => {
  const { title, username, strength, ...rest } = credential;

  // Template literals
  const strengthClass = `badge badge-${strength}`;

  // Optional chaining
  const url = credential.url?.toLowerCase();

  // Nullish coalescing
  const displayName = credential.title ?? 'Sans titre';

  return (
    <div className={strengthClass}>
      {/* ... */}
    </div>
  );
};

// ✅ Array methods modernes
const weakPasswords = credentials.filter(c => c.strength === 'weak');
const totalStrength = credentials.reduce((acc, c) => acc + c.score, 0);
const passwordTitles = credentials.map(c => c.title);
```

**2. Manipulation DOM :**
```javascript
// ✅ Copie dans le presse-papiers
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);

    // Manipulation DOM pour feedback visuel
    const button = document.getElementById('copy-btn');
    button.classList.add('copied');
    button.textContent = '✓ Copié !';

    // Réinitialisation après 2s
    setTimeout(() => {
      button.classList.remove('copied');
      button.textContent = 'Copier';
    }, 2000);
  } catch (err) {
    console.error('Erreur copie :', err);
  }
};

// ✅ Toggle dark mode (manipulation style)
const toggleDarkMode = () => {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};
```

**3. Animations JavaScript :**
```javascript
// ✅ Animation score de sécurité
const animateSecurityScore = (targetScore) => {
  const scoreElement = document.getElementById('security-score');
  let currentScore = 0;
  const duration = 1000; // 1 seconde
  const increment = targetScore / (duration / 16); // 60fps

  const animate = () => {
    currentScore += increment;

    if (currentScore < targetScore) {
      scoreElement.textContent = Math.floor(currentScore);
      requestAnimationFrame(animate);
    } else {
      scoreElement.textContent = targetScore;
    }
  };

  requestAnimationFrame(animate);
};

// ✅ Intersection Observer pour animations au scroll
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
};
```

**4. Programmation Événementielle :**
```javascript
// ✅ Event listeners avec delegation
const PasswordList = () => {
  const handlePasswordActions = (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    const passwordId = button.dataset.id;

    switch (action) {
      case 'copy':
        copyPassword(passwordId);
        break;
      case 'edit':
        editPassword(passwordId);
        break;
      case 'delete':
        deletePassword(passwordId);
        break;
    }
  };

  useEffect(() => {
    const list = document.getElementById('password-list');
    list.addEventListener('click', handlePasswordActions);

    return () => {
      list.removeEventListener('click', handlePasswordActions);
    };
  }, []);
};
```

**Checklist JavaScript :**
- [ ] ES6+ : destructuring, spread, arrow functions
- [ ] Array methods : map, filter, reduce
- [ ] Async/await pour opérations asynchrones
- [ ] Event delegation pour performance
- [ ] RequestAnimationFrame pour animations
- [ ] Gestion erreurs avec try/catch
- [ ] Tests sur Chrome, Firefox, Safari, Edge

---

### **C2.b : Validation Formulaires**

#### **Critères d'évaluation :**
- ✅ **Validation temps réel** : Données contrôlées pendant la saisie
- ✅ **Méthodes cohérentes** : En fonction de la nature des données
- ✅ **Blocage envoi** : Uniquement si format attendu respecté
- ✅ **Messages d'erreur** : Préviennent l'utilisateur des corrections à apporter

#### **Implémentation PassForge :**

**1. Validation Temps Réel :**
```javascript
// ✅ Custom hook de validation
const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return '';

    // Validation en temps réel
    if (rule.required && !value) {
      return 'Ce champ est requis';
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `Minimum ${rule.minLength} caractères`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Format invalide';
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    // Validation temps réel si champ déjà touché
    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isValid = () => {
    return Object.values(errors).every(error => !error);
  };

  return { values, errors, touched, handleChange, handleBlur, isValid };
};
```

**2. Expressions Régulières :**
```javascript
// ✅ Règles de validation avec regex
const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Adresse email invalide'
  },

  password: {
    required: true,
    minLength: 12,
    custom: (value) => {
      // Validation complexe
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!hasUpperCase) return 'Doit contenir une majuscule';
      if (!hasLowerCase) return 'Doit contenir une minuscule';
      if (!hasNumber) return 'Doit contenir un chiffre';
      if (!hasSymbol) return 'Doit contenir un symbole';

      return '';
    }
  },

  url: {
    pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/,
    message: 'URL invalide (format: https://example.com)'
  },

  username: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_.-]+$/,
    message: 'Lettres, chiffres, -, _ et . uniquement'
  }
};
```

**3. Formulaire avec Feedback :**
```javascript
// ✅ Composant formulaire avec validation
const AddPasswordForm = ({ onSubmit }) => {
  const { values, errors, touched, handleChange, handleBlur, isValid } =
    useFormValidation(
      { title: '', username: '', password: '', url: '' },
      validationRules
    );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Blocage si invalide
    if (!isValid()) {
      alert('Veuillez corriger les erreurs avant de soumettre');
      return;
    }

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="title">
          Titre <span className="required">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.title && touched.title ? 'error' : ''}
          aria-invalid={errors.title && touched.title ? 'true' : 'false'}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && touched.title && (
          <span id="title-error" className="error-message" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      {/* Indicateur de force du mot de passe */}
      <div className="form-group">
        <label htmlFor="password">
          Mot de passe <span className="required">*</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby="password-strength password-error"
        />

        <PasswordStrengthIndicator password={values.password} />

        {errors.password && touched.password && (
          <span id="password-error" className="error-message" role="alert">
            {errors.password}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!isValid()}
        aria-disabled={!isValid()}
      >
        Ajouter le mot de passe
      </button>
    </form>
  );
};
```

**Checklist Validation :**
- [ ] Validation temps réel après première saisie
- [ ] Expressions régulières pour email, URL, etc.
- [ ] Messages d'erreur clairs et spécifiques
- [ ] Attributs ARIA pour accessibilité (aria-invalid, aria-describedby)
- [ ] Bouton submit désactivé si formulaire invalide
- [ ] Indicateur visuel de force du mot de passe
- [ ] Prévention submit si invalide (preventDefault)

---

### **C2.c : Requêtes Asynchrones (API)**

#### **Critères d'évaluation :**
- ✅ **Fonctionnelles** : Requêtes asynchrones correctement implémentées
- ✅ **Sécurité** : Pas d'exposition de données sensibles
- ✅ **Traitement réponses** : Réponses serveur utilisées
- ✅ **Gestion erreurs** : Erreurs traitées sans interruption du script

#### **Implémentation PassForge :**

**1. Requêtes avec Fetch API :**
```javascript
// ✅ Wrapper pour requêtes API
const apiClient = {
  async get(endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin', // Sécurité
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error('API Error:', error);
      return { data: null, error: error.message };
    }
  },

  async post(endpoint, body) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'same-origin',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error('API Error:', error);
      return { data: null, error: error.message };
    }
  }
};
```

**2. Vérification Mots de Passe Compromis (HaveIBeenPwned API) :**
```javascript
// ✅ API externe pour vérifier fuites de données
const checkPasswordBreach = async (password) => {
  try {
    // 1. Hash SHA-1 du mot de passe
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const hashUpper = hashHex.toUpperCase();

    // 2. K-anonymity : envoyer seulement les 5 premiers caractères
    const prefix = hashUpper.slice(0, 5);
    const suffix = hashUpper.slice(5);

    // 3. Requête API (pas de mot de passe en clair !)
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        method: 'GET',
        headers: { 'User-Agent': 'PassForge' }
      }
    );

    if (!response.ok) {
      throw new Error('API unavailable');
    }

    const text = await response.text();

    // 4. Vérifier si le suffixe est dans les résultats
    const hashes = text.split('\n');
    const found = hashes.find(line => line.startsWith(suffix));

    if (found) {
      const count = parseInt(found.split(':')[1]);
      return {
        breached: true,
        count,
        message: `⚠️ Ce mot de passe a été compromis ${count} fois !`
      };
    }

    return { breached: false };
  } catch (error) {
    console.error('Breach check error:', error);
    // Échec silencieux : ne pas bloquer l'utilisateur
    return { breached: false, error: true };
  }
};
```

**3. Gestion d'État Asynchrone (React) :**
```javascript
// ✅ Custom hook pour requêtes asynchrones
const useAsync = (asyncFunction) => {
  const [status, setStatus] = useState('idle'); // idle, pending, success, error
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...params) => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction(...params);
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);

  return { execute, status, data, error };
};

// Utilisation
const PasswordChecker = () => {
  const { execute, status, data, error } = useAsync(checkPasswordBreach);

  const handleCheck = async () => {
    const password = inputRef.current.value;
    await execute(password);
  };

  return (
    <div>
      <input ref={inputRef} type="password" />
      <button onClick={handleCheck} disabled={status === 'pending'}>
        {status === 'pending' ? 'Vérification...' : 'Vérifier'}
      </button>

      {status === 'success' && data?.breached && (
        <div className="alert alert-danger" role="alert">
          {data.message}
        </div>
      )}

      {status === 'success' && !data?.breached && (
        <div className="alert alert-success" role="alert">
          ✓ Mot de passe sécurisé (aucune fuite détectée)
        </div>
      )}

      {status === 'error' && (
        <div className="alert alert-warning" role="alert">
          Impossible de vérifier. Continuez quand même.
        </div>
      )}
    </div>
  );
};
```

**Checklist Requêtes Asynchrones :**
- [ ] Async/await pour toutes les requêtes
- [ ] Gestion try/catch systématique
- [ ] Pas de données sensibles en clair dans URLs
- [ ] Headers sécurisés (Content-Type, CORS)
- [ ] Loading states (pending, success, error)
- [ ] Feedback utilisateur pour chaque état
- [ ] Timeout pour requêtes longues
- [ ] Retry logic pour erreurs réseau

---

### **C2.d : Librairies JavaScript Externes**

#### **Critères d'évaluation :**
- ✅ **Problématique spécifique** : Librairie répond à un besoin précis
- ✅ **Implémentation correcte** : D'après la documentation officielle
- ✅ **Compréhension** : Expliquer le fonctionnement global et l'utilisation

#### **Implémentation PassForge :**

**1. Zustand (State Management) :**

**Problématique** : Gérer l'état global de l'application (credentials, user, session) sans prop drilling.

```javascript
// ✅ stores/passforgeStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * ZUSTAND STORE - Gestion de l'état global du vault
 *
 * Pourquoi Zustand ?
 * - Plus simple que Redux (moins de boilerplate)
 * - Performance optimale (re-render uniquement composants concernés)
 * - Middleware persist pour localStorage
 * - TypeScript support (si migration future)
 *
 * Documentation : https://zustand-demo.pmnd.rs/
 */

const usePassForgeStore = create(
  persist(
    (set, get) => ({
      // État
      credentials: [],
      isLocked: true,
      masterPasswordHash: null,
      searchQuery: '',
      selectedFolder: 'all',

      // Actions
      addCredential: (credential) =>
        set((state) => ({
          credentials: [...state.credentials, credential]
        })),

      updateCredential: (id, updates) =>
        set((state) => ({
          credentials: state.credentials.map(c =>
            c.id === id ? { ...c, ...updates } : c
          )
        })),

      deleteCredential: (id) =>
        set((state) => ({
          credentials: state.credentials.filter(c => c.id !== id)
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedFolder: (folder) => set({ selectedFolder: folder }),

      lockVault: () => set({ isLocked: true }),

      unlockVault: () => set({ isLocked: false }),

      // Computed (selector)
      getFilteredCredentials: () => {
        const { credentials, searchQuery, selectedFolder } = get();

        return credentials.filter(c => {
          // Filtre par recherche
          const matchesSearch =
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.username.toLowerCase().includes(searchQuery.toLowerCase());

          // Filtre par dossier
          const matchesFolder =
            selectedFolder === 'all' || c.folder === selectedFolder;

          return matchesSearch && matchesFolder;
        });
      },
    }),
    {
      name: 'passforge-storage', // Key dans localStorage
      partialState: (state) => ({
        // Ne persister que certaines données (pas isLocked)
        credentials: state.credentials,
        masterPasswordHash: state.masterPasswordHash,
      }),
    }
  )
);

export default usePassForgeStore;
```

**Utilisation dans composants :**
```javascript
// ✅ Consommer le store dans un composant
const PasswordList = () => {
  // Sélectionner uniquement les données nécessaires (optimization)
  const credentials = usePassForgeStore((state) => state.getFilteredCredentials());
  const deleteCredential = usePassForgeStore((state) => state.deleteCredential);

  return (
    <div>
      {credentials.map(credential => (
        <PasswordItem
          key={credential.id}
          credential={credential}
          onDelete={() => deleteCredential(credential.id)}
        />
      ))}
    </div>
  );
};
```

---

**2. Recharts (Visualisation de Données) :**

**Problématique** : Afficher des graphiques pour le dashboard analytics (score de sécurité, évolution temporelle).

```javascript
// ✅ components/SecurityDashboard.jsx
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * RECHARTS - Librairie de charts React
 *
 * Pourquoi Recharts ?
 * - Composants React natifs (pas de manipulation DOM manuelle)
 * - Responsive par défaut
 * - Nombreux types de charts (Line, Bar, Pie, Area...)
 * - Customisation facile avec props
 * - SVG-based (performance + accessibilité)
 *
 * Documentation : https://recharts.org/en-US/
 */

const SecurityDashboard = () => {
  const credentials = usePassForgeStore((state) => state.credentials);

  // Données pour graphique de répartition des forces
  const strengthData = [
    { name: 'Faible', value: credentials.filter(c => c.strength === 'weak').length, color: '#ef4444' },
    { name: 'Moyen', value: credentials.filter(c => c.strength === 'medium').length, color: '#f59e0b' },
    { name: 'Fort', value: credentials.filter(c => c.strength === 'strong').length, color: '#22c55e' },
  ];

  // Données pour évolution du score dans le temps
  const evolutionData = [
    { month: 'Jan', score: 45 },
    { month: 'Fév', score: 52 },
    { month: 'Mar', score: 68 },
    { month: 'Avr', score: 75 },
    { month: 'Mai', score: 82 },
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard Sécurité</h2>

      {/* Graphique en camembert - Répartition des forces */}
      <section aria-labelledby="strength-chart">
        <h3 id="strength-chart">Répartition des Mots de Passe</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={strengthData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {strengthData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Graphique linéaire - Évolution du score */}
      <section aria-labelledby="evolution-chart">
        <h3 id="evolution-chart">Évolution du Score de Sécurité</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={evolutionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default SecurityDashboard;
```

---

**3. Lucide React (Icônes) :**

**Problématique** : Icônes modernes, cohérentes et accessibles pour l'interface.

```javascript
// ✅ Utilisation de Lucide React
import { Lock, Unlock, Copy, Eye, EyeOff, Trash2, Edit3, Plus, Search, Settings, LogOut } from 'lucide-react';

/**
 * LUCIDE REACT - Librairie d'icônes
 *
 * Pourquoi Lucide ?
 * - Icônes SVG modernes et cohérentes
 * - Composants React (props size, color, strokeWidth...)
 * - Léger (tree-shaking : import uniquement icônes utilisées)
 * - Accessible (attributs aria par défaut)
 * - Fork maintenu de Feather Icons
 *
 * Documentation : https://lucide.dev/
 */

const PasswordItem = ({ credential, onCopy, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-item">
      <div className="password-info">
        <Lock size={20} color="#3b82f6" aria-hidden="true" />
        <span>{credential.title}</span>
      </div>

      <div className="password-actions">
        <button
          onClick={onCopy}
          aria-label="Copier le mot de passe"
        >
          <Copy size={18} />
        </button>

        <button
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Masquer" : "Afficher"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        <button
          onClick={onEdit}
          aria-label="Modifier"
        >
          <Edit3 size={18} />
        </button>

        <button
          onClick={onDelete}
          className="btn-danger"
          aria-label="Supprimer"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
```

---

**Checklist Librairies :**
- [ ] **Zustand** : Store créé, actions définies, utilisé dans composants
- [ ] **Recharts** : 2-3 types de charts implémentés (Pie, Line, Bar)
- [ ] **Lucide React** : Icônes cohérentes dans toute l'app
- [ ] Documentation de chaque librairie lue et comprise
- [ ] Commentaires expliquant le "pourquoi" de chaque librairie
- [ ] Capacité à expliquer à l'oral le fonctionnement et les avantages

---

## 🎯 Checklist Globale de Certification

### ✅ **HTML/CSS (C1.a - C1.e)**
- [ ] HTML valide W3C (0 erreurs)
- [ ] CSS valide W3C (0 erreurs)
- [ ] Balises sémantiques (header, main, article, aside, nav)
- [ ] Responsive (mobile 320px, tablette 768px, desktop 1024px+)
- [ ] Accessibilité (WCAG AA, navigation clavier, screen reader)
- [ ] Police OpenDyslexic intégrée et activable
- [ ] Classes CSS réutilisables et organisées (variables CSS, thématiques)
- [ ] SEO optimisé (meta tags, alt, title, Schema.org, canonical)
- [ ] Favicon intégré
- [ ] Lighthouse score > 90 (performance, accessibility, SEO)

### ✅ **JavaScript (C2.a - C2.d)**
- [ ] ES6+ syntax (destructuring, spread, arrow functions, async/await)
- [ ] Manipulation DOM (querySelector, classList, textContent...)
- [ ] Animations JavaScript (requestAnimationFrame, IntersectionObserver)
- [ ] Validation formulaires temps réel (regex, messages d'erreur)
- [ ] Requêtes asynchrones (fetch API, gestion erreurs, try/catch)
- [ ] API externe (HaveIBeenPwned pour vérification breaches)
- [ ] Librairies externes documentées (Zustand, Recharts, Lucide)

### ✅ **React/Next.js**
- [ ] Composants fonctionnels avec hooks
- [ ] State management avec Zustand
- [ ] Forms avec validation
- [ ] Routing Next.js App Router
- [ ] CSS Modules pour tous les composants

### ✅ **Documentation & Présentation**
- [ ] Code commenté (français, explications claires)
- [ ] README avec instructions de lancement
- [ ] Documentation des choix techniques
- [ ] Préparation démo 5 minutes

---

## 🔄 Migration Path vers MetaVault Rust

### Architecture Preparation

**React Learnings for Rust Migration :**
- **State Management Patterns** → Zustand concepts vers Rust state
- **Crypto Implementation** → Web Crypto vers native Rust crypto
- **Component Architecture** → React components vers Dioxus components
- **Storage Layer** → IndexedDB vers SQLCipher

### Code Reusability

**Assets Réutilisables :**
- ✅ **Design System** → CSS vers Tailwind Dioxus
- ✅ **UX Flows** → Logic flows identical
- ✅ **Security Patterns** → Crypto algorithms same
- ✅ **Test Cases** → Business logic tests portable

### Technical Debt Documentation

**Migration Notes :**
```markdown
## React → Rust Migration Plan

### Phase 1: Core Logic Port
- [ ] Crypto utilities (Web Crypto → rust crypto crates)
- [ ] Storage layer (IndexedDB → SQLCipher)
- [ ] State management (Zustand → Rust state patterns)

### Phase 2: UI Components Port
- [ ] Component library (React → Dioxus)
- [ ] Styling system (Tailwind → Dioxus Tailwind)
- [ ] Animations (Framer Motion → CSS animations)

### Phase 3: Advanced Features
- [ ] Add Web3 functionality
- [ ] Implement offline-first sync
- [ ] Add multi-platform support
```

---

## 📚 Documentation & Resources

### Technical Documentation

**Architecture Decision Records (ADRs) :**
- Why Next.js 14 App Router
- State Management: Zustand vs Redux
- Styling: Tailwind vs CSS-in-JS
- Security: Web Crypto API approach

### Learning Resources

**Pour l'Équipe :**
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [React Security Best Practices](https://owasp.org/www-project-reactsecuritybestpractices/)
- [Web Crypto API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Project Templates

**Starter Commands :**
```bash
# Initialize project
npx create-next-app@latest passforge --typescript --tailwind --app

# Install dependencies
npm install zustand framer-motion react-hook-form zod lucide-react

# Development
npm run dev

# Build & deploy
npm run build && npm start
```

---

## 🎯 Conclusion

**PassForge** représente un projet final ambitieux qui démontrera :

1. **🔧 Compétences Techniques** : React/Next.js moderne, TypeScript, sécurité web
2. **🎨 Excellence UI/UX** : Design system cohérent, accessibility, responsive
3. **👥 Collaboration** : Méthodologie agile, code review, documentation
4. **🚀 Innovation** : Features avancées, security focus, performance

Ce projet servira de **foundation solide** pour votre future migration vers MetaVault en Rust, tout en impressionnant les évaluateurs avec une approche professionnelle et des fonctionnalités avancées.

**Success = Foundation technique + UX exceptionnelle + Présentation impactante ! 🏆**

---

*Document créé le 27 septembre 2024 - Version 1.0*
*Projet Final Formation - Équipe de 3 développeurs - 3 semaines*
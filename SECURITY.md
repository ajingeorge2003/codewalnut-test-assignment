# 🔒 Security & Best Practices Guide

## Overview
This document outlines security practices implemented in the Flight Explorer project.

## Environment Variables & Sensitive Data

### ✅ What We Do

1. **API Endpoints in Environment Variables**
   ```typescript
   // ❌ WRONG - Never do this:
   const API_URL = 'https://api.example.com/secret-key-123'
   
   // ✅ CORRECT:
   const API_URL = import.meta.env.VITE_API_BASE_URL
   ```

2. **Environment File Structure**
   - `.env` — Local development (NOT committed)
   - `.env.example` — Template for team (IS committed)
   - `.env.production` — Production settings (NOT committed)
   - `.env.staging` — Staging settings (NOT committed)

3. **Never Commit Sensitive Data**
   - API keys ❌
   - Passwords ❌
   - Secret tokens ❌
   - Database credentials ❌
   - Private URLs ❌

### Files in This Project

```
├── .env                 # ❌ IGNORED - Local config (not in git)
├── .env.example         # ✅ COMMITTED - Template for developers
├── .env.production      # ❌ IGNORED - Production secrets
├── .gitignore          # ✅ COMMITTED - Specifies ignored files
└── src/vite-env.d.ts   # ✅ COMMITTED - Type definitions for env vars
```

## .gitignore Configuration

### What Gets Ignored

```gitignore
# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/

# Dependencies
node_modules/
package-lock.json

# IDE files
.vscode/
.idea/

# Logs
npm-debug.log*
yarn-error.log*
```

### Verify Files Are Ignored

```powershell
# Check what's ignored
git check-ignore -v .env
git check-ignore -v .env.example

# Should show:
# .gitignore:2	.env
# (empty - .env.example is NOT ignored)
```

## Environment Variable Usage

### In TypeScript Code

```typescript
// ✅ CORRECT - Uses type-safe environment variables
const API_BASE = import.meta.env.VITE_API_BASE_URL
const TIMEOUT = import.meta.env.VITE_API_TIMEOUT
const ENV = import.meta.env.VITE_APP_ENV

if (ENV === 'production') {
  // production-specific code
}
```

### In Vite Config

```typescript
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
```

## Setting Up for Different Environments

### Development
```bash
cp .env.example .env
# Edit .env with local values
npm run dev
```

### Staging
```bash
# On staging server:
cp .env.example .env.staging
# Edit with staging values
npm run build -- --mode staging
```

### Production
```bash
# On production server (CI/CD):
# Environment variables set via deployment platform (GitHub Secrets, etc.)
npm run build
```

## GitHub Secrets for CI/CD

### For GitHub Actions

1. **Go to repository Settings → Secrets and variables → Actions**

2. **Add secrets**:
   ```
   VITE_API_BASE_URL=https://prod-api.example.com
   VITE_API_TIMEOUT=15000
   ```

3. **Use in workflow**:
   ```yaml
   - name: Build
     env:
       VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
     run: npm run build
   ```

## Vite Environment Variable Types

### Type Definitions (src/vite-env.d.ts)

```typescript
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_APP_ENV: string
}
```

### Access in Code

```typescript
// ✅ Type-safe with autocomplete
import.meta.env.VITE_API_BASE_URL

// ❌ Not type-safe, avoid
process.env.VITE_API_BASE_URL  // undefined in browser
```

## Security Checklist

### Before Deployment

- ✅ No hardcoded API keys in code
- ✅ No passwords in comments
- ✅ No secrets in git history
- ✅ `.env` files in `.gitignore`
- ✅ `.env.example` shows required variables
- ✅ All team members have `.env` setup
- ✅ Production uses separate credentials
- ✅ Type definitions for all env vars
- ✅ Error messages don't leak sensitive info
- ✅ Build doesn't include `.env` files

### After Deployment

- ✅ Verify secrets not in built files: `grep -r "secret" dist/`
- ✅ Check git history: `git log -p --all | grep -i "password"`
- ✅ Monitor error logs for leaked credentials
- ✅ Rotate secrets periodically
- ✅ Use environment-specific credentials

## Common Mistakes to Avoid

### ❌ Wrong

```typescript
// Hardcoded in code
const API_KEY = 'sk-1234567890'

// In comments
// API key: sk-1234567890

// In commits
git commit -m "Add API key: sk-1234567890"

// In console logs (production)
console.log('API Response:', {
  apiKey: 'sk-1234567890',
  userData: {...}
})
```

### ✅ Correct

```typescript
// Use environment variable
const API_KEY = import.meta.env.VITE_API_KEY

// Document in .env.example
// VITE_API_KEY=your-api-key-here

// Set in deployment platform
// Never commit actual values

// Filter sensitive data from logs
console.log('API Request:', {
  status: 'success',
  // Don't log credentials
})
```

## Remediation if Secrets Leaked

1. **Immediately revoke** the leaked credentials
2. **Remove from git history**: `git-filter-repo --path .env`
3. **Force push** (after notifying team): `git push origin --force-with-lease`
4. **Generate new credentials**
5. **Update** in all environments
6. **Audit logs** for unauthorized access

## References

- [OWASP: Secrets Management](https://owasp.org/www-community/Sensitive_Data_Exposure)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode)
- [GitHub: Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [12 Factor App: Config](https://12factor.net/config)

---

**Status**: ✅ Properly configured with best practices

**Key Points**:
- 🔒 All environment-specific config in `.env`
- 🙅 Sensitive data never committed
- ✅ Type-safe environment variables
- 🛡️ `.gitignore` prevents accidental commits
- 📋 `.env.example` documents required vars

# 🔐 JWT Configuration Guide - SEO Expert Authentication

## 📋 **Configuration Variables Explained**

### **JWT_SECRET**
```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production-make-it-very-long-and-random
```

#### **What is JWT_SECRET?**
- **Secret Key** used to sign and verify JWT tokens
- **Critical security component** - if compromised, attackers can forge tokens
- **Must be kept absolutely secret** and never exposed publicly

#### **Why is it important?**
- **Token Integrity**: Ensures tokens haven't been tampered with
- **Authentication Security**: Prevents unauthorized access
- **Data Protection**: Protects user sessions from hijacking

#### **Production Requirements:**
```env
# ❌ NEVER use this in production
JWT_SECRET=your-super-secret-jwt-key-change-in-production-make-it-very-long-and-random

# ✅ Use something like this instead
JWT_SECRET=Kj8#mN2$pQ9@vX7!zR4&wE6*tY1^uI3%oP5+sA8-lD0=fG2~hB9|cV6<nM4>xZ7
```

#### **How to Generate a Secure JWT_SECRET:**
```bash
# Method 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Method 2: Using OpenSSL
openssl rand -hex 64

# Method 3: Online generator (use with caution)
# Visit: https://generate-secret.vercel.app/64
```

#### **Best Practices:**
- **Minimum 32 characters** (64+ recommended)
- **Mix of letters, numbers, symbols**
- **Different for each environment** (dev, staging, production)
- **Store securely** (environment variables, secret managers)
- **Rotate periodically** for maximum security

---

### **JWT_EXPIRES_IN**
```env
JWT_EXPIRES_IN=7d
```

#### **What is JWT_EXPIRES_IN?**
- **Token Expiration Time** - how long tokens remain valid
- **Security measure** to limit exposure if tokens are compromised
- **Balance between security and user experience**

#### **Time Format Options:**
```env
# Seconds
JWT_EXPIRES_IN=3600        # 1 hour

# Minutes
JWT_EXPIRES_IN=60m         # 60 minutes

# Hours
JWT_EXPIRES_IN=24h         # 24 hours

# Days
JWT_EXPIRES_IN=7d          # 7 days (current setting)

# Weeks
JWT_EXPIRES_IN=2w          # 2 weeks
```

#### **Recommended Settings by Use Case:**

##### **High Security Applications:**
```env
JWT_EXPIRES_IN=1h          # 1 hour - requires frequent re-login
```

##### **Standard Web Applications:**
```env
JWT_EXPIRES_IN=24h         # 1 day - good balance
```

##### **User-Friendly Applications:**
```env
JWT_EXPIRES_IN=7d          # 7 days - current SEO Expert setting
```

##### **Long-Term Applications:**
```env
JWT_EXPIRES_IN=30d         # 30 days - for trusted environments
```

---

## 🛡️ **Security Implications**

### **JWT_SECRET Security:**
- **If compromised**: Attackers can create fake tokens
- **Impact**: Complete authentication bypass
- **Protection**: Keep secret, rotate regularly

### **JWT_EXPIRES_IN Security:**
- **Shorter expiration**: More secure, but less convenient
- **Longer expiration**: More convenient, but higher risk if compromised
- **Balance**: Choose based on your security requirements

---

## 🔧 **Implementation in SEO Expert**

### **How JWT_SECRET is Used:**
```typescript
// In lib/auth-utils.ts
export function generateToken(user: User): string {
  const payload = {
    userId: user.id,
    email: user.email
  }
  
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN  // Uses both variables
  })
}
```

### **Token Verification:**
```typescript
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null  // Token invalid or expired
  }
}
```

---

## 🚀 **Production Setup Guide**

### **Step 1: Generate Secure JWT_SECRET**
```bash
# Generate a 64-character random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **Step 2: Update .env.local**
```env
# Replace with your generated secret
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2

# Adjust expiration based on your needs
JWT_EXPIRES_IN=24h
```

### **Step 3: Environment-Specific Secrets**
```env
# Development
JWT_SECRET=dev-secret-key-not-for-production
JWT_EXPIRES_IN=7d

# Production
JWT_SECRET=super-secure-production-key-64-chars-minimum-with-symbols
JWT_EXPIRES_IN=24h
```

---

## ⚠️ **Security Warnings**

### **NEVER DO THIS:**
```env
# ❌ Using default/example secrets
JWT_SECRET=secret
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# ❌ Committing secrets to version control
# ❌ Sharing secrets in chat/email
# ❌ Using the same secret across environments
```

### **ALWAYS DO THIS:**
```env
# ✅ Use environment-specific secrets
# ✅ Generate cryptographically secure random strings
# ✅ Store in secure environment variables
# ✅ Rotate secrets periodically
# ✅ Use different secrets for dev/staging/production
```

---

## 🔄 **Token Refresh Strategy**

### **Current Implementation:**
- **Single token** with 7-day expiration
- **Automatic re-authentication** required after expiration

### **Enhanced Strategy (Future):**
```typescript
// Implement refresh tokens for better UX
JWT_ACCESS_TOKEN_EXPIRES_IN=1h    // Short-lived access token
JWT_REFRESH_TOKEN_EXPIRES_IN=30d  // Long-lived refresh token
```

---

## 📊 **Monitoring & Maintenance**

### **What to Monitor:**
- **Token expiration rates** - are users being logged out too often?
- **Authentication failures** - potential security issues
- **Token generation frequency** - system performance

### **Regular Maintenance:**
- **Rotate JWT_SECRET** every 3-6 months
- **Review expiration times** based on user feedback
- **Update security practices** as needed

---

## 🎯 **Summary**

The JWT configuration in SEO Expert provides:
- **Secure authentication** with cryptographic signatures
- **Flexible expiration** balancing security and UX
- **Production-ready** architecture with proper secret management
- **Scalable design** for future enhancements

**Current Settings:**
- `JWT_SECRET`: Must be changed to a secure random string in production
- `JWT_EXPIRES_IN=7d`: Tokens valid for 7 days, good balance for SEO tool usage

**Next Steps:**
1. Generate a secure JWT_SECRET for production
2. Consider shorter expiration times for sensitive operations
3. Implement token refresh for better user experience
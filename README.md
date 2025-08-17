<div align="center">

# ⚡ **SEO Expert — SEO Audit Report Generator**

**A modern web solution that provides comprehensive SEO audits, performance analysis, security assessments, and actionable recommendations to optimize your website's search engine visibility and overall digital presence.**

---


[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-11.0-FF6900?style=for-the-badge&logo=lighthouse&logoColor=white)](https://developers.google.com/web/tools/lighthouse)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-21.0-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)](https://pptr.dev/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)


</div>

---

## 🎯 **What is SEO Expert?**

**SEO Expert** SEO Expert is a modern web application designed to revolutionize how businesses approach search engine optimization. Built with cutting-edge web technologies, this platform provides comprehensive website analysis that goes beyond basic SEO checks, incorporating advanced security assessments and privacy-first practices.

### **🌟 Core Purpose**
Transform your website's performance with data-driven insights that matter. Our platform analyzes your website across multiple dimensions - from technical SEO fundamentals and security vulnerabilities to user experience optimization - delivering actionable recommendations that drive real results while maintaining the highest standards of data protection and privacy.

### **🎯 Target Audience**
- **Digital Marketing Agencies** - Streamline client reporting and analysis
- **Web Developers** - Integrate SEO best practices into development workflow  
- **Business Owners** - Understand and improve online presence
- **SEO Professionals** - Access advanced analytics and reporting tools
- **Content Creators** - Optimize content for better search visibility

---

## 📋 **Table of Contents**

<details>
<summary>Click to expand navigation</summary>

- [🎯 What is SEO Expert?](#-what-is-seo-expert)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Quick Start Guide](#-quick-start-guide)
- [📖 Usage & Examples](#-usage--examples)
- [🔧 Configuration](#-configuration)
- [🌐 API Documentation](#-api-documentation)
- [📁 Project Structure](#-project-structure)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

</details>

---

## ✨ **Key Features**

<table>
<tr>
<td width="50%">

### 🔍 **Advanced SEO Analysis**
- **Technical SEO Audit** - Meta tags, headers, schema markup
- **Core Web Vitals** - Simulated LCP, FID, CLS performance metrics
- **Mobile Optimization** - Responsive design analysis
- **Content Quality** - Keyword density, readability scores
- **Comprehensive Security Assessment** - HTTPS, security headers, SSL/TLS validation, vulnerability scanning
- **Accessibility Check** - WCAG compliance evaluation
- **Privacy & Data Protection** - GDPR compliance analysis, cookie policy validation

</td>
<td width="50%">

### 📊 **Intelligent Reporting**
- **Interactive Dashboard** - Real-time visual analytics
- **PDF Report Generation** - Professional downloadable reports
- **Screenshot Capture** - Desktop, tablet & mobile visual comparisons
- **Historical Tracking** - Performance trend analysis
- **Custom Branding** - White-label report options
- **Multi-language Support** - Internationalization ready

</td>
</tr>
<tr>
<td width="50%">

### 🔐 **Authentication & User Management**
- **JWT-Based Authentication** - Secure token-based login system
- **Password Security** - bcrypt hashing with strength validation
- **User Registration** - Professional sign-up with email verification
- **Profile Management** - Complete user profile with photo upload
- **Session Management** - Secure token handling and refresh
- **Password Recovery** - Secure password reset functionality

</td>
<td width="50%">

### 🎨 **Modern User Experience**
- **Responsive Design** - Seamless cross-device experience
- **Dark/Light Themes** - Customizable interface preferences
- **Real-time Updates** - Live audit progress tracking
- **Accessibility First** - WCAG 2.1 AA compliant
- **Progressive Web App** - Offline capability support
- **Fast Loading** - Optimized for performance

</td>
</tr>
<tr>
<td width="50%">

### 🤖 **Data-Driven Insights**
- **Smart Recommendations** - Prioritized action items
- **Competitive Analysis** - Industry benchmarking
- **Technical Issue Detection** - Automated problem identification
- **ROI Calculation** - Impact estimation for improvements
- **Backlink Analysis** - Domain authority evaluation
- **Social Signals** - Social media integration

</td>
<td width="50%">

### 👤 **User Dashboard**
- **Personalized Dashboard** - User-specific analytics and reports
- **Audit History** - Track all previous SEO audits
- **Account Management** - Profile settings and preferences
- **Report Downloads** - Access to all generated reports
- **Usage Statistics** - Monitor account activity and limits
- **Notification Center** - Important updates and alerts

</td>
</tr>
</table>

---

## 🏗️ **Architecture**

<div align="center">

```mermaid
graph TB
    A[User Interface] --> B[Next.js Frontend]
    B --> C[Authentication System]
    C --> D[JWT Tokens]
    B --> E[API Routes]
    E --> F[SEO Analysis Engine]
    F --> G[Puppeteer Analysis]
    F --> H[Multi-Device Screenshots]
    F --> I[Content Analysis]
    E --> J[Report Generation]
    J --> P[SEO Report Visualization]
    J --> K[PDF Export]
    J --> L[Email Delivery]
    E --> M[User Management]
    M --> N[Profile Management]
    M --> O[Dashboard Analytics]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style E fill:#e8f5e8
    style F fill:#fff3e0
```

</div>

### **🔄 Data Flow**
1. **User Authentication** - JWT-based secure login and registration
2. **Input Processing** - URL validation and preprocessing
3. **Multi-threaded Analysis** - Parallel execution of audit components
4. **Data Aggregation** - Consolidation of analysis results
5. **Report Generation** - Dynamic PDF and visual report creation
6. **User Dashboard** - Personalized analytics and audit history
7. **Delivery System** - Email distribution and download options

---

## 🛠️ **Technology Stack**

<div align="center">

### **Frontend Technologies**
| Technology | Version | Purpose |
|------------|---------|---------|
| ![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js) | `^14.0.0` | React framework with App Router |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript) | `^5.0.0` | Type-safe development |
| ![React](https://img.shields.io/badge/React-18.0-blue?logo=react) | `^18.0.0` | UI component library |
| ![Tailwind](https://img.shields.io/badge/Tailwind-3.3-teal?logo=tailwind-css) | `^3.3.0` | Utility-first CSS framework |

### **Backend & Analysis**
| Technology | Version | Purpose |
|------------|---------|---------|
| ![Puppeteer](https://img.shields.io/badge/Puppeteer-21.0-green?logo=puppeteer) | `^21.0.0` | Browser automation & screenshots |
| ![Lighthouse](https://img.shields.io/badge/Lighthouse-11.0-orange?logo=lighthouse) | `^11.0.0` | Performance & SEO auditing |
| ![Node.js](https://img.shields.io/badge/Node.js-20.0-green?logo=node.js) | `^20.0.0` | Runtime environment |
| ![Cheerio](https://img.shields.io/badge/Cheerio-1.0-yellow) | `^1.0.0` | Server-side HTML parsing |
| ![Axios](https://img.shields.io/badge/Axios-1.11-purple) | `^1.11.0` | HTTP client |
| ![JWT](https://img.shields.io/badge/JWT-9.0-black?logo=jsonwebtokens) | `^9.0.2` | Authentication tokens |
| ![bcrypt](https://img.shields.io/badge/bcrypt-3.0-red) | `^3.0.2` | Password hashing |
| ![Nodemailer](https://img.shields.io/badge/Nodemailer-7.0-blue) | `^7.0.5` | Email service |

### **UI & Visualization**
| Technology | Version | Purpose |
|------------|---------|---------|
| ![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-Latest-black) | `Latest` | Component library |
| ![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-purple) | `Latest` | Headless UI primitives |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-pink) | `^10.16.16` | Animation library |
| ![Chart.js](https://img.shields.io/badge/Chart.js-4.4-red) | `^4.4.0` | Data visualization |
| ![Lucide React](https://img.shields.io/badge/Lucide-0.294-blue) | `^0.294.0` | Icon library |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.48-pink) | `^7.48.2` | Form validation |
| ![Zod](https://img.shields.io/badge/Zod-3.22-blue) | `^3.22.4` | Schema validation |
| ![CVA](https://img.shields.io/badge/CVA-0.7-green) | `^0.7.0` | Component variants |

</div>

---

## 🚀 **Quick Start Guide**

### **📋 Prerequisites**

Before you begin, ensure you have the following installed:

```bash
# Check Node.js version (required: 18.0+)
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

### **⚡ Installation**

<details>
<summary><strong>Step 1: Clone Repository</strong></summary>

```bash
# Clone the repository
git clone https://github.com/your-username/seo-expert.git

# Navigate to project directory
cd seo-expert

# Verify project structure
ls -la
```

</details>

<details>
<summary><strong>Step 2: Install Dependencies</strong></summary>

```bash
# Install with npm (recommended)
npm install

# Or with yarn
yarn install

# Or with pnpm (fastest)
pnpm install

# Verify installation
npm list --depth=0
```

</details>

<details>
<summary><strong>Step 3: Environment Configuration</strong></summary>

```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

**Required Environment Variables:**
```env
# Email Configuration (Required for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# JWT Configuration (Required for authentication)
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
JWT_EXPIRES_IN=7d

# Application Configuration (Optional)
NEXTAUTH_URL=http://localhost:3000
```

</details>

<details>
<summary><strong>Step 4: Launch Development Server</strong></summary>

```bash
# Start development server
npm run dev

# Or with custom port
npm run dev -- --port 3001

```

**Expected Output:**
```
✓ Ready in 2.3s
✓ Local:    http://localhost:3000
✓ Network:  http://192.168.1.100:3000
```

</details>

### **🎉 Verification**

Open your browser and navigate to [http://localhost:3000](http://localhost:3000). You should see the SEO Expert homepage with:

- ✅ Responsive navigation header
- ✅ Hero section with audit form
- ✅ Feature showcase
- ✅ Footer with links

---

## 📖 **Usage & Examples**

### **🔍 Basic SEO Audit**

<details>
<summary><strong>Web Interface Usage</strong></summary>

1. **Navigate to Homepage**
   ```
   http://localhost:3000
   ```

2. **Enter Website Details**
   - **URL**: `https://example.com`
   - **Email**: `your-email@domain.com`
   - **Options**: Select audit depth (Basic/Advanced)

3. **Initiate Audit**
   - Click "Generate SEO Report"
   - Monitor real-time progress
   - Wait for completion (typically 30-60 seconds)

4. **Review Results**
   - Interactive dashboard with scores
   - Detailed recommendations
   - Download PDF report
   - Share results via email

</details>

<details>
<summary><strong>API Integration Example</strong></summary>

```javascript
// Basic audit request
const auditWebsite = async (url, email) => {
  try {
    const response = await fetch('/api/audit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        email: email,
        options: {
          includeScreenshots: true,
          mobileAnalysis: true,
          performanceAnalysis: true
        }
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('Audit completed:', result.report);
      return result.report;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Audit failed:', error);
    throw error;
  }
};

// Usage
auditWebsite('https://example.com', 'user@example.com')
  .then(results => {
    console.log('SEO Score:', results.overallScore);
    console.log('Recommendations:', results.recommendations);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

</details>

---

## 🔧 **Configuration**

### **⚙️ Application Settings**

<details>
<summary><strong>Core Configuration</strong></summary>

**File: `next.config.mjs`**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization
  images: {
    unoptimized: true,
    domains: ['localhost', 'your-domain.com'],
    formats: ['image/webp', 'image/avif']
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
```

</details>

<details>
<summary><strong>Tailwind Customization</strong></summary>

**File: `tailwind.config.ts`**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // SEO score colors
        score: {
          excellent: '#10b981',
          good: '#f59e0b',
          poor: '#ef4444',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

</details>

### **🔐 Environment Variables Reference**

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `EMAIL_USER` | `string` | - | Gmail address for sending emails |
| `EMAIL_PASS` | `string` | - | Gmail App Password (not regular password) |
| `JWT_SECRET` | `string` | - | Secret key for JWT token signing (min 32 chars) |
| `JWT_EXPIRES_IN` | `string` | `7d` | JWT token expiration time |
| `NEXTAUTH_URL` | `string` | `http://localhost:3000` | Application base URL |

### **🔒 Security Configuration**

<details>
<summary><strong>JWT Token Security</strong></summary>

**Generate Secure JWT Secret:**
```bash
# Generate a secure random string (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use OpenSSL
openssl rand -hex 32
```

**JWT Configuration Best Practices:**
- Use a minimum 32-character secret key
- Set appropriate expiration times (7d for development, shorter for production)
- Store secrets securely in environment variables
- Never commit secrets to version control

</details>

<details>
<summary><strong>Password Security</strong></summary>

**bcrypt Configuration:**
- Salt rounds: 12 (configurable in auth utils)
- Automatic salt generation
- Secure password comparison
- Password strength validation on frontend

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

</details>

### **🗄️ Database Integration**

<details>
<summary><strong>Authentication Database - Coming Soon</strong></summary>

**Current Implementation:**
- **In-Memory Storage** - User accounts stored temporarily in application memory
- **Development Mode** - Perfect for testing and development purposes
- **Session Persistence** - JWT tokens maintain user sessions across browser sessions

> **Note:** The current authentication system is fully functional for development and testing. Database integration will be added in the next major release to provide production-ready user management.

</details>

---

## 🌐 **API Documentation**

### **🔐 Authentication Endpoints**

<details>
<summary><strong>POST /api/auth/register</strong></summary>

**Description:** Register a new user account with secure password hashing

**Request:**
```typescript
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

**Response:**
```typescript
interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  error?: string;
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!",
    "confirmPassword": "SecurePassword123!"
  }'
```

</details>

<details>
<summary><strong>POST /api/auth/login</strong></summary>

**Description:** Authenticate user and return JWT token

**Request:**
```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

**Response:**
```typescript
interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

</details>

<details>
<summary><strong>POST /api/auth/verify</strong></summary>

**Description:** Verify JWT token validity and return user information

**Request:**
```typescript
interface VerifyRequest {
  token: string;
}
```

**Response:**
```typescript
interface VerifyResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/auth/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token-here" \
  -d '{
    "token": "your-jwt-token-here"
  }'
```

</details>

### **🔍 Audit Endpoints**

<details>
<summary><strong>POST /api/audit</strong></summary>

**Description:** Generate comprehensive SEO audit for a website

**Request:**
```typescript
interface AuditRequest {
  url: string;                    // Target website URL
  email?: string;                 // Email for report delivery
  keywords?: string[];            // Keywords to analyze
  options?: {
    includeScreenshots?: boolean; // Include visual screenshots
    mobileAnalysis?: boolean;     // Perform mobile-specific analysis
    performanceAnalysis?: boolean;   // Include simulated performance metrics
    accessibilityCheck?: boolean; // WCAG compliance check
  };
}
```

**Response:**
```typescript
interface AuditResponse {
  success: boolean;
  report?: {
    url: string;
    analyzedAt: string;
    overallScore: number;           // Overall SEO score (0-100)
    crawlingData: {
      statusCode: number;
      loadTime: number;
      screenshot?: string;          // Base64 encoded screenshot
      mobileScreenshot?: string;
      desktopScreenshot?: string;
    };
    onPageSEO: {
      title: { content: string; score: number; };
      metaDescription: { content: string; score: number; };
      headings: { h1: HeadingAnalysis; h2: HeadingAnalysis; };
      images: { total: number; withoutAlt: number; score: number; };
      links: { internal: number; external: number; score: number; };
    };
    technicalSEO: {
      pageSpeed: { desktop: number; mobile: number; };
      mobileUsability: { isMobileFriendly: boolean; score: number; };
      schema: { hasStructuredData: boolean; types: string[]; };
    };
    security: {
      https: boolean;
      score: number;
      issues: SecurityIssue[];
    };
    offPageSEO: {
      backlinks: { total: number; score: number; };
      domainAuthority: { score: number; trend: string; };
      socialSignals: { total: number; score: number; };
    };
    recommendations: string[];
    summary: {
      criticalIssues: number;
      warningIssues: number;
      passedChecks: number;
    };
  };
  error?: string;
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/audit \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "email": "user@example.com",
    "options": {
      "includeScreenshots": true,
      "mobileAnalysis": true,
      "performanceAnalysis": true
    }
  }'
```

</details>

<details>
<summary><strong>POST /api/contact</strong></summary>

**Description:** Submit contact form inquiries

**Request:**
```typescript
interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
  company?: string;
}
```

**Response:**
```typescript
interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}
```

</details>

---

## 📁 **Project Structure**


<details>
<summary><strong>Complete Directory Tree</strong></summary>

```
SEO-Expert/
├── 📁 app/                          # Next.js App Router
│   ├── 📄 layout.tsx               # Root layout with AuthProvider
│   ├── 📄 page.tsx                 # Homepage
│   ├── 📄 globals.css              # Global styles
│   │
│   ├── 📁 api/                     # API routes
│   │   ├── 📁 audit/
│   │   │   └── 📄 route.ts         # SEO audit endpoint
│   │   ├── 📁 contact/
│   │   │   └── 📄 route.ts         # Contact form endpoint
│   │   └── 📁 auth/                # Authentication API routes
│   │       ├── 📁 login/
│   │       │   └── 📄 route.ts     # JWT login endpoint
│   │       ├── 📁 register/
│   │       │   └── 📄 route.ts     # User registration endpoint
│   │       └── 📁 verify/
│   │           └── 📄 route.ts     # Token verification endpoint
│   │
│   ├── 📁 about/
│   │   └── 📄 page.tsx             # About page
│   ├── 📁 contact/
│   │   └── 📄 page.tsx             # Contact page
│   ├── 📁 features/
│   │   └── 📄 page.tsx             # Features page
│   ├── 📁 pricing/
│   │   └── 📄 page.tsx             # Pricing page
│   ├── 📁 dashboard/
│   │   └── 📄 page.tsx             # User dashboard with realistic states
│   ├── 📁 login/
│   │   └── 📄 page.tsx             # Professional sign-in page
│   ├── 📁 register/
│   │   └── 📄 page.tsx             # User registration page
│   ├── 📁 profile/
│   │   └── 📄 page.tsx             # Complete profile management
│   ├── 📁 loading/
│   │   └── 📄 page.tsx             # Loading page
│   └── 📁 test-report/
│       └── 📄 page.tsx             # Test report page
│
├── 📁 components/                   # Reusable components
│   ├── 📄 audit-form.tsx          # Main audit form
│   ├── 📄 seo-report.tsx          # Report display component
│   ├── 📄 screenshot-preview.tsx   # Screenshot component
│   ├── 📄 error-display.tsx       # Error handling component
│   ├── 📄 theme-provider.tsx      # Theme context provider
│   ├── 📄 header.tsx              # Navigation header with auth
│   ├── 📄 footer.tsx              # Site footer
│   ├── 📄 hero.tsx                # Hero section
│   ├── 📄 features.tsx            # Features showcase
│   ├── 📄 faq.tsx                 # FAQ section
│   ├── 📄 audit-report-section.tsx # Audit report section
│   ├── 📄 background-animation.tsx # Background animations
│   ├── 📄 chart.tsx               # Chart components
│   ├── 📄 client-wrapper.tsx      # Client-side wrapper
│   ├── 📄 how-it-works.tsx        # How it works section
│   ├── 📄 inline-audit-loader.tsx # Inline audit loader
│   ├── 📄 logo.tsx                # Logo component
│   ├── 📄 report-loader.tsx       # Report loader component
│   ├── 📄 seo-report-pdf.tsx      # PDF report generator
│   ├── 📄 theme-toggle.tsx        # Theme toggle component
│   │
│   ├── � auth/                   # Authentication components
│   │   └── 📄 user-profile.tsx    # User profile dropdown
│   │
│   └── 📁 ui/                     # Shadcn/ui components
│       ├── 📄 button.tsx
│       ├── 📄 card.tsx
│       ├── 📄 input.tsx
│       ├── 📄 label.tsx
│       ├── 📄 progress.tsx
│       ├── 📄 tabs.tsx            # Profile tabs component
│       ├── 📄 avatar.tsx          # User avatar component
│       ├── 📄 badge.tsx           # Status badges
│       ├── 📄 separator.tsx       # UI separators
│       ├── 📄 accordion.tsx       # Accordion component
│       ├── 📄 chart.tsx           # Chart UI component
│       ├── 📄 textarea.tsx        # Textarea component
│       ├── 📄 toast.tsx           # Toast component
│       ├── 📄 toaster.tsx         # Toast container
│       ├── 📄 use-mobile.tsx      # Mobile detection hook
│       └── 📄 use-toast.ts        # Toast notification hook
│
├── 📁 contexts/                    # React contexts
│   ├── 📄 audit-context.tsx       # Audit state management
│   ├── 📄 auth-context.tsx        # Authentication state management
│   └── 📄 theme-context.tsx       # Theme management
│
├── 📁 hooks/                      # Custom React hooks
│   └── 📄 use-toast.ts            # Toast notification hook
│
├── 📁 lib/                        # Utility functions
│   ├── 📄 utils.ts                # Common utilities
│   ├── 📄 auth-utils.ts           # JWT token utilities
│   ├── 📄 password-utils.ts       # Password validation utilities
│   └── 📄 screenshot-service.ts   # Screenshot service utilities
│
├── 📁 public/                     # Static assets
│   ├── 📄 favicon.svg             # Site favicon
│   └── 📄 apple-touch-icon.png    # Apple touch icon
│
├── 📁 styles/                     # Additional styles
│   ├── 📄 globals.css             # Global CSS
│   └── 📄 screenshot-preview.css   # Component-specific styles
│
├── 📁 types/                      # TypeScript definitions
│   ├── 📄 seo.ts                  # SEO-related types
│   └── 📄 auth.ts                 # Authentication types
│
├── 📄 package.json                # Dependencies & scripts
├── 📄 package-lock.json           # NPM lock file
├── 📄 pnpm-lock.yaml              # PNPM lock file
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 tailwind.config.ts          # Tailwind CSS configuration
├── 📄 next.config.mjs             # Next.js configuration
├── 📄 postcss.config.mjs          # PostCSS configuration
├── 📄 components.json             # Shadcn/ui configuration
├── 📄 .env.example                # Environment variables template
├── 📄 .env.local                  # Local environment variables
├── 📄 .gitignore                  # Git ignore rules
├── 📄 LICENSE                     # MIT license
└── 📄 README.md                   # Project documentation
```
</details>

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### **📋 License Summary**

```
MIT License

Copyright (c) 2024 SEO Expert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

## 🚀 **Ready to Optimize Your Website?**

### **Start your free SEO audit today and discover opportunities to improve your website's performance, accessibility, and search engine visibility.**

[![Get Started](https://img.shields.io/badge/Get_Started-Free_Audit-blue?style=for-the-badge&logo=rocket)](http://localhost:3000)
[![View Demo](https://img.shields.io/badge/View-Live_Demo-green?style=for-the-badge&logo=external-link)](#)
[![Documentation](https://img.shields.io/badge/Read-Documentation-orange?style=for-the-badge&logo=book)](#documentation)

---

### **🌟 Show Your Support**

If this project helped you, please consider:

- ⭐ **Star this repository** on GitHub
- 🐦 **Share on Twitter** with #SEOExpert
- 📝 **Write a review** or blog post
- 🤝 **Contribute** to the project
- 💝 **Sponsor** the development

---

**Built with ❤️ for better web performance and accessibility**

*Making the web faster, more accessible, and SEO-friendly, one audit at a time.*

[⬆ **Back to Top**](#-SEO-Audit-Tool)

</div>

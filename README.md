# 🧠 ResuMind - AI Resume Analyzer

> Get smart, AI-powered feedback on your resume to land your dream job

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://resume-analyzer-30-2fmni.puter.site)
[![React Router](https://img.shields.io/badge/React%20Router-v7-blue)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🚀 Live Demo

**[Try ResuMind Now →](https://resume-analyzer-30-2fmni.puter.site)**

## ✨ Features

- 📄 **PDF Upload & Analysis** - Upload your resume and get instant AI-powered feedback
- 🤖 **AI-Powered Insights** - Powered by Claude Sonnet 4 for intelligent resume analysis
- 📊 **Comprehensive Scoring** - Get scores for:
  - ATS Compatibility
  - Tone & Style
  - Content Quality
  - Structure & Format
  - Skills Presentation
- 🎯 **Job Match Analysis** - Compare your resume against specific job descriptions:
  - See which job keywords are matched vs. missing
  - Get a job-specific fit score
  - Receive tailored suggestions for the specific role
- � **Hireability Index** - AI-powered verdict on your chances:
  - Strong / Moderate / Weak rating
  - Key strengths and areas to improve
  - Personalized action items
- 📜 **Previously Analyzed** - Instant access to recent analyses:
  - Last 3 resumes shown on home page
  - One-click navigation (no re-processing)
  - Score rings and verdict chips
- 🎨 **Premium UI** - Modern, responsive design with smooth animations
- ☁️ **Cloud Storage** - Secure resume storage powered by Puter.js

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with React Router v7
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Cloud Platform**: [Puter.js](https://puter.com) - Cloud storage, authentication & AI
- **AI Model**: Claude Sonnet 4 via Puter AI API
- **PDF Processing**: PDF.js for PDF to image conversion
- **State Management**: Zustand
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js 18+ and npm
- A modern web browser

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Abhay030/Ai-resume-analyzer.git
cd AI-Resume-Analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📖 Usage

1. **Sign In** - Authenticate using Puter.js (required for cloud storage)
2. **Upload Resume** - Fill in company name, job title, and job description
3. **Drop PDF** - Drag and drop your resume or click to browse
4. **Analyze** - Click "Analyze Resume" to get AI feedback
5. **Review Results** - View Hireability Index, Job Match, ATS score, and detailed feedback
6. **Quick Access** - Return to home page to see "Previously Analyzed" resumes

## 🏗️ Project Structure

```
AI-Resume-Analyzer/
├── app/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── ResumeCard.tsx
│   │   ├── PreviouslyAnalyzed.tsx
│   │   ├── HireabilityCard.tsx
│   │   ├── JobMatch.tsx
│   │   └── FileUploader.tsx
│   ├── lib/             # Utility functions
│   │   ├── puter.ts     # Puter.js integration
│   │   ├── pdf2img.ts   # PDF conversion
│   │   ├── jobMatchAnalyzer.ts
│   │   ├── hireabilityAnalyzer.ts
│   │   └── utils.ts
│   ├── routes/          # Application routes
│   │   ├── landing.tsx
│   │   ├── upload.tsx
│   │   └── resume.tsx
│   └── root.tsx
├── constants/           # App constants & prompts
├── public/             # Static assets
├── types/              # TypeScript type definitions
└── README.md
```

## 🔧 Configuration

The app uses Puter.js for cloud services. The SDK is loaded via CDN in `app/root.tsx`:

```tsx
<script src="https://js.puter.com/v2/"></script>
```

No additional API keys are required as Puter.js handles authentication.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## 🌟 Key Features Explained

### Hireability Index
AI-powered assessment that evaluates:
- Overall score and ATS compatibility
- Job match percentage
- Resume quality factors
- Provides Strong/Moderate/Weak verdict with action items

### Job Match Analysis
Compares your resume against job descriptions:
- Matched vs missing keywords
- Job-specific fit percentage
- Tailored improvement suggestions

### Previously Analyzed
Quick access to recent analyses:
- Shows last 3 resumes on landing page
- Color-coded score rings
- Instant navigation (no re-processing)

### Cloud Storage
All resumes and analysis results are stored securely in Puter.js cloud storage with user authentication.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhay**

- GitHub: [@Abhay030](https://github.com/Abhay030)
- Project Link: [https://github.com/Abhay030/Ai-resume-analyzer](https://github.com/Abhay030/Ai-resume-analyzer)
- Live Demo: [https://resume-analyzer-30-2fmni.puter.site](https://resume-analyzer-30-2fmni.puter.site)

## 🙏 Acknowledgments

- [Puter.js](https://puter.com) - For cloud infrastructure and AI services
- [React Router](https://reactrouter.com/) - For routing and SSR
- [Framer Motion](https://www.framer.com/motion/) - For animations
- [PDF.js](https://mozilla.github.io/pdf.js/) - For PDF processing
- [Tailwind CSS](https://tailwindcss.com/) - For styling

---

Built with ❤️ using React Router and Puter.js


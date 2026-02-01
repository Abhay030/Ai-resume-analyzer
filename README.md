# 🎯 AI Resume Analyzer

> Get smart, AI-powered feedback on your resume to land your dream job

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://ai-resume-analyzer-142-tapyk.puter.site/)
[![React Router](https://img.shields.io/badge/React%20Router-v7-blue)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🚀 Live Demo

**[Try it now →](https://ai-resume-analyzer-142-tapyk.puter.site/)**

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
  - Get a job-specific fit score (separate from ATS score)
  - Receive tailored suggestions for THIS specific job
- 💡 **Actionable Tips** - Receive specific suggestions to improve your resume
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- ☁️ **Cloud Storage** - Secure resume storage powered by Puter.js
- 🔄 **PDF to Image Conversion** - Automatic preview generation using PDF.js

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with React Router v7
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Cloud Platform**: [Puter.js](https://puter.com) - Cloud storage, authentication & AI
- **AI Model**: Claude Sonnet 4 via Puter AI API
- **PDF Processing**: PDF.js for PDF to image conversion
- **State Management**: Zustand
- **Build Tool**: Vite
- **File Upload**: React Dropzone

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
5. **Review Results** - View your scores and improvement suggestions
6. **Access History** - View previously analyzed resumes from your dashboard

## 🏗️ Project Structure

```
AI-Resume-Analyzer/
├── app/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── ResumeCard.tsx
│   │   └── FileUploader.tsx
│   ├── lib/             # Utility functions
│   │   ├── puter.ts     # Puter.js integration
│   │   ├── pdf2img.ts   # PDF conversion
│   │   └── utils.ts
│   ├── routes/          # Application routes
│   │   ├── home.tsx
│   │   ├── upload.tsx
│   │   └── resume.$id.tsx
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

### AI Analysis
The app uses Claude Sonnet 4 to analyze resumes based on:
- Job Title match
- Job Description alignment
- ATS-friendly formatting
- Professional tone
- Skills relevance
- Content quality

### Cloud Storage
All resumes and analysis results are stored securely in Puter.js cloud storage with user authentication.

### PDF Processing
PDF resumes are automatically converted to images for preview using PDF.js with high-quality rendering (4x scale).

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
- Live Demo: [https://puter.com/app/ai-resume-analyzer-142](https://puter.com/app/ai-resume-analyzer-142)

## 🙏 Acknowledgments

- [Puter.js](https://puter.com) - For cloud infrastructure and AI services
- [React Router](https://reactrouter.com/) - For routing and SSR
- [PDF.js](https://mozilla.github.io/pdf.js/) - For PDF processing
- [Tailwind CSS](https://tailwindcss.com/) - For styling

---

Built with ❤️ using React Router and Puter.js

# TaTTTy App - Product Documentation

## Product Overview
TaTTTy is a modern web application built with Next.js that provides AI-powered tattoo image generation and design tools. The application specializes in creating tattoo designs, patterns, and artwork using advanced AI models through Google's technology and Vercel AI Gateway.

## Core Features

### 1. Tattoo Image Generation (TaTTTy)
- **Purpose**: Primary AI tattoo design generation interface
- **Functionality**: Text-to-tattoo image generation with customizable parameters
- **Storage**: Uses "nb2_generations" localStorage key for history
- **Key Components**: Tattoo image upload, design prompt input, generation controls, tattoo history tracking

### 2. Text-to-Pixel Art Tattoos (Txt2Pix)
- **Purpose**: Specialized tool for creating pixel art tattoo designs from text descriptions
- **Functionality**: Converts text prompts into pixel-style tattoo designs
- **Storage**: Uses "txt2pix-generations" localStorage key (isolated from main tool)
- **Key Components**: Dedicated interface with pixel art optimization for tattoos

### 3. Font & Text Tattoo Tools
- **Purpose**: Typography and text styling utilities for text-based tattoos
- **Functionality**: Font preview, customization, and text effect generation for tattoo lettering
- **Key Components**: Font selector, text styling controls, preview panel for tattoo text

### 4. 21+ Tattoo Content Section
- **Purpose**: Age-restricted tattoo content generation
- **Functionality**: Specialized tattoo image generation with content filtering
- **Key Components**: Age verification, content controls, secure access for mature tattoo designs

## Technical Architecture

### Frontend Framework
- **Next.js 16** with React 19
- **TypeScript** for type safety
- **Tailwind CSS** with custom animations
- **Radix UI** components for accessibility
- **Shadcn/ui** component library

### AI Integration
- **Google's TaTTTy AI Model**: Cutting-edge diffusion technology for tattoo image generation
- **Vercel AI Gateway**: Enterprise-grade reliability and performance for tattoo generation
- **Dual-mode generation**: Automatically switches between text-to-tattoo and tattoo image editing

### Image Processing for Tattoos
- AI SDK integration for tattoo image generation
- File upload handling with drag-and-drop support for tattoo references
- Base64 image encoding/decoding for tattoo designs
- Progress tracking and cancellation support for tattoo generation

## How It Works

### Tattoo Generation Flow
1. **Input**: User provides text prompt describing tattoo design and/or uploads reference images
2. **Processing**: AI processes the input through dedicated API endpoints optimized for tattoo art
3. **Generation**: Multiple tattoo design variants are generated simultaneously
4. **Storage**: Results are saved to localStorage with pagination (50 tattoo designs max)
5. **Display**: Generated tattoo images are displayed with metadata and controls

### Tattoo Design Interface
- **Responsive Design**: Works on desktop and mobile devices for tattoo artists and clients
- **Dark/Light Mode**: Theme switching support for different viewing environments
- **Navigation**: Centralized navigation system with active page highlighting
- **Modals & Dialogs**: For tattoo design instructions, settings, and detailed views
- **Toast Notifications**: User feedback and error handling for tattoo generation

### API Integration for Tattoos
- **Endpoint**: `/api/generate-image` for all tattoo image generation
- **Authentication**: API key management for tattoo AI services
- **Error Handling**: Comprehensive error states and user feedback for tattoo design process
- **Cancellation**: Support for aborting ongoing tattoo generations

## Tattoo Design Storage & Data Management

### localStorage Structure for Tattoos
- **Isolation**: Each tattoo tool uses separate storage keys
- **Quota Management**: Automatic trimming and compression to avoid quota errors with tattoo designs
- **Data Format**: JSON-serialized generation objects with tattoo metadata

### Tattoo Generation Object Structure
```typescript
interface TattooGeneration {
  id: string;           // Unique identifier for tattoo design
  status: string;       // "loading" | "complete" | "error"
  progress: number;     // 0-100 percentage for tattoo generation
  imageUrl: string | null; // Base64 tattoo image data or URL
  prompt: string;       // User input prompt describing tattoo design
  timestamp: number;    // Creation timestamp
  error?: string;       // Error message if tattoo generation failed
}
```

## User Experience for Tattoo Artists & Clients

### Navigation for Tattoo Design
- **Active State**: Visual indicators show current tattoo design page (ring highlighting)
- **Centralized Config**: Navigation links managed in single configuration file
- **Consistent Layout**: Uniform header/navigation across all tattoo design pages

### Tattoo Image Handling
- **Upload**: Drag-and-drop or file selection for tattoo reference images
- **Preview**: Real-time tattoo image preview with aspect ratio controls
- **Generation**: Progress bars and cancellation options for tattoo creation
- **History**: Browse previous tattoo generations with filtering

### Error Handling for Tattoo Design
- **Quota Management**: Automatic storage cleanup when tattoo design limits exceeded
- **Network Errors**: Retry mechanisms and user notifications for tattoo generation
- **Validation**: Input validation with helpful error messages for tattoo prompts

## Security & Privacy for Tattoo Designs

### Content Restrictions
- Age verification for 21+ tattoo content
- Content filtering mechanisms for appropriate tattoo designs
- Secure API communication for tattoo generation

### Data Protection
- Client-side storage only (no server-side persistence of tattoo designs)
- No personal data collection from tattoo generation
- Local processing where possible for tattoo design privacy

## Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge for tattoo artists and clients
- **Mobile Support**: Responsive design for iOS and Android devices
- **Storage Requirements**: localStorage support required for tattoo design history

## Performance Considerations for Tattoo Generation
- **Image Optimization**: Base64 encoding/decoding efficiency for tattoo designs
- **Memory Management**: Tattoo generation history pagination
- **Network Usage**: Efficient API calls with cancellation support for tattoo AI
- **Bundle Size**: Code splitting and optimized imports for tattoo application

## Future Tattoo Design Enhancements
- Cloud storage integration for tattoo design portfolios
- Social sharing features for tattoo artists
- Advanced tattoo editing tools
- Plugin system for custom tattoo generators
- Collaborative features for tattoo artist-client interaction

---

This document provides a comprehensive overview of the TaTTTy application's features, technical architecture, and user experience design specifically focused on tattoo image generation. The product focuses on providing specialized AI tattoo design tools with a clean, modern interface and robust technical foundation.
# Classroom Seat Management System

## Overview

This is a full-stack web application for managing classroom seating arrangements. The system allows students to register for available seats and provides administrators with tools to manage seat assignments. Built with a React frontend using shadcn/ui components and an Express.js backend with PostgreSQL database integration through Drizzle ORM.

The application supports a structured classroom layout with 4 groups, 6 tables per group, and 2 seats per table (48 total seats). Students can view the classroom layout and register for available seats, while administrators can view detailed statistics and manage seat assignments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for seat management operations
- **Error Handling**: Centralized error middleware with structured error responses
- **Request Logging**: Custom middleware for API request/response logging

### Data Storage
- **Database**: PostgreSQL with Neon Database as the provider
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Single table design for seats with group/table/seat hierarchy
- **Migrations**: Drizzle Kit for database schema management
- **Fallback Storage**: In-memory storage implementation for development/testing

### Database Schema
- **Seats Table**: Contains seat ID, group number, table number, seat number, and optional student name
- **Validation**: Zod schemas for type-safe data validation across frontend and backend
- **Constraints**: Structured seat IDs following pattern "G{group}-T{table}-S{seat}"

### Component Architecture
- **Layout Components**: Modular classroom layout with visual seat representation
- **Modal System**: Registration modal for seat assignment with form validation
- **Admin Dashboard**: Comprehensive seat management with statistics and Excel export
- **UI Components**: Reusable shadcn/ui components with consistent theming

### API Design
- **GET /api/seats**: Retrieve all seats with current assignments
- **POST /api/seats/register**: Register student to available seat with validation
- **DELETE /api/seats/:seatId**: Admin-only seat clearing functionality
- **Error Responses**: Consistent JSON error format with appropriate HTTP status codes

### Authentication & Authorization
- **Current State**: No authentication implemented
- **Admin Functions**: Basic admin mode toggle in frontend (no server-side protection)
- **Session Management**: Prepared infrastructure with connect-pg-simple for future implementation

### Development Workflow
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Development Server**: Hot module replacement with Vite middleware integration
- **Type Safety**: Full TypeScript coverage with shared types between frontend and backend
- **Code Organization**: Clear separation between client, server, and shared code

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL hosting service for production database
- **Drizzle ORM**: Type-safe database toolkit and query builder
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Framework
- **Radix UI**: Headless UI components for accessibility and functionality
- **shadcn/ui**: Pre-built component library with consistent design system
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

### Frontend Libraries
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with performance optimization
- **Zod**: Schema validation for type safety
- **Wouter**: Lightweight client-side routing
- **XLSX**: Excel file generation for data export

### Development Tools
- **Vite**: Frontend build tool with fast development server
- **TypeScript**: Static type checking and enhanced development experience
- **esbuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

### Runtime Dependencies
- **Express.js**: Web application framework for Node.js
- **tsx**: TypeScript execution engine for development
- **date-fns**: Date utility library for formatting and manipulation
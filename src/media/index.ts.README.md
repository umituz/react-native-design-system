# @umituz/react-native-media - Main Export

## Purpose
Main entry point for the library. Exports all services, hooks, types, and utilities for media management in React Native applications.

## File Location
`src/index.ts`

## Strategy
- Provide a single import point for all library functionality
- Organize exports by category (services, hooks, types, utils)
- Enable tree-shaking by using named exports
- Maintain clear separation between general media and card-specific features
- Support both individual imports and bulk imports

## Forbidden
- **DO NOT** add default exports - only named exports
- **DO NOT** re-export external dependencies directly
- **DO NOT** create circular import dependencies
- **DO NOT** mix categories in export groups
- **DO NOT** export internal implementation details
- **DO NOT** use wildcard exports from sub-modules
- **DO NOT** change export names once published

## Rules
1. All public exports must be re-exported from this file
2. Exports must be organized by category (services, hooks, types, utils)
3. Each category must be clearly commented
4. General media features must be separate from card-specific features
5. Type exports must use `export type` for tree-shaking
6. Service exports must be singleton instances or static classes
7. Hook exports must be named with `use` prefix
8. All exports must have TypeScript types
9. Breaking changes require major version bump
10. All exports must be documented in their respective README files

## AI Agent Guidelines

### Import Strategy

When working with this library:

1. **Single Entry Point**: All imports should come from `@umituz/react-native-media`
2. **Specific Imports**: Import only what you need for better tree-shaking
3. **Type Imports**: Use `import type` for type-only imports
4. **Category Awareness**: Understand the difference between general and card-specific features

### Export Categories

#### Services (Infrastructure Layer)
All services follow singleton pattern:
- `MediaPickerService` - Image/video selection from camera and gallery
- `MediaSaveService` - Saving media to device gallery
- `MediaUploadService` - Upload/download media and URL management
- `MediaGenerationService` - AI-powered text-to-image and text-to-audio
- `MediaValidationService` - File validation before upload
- `MediaOptimizerService` - Compression and optimization
- `CardMultimediaService` - Card-specific media operations
- `CardMediaGenerationService` - Card AI generation with image search
- `CardMediaUploadService` - Card upload with position support
- `CardMediaValidationService` - Card validation with stricter rules
- `CardMediaOptimizerService` - Card optimization
- `MultimediaFlashcardService` - Main flashcard service
- `CardMultimediaFlashcardService` - Main card flashcard service

#### Hooks (Presentation Layer)
All hooks are named with `use` prefix:

**General Media Hooks:**
- `useMedia` - Core media selection and camera
- `useMediaUpload` - Upload with progress tracking
- `useMediaGeneration` - AI generation
- `useMediaValidation` - Pre-upload validation
- `useMultimediaFlashcard` - Flashcard creation

**Card-Specific Hooks:**
- `useCardMultimediaFlashcard` - Card flashcard management
- `useCardMediaGeneration` - Card AI generation
- `useCardMediaUpload` - Card upload with position
- `useCardMediaValidation` - Card validation

#### Types (Domain Layer)
Organized by functionality:

**Basic Types:**
- `MediaType` - Media type enum (IMAGE, VIDEO, ALL)
- `ImageFormat` - Format enum (JPEG, PNG, WEBP)
- `MediaQuality` - Quality enum (LOW, MEDIUM, HIGH)
- `MediaLibraryPermission` - Permission states
- `MediaAsset` - Media file properties
- `MediaPickerResult` - Picker return type
- `MediaPickerOptions` - Picker configuration
- `CameraOptions` - Camera configuration

**Card Types:**
- `CardMediaType` - Card media types
- `CardMediaPosition` - Position (FRONT, BACK, BOTH)
- `CardMediaAttachment` - Card media with position
- `CardMultimediaFlashcard` - Card entity
- `CardMediaGenerationRequest` - Generation request
- `CardMediaGenerationResult` - Generation result
- `CardMediaUploadProgress` - Upload progress
- `CardMediaCompressionOptions` - Compression options
- `CardMediaValidation` - Validation result

**Flashcard Types:**
- `MediaAttachment` - General media attachment
- `MultimediaFlashcard` - Flashcard entity
- `MediaGenerationRequest` - Generation request
- `MediaGenerationResult` - Generation result

#### Utils (Domain & Infrastructure)
Utility functions and helpers:

**Domain Utils:**
- `MediaUtils` - Core media utilities

**Infrastructure Utils:**
- Helper functions for media operations
- Mapper functions for type conversions

### Module Selection Guidelines

#### Use General Media Features When:
- Working with standard media operations
- No card/flashcard requirements
- Need basic upload/download/validation
- Building general-purpose media features

#### Use Card-Specific Features When:
- Building flashcard applications
- Need position-based media (front/back)
- Working with card entities
- Need card-specific validation rules
- Using card generation or upload services

### Dependency Rules

1. **Services** can be used independently or through hooks
2. **Hooks** wrap services and provide React state management
3. **Types** are used by both services and hooks
4. **Utils** provide helper functions used across layers

### Common Import Patterns

**Service-only usage:**
- Import service classes directly
- Use for non-React code or direct service access
- Services follow singleton pattern

**Hook usage (recommended for React components):**
- Import hooks for React components
- Hooks provide state management
- Hooks wrap services with React integration

**Type imports:**
- Use `import type` for type-only imports
- Enables tree-shaking
- Better IDE support

**Combined imports:**
- Mix services, hooks, and types as needed
- All imports from single entry point
- Named exports only

## File Structure Reference

The library follows Clean Architecture with three main layers:

**Domain Layer** (`src/domain/`)
- `entities/` - Core type definitions and interfaces
- `utils/` - Domain utility functions

**Infrastructure Layer** (`src/infrastructure/`)
- `services/` - Service implementations with external integrations
- `utils/` - Helper functions and mappers

**Presentation Layer** (`src/presentation/`)
- `hooks/` - React hooks for UI integration

**Main Export** (`src/index.ts`)
- Single entry point for all exports
- Organized by category
- This file

## Dependencies

- Exports all domain entities and types
- Exports all infrastructure services
- Exports all presentation hooks
- Re-exports utilities from domain and infrastructure layers

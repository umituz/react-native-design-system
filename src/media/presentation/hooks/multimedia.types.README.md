# Multimedia Hook Types

## Purpose
TypeScript return type interfaces for general multimedia hooks in the presentation layer.

## File Location
`src/presentation/hooks/multimedia.types.ts`

## Strategy
- Define contracts for general multimedia hook implementations
- Ensure type safety across media operations
- Provide consistent return types for upload, generation, and validation
- Support general-purpose media operations
- Enable proper error handling and loading states
- Maintain separation from card-specific multimedia types

## Forbidden
- **DO NOT** import implementation details or hooks in type files
- **DO NOT** mix MediaAttachment and CardMediaAttachment types
- **DO NOT** add business logic to type definitions
- **DO NOT** use `any` type for function parameters or returns
- **DO NOT** create circular dependencies with domain types
- **DO NOT** export implementation-specific types
- **DO NOT** modify these types without updating all hook implementations

## Rules
1. All hook returns must include loading state, error state, and operation function
2. Async operations must return Promise with appropriate type
3. Error states must be string | null (not Error objects)
4. Progress/results must be null when not active
5. Boolean states must clearly indicate operation in progress
6. All interfaces must be exported and public
7. Type names must follow Use*Result pattern
8. Functions must accept domain types, not external types
9. Optional parameters must be clearly marked
10. Return types must match hook implementations exactly

## AI Agent Guidelines

When working with multimedia hook types:

1. **Type Imports**: Always import types from this file for general multimedia hooks
2. **Hook Implementation**: Implement hooks that return these exact interfaces
3. **General vs Card**: Use Media* types for general operations, Card* for card-specific
4. **Error Handling**: Always check error state before using results
5. **Loading States**: Respect loading states to prevent race conditions
6. **Progress Tracking**: Use progress objects for upload operations
7. **Type Safety**: Use these types for all general multimedia hook return values
8. **Testing**: Mock these interfaces when testing media operations

### Hook Return Type Structure

All multimedia hook returns follow this consistent pattern:

**Core Components**:
- **operationFunction**: An async function that accepts parameters and returns a Promise with the result type
- **isOperationInProgress**: A boolean flag indicating whether the operation is currently running
- **operationResult**: The result object or null when no operation is active
- **error**: A string containing error messages or null when no error exists

### UseMediaUploadResult

**Purpose**: General media upload operations with compression options

**Key Features**:
- Upload function accepts file and compression options
- Tracks upload progress
- Returns MediaAttachment
- Handles upload errors

**Usage Pattern**:
1. Check `isUploading` before calling
2. Call `uploadMedia()` with file and optional compression
3. Monitor `uploadProgress` during upload
4. Check `error` state on completion
5. Use returned MediaAttachment on success

### UseMediaGenerationResult

**Purpose**: General media generation (AI-based generation without image search)

**Key Features**:
- Generation function accepts request parameters
- Tracks generation status
- Returns MediaGenerationResult
- Supports core generation methods

**Usage Pattern**:
1. Prepare MediaGenerationRequest
2. Check `isGenerating` before calling
3. Call `generateMedia()` with request
4. Access `generationResult` when complete
5. Handle `error` if generation fails

### UseMediaValidationResult

**Purpose**: General media validation before upload or processing

**Key Features**:
- Validation function accepts file
- Tracks validation status
- Returns MediaValidation result
- Provides detailed validation errors

**Usage Pattern**:
1. Check `isValidating` before calling
2. Call `validateMedia()` with file
3. Access `validation` result for validity check
4. Use `validation.errors` array for error details
5. Check `error` state for validation failures

### UseMultimediaFlashcardResult

**Purpose**: General flashcard CRUD operations

**Key Features**:
- Create flashcard with multimedia
- Update flashcard media
- Delete specific media attachment
- Tracks processing state
- Returns MultimediaFlashcard

**Usage Pattern**:
1. Create: Call `createMultimediaCard()` with card data
2. Update: Call `updateMedia()` with cardId and media array
3. Delete: Call `deleteMedia()` with attachmentId
4. Check `isProcessing` before operations
5. Handle `error` state for failures

### General vs Card Multimedia Types

| Operation | General Types | Card Types | Key Difference |
|-----------|--------------|------------|----------------|
| Upload | MediaAttachment | CardMediaAttachment | Different entity structures |
| Generation | MediaGenerationRequest | CardMediaGenerationRequest | Cards include image search |
| Validation | MediaValidation | CardMediaValidation | Different validation rules |
| Flashcard | MultimediaFlashcard | CardMultimediaFlashcard | Different entity types |
| Features | Core operations | Core + image search | Card has extended features |

### When to Use Which Types

**Use Media* Types (General)**:
- Generic media handling
- Non-card-specific operations
- Reusable media components
- General-purpose flashcards

**Use Card* Types (Card-Specific)**:
- Card-specific operations
- Image search functionality
- Card entity management
- Card-specific validation rules

### Type Guards and Validation

1. **Upload Hook**: Check for `uploadMedia` function and `isUploading` boolean
2. **Generation Hook**: Check for `generateMedia` function and `isGenerating` boolean
3. **Validation Hook**: Check for `validateMedia` function and `isValidating` boolean
4. **Flashcard Hook**: Check for all three CRUD functions and `isProcessing` boolean

### Error Handling Patterns

1. Always check if `error !== null` before using results
2. Errors are strings, not Error objects
3. Clear error before starting new operation
4. Show user-friendly error messages
5. Handle null states for progress/results

### Async Operation Patterns

1. **Before Call**: Check loading state to prevent concurrent calls
2. **During Call**: Show loading indicator based on boolean state
3. **After Call**: Check error state, then use result
4. **Error Case**: Display error, reset loading state
5. **Success Case**: Use result, clear error

### Composable Hooks Pattern

Combine multiple hook types for complex workflows:

1. **Validate Then Upload**: Use validation result before calling upload
2. **Generate Then Upload**: Chain generation and upload operations
3. **Upload Then Create Card**: Use upload result to create flashcard
4. **Parallel Operations**: Use multiple hooks independently

### Related Domain Types

These interfaces use domain types:
- MediaAttachment
- MediaGenerationRequest
- MediaGenerationResult
- MediaCompressionOptions
- MediaValidation
- MediaUploadProgress
- MultimediaFlashcard

## Dependencies

- Domain layer types (Media* entities)
- Presentation layer hooks
- No external dependencies

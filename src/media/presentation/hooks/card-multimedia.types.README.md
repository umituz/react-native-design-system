# Card Multimedia Hook Types

## Purpose
TypeScript return type interfaces for card-specific multimedia hooks in the presentation layer.

## File Location
`src/presentation/hooks/card-multimedia.types.ts`

## Strategy
- Define contracts for card multimedia hook implementations
- Ensure type safety across card media operations
- Provide consistent return types for upload, generation, and validation
- Support card-specific media operations (including image search)
- Enable proper error handling and loading states
- Maintain separation between card and general multimedia types

## Forbidden
- **DO NOT** import implementation details or hooks in type files
- **DO NOT** mix CardMediaAttachment and MediaAttachment types
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

When working with card multimedia hook types:

1. **Type Imports**: Always import types from this file for card multimedia hooks
2. **Hook Implementation**: Implement hooks that return these exact interfaces
3. **Card vs General**: Use Card* types for card-specific operations, Media* for general
4. **Error Handling**: Always check error state before using results
5. **Loading States**: Respect loading states to prevent race conditions
6. **Progress Tracking**: Use progress objects for upload operations
7. **Type Safety**: Use these types for all card multimedia hook return values
8. **Testing**: Mock these interfaces when testing card media operations

### Hook Return Type Structure

All card multimedia hook returns follow this consistent pattern:

**Core Components**:
- **operationFunction**: An async function that accepts parameters and returns a Promise with the result type
- **isOperationInProgress**: A boolean flag indicating whether the operation is currently running
- **operationResult**: The result object or null when no operation is active
- **error**: A string containing error messages or null when no error exists

### UseCardMediaUploadResult

**Purpose**: Card media upload operations with compression options

**Key Features**:
- Upload function accepts file and compression options
- Tracks upload progress
- Returns CardMediaAttachment
- Handles upload errors

**Usage Pattern**:
1. Check `isUploading` before calling
2. Call `uploadMedia()` with file and optional compression
3. Monitor `uploadProgress` during upload
4. Check `error` state on completion
5. Use returned CardMediaAttachment on success

### UseCardMediaGenerationResult

**Purpose**: Card media generation (AI-based generation, image search)

**Key Features**:
- Generation function accepts request parameters
- Tracks generation status
- Returns CardMediaGenerationResult
- Supports multiple generation methods

**Usage Pattern**:
1. Prepare CardMediaGenerationRequest
2. Check `isGenerating` before calling
3. Call `generateMedia()` with request
4. Access `generationResult` when complete
5. Handle `error` if generation fails

### UseCardMediaValidationResult

**Purpose**: Card media validation before upload or processing

**Key Features**:
- Validation function accepts file
- Tracks validation status
- Returns CardMediaValidation result
- Provides detailed validation errors

**Usage Pattern**:
1. Check `isValidating` before calling
2. Call `validateMedia()` with file
3. Access `validation` result for validity check
4. Use `validation.errors` array for error details
5. Check `error` state for validation failures

### UseCardMultimediaFlashcardResult

**Purpose**: Card flashcard CRUD operations

**Key Features**:
- Create card with multimedia
- Update card media
- Delete specific media attachment
- Tracks processing state
- Returns CardMultimediaFlashcard

**Usage Pattern**:
1. Create: Call `createCardMultimedia()` with card data
2. Update: Call `updateCardMedia()` with cardId and media array
3. Delete: Call `deleteCardMedia()` with attachmentId
4. Check `isProcessing` before operations
5. Handle `error` state for failures

### Card vs General Multimedia Types

| Operation | Card Types | General Types | Key Difference |
|-----------|-----------|---------------|----------------|
| Upload | CardMediaAttachment | MediaAttachment | Card-specific metadata |
| Generation | CardMediaGenerationRequest | MediaGenerationRequest | Cards include image search |
| Validation | CardMediaValidation | MediaValidation | Card-specific rules |
| Flashcard | CardMultimediaFlashcard | MultimediaFlashcard | Different entity types |

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

### Related Domain Types

These interfaces use domain types:
- CardMediaAttachment
- CardMediaGenerationRequest
- CardMediaGenerationResult
- CardMediaCompressionOptions
- CardMediaValidation
- CardMediaUploadProgress
- CardMultimediaFlashcard

## Dependencies

- Domain layer types (Card* entities)
- Presentation layer hooks
- No external dependencies

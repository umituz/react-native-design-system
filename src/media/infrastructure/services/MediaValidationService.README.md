# MediaValidationService

## Purpose
Validates media files before upload by checking file size, type, and other properties to ensure compatibility and performance.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/MediaValidationService`

## Strategy

### Core Purpose
- Validate media files before upload
- Check file size constraints
- Verify supported file types
- Provide actionable feedback (errors, warnings, recommendations)
- Prevent upload of invalid or problematic files

### Usage Scenarios
- Pre-upload validation checks
- Form submission workflows
- File selection validation
- User feedback on file issues
- Quality control processes

### Integration Points
- Before upload operations
- After file selection
- In form validation workflows
- User input feedback loops
- File processing pipelines

## Forbidden

### MUST NOT
- Allow uploads of files exceeding size limits
- Accept unsupported file types
- Ignore validation results
- Proceed with upload when isValid is false
- Assume all files are valid
- Skip validation for performance

### MUST NEVER
- Upload files with errors
- Modify files during validation
- Cache validation results indefinitely
- Assume synchronous validation
- Ignore platform-specific constraints
- Allow bypass of critical validation rules

## Rules

### Validation Rules
- MUST check file size (max 50 MB)
- MUST check file type against supported formats
- MUST return validation result with isValid boolean
- MUST provide errors for upload-blocking issues
- MUST provide warnings for performance concerns
- MUST provide recommendations for improvements

### File Size Limits
- MUST reject files over 50 MB (error)
- MUST warn on files over 10 MB
- MUST recommend compression for large files
- MUST format file sizes for readability
- MUST consider media type for limits

### Supported File Types
- Images: JPEG, PNG, WebP
- Audio: MP3, WAV, M4A
- Video: MP4, MOV
- MUST validate MIME types
- MUST reject unsupported types with clear error

### Validation Results
- MUST include isValid boolean
- MUST include errors array (upload blockers)
- MUST include warnings array (performance impacts)
- MUST include recommendations array (improvements)
- MUST be serializable for transport

### Error Handling
- MUST handle missing file metadata
- MUST handle invalid file structures
- MUST handle async validation operations
- MUST provide specific error messages
- MUST support batch validation

### Feedback Levels
- Errors: Critical issues that prevent upload
- Warnings: Non-critical but impactful issues
- Recommendations: Suggestions for optimization
- MUST clearly distinguish between levels

## AI Agent Guidelines

### When Implementing Validation
1. Always check file metadata completeness
2. Validate size limits before processing
3. Check MIME type against allowed list
4. Provide specific, actionable error messages
5. Return structured validation result

### When Working with Validation Results
- Check isValid flag before proceeding
- Display errors to user (block upload)
- Show warnings to user (allow upload)
- Present recommendations as optional
- Format messages for user understanding

### When Adding Validation Rules
- Add new size limits with clear thresholds
- Add new file types with MIME validation
- Add custom rules for specific use cases
- Maintain backward compatibility
- Document rule changes

### When Refactoring
- Keep validation API stable
- Preserve error message format
- Maintain validation logic flow
- Don't change result structure
- Add deprecation warnings for breaking changes

### Common Patterns to Follow
- Receive file -> Check metadata -> Validate rules -> Return result
- Check isValid -> If false, show errors -> If true, proceed
- Check size -> If large, warn and recommend compression
- Check type -> If invalid, error with supported types
- Always handle async validation properly

## Dependencies

- Domain types: MediaValidation from MultimediaFlashcardTypes
- Internal utilities: mediaHelpers (formatFileSize)
- No external library dependencies (uses native File API)

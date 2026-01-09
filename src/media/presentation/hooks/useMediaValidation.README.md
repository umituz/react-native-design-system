# useMediaValidation

## Purpose
React hook for validating media files before upload, checking file size, type, and providing improvement recommendations.

## File Location
`src/presentation/hooks/useMediaValidation.ts`

## Strategy
- Provide comprehensive media file validation before upload
- Check file size limits with appropriate warnings
- Validate MIME types against supported formats
- Provide three-tier feedback: errors (blocking), warnings (performance), recommendations (improvements)
- Support validation state management
- Enable pre-upload validation workflow
- Return actionable feedback for each validation issue

## Forbidden
- **DO NOT** upload files that fail validation (errors present)
- **DO NOT** ignore warnings - they indicate performance issues
- **DO NOT** bypass file type validation
- **DO NOT** use mock validation in production
- **DO NOT** allow files exceeding maximum size limits
- **DO NOT** modify file during validation process
- **DO NOT** store validation results permanently in hook state
- **DO NOT** validate empty or missing files
- **DO NOT** suppress validation errors for user convenience

## Rules
1. Always validate before upload operations
2. Files over 50 MB must be rejected with error
3. Files over 10 MB must trigger warning and recommendation
4. Unsupported MIME types must be rejected
5. Validation must check file size, type, and format
6. Return errors array for blocking issues
7. Return warnings array for performance concerns
8. Return recommendations array for improvements
9. Clear validation state on new validation requests
10. Support synchronous and asynchronous validation

## AI Agent Guidelines

When working with useMediaValidation hook:

1. **Pre-upload Check**: Always validate before useMediaUpload calls
2. **Three-Tier Feedback**: Distinguish between errors, warnings, recommendations
3. **User Decision**: Show warnings but allow user to proceed
4. **File Size**: Be strict with maximum limits, flexible with warnings
5. **Type Safety**: Validate MIME types against supported formats

### Validation Levels

**Errors** (Blocking - Must fix before upload):
- File size exceeds 50 MB
- Unsupported file type
- Invalid file format
- Missing required properties

**Warnings** (Performance - Should fix but can proceed):
- File size over 10 MB (performance impact)
- Large dimensions (may need optimization)
- Non-standard format (compatibility issues)

**Recommendations** (Improvements - Optional suggestions):
- Reduce file size for better performance
- Use recommended format (JPEG for images, MP4 for video)
- Optimize dimensions for target use case
- Compress to balance quality and size

### Supported File Types

**Images:**
- image/jpeg (JPEG photos)
- image/png (PNG graphics with transparency)
- image/webp (WebP format)

**Audio:**
- audio/mp3 (MP3 compressed audio)
- audio/wav (WAV uncompressed audio)
- audio/m4a (M4A audio format)

**Video:**
- video/mp4 (MP4 video)
- video/mov (QuickTime video)

### Validation Workflow

1. Receive file object with name, type, size, uri
2. Check file size against limits (50 MB max, 10 MB warning)
3. Validate MIME type against supported formats
4. Generate appropriate errors, warnings, recommendations
5. Return MediaValidation object with results
6. Display feedback to user for action

### Validation State Management

- isValid: Boolean (true if no errors)
- errors: String array (blocking issues)
- warnings: String array (performance concerns)
- recommendations: String array (improvement suggestions)

### Integration with Upload Flow

Typical validation-upload workflow:
1. Select file from picker or file system
2. Call validateMedia(file)
3. Check validation.isValid
4. If errors: Show to user, block upload
5. If warnings: Show to user, ask confirmation
6. If recommendations: Show to user for reference
7. Proceed to upload if no errors or user confirms warnings

### File Size Guidelines

**Images:**
- Optimal: Under 2 MB
- Warning: 2-10 MB
- Error: Over 50 MB

**Audio:**
- Optimal: Under 5 MB
- Warning: 5-10 MB
- Error: Over 50 MB

**Video:**
- Optimal: Under 10 MB
- Warning: 10-50 MB
- Error: Over 50 MB

## Dependencies

- MediaValidationService (infrastructure layer)
- Domain types: MediaValidation, file input interfaces
- Media constants (size limits, supported types)

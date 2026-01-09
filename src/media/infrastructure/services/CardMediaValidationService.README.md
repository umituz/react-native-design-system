# CardMediaValidationService

## Purpose
Service that validates flashcard media files before upload, checking file size, type, and media-specific properties with detailed error, warning, and recommendation reporting.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/CardMediaValidationService`

## Strategy
- Validate media files before upload operations
- Check file size against maximum limits (50 MB hard limit)
- Validate file type compatibility (image, audio, video)
- Provide media-specific warnings (large images, long videos)
- Generate actionable recommendations for optimization
- Return structured validation results with errors, warnings, and recommendations
- Support asynchronous validation operations
- Format file sizes in human-readable format

## Forbidden
- **DO NOT** upload files with validation errors
- **DO NOT** ignore validation warnings about performance impact
- **DO NOT** bypass validation for any media upload
- **DO NOT** allow unsupported file types
- **DO NOT** proceed when file size exceeds maximum
- **DO NOT** suppress error messages
- **DO NOT** assume all validations will pass
- **DO NOT** skip validation for "trusted" sources

## Rules
1. Maximum file size is 50 MB (hard error)
2. Large file warning is triggered at 10 MB+
3. Very large image warning is triggered at 5 MB+
4. Long audio/video warning is triggered at 5 minutes (300 seconds)
5. Supported image types: image/jpeg, image/png, image/webp
6. Supported audio types: audio/mp3, audio/wav, audio/m4a
7. Supported video types: video/mp4, video/mov
8. Unsupported file types must return error
9. Validation must be asynchronous operation
10. Warnings must not block upload but inform user
11. Recommendations must provide actionable improvement steps
12. File size must be checked in bytes
13. Validation result must include isValid boolean flag

## AI Agent Guidelines

When working with CardMediaValidationService:

1. **Always Validate**: Never upload without validation first
2. **Check isValid**: Block upload if isValid is false
3. **Handle Errors**: Show error messages to user and prevent upload
4. **Show Warnings**: Display warnings but allow user to proceed
5. **Provide Recommendations**: Show optimization suggestions
6. **Media-Specific Checks**: Apply different rules for each media type
7. **User Communication**: Present validation results clearly

### Validation Workflow

- **Step 1 - Validate**: Run validation before any upload
- **Step 2 - Check Errors**: If errors exist, show and stop
- **Step 3 - Show Warnings**: Display warnings, ask user to confirm
- **Step 4 - Show Recommendations**: Present optimization suggestions
- **Step 5 - Proceed or Stop**: Allow upload if valid, stop if invalid

### Error Handling

- **File Size Errors**:
  - "File size (X MB) exceeds maximum allowed size (50 MB)"
  - Must prevent upload operation
  - User must reduce file size

- **File Type Errors**:
  - "Unsupported file type: [type]"
  - Must prevent upload operation
  - User must convert to supported format

### Warning Handling

- **Large File Warning** (10+ MB):
  - "Large file size may impact performance"
  - Allow upload with user confirmation
  - Recommend compression

- **Large Image Warning** (5+ MB):
  - "Very large image may cause performance issues"
  - Allow upload with user confirmation
  - Recommend resizing to under 5 MB

- **Long Content Warning** (5+ minutes):
  - "Long audio/video files may impact app performance"
  - Allow upload with user confirmation
  - Recommend trimming to under 5 minutes

### Recommendation Patterns

- **For Large Files**: "Consider compressing file"
- **For Large Images**: "Consider resizing image to under 5MB"
- **For Long Content**: "Consider trimming to under 5 minutes"
- **For Format**: Recommend MP3 for audio, MP4 for video
- **For Resolution**: Recommend 1920x1080 or smaller

### Media-Specific Validation

- **Images**:
  - Check MIME type against supported formats
  - Warn if size > 5 MB
  - Recommend JPEG for better compression
  - Consider resolution checks (optional)

- **Audio**:
  - Check MIME type against supported formats
  - Warn if duration > 5 minutes
  - Recommend MP3 format
  - Consider bitrate checks (optional)

- **Video**:
  - Check MIME type against supported formats
  - Warn if duration > 5 minutes
  - Recommend MP4 format
  - Consider resolution checks (optional)

### User Communication

- Display errors prominently (block upload)
- Show warnings with clear impact explanation
- Present recommendations as actionable steps
- Allow user to decide on warnings
- Format file sizes in MB/KB for readability
- Group messages by severity (errors, warnings, recommendations)

## Dependencies
- CardMediaValidation type for validation results
- File size constants for limits
- MIME type validation utilities
- Media type detection helpers

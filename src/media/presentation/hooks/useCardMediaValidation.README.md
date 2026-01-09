# useCardMediaValidation

## Purpose
Card-specific React hook for validating flashcard media files before upload with enhanced controls for different media types.

## File Location
`src/presentation/hooks/useCardMediaValidation.ts`

## Strategy
- Provide comprehensive validation for card media files
- Enhanced controls for images (5 MB warning threshold)
- Support audio/video duration validation
- Provide three-tier feedback: errors, warnings, recommendations
- Card-specific validation rules compared to general media
- Enable pre-upload validation workflow for cards
- Return actionable feedback with media-type specific recommendations

## Forbidden
- **DO NOT** upload files that fail validation (have errors)
- **DO NOT** ignore warnings - they indicate card performance issues
- **DO NOT** bypass file type validation
- **DO NOT** use mock validation in production
- **DO NOT** allow files exceeding 50 MB limit
- **DO NOT** modify files during validation
- **DO NOT** store validation results permanently
- **DO NOT** validate empty or missing files
- **DO NOT** suppress errors for user convenience

## Rules
1. Always validate before card media upload
2. Files over 50 MB must be rejected
3. Files over 10 MB trigger warning
4. Images over 5 MB trigger additional warning
5. Unsupported MIME types must be rejected
6. Validate file size, type, and format
7. Return errors array for blocking issues
8. Return warnings array for performance concerns
9. Return recommendations array for improvements
10. Clear validation state on new requests

## AI Agent Guidelines

When working with useCardMediaValidation hook:

1. **Card-Specific Rules**: Use for card media (not general media)
2. **Enhanced Image Control**: 5 MB threshold for images (stricter than general)
3. **Three-Tier Feedback**: Distinguish errors, warnings, recommendations
4. **Duration Control**: Check audio/video duration when available
5. **Pre-upload Check**: Always validate before useCardMediaUpload

### Validation Levels

**Errors** (Blocking - Must fix):
- File size exceeds 50 MB
- Unsupported file type
- Invalid file format
- Missing required properties

**Warnings** (Performance - Should fix):
- File size over 10 MB (general warning)
- Image size over 5 MB (card-specific warning)
- Long duration audio/video
- Large dimensions

**Recommendations** (Improvements - Optional):
- Reduce file size for card performance
- Use recommended formats
- Optimize dimensions
- Compress for balance

### Card-Specific vs General Validation

| Feature | useMediaValidation | useCardMediaValidation |
|---------|-------------------|------------------------|
| Max file size | 50 MB | 50 MB |
| General warning | 10 MB | 10 MB |
| Image warning | None | 5 MB (extra) |
| Duration check | No | Yes (5 min warning) |
| Type support | Same | Same |

### Supported File Types

**Images:**
- image/jpeg
- image/png
- image/webp

**Audio:**
- audio/mp3
- audio/wav
- audio/m4a

**Video:**
- video/mp4
- video/mov

### Validation Workflow

1. Receive file object (name, type, size, uri)
2. Check file size against limits
3. Validate MIME type
4. Apply card-specific rules (5 MB image warning)
5. Check duration if available
6. Generate errors, warnings, recommendations
7. Return CardMediaValidation object

### CardMediaValidation Structure

Validation result includes:
- isValid: Boolean (true if no errors)
- errors: String array (blocking issues)
- warnings: String array (performance concerns)
- recommendations: String array (improvements)

### File Size Guidelines

**Images:**
- Optimal: Under 2 MB
- Card warning: 2-5 MB
- Extra warning: 5-10 MB
- Error: Over 50 MB

**Audio:**
- Optimal: Under 5 MB
- Warning: 5-10 MB
- Duration warning: Over 5 minutes
- Error: Over 50 MB

**Video:**
- Optimal: Under 10 MB
- Warning: 10-50 MB
- Duration warning: Over 5 minutes
- Error: Over 50 MB

### Media Type Special Controls

**Image Controls:**
- Additional 5 MB warning threshold
- Dimension recommendations
- Format recommendations (JPEG for photos, PNG for graphics)

**Audio Controls:**
- Duration check (warn over 5 minutes)
- Format recommendation (MP3 preferred)
- Bitrate considerations

**Video Controls:**
- Duration check (warn over 5 minutes)
- Format recommendation (MP4 preferred)
- Resolution recommendations

### Integration with Card Upload Flow

Typical validation-upload workflow:
1. Select file from picker
2. Call validateMedia(file) from useCardMediaValidation
3. Check validation.isValid
4. If errors: Display and block upload
5. If warnings: Display and get confirmation
6. If recommendations: Display for reference
7. Proceed to useCardMediaUpload if valid or confirmed

### Best Practices

1. Always validate before card media upload
2. Show all three feedback levels to users
3. Allow users to proceed with warnings
4. Provide actionable recommendations
5. Consider card performance implications
6. Balance quality vs. file size

## Dependencies

- CardMediaValidationService (infrastructure layer)
- Domain types: CardMediaValidation, file input interfaces
- Media constants (card-specific size limits)

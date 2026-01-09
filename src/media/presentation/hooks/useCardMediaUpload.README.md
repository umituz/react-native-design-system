# useCardMediaUpload

## Purpose
Card-specific React hook for uploading flashcard media files to server with progress tracking and compression support.

## File Location
`src/presentation/hooks/useCardMediaUpload.ts`

## Strategy
- Provide card-specific media upload interface
- Support compression options for optimization
- Track upload progress with percentage and status
- Return CardMediaAttachment with position property
- Handle upload errors gracefully
- Generate thumbnails for visual media
- Support various media types for cards

## Forbidden
- **DO NOT** start upload while previous is in progress
- **DO NOT** ignore compression options
- **DO NOT** upload without validation (use useCardMediaValidation)
- **DO NOT** mock upload in production without backend integration
- **DO NOT** modify file during upload (compress before)
- **DO NOT** assume upload will succeed
- **DO NOT** use hardcoded API endpoints
- **DO NOT** bypass progress tracking
- **DO NOT** store upload results permanently in state
- **DO NOT** use incorrect ID prefixes (must use card_media_)

## Rules
1. Always validate before uploading (use useCardMediaValidation)
2. Compression quality must be in 0-1 range
3. Dimensions must be in pixels
4. Progress updates every 10% or on status change
5. Clear upload state on error or completion
6. Return CardMediaAttachment with position property
7. Generate thumbnail URL automatically
8. Calculate duration for audio/video
9. Update progress status: uploading -> completed/error
10. Include unique fileId in progress tracking

## AI Agent Guidelines

When working with useCardMediaUpload hook:

1. **Type Correctness**: Returns CardMediaAttachment (not MediaAttachment)
2. **Position Property**: Uploaded media includes position field
3. **Pre-upload Validation**: Always use useCardMediaValidation first
4. **Progress Tracking**: Monitor uploadProgress for real-time updates
5. **Compression**: Apply appropriate compression settings

### Upload Workflow

1. Validate file with useCardMediaValidation
2. Select compression options based on type and size
3. Call uploadMedia with file and options
4. Monitor uploadProgress state
5. Handle completion (success or error)
6. Process returned CardMediaAttachment

### CardMediaAttachment Structure

Returned object includes:
- id: Unique ID with card_media_ prefix
- type: CardMediaType (IMAGE, VIDEO, AUDIO)
- position: CardMediaPosition (defaults to 'both')
- url: Uploaded file URL
- filename: Original filename
- fileSize: Size in bytes
- mimeType: MIME type string
- duration: Audio/video duration
- thumbnailUrl: Thumbnail for visual media
- caption: Optional caption text
- isDownloaded: Download status
- createdAt: ISO timestamp

### Compression Guidelines

**High Quality** (quality: 0.9, maxWidth: 4096)
- Use for detailed card images
- Larger file size, best quality

**Medium Quality** (quality: 0.7, maxWidth: 1920) - RECOMMENDED
- Balanced quality and size
- Good for most card media

**Low Quality** (quality: 0.5, maxWidth: 1280)
- Use for card thumbnails
- Smallest size, reduced quality

### Upload Progress States

- **uploading**: Upload in progress (0-99%)
- **completed**: Upload finished successfully (100%)
- **error**: Upload failed with error message

### CardMediaUploadProgress

Progress object includes:
- fileId: Unique file identifier
- progress: Percentage (0-100)
- status: Current state (uploading/completed/error)
- url: Final URL when completed

### Integration with Card Creation

Typical workflow:
1. Select or generate media
2. Validate with useCardMediaValidation
3. Upload with useCardMediaUpload
4. Receive CardMediaAttachment with position
5. Add to card media array
6. Create card with useCardMultimediaFlashcard

### Position Assignment

Uploaded media gets position property:
- Default: 'both' (shown on both sides)
- Can be overridden: 'front' or 'back'
- Used to control media display on card sides

### Multiple File Upload

For multiple media files:
1. Upload files sequentially or in parallel
2. Collect CardMediaAttachment objects
3. Assign positions appropriately
4. Add to card media array
5. Track individual upload progress

### Integration Requirements

- Configure API endpoint for card media upload
- Implement authentication for uploads
- Handle file size limits
- Support retry logic for failures
- Generate thumbnails automatically
- Calculate media duration for audio/video

### Error Handling

Common error scenarios:
- File too large: Validate before upload
- Unsupported type: Check MIME type
- Network timeout: Implement retry with backoff
- Server error: Display user-friendly message
- Authentication failure: Check token validity

## Dependencies

- CardMediaUploadService (infrastructure layer)
- Domain types: CardMediaAttachment, CardMediaCompressionOptions, CardMediaUploadProgress
- useCardMediaValidation (for pre-upload validation)

# useMediaUpload

## Purpose
React hook for uploading media files to server with progress tracking and compression support.

## File Location
`src/presentation/hooks/useMediaUpload.ts`

## Strategy
- Provide unified media upload interface with progress tracking
- Support compression options to optimize file sizes before upload
- Track upload progress with percentage and status updates
- Handle upload errors gracefully with proper error propagation
- Maintain loading state to prevent duplicate uploads
- Support various media types (image, video, audio)
- Generate automatic thumbnails for media files

## Forbidden
- **DO NOT** start new upload while previous upload is in progress
- **DO NOT** ignore compression options - always apply before upload
- **DO NOT** upload files without validation (use useMediaValidation first)
- **DO NOT** mock upload process in production without integration
- **DO NOT** modify file during upload (compression happens before)
- **DO NOT** assume upload will succeed - always handle errors
- **DO NOT** use hardcoded API endpoints - must be configurable
- **DO NOT** bypass progress tracking for async uploads
- **DO NOT** store upload results permanently in hook state

## Rules
1. Always validate files before uploading (use useMediaValidation hook)
2. Compression quality must be in 0-1 range
3. Dimensions must be in pixels (maxWidth, maxHeight)
4. Progress updates must be emitted every 10% or on status change
5. Upload state must be cleared on error or completion
6. Return complete MediaAttachment object on success
7. Generate thumbnail URL automatically for visual media
8. Calculate duration for audio/video files
9. Update progress status: uploading -> completed or error
10. Include unique fileId in progress tracking

## AI Agent Guidelines

When working with useMediaUpload hook:

1. **Pre-upload Validation**: Always use useMediaValidation before calling uploadMedia
2. **Progress Tracking**: Monitor uploadProgress state for real-time updates
3. **Compression**: Apply appropriate compression based on use case
4. **Error Recovery**: Handle upload errors and allow retry logic
5. **File Size**: Consider file size when choosing compression settings

### Upload Workflow

1. Validate file with useMediaValidation hook
2. Select compression options based on file type and size
3. Call uploadMedia with file and options
4. Monitor uploadProgress for status updates
5. Handle completion (success or error)
6. Process returned MediaAttachment object

### Compression Guidelines

**High Quality** (quality: 0.9, maxWidth: 4096)
- Use for professional photos, detailed graphics
- Larger file size, best quality

**Medium Quality** (quality: 0.7, maxWidth: 1920) - RECOMMENDED
- Balanced quality and size
- Good for most use cases

**Low Quality** (quality: 0.5, maxWidth: 1280)
- Use for thumbnails, previews
- Smallest file size, reduced quality

### Upload Progress States

- **uploading**: Upload in progress, progress 0-99%
- **completed**: Upload finished successfully, progress 100%
- **error**: Upload failed, error message available

### MediaAttachment Structure

Returned object includes:
- id: Unique identifier
- url: Uploaded file URL
- type: MediaType (IMAGE, VIDEO, AUDIO)
- position: MediaPosition (front, back, both)
- filename: Original filename
- fileSize: Size in bytes
- mimeType: MIME type string
- duration: Audio/video duration in seconds
- thumbnailUrl: Thumbnail URL for visual media
- caption: Optional caption text
- isDownloaded: Download status flag
- createdAt: ISO timestamp

### Integration Requirements

- Configure API endpoint for upload service
- Implement actual upload logic in MediaUploadService
- Handle authentication tokens for uploads
- Support retry logic for failed uploads
- Implement timeout handling for large files

## Dependencies

- MediaUploadService (infrastructure layer)
- Domain types: MediaAttachment, MediaCompressionOptions, MediaUploadProgress
- useMediaValidation (for pre-upload validation)

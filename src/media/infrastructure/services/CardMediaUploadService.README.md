# CardMediaUploadService

## Purpose
Service that handles media file upload, download, and URL management for flashcard applications, with support for compression and automatic thumbnail generation.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/CardMediaUploadService`

## Strategy
- Upload media files to server storage with unique identifiers
- Support compression options during upload (quality, dimensions, format)
- Generate thumbnails automatically for uploaded media
- Download media from server to local storage
- Retrieve and manage media URLs
- Calculate duration for audio/video files
- Return card-compatible media attachments with position support
- Handle all media types (image, video, audio) with automatic type detection

## Forbidden
- **DO NOT** upload files without validation
- **DO NOT** bypass file size limits
- **DO NOT** upload unsupported file types
- **DO NOT** ignore upload failures
- **DO NOT** assume all uploads will succeed
- **DO NOT** overwrite existing media without verification
- **DO NOT** proceed without error handling for network issues
- **DO NOT** download media without checking URL validity

## Rules
1. All uploads must include valid file metadata (name, type, size, uri)
2. Compression options are optional but recommended for large files
3. Quality must be between 0-1 when specified
4. Max dimensions must be positive integers when specified
5. Supported formats are jpeg and png for compression
6. All attachments receive unique IDs automatically
7. Position defaults to 'both' for uploaded media
8. isDownloaded defaults to true for uploads
9. Thumbnails are generated automatically for visual content
10. Audio/video duration is calculated automatically
11. File type is determined automatically from MIME type
12. Upload operations must handle network failures gracefully
13. Download operations must validate URL before processing

## AI Agent Guidelines

When working with CardMediaUploadService:

1. **Pre-upload Validation**: Always validate files before upload attempts
2. **Compression Strategy**: Apply compression for files larger than 5MB
3. **Type Detection**: Rely on automatic type detection from MIME type
4. **Error Handling**: Handle network timeouts and connection failures
5. **Position Assignment**: Set correct position (front/back/both) for card use
6. **Thumbnail Usage**: Use thumbnails for previews to save bandwidth
7. **Duration Handling**: Use calculated duration for audio/video scheduling

### Upload Guidelines

- **Before Upload**:
  - Validate file size and type
  - Consider compression for large files
  - Check network connectivity
  - Prepare error handling

- **During Upload**:
  - Monitor for failures
  - Handle network errors
  - Store attachment information
  - Track upload progress

- **After Upload**:
  - Verify upload success
  - Store attachment ID and URL
  - Set position for card use
  - Consider optimization if needed

### Compression Options

- **Quality**: 0.9 (high), 0.7 (medium/recommended), 0.5 (low)
- **Max Dimensions**: 1920x1080 (recommended), 1280x720 (smaller)
- **Format**: jpeg (smaller size), png (better quality)
- Apply compression when file size > 5MB for images
- Use quality 0.7 for balance of size and quality

### Media Type Detection

- **Image**: MIME types starting with 'image/'
  - Supported: image/jpeg, image/png, image/webp
- **Audio**: MIME types starting with 'audio/'
  - Supported: audio/mp3, audio/wav, audio/m4a
- **Video**: MIME types starting with 'video/'
  - Supported: video/mp4, video/mov

### Download Guidelines

- Validate media URL before download
- Handle missing files gracefully
- Use local path for offline access
- Check isDownloaded status before re-downloading
- Manage local storage space

### Error Handling Patterns

- Handle network errors: timeout, connection refused
- Handle file errors: invalid format, corrupted file
- Handle server errors: 500, 503, insufficient storage
- Handle validation errors: size exceeded, unsupported type
- Always provide fallback behavior for failed uploads

### Performance Considerations

- Upload operations are simulated (2 seconds delay)
- Compress before upload to reduce transfer time
- Use thumbnails for previews instead of full media
- Batch uploads when possible for multiple files
- Consider lazy loading for card media

## Dependencies
- CardMediaAttachment type from domain layer
- CardMediaCompressionOptions type for compression settings
- getCardMediaType helper for type detection
- getMediaDuration helper for duration calculation
- generateThumbnail helper for thumbnail creation
- Upload API endpoints (simulated in development)

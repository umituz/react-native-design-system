# MediaUploadService

## Purpose
Manages media file uploads to remote servers, including compression, URL management, and download functionality.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/MediaUploadService`

## Strategy

### Core Purpose
- Upload media files to remote storage
- Generate and manage media URLs
- Support compression during upload
- Download media to local storage
- Generate thumbnails automatically

### Usage Scenarios
- User-generated content uploads
- Profile picture uploads
- Document/image sharing
- Media backup workflows
- Content delivery networks integration

### Integration Points
- Form submissions with media attachments
- Social media sharing features
- Cloud storage synchronization
- Content management systems
- Media delivery pipelines

## Forbidden

### MUST NOT
- Upload invalid or corrupted files
- Assume network is always available
- Upload without file size limits
- Ignore authentication requirements
- Store sensitive credentials in service
- Generate duplicate URLs for same media

### MUST NEVER
- Upload without proper error handling
- Assume upload progress is always available
- Retry failed uploads indefinitely
- Expose sensitive upload endpoints
- Upload without user consent
- Ignore network timeout scenarios

## Rules

### Upload Operations
- MUST validate file before upload
- MUST handle network errors gracefully
- MUST support compression options
- MUST return unique media ID
- MUST provide upload progress when possible
- MUST handle timeout scenarios

### Compression Options
- MUST support quality adjustment (0-1)
- MUST support max width/height constraints
- MUST support format conversion (jpeg/png)
- MUST validate compression parameters
- MUST apply compression before upload

### URL Management
- MUST generate unique URLs for each media
- MUST support URL retrieval by media ID
- MUST handle invalid media IDs
- MUST maintain URL consistency
- MUST support URL expiration if required

### Download Operations
- MUST validate media ID before download
- MUST handle download failures
- MUST return local file path
- MUST manage storage space
- MUST support large file downloads

### Return Values
- MUST include media metadata (type, size, MIME)
- MUST include unique identifier
- MUST include URL (full or relative)
- MUST include thumbnail for applicable types
- MUST include duration for audio/video

### Error Handling
- MUST catch network errors
- MUST handle authentication failures
- MUST handle storage quota exceeded
- MUST provide meaningful error messages
- MUST allow retry after failure

## AI Agent Guidelines

### When Implementing Upload Features
1. Always validate file metadata before upload
2. Apply compression options if specified
3. Generate unique media identifier
4. Handle network failures gracefully
5. Return complete media attachment object

### When Working with URLs
- Generate unique, predictable URLs
- Support both absolute and relative URLs
- Include media ID in URL structure
- Handle URL generation failures

### When Adding Features
- Add new media types with validation
- Extend compression options carefully
- Maintain backward compatibility
- Add progress tracking for large files
- Support batch uploads if needed

### When Refactoring
- Keep upload API stable
- Preserve media ID generation logic
- Maintain URL structure consistency
- Don't change return value structure
- Add deprecation warnings for breaking changes

### Common Patterns to Follow
- Validate file -> Apply compression -> Upload -> Return attachment
- Handle network errors -> Retry if appropriate -> Return error
- Generate URL -> Store mapping -> Return URL
- Always wrap network operations in try-catch
- Provide user feedback for upload progress

## Dependencies

- Domain types: MediaAttachment, MediaCompressionOptions from MultimediaFlashcardTypes
- Internal utilities: mediaHelpers (generateThumbnail, getMediaDuration, getMediaType)
- No external library dependencies (uses native APIs and fetch)

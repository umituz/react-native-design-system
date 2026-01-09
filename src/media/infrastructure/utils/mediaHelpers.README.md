# Media Helper Utilities

## Purpose
Core utility functions for media type detection, duration calculation, thumbnail generation, and file size operations.

## File Location
`src/infrastructure/utils/mediaHelpers.ts`

## Strategy
- Provide pure utility functions for common media operations
- Enable media type classification from MIME types
- Support file size calculations and formatting
- Generate thumbnails for video files
- Extract metadata from media collections
- Maintain framework-agnostic approach where possible

## Forbidden
- **DO NOT** add business logic to utility functions
- **DO NOT** make network calls or API requests
- **DO NOT** modify input parameters (pure functions)
- **DO NOT** store state or cache results globally
- **DO NOT** depend on React or UI frameworks
- **DO NOT** throw exceptions without clear error messages
- **DO NOT** use locale-specific string formatting

## Rules
1. All functions must be pure (same input = same output)
2. File size calculations must use bytes as the base unit
3. Media type detection must use MIME type patterns
4. Duration calculation must return seconds (or undefined for non-audio/video)
5. Thumbnail generation must only return URLs for video files
6. Type extraction must remove duplicates and preserve order
7. Size formatting must use appropriate units (Bytes/KB/MB/GB)
8. All functions must handle edge cases (empty arrays, null values)
9. Must support both CardMediaAttachment and MediaAttachment types
10. Must return fallback values for invalid inputs

## AI Agent Guidelines

When working with media helper utilities:

1. **Type Detection**: Always use `getCardMediaType()` for consistent type classification from MIME types
2. **Size Calculations**: Use `calculateTotalSize()` for aggregating file sizes, never sum manually
3. **Duration Handling**: Check for undefined return value from `getMediaDuration()` for non-audio/video files
4. **Thumbnail Generation**: Only videos return thumbnail URLs; images return undefined
5. **Type Extraction**: Use `extractMediaTypes()` to get unique media types from collections
6. **Size Formatting**: Always use `formatFileSize()` for user-facing size displays
7. **Null Safety**: Always handle null/undefined returns appropriately
8. **Collection Operations**: Use provided utilities instead of manual array operations

### Media Type Classification

- **Supported Types**: "image", "audio", "video"
- **Detection Method**: MIME type pattern matching
- **Default Behavior**: Unknown types default to "image"
- **Common Patterns**:
  - Images: image/jpeg, image/png, image/gif, image/webp
  - Audio: audio/mp3, audio/wav, audio/mpeg, audio/aac
  - Video: video/mp4, video/quicktime, video/x-msvideo

### File Size Operations

1. **Aggregation**: `calculateTotalSize()` - Sum all file sizes in bytes
2. **Formatting**: `formatFileSize()` - Convert bytes to readable format
3. **Unit Selection**: Automatically chooses appropriate unit (Bytes/KB/MB/GB)
4. **Rounding**: Rounds to 2 decimal places for KB and above

### Duration and Metadata

1. **Duration**: Returns seconds for audio/video, undefined for images
2. **Thumbnails**: Only generated for video files using external service
3. **Type Extraction**: Returns unique types in order of appearance
4. **Media Support**: Works with both CardMediaAttachment and MediaAttachment

### Error Handling

1. Handle undefined returns from `getMediaDuration()` for images
2. Handle undefined returns from `generateThumbnail()` for non-videos
3. Validate MIME type strings before type detection
4. Handle empty arrays in collection operations
5. Always check for null/undefined file objects

### Usage Patterns

1. **Media Analysis**: Combine multiple utilities for comprehensive file analysis
2. **Validation**: Use type detection and size calculation for pre-upload validation
3. **Statistics**: Aggregate collection data using type extraction and size calculation
4. **Display**: Format sizes for user interfaces using formatFileSize
5. **Filtering**: Use extracted types for conditional logic and filtering

## Dependencies

- Domain layer types (MediaAttachment, CardMediaAttachment)
- No external libraries
- No framework dependencies
- Pure TypeScript/JavaScript utilities

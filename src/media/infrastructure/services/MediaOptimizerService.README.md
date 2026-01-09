# MediaOptimizerService

## Purpose
Optimizes and compresses media files to reduce file size while maintaining acceptable quality, and manages media deletion operations.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/MediaOptimizerService`

## Strategy

### Core Purpose
- Reduce media file size through compression
- Maintain acceptable quality after optimization
- Support quality and dimension constraints
- Delete media from server and local storage
- Generate optimized versions of existing media

### Usage Scenarios
- Pre-upload optimization
- Storage cost reduction
- Performance improvement
- Bandwidth optimization
- Media cleanup workflows

### Integration Points
- After upload, before storage
- In media management workflows
- Storage optimization processes
- Media cleanup routines
- Performance tuning operations

## Forbidden

### MUST NOT
- Optimize media beyond usable quality
- Delete media without proper authorization
- Assume optimization always succeeds
- Modify original media files
- Ignore quality settings
- Delete without confirmation in critical workflows

### MUST NEVER
- Optimize already optimized media repeatedly
- Use quality below 0.3 without explicit request
- Delete media without backup when required
- Assume optimization is lossless
- Ignore file size after optimization
- Return different media ID after optimization

## Rules

### Optimization Operations
- MUST accept media attachment and options
- MUST preserve original media (create new version)
- MUST return optimized media attachment
- MUST maintain same media ID
- MUST update file size accurately
- MUST add optimization indicator to URL

### Compression Options
- MUST support quality adjustment (0-1)
- MUST support max width constraint
- MUST support max height constraint
- MUST support format conversion
- MUST validate compression parameters
- MUST respect quality vs size tradeoff

### Quality Levels
- High quality (0.9-1.0): 10-20% size reduction
- Medium quality (0.7-0.8): 30-50% size reduction
- Low quality (0.5-0.6): 50-70% size reduction
- Preview quality (0.3-0.4): 70-80% size reduction
- MUST document quality tradeoffs

### Deletion Operations
- MUST accept media ID for deletion
- MUST delete from both server and local storage
- MUST handle non-existent media gracefully
- MUST confirm deletion success
- MUST be permanent and irreversible

### Return Values
- MUST preserve original media ID
- MUST preserve media type
- MUST update file size
- MUST preserve MIME type
- MUST preserve creation date
- MUST update URL with optimization indicator

### Error Handling
- MUST handle optimization failures
- MUST handle deletion failures
- MUST handle invalid media IDs
- MUST handle invalid compression options
- MUST provide meaningful error messages
- MUST allow retry on transient failures

## AI Agent Guidelines

### When Implementing Optimization
1. Always validate compression options
2. Calculate expected file size reduction
3. Apply compression with specified quality
4. Update metadata accurately
5. Return optimized version with same ID

### When Working with Quality Settings
- Use 0.7-0.8 for general use (recommended)
- Use 0.9-1.0 for high-quality requirements
- Use 0.5-0.6 for previews and thumbnails
- Avoid quality below 0.3 unless specifically needed
- Consider content type when setting quality

### When Performing Deletion
- Confirm media ID exists before deletion
- Handle deletion from both storage locations
- Provide confirmation in critical workflows
- Log deletion operations for audit
- Handle non-existent media gracefully

### When Adding Features
- Add new compression formats carefully
- Support new dimension constraints
- Add batch optimization if needed
- Maintain backward compatibility
- Add optimization presets for common cases

### When Refactoring
- Keep optimization API stable
- Preserve ID generation logic
- Maintain URL structure
- Don't change return value structure
- Add deprecation warnings for breaking changes

### Common Patterns to Follow
- Receive attachment -> Validate options -> Optimize -> Return optimized
- Calculate size -> Apply quality -> Update metadata -> Return
- Receive ID -> Validate -> Delete -> Confirm
- Always wrap in try-catch for unexpected errors
- Provide user feedback for optimization progress

## Dependencies

- Domain types: MediaAttachment, MediaCompressionOptions from MultimediaFlashcardTypes
- No external library dependencies (uses native APIs)

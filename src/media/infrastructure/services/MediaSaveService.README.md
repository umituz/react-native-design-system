# MediaSaveService

## Purpose
Handles saving image and video files to the device's photo gallery, including album management and permission handling.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/MediaSaveService`

## Strategy

### Core Purpose
- Save media files to device gallery
- Create and manage custom albums
- Handle platform-specific save requirements
- Manage write permissions for media library

### Usage Scenarios
- Saving downloaded images to gallery
- Creating app-specific albums
- Saving captured media to gallery
- Organizing media into custom collections
- Backup workflows

### Integration Points
- After media download completes
- After media generation/creation
- User-initiated save actions
- Batch media save operations

## Forbidden

### MUST NOT
- Save files without proper write permissions
- Assume album creation always succeeds
- Create duplicate albums with same name
- Overwrite existing media without user consent
- Save invalid or corrupted media files
- Ignore save operation results

### MUST NEVER
- Attempt to save when permission is denied
- Assume save operation is instant
- Save to private app storage using this service
- Modify saved media after save operation completes
- Bypass platform-specific save restrictions

## Rules

### Permission Management
- MUST request write permission before saving
- MUST check permission status before operations
- MUST handle permission denial gracefully
- MUST provide clear error messages for permission issues
- MUST respect user's permission decisions

### Save Operations
- MUST validate file URI/path before saving
- MUST determine media type (image/video) correctly
- MUST handle save failures appropriately
- MUST return success/failure status
- MUST include asset ID in successful results

### Album Management
- MUST create album automatically if it doesn't exist
- MUST NOT create duplicate albums with same name
- MUST save to default gallery if no album specified
- MUST handle album creation failures
- MUST validate album names

### Error Handling
- MUST catch and report save failures
- MUST handle invalid file paths
- MUST handle insufficient storage scenarios
- MUST provide meaningful error messages
- MUST allow retry after permission grant

### Platform Considerations
- MUST handle iOS save requirements
- MUST handle Android scoped storage (API 10+)
- MUST account for platform-specific restrictions
- MUST test on both platforms

## AI Agent Guidelines

### When Implementing Save Operations
1. Always check permissions before attempting save
2. Validate file URI/path exists and is accessible
3. Determine correct media type for the file
4. Handle both success and failure cases
5. Provide user feedback for save operations

### When Working with Albums
- Check if album exists before creating
- Use consistent album naming
- Handle album creation failures gracefully
- Allow saving to default gallery as fallback

### When Adding Features
- Add new media types with proper validation
- Extend save options without breaking changes
- Maintain backward compatibility
- Add error handling for new edge cases

### When Refactoring
- Keep public API stable
- Preserve permission handling logic
- Maintain platform-specific behavior
- Don't remove existing save methods without deprecation

### Common Patterns to Follow
- Request permission -> Check status -> Validate file -> Save
- Handle result -> Check success -> Return asset ID or error
- Always wrap in try-catch for unexpected errors
- Provide user feedback for save status

## Dependencies

- Domain types: MediaType, MediaLibraryPermission from Media
- External libraries: expo-media-library
- No internal utility dependencies

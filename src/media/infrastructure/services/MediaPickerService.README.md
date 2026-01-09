# MediaPickerService

## Purpose
Provides image and video selection functionality from device camera and gallery, including permission management and media type filtering.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/MediaPickerService`

## Strategy

### Core Purpose
- Enable users to select media from device gallery or capture using camera
- Support single and multiple media selection
- Handle platform-specific permission requirements
- Provide customizable selection options

### Usage Scenarios
- User profile picture selection
- Content creation workflows
- Multi-image selection for galleries
- Video recording for user-generated content
- Mixed media selection (images and videos)

### Integration Points
- Forms requiring media attachments
- Content management systems
- Social media features
- Document upload workflows

## Forbidden

### MUST NOT
- Bypass permission checks or force camera/gallery access
- Assume permissions are always granted
- Hardcode file paths or URIs
- Access media without explicit user action
- Automatically launch camera without user consent
- Store selected media URIs in permanent storage without validation

### MUST NEVER
- Allow infinite selection limits without boundaries
- Use base64 conversion by default (performance impact)
- Assume all devices support the same media types
- Ignore permission denial states
- Access camera roll without proper permissions

## Rules

### Permission Management
- MUST request camera permission before launching camera
- MUST request media library permission before accessing gallery
- MUST handle permission denial gracefully
- MUST check permission status before operations
- MUST provide clear error messages when permissions are denied

### Media Selection
- MUST respect selection limits
- MUST validate selected media before processing
- MUST handle user cancellation (canceled: true)
- MUST support both single and multiple selection modes
- MUST filter media types appropriately

### Platform Considerations
- MUST handle iOS and Android permission differences
- MUST account for platform-specific media type restrictions
- MUST test on both platforms for compatibility
- MUST handle aspect ratio options correctly (only works with allowsEditing: true)

### Performance
- MUST avoid base64 conversion unless explicitly required
- MUST set reasonable quality defaults
- MUST handle large media files appropriately
- MUST provide loading states during selection

## AI Agent Guidelines

### When Implementing Media Selection
1. Always check permissions before launching picker
2. Handle both success (canceled: false) and cancellation (canceled: true)
3. Validate returned assets array exists and has items
4. Consider media type (image vs video) for different handling
5. Use appropriate quality settings based on use case

### When Adding Features
- Add new permission types only if required by new functionality
- Extend options interface without breaking existing functionality
- Maintain backward compatibility with existing selection methods
- Add error handling for new edge cases

### When Refactoring
- Keep public API stable
- Preserve permission handling logic
- Maintain platform-specific behavior differences
- Don't remove existing selection methods without deprecation

### Common Patterns to Follow
- Request permission -> Check status -> Launch picker
- Handle result -> Validate -> Return or process
- Always wrap in try-catch for unexpected errors
- Provide user feedback for permission states

## Dependencies

- Domain types: MediaPickerOptions, MediaPickerResult, CameraOptions, MediaType, MediaLibraryPermission, MEDIA_CONSTANTS from Media
- External libraries: expo-image-picker
- Internal utilities: mediaPickerMappers (mapMediaType, mapPermissionStatus, mapPickerResult)

# useMedia

## Purpose
Core React hook for media selection operations (image/video picking, camera access) in React Native applications.

## File Location
`src/presentation/hooks/useMedia.ts`

## Strategy
- Provide unified interface for media picker and camera operations
- Abstract expo-image-picker complexity from components
- Centralize permission management logic
- Maintain consistent state management across media operations
- Enable type-safe media operations with proper TypeScript interfaces
- Support single and multiple media selection workflows
- Handle loading states and error propagation

## Forbidden
- **DO NOT** expose expo-image-picker implementation details to consumers
- **DO NOT** automatically request permissions without explicit user action
- **DO NOT** mix camera and library picker logic in single operations
- **DO NOT** assume permission states - always check before operations
- **DO NOT** bypass error handling or loading states
- **DO NOT** use mock implementations in production without clear warnings
- **DO NOT** allow operations while previous operation is in progress
- **DO NOT** modify media assets after selection
- **DO NOT** store selected media permanently in hook state

## Rules
1. Always check permission status before camera/library operations
2. All picker operations must return MediaPickerResult with canceled flag
3. Loading state must be true during async operations
4. Error state must be cleared on new operation attempts
5. Permission requests must be explicit, not automatic
6. Selected media must be validated against type definitions
7. Quality parameters must be in 0-1 range
8. Aspect ratio must be [width, height] tuple
9. File size must be included when available from picker
10. Support both single and multiple selection based on function used

## AI Agent Guidelines

When working with useMedia hook:

1. **Permission First**: Always request/check permissions before calling picker or camera functions
2. **State Management**: Use isLoading to prevent duplicate operations during active calls
3. **Error Handling**: Always check error state and handle user cancellation (canceled: true)
4. **Type Safety**: Use MediaPickerOptions and CameraOptions interfaces for configuration
5. **Validation**: Validate returned assets before processing (check if assets array exists)

### Key Functions

- **pickImage**: Single image selection from library with optional editing
- **pickMultipleImages**: Multiple image selection with selection limit
- **pickVideo**: Video selection from library
- **launchCamera**: Photo capture via device camera
- **launchCameraForVideo**: Video recording via device camera
- **requestCameraPermission**: Request camera access permission
- **requestMediaLibraryPermission**: Request photo library access permission
- **getCameraPermissionStatus**: Check current camera permission state
- **getMediaLibraryPermissionStatus**: Check current library permission state

### Media Selection Workflow

1. Check permission status before operation
2. Request permission if not granted
3. Call appropriate picker/camera function with options
4. Check canceled flag before processing assets
5. Validate assets array exists and has items
6. Process first asset (or all for multiple selection)

### Quality Guidelines

- HIGH (1.0): Original quality, largest file size
- MEDIUM (0.7): Balanced quality and size (recommended)
- LOW (0.3): Smallest file size, reduced quality

### Platform Requirements

- **iOS**: Add NSCameraUsageDescription and NSPhotoLibraryUsageDescription to Info.plist
- **Android**: Add CAMERA and READ_EXTERNAL_STORAGE permissions to AndroidManifest.xml

### State Management

- **isLoading**: True during any async picker/camera operation
- **error**: String error message or null, cleared on new operations
- **MediaPickerResult.canceled**: True when user cancels operation
- **MediaPickerResult.assets**: Array of selected media or undefined

## Dependencies

- MediaPickerService (infrastructure layer)
- Domain types: MediaAsset, MediaPickerResult, MediaPickerOptions, CameraOptions
- expo-image-picker (via service layer)

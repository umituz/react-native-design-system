# Media Types and Interfaces

## Purpose
Core type definitions and interfaces for media handling throughout the application.

## File Location
`src/domain/entities/Media.ts`

## Strategy
- Define the contract for media operations across all layers
- Provide type-safe interfaces for media assets, picker options, and operations
- Serve as the single source of truth for media-related types
- Enable compile-time validation of media operations
- Maintain separation between domain logic and implementation

## Forbidden
- **DO NOT** import external libraries (expo, react-native) in domain types
- **DO NOT** include implementation details in type definitions
- **DO NOT** add business logic to type definitions
- **DO NOT** create circular dependencies between types
- **DO NOT** export types that are not used by other layers
- **DO NOT** use `any` type or loose type definitions
- **DO NOT** modify existing types - extend them instead

## Rules
1. All media types must be exported from this file
2. Type definitions must be framework-agnostic
3. Enums must have explicit string values
4. Interfaces must extend appropriate base types
5. Optional fields must be clearly marked with `?`
6. File size fields must use bytes as unit
7. Dimensions must be in pixels
8. MIME type validation must use standard MIME types
9. All new properties must be added with backward compatibility in mind
10. Type exports must be re-exported from main index

## AI Agent Guidelines

When working with Media types:

1. **Type Import**: Always import types from `@umituz/react-native-media` domain layer
2. **Type Safety**: Use provided types instead of `any` or loose types
3. **Validation**: Validate media assets against these types before processing
4. **Extensibility**: Extend interfaces when adding new properties, don't modify core types
5. **Consistency**: Maintain naming conventions (PascalCase for types, camelCase for properties)

### Key Enums Reference

- `MediaType`: IMAGE, VIDEO, ALL - Use for media type filtering
- `ImageFormat`: PNG, JPEG, WEBP - Use for format specification
- `MediaQuality`: LOW (0.3), MEDIUM (0.7), HIGH (1.0) - Use for compression quality
- `MediaLibraryPermission`: GRANTED, DENIED, LIMITED - Use for permission states

### Type Usage Guidelines

1. **MediaAsset**: Primary type for all media files with uri, dimensions, type, size
2. **MediaPickerResult**: Return type for all picker operations with canceled flag
3. **MediaPickerOptions**: Configuration for library picker with mediaTypes, quality, limits
4. **CameraOptions**: Configuration for camera operations with quality, duration, editing

### Validation Rules

1. Check file size against `MediaAsset.fileSize` (in bytes)
2. Validate dimensions using `width` and `height` properties (in pixels)
3. Verify MIME type matches expected `MediaType`
4. Ensure URIs are properly formatted strings
5. Validate aspect ratio format as [width, height] tuple

### Constants Reference

Use `MEDIA_CONSTANTS` for:
- Maximum file sizes (MAX_IMAGE_SIZE, MAX_VIDEO_SIZE)
- Default values (DEFAULT_QUALITY, DEFAULT_FORMAT, DEFAULT_ASPECT_RATIO)
- Supported format lists (SUPPORTED_IMAGE_FORMATS, SUPPORTED_VIDEO_FORMATS)

## Dependencies

- No external dependencies
- May reference other domain types within the domain layer
- Must be usable by infrastructure and presentation layers without additional dependencies

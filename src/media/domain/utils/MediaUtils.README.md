# MediaUtils

## Purpose
Utility class containing helper functions for media operations, validation, and calculations. Provides static methods for file type detection, dimension calculations, format conversions, and media validation.

## File Location
`src/domain/utils/MediaUtils.ts`

## Strategy
- Provide framework-agnostic utility functions for media operations
- Enable consistent media type detection and validation
- Support dimension calculations and scaling operations
- Facilitate format conversions and MIME type mappings
- Maintain aspect ratio preservation during transformations
- Validate media constraints (dimensions, file types, sizes)
- Provide helper functions for common media operations

## Forbidden
- **DO NOT** import external libraries (expo-image-picker, react-native) in utility functions
- **DO NOT** include business logic or application-specific rules
- **DO NOT** create instance methods - all methods must be static
- **DO NOT** store state or maintain mutable properties
- **DO NOT** make network calls or async operations in utility methods
- **DO NOT** hardcode platform-specific behavior
- **DO NOT** include UI-related logic or formatting for display
- **DO NOT** modify input parameters - always return new objects/values
- **DO NOT** throw exceptions for validation failures - return boolean results
- **DO NOT** assume specific file systems or storage mechanisms

## Rules
1. All methods must be static and stateless
2. All methods must be synchronous and pure functions
3. Input validation must not throw exceptions
4. Dimension calculations must preserve aspect ratios
5. MIME type mappings must use standard MIME types
6. Maximum dimension limit is 8192x8192 pixels
7. Minimum dimension limit is 1x1 pixels
8. File type detection must use extension checking
9. Scale calculations must return integer values
10. Aspect ratio must be calculated as width/height
11. Unknown MIME types must map to MediaType.ALL
12. Format validation must use supported format lists
13. All methods must handle edge cases (zero, negative values)
14. Return types must be consistent (boolean for validation, numbers for calculations)

## AI Agent Guidelines

When working with MediaUtils:

1. **Static Usage**: Always call methods on the class, never create instances
2. **Type Detection**: Use isImage() and isVideo() before processing files
3. **Validation**: Always validate dimensions before scaling operations
4. **Aspect Ratios**: Preserve aspect ratios when calculating scaled dimensions
5. **MIME Types**: Use getImageMimeType() for format-to-MIME conversion
6. **Media Type Parsing**: Use parseMediaType() to convert MIME to MediaType enum
7. **Error Handling**: Check boolean return values for validation failures
8. **Edge Cases**: Handle zero and negative dimensions appropriately
9. **Performance**: Utility methods are lightweight and can be called frequently

### Key Methods Reference

- **isImage(uri: string)**: boolean - Check if file is an image by extension
- **isVideo(uri: string)**: boolean - Check if file is a video by extension
- **getImageMimeType(format: ImageFormat)**: string - Get MIME type for image format
- **calculateAspectRatio(width, height)**: number - Calculate width/height ratio
- **getScaledDimensions(width, height, maxWidth, maxHeight)**: object - Calculate scaled dimensions preserving aspect ratio
- **isValidDimensions(width, height)**: boolean - Validate dimensions are within allowed range
- **parseMediaType(mimeType: string)**: MediaType - Convert MIME type to MediaType enum

### Method Usage Guidelines

**File Type Detection:**
1. Use isImage() to validate image files before processing
2. Use isVideo() to validate video files before processing
3. Both methods check file extensions (jpg, png, mp4, mov, etc.)
4. Returns false for unknown or unsupported formats

**Dimension Calculations:**
1. Always validate dimensions with isValidDimensions() before processing
2. Use calculateAspectRatio() to understand image proportions
3. Use getScaledDimensions() to resize while preserving aspect ratio
4. Scaled dimensions will never exceed maxWidth or maxHeight
5. Aspect ratio is maintained even when only one dimension exceeds limits

**Format Conversions:**
1. Use getImageMimeType() to get standard MIME type from format enum
2. Use parseMediaType() to convert MIME strings to MediaType enum
3. Unknown MIME types return MediaType.ALL
4. MIME type mappings are constant and cannot be modified

### Validation Rules

1. **isValidDimensions**:
   - Width and height must be positive integers
   - Maximum allowed dimension is 8192 pixels
   - Minimum allowed dimension is 1 pixel
   - Returns false for zero or negative values
   - Returns false for values exceeding 8192

2. **Aspect Ratio Calculations**:
   - Must preserve original ratio in scaled dimensions
   - Calculated as width divided by height
   - Square images (1:1) return ratio of 1.0
   - Widescreen (16:9) returns ratio of approximately 1.78
   - Portrait (9:16) returns ratio of approximately 0.56

3. **Scaling Operations**:
   - Input dimensions can be any positive integers
   - Output dimensions never exceed maxWidth or maxHeight
   - Aspect ratio is always preserved
   - Returns integer dimensions (not floating point)
   - If both dimensions are within limits, returns original dimensions
   - If only one dimension exceeds limit, scales proportionally

### MIME Type Handling

**Supported Image MIME Types:**
- PNG: "image/png"
- JPEG: "image/jpeg"
- WEBP: "image/webp"

**MediaType Mapping:**
- "image/*" formats return MediaType.IMAGE
- "video/*" formats return MediaType.VIDEO
- Unknown formats return MediaType.ALL
- Mapping is based on MIME type prefix

### Constants Reference

- **IMAGE_MIME_TYPES**: Readonly object mapping image formats to MIME types
- Keys: "png", "jpeg", "webp"
- Values: Standard MIME type strings
- Used by getImageMimeType() method

### Common Use Cases

**Image Validation Pipeline:**
1. Check file type with isImage()
2. Validate dimensions with isValidDimensions()
3. Calculate aspect ratio with calculateAspectRatio()
4. Get MIME type with getImageMimeType()
5. Scale if needed with getScaledDimensions()

**Video Validation Pipeline:**
1. Check file type with isVideo()
2. Validate dimensions with isValidDimensions()
3. Parse media type with parseMediaType()
4. Scale if needed with getScaledDimensions()

**Format Conversion:**
1. Convert format enum to MIME type using getImageMimeType()
2. Convert MIME type to MediaType using parseMediaType()
3. Use MediaType for filtering and type checking

### Edge Case Handling

1. **Zero dimensions**: isValidDimensions() returns false
2. **Negative dimensions**: isValidDimensions() returns false
3. **Oversized dimensions**: isValidDimensions() returns false if > 8192
4. **Unknown file extensions**: isImage() and isVideo() return false
5. **Unknown MIME types**: parseMediaType() returns MediaType.ALL
6. **Equal aspect ratios**: getScaledDimensions() returns original if within limits

### Performance Considerations

1. All methods are synchronous and execute in O(1) time
2. No network calls or I/O operations
3. No side effects or state mutations
4. Safe to call frequently in loops or render cycles
5. No memory allocation beyond return values

## Dependencies

- No external dependencies
- References ImageFormat enum from domain types
- References MediaType enum from domain types
- Pure utility functions with no side effects
- Can be used by any layer without additional dependencies

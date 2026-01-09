# CardMediaOptimizerService

## Purpose
Service that optimizes and compresses flashcard media files to reduce size while maintaining acceptable quality, and manages media deletion operations.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/CardMediaOptimizerService`

## Strategy
- Optimize media files by reducing file size with quality settings
- Support dimension resizing (maxWidth, maxHeight)
- Provide multiple quality levels for different use cases
- Generate new optimized versions while preserving originals
- Delete media from server and local storage
- Return optimized media with updated file size and URL
- Maintain card media position through optimization
- Calculate size reduction percentages

## Forbidden
- **DO NOT** optimize below usable quality (quality < 0.3)
- **DO NOT** modify original media files
- **DO NOT** delete media without verifying ownership
- **DO NOT** assume optimization will always succeed
- **DO NOT** use negative or invalid quality values
- **DO NOT** set dimensions to zero or negative values
- **DO NOT** delete media without user confirmation
- **DO NOT** bypass optimization error handling

## Rules
1. Quality value must be between 0-1 (0 = worst, 1 = best)
2. Max dimensions must be positive integers if specified
3. Original media is always preserved, never modified
4. Optimized media receives new URL with ?optimized=true parameter
5. File size is approximately calculated as: original * quality
6. Position attribute is preserved through optimization
7. All other attachment properties remain unchanged
8. Optimization must maintain aspect ratio when resizing
9. Delete operation is permanent and irreversible
10. Optimized size calculation is simulated (not actual compression)
11. Quality levels: high (0.9-1.0), medium (0.7-0.8), low (0.5-0.6)

## AI Agent Guidelines

When working with CardMediaOptimizerService:

1. **Quality Selection**: Choose appropriate quality for use case
2. **Size Calculation**: Estimate size reduction before optimization
3. **Original Preservation**: Always keep original media intact
4. **Error Handling**: Handle optimization failures gracefully
5. **Position Maintenance**: Preserve position through all operations
6. **Delete Confirmation**: Always verify before deletion
7. **Batch Operations**: Consider batch optimization for multiple files

### Quality Level Guidelines

- **High Quality (0.9-1.0)**:
  - Use for: Card front images, important visuals
  - Size reduction: 10-20%
  - When to use: High quality requirements, focal content

- **Medium Quality (0.7-0.8)** - RECOMMENDED:
  - Use for: General card media, back images
  - Size reduction: 30-50%
  - When to use: Balance of quality and size, most cases

- **Low Quality (0.5-0.6)**:
  - Use for: Thumbnails, previews, non-critical content
  - Size reduction: 50-70%
  - When to use: Previews, placeholders, bandwidth-constrained

- **Very Low Quality (0.3-0.4)**:
  - Use for: Low-quality previews only
  - Size reduction: 70-80%
  - When to use: Extreme bandwidth constraints

### Dimension Guidelines

- **Full Resolution**: No max dimensions specified
  - Use when: Quality is critical, storage is abundant

- **1920x1080** - RECOMMENDED:
  - Use for: General card media, good balance
  - Suitable for: Most modern displays

- **1280x720**:
  - Use for: Smaller cards, bandwidth optimization
  - Suitable for: Mobile devices, previews

- **Lower than 1280x720**:
  - Use for: Thumbnails, very small cards
  - Consider: May appear pixelated on large screens

### Card-Specific Optimization

- **Front Side Media**:
  - Use higher quality (0.8-0.9)
  - Full or near-full resolution
  - This is the focal point of the card

- **Back Side Media**:
  - Use medium quality (0.7)
  - Moderate resolution (1280x720 or 1920x1080)
  - Secondary content can be more compressed

- **Audio Files**:
  - This service is designed for image optimization only
  - Audio optimization requires different approach (bitrate)

### Deletion Guidelines

- **Before Delete**:
  - Verify media ownership
  - Check card associations
  - Confirm with user if applicable
  - Consider soft delete option

- **During Delete**:
  - Remove from server storage
  - Remove from local storage
  - Update card references
  - Handle missing files gracefully

- **After Delete**:
  - Update database references
  - Clean up orphaned files
  - Cannot be undone (permanent)

### Optimization Workflow

1. Start with original media attachment
2. Determine target quality and dimensions
3. Calculate expected size reduction
4. Run optimization operation
5. Receive optimized attachment with new URL
6. Replace or keep both versions
7. Update card media references

### Error Handling

- **Optimization Failures**:
  - Return original media unchanged
  - Log error for debugging
  - Continue with original if appropriate

- **Invalid Parameters**:
  - Quality outside 0-1 range
  - Negative or zero dimensions
  - Must reject with clear error

- **Delete Failures**:
  - Media not found
  - Permission denied
  - Handle gracefully, log error

### Performance Considerations

- Optimization is simulated (size * quality calculation)
- In production, integrate actual optimization API
- Consider lazy optimization (optimize on demand)
- Batch optimization for multiple files
- Cache optimized versions when possible

## Dependencies
- CardMediaAttachment type from domain layer
- CardMediaCompressionOptions type for optimization settings
- Optimization API endpoints (simulated in development)
- Storage access for deletion operations

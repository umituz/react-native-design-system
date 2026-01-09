# CardMultimediaService

## Purpose
Central service for managing all media operations in card-based applications, combining upload, generation, validation, and optimization capabilities through a singleton instance with card-specific media support.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/CardMultimediaService`

## Strategy
- Provide unified interface for all card media operations
- Coordinate upload, generation, validation, and optimization services
- Maintain singleton pattern for resource efficiency
- Support card-specific media requirements (front/back/both positions)
- Simplify media management for card applications
- Enable batch operations for card sets
- Provide consistent API across all media operations
- Handle card-specific metadata and associations

## Forbidden
- **DO NOT** create multiple service instances (use singleton only)
- **DO NOT** call media operations without validation
- **DO NOT** assume AI generation is always available
- **DO NOT** ignore optimization recommendations
- **DO NOT** bypass singleton pattern with direct service instantiation
- **DO NOT** proceed without error handling for any operation
- **DO NOT** mix card media with non-card media types
- **DO NOT** assume all operations will succeed
- **DO NOT** ignore card-specific position requirements

## Rules
1. MUST use getInstance() to retrieve service instance
2. MUST NOT create new instances with constructor
3. MUST maintain single instance across application lifecycle
4. MUST validate media before upload operations
5. MUST support CardMediaAttachment and CardMediaPosition types
6. MUST handle position attribute (front/back/both) correctly
7. MUST handle all operation failures gracefully
8. MUST provide consistent interface through all methods
9. MUST initialize all sub-services on first use
10. MUST coordinate between sub-services for complex operations
11. MUST handle asynchronous operations properly
12. MUST return appropriate error messages for failures
13. MUST support card-specific media constraints

## AI Agent Guidelines

When working with CardMultimediaService:

1. **Singleton Pattern**: Always use getInstance(), never constructor
2. **Validation First**: Validate before upload or generation
3. **Position Awareness**: Always consider card position (front/back/both)
4. **Operation Flow**: Follow validate -> upload/generate -> optimize -> store
5. **Error Handling**: Handle errors at each step appropriately
6. **Resource Management**: Rely on singleton for efficient resource use
7. **Type Safety**: Use CardMediaAttachment and CardMediaPosition types
8. **Card Context**: Maintain card-specific context throughout operations

### Card Creation Workflow

- **Step 1 - Get Instance**: `CardMultimediaService.getInstance()`
- **Step 2 - Select File**: Pick file from device or camera
- **Step 3 - Validate**: Run validation, check results
- **Step 4 - Upload**: Upload if validation passes
- **Step 5 - Set Position**: Assign position (front/back/both)
- **Step 6 - Optimize** (Optional): Optimize if file is large
- **Step 7 - Store**: Save attachment with card data
- **Step 8 - Handle Errors**: Provide feedback at each step

### Media Upload with Position

- Use for user-selected media on card sides
- Always validate before uploading
- Set position based on card side (front/back/both)
- Consider compression for large files
- Store returned attachment with card
- Handle upload failures with user feedback

### AI Content Generation for Cards

- Use for text-to-image or text-to-audio generation
- Validate prompts before generation
- Check credit/balance availability
- Set position based on use case (front for questions, back for answers)
- Handle generation failures gracefully
- Store successful attachments with card

### Position Management

- **Front**: Media displayed on card front side
  - Typically contains questions or prompts
  - Often uses text-to-image generation
  - May require higher quality

- **Back**: Media displayed on card back side
  - Typically contains answers or explanations
  - Often uses text-to-audio generation
  - Can be more compressed

- **Both**: Media used on both sides
  - Shared content between sides
  - Less common but supported
  - Maintain consistency across sides

### Media Optimization for Cards

- Use when file size impacts performance
- Choose quality level based on position (front = higher, back = lower)
- Consider card importance and frequency of use
- Calculate expected size reduction
- Preserve position through optimization
- Update card with optimized media

### Media Deletion for Cards

- Verify media ownership before deletion
- Check card associations and dependencies
- Confirm deletion with user if needed
- Delete from all storage locations
- Update card references
- Handle missing files gracefully

### Batch Operations for Card Sets

- For multiple cards, use same service instance
- Process uploads/generations in sequence
- Collect results before saving
- Handle partial failures appropriately
- Consider parallel operations for independent media
- Track progress for user feedback
- Maintain position consistency across cards

### Error Handling Patterns

- **Validation Errors**: Show to user, block upload
- **Upload Errors**: Retry or allow alternative file
- **Generation Errors**: Check credits, try different prompt
- **Optimization Errors**: Continue with original media
- **Deletion Errors**: Log error, notify user
- **Position Errors**: Validate position before operations
- **Network Errors**: Show connection message, allow retry

### Card-Specific Considerations

- **Front Media**: Often focal point, prioritize quality
- **Back Media**: Secondary content, can be more compressed
- **Both Position**: Ensure quality works for both sides
- **Multiple Media**: Support multiple attachments per card
- **Position Validation**: Validate media type compatibility with position
- **Card Associations**: Maintain references between media and cards

### Service Coordination

The service automatically coordinates:
- CardMediaUploadService handles file uploads
- CardMediaGenerationService handles AI generation
- CardMediaValidationService checks file validity
- CardMediaOptimizerService handles compression
- All services work together with card-specific requirements

### Performance Considerations

- Singleton reduces memory footprint
- Single instance maintains state efficiently
- Sub-services initialized once
- All operations are asynchronous
- Consider lazy loading for large card sets
- Cache media URLs when possible
- Optimize media based on card usage patterns

## Dependencies
- CardMediaUploadService for upload operations
- CardMediaGenerationService for AI generation (including image-search)
- CardMediaValidationService for validation
- CardMediaOptimizerService for optimization
- CardMediaAttachment type from domain layer
- CardMediaPosition type for card-side placement

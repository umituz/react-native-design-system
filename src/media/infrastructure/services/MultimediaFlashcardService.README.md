# MultimediaFlashcardService

## Purpose
Main service that manages all media operations for media-enabled flashcards from a single point, combining upload, generation, validation, and optimization capabilities through a singleton instance.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/MultimediaFlashcardService`

## Strategy
- Provide unified interface for all flashcard media operations
- Coordinate upload, generation, validation, and optimization services
- Maintain singleton pattern for resource efficiency
- Simplify media management for flashcard applications
- Support general flashcard media requirements
- Enable batch operations for card sets
- Provide consistent API across all media operations
- Reduce complexity by exposing single service instance

## Forbidden
- **DO NOT** create multiple service instances (use singleton only)
- **DO NOT** call media operations without validation
- **DO NOT** assume AI generation is always available
- **DO NOT** ignore optimization recommendations
- **DO NOT** bypass singleton pattern with direct service instantiation
- **DO NOT** proceed without error handling for any operation
- **DO NOT** mix flashcard media with other media types
- **DO NOT** assume all operations will succeed

## Rules
1. MUST use getInstance() to retrieve service instance
2. MUST NOT create new instances with constructor
3. MUST maintain single instance across application lifecycle
4. MUST validate media before upload operations
5. MUST handle all operation failures gracefully
6. MUST support MediaAttachment and MediaPosition types
7. MUST provide consistent interface through all methods
8. MUST initialize all sub-services on first use
9. MUST coordinate between sub-services for complex operations
10. MUST handle asynchronous operations properly
11. MUST return appropriate error messages for failures

## AI Agent Guidelines

When working with MultimediaFlashcardService:

1. **Singleton Pattern**: Always use getInstance(), never constructor
2. **Validation First**: Validate before upload or generation
3. **Operation Flow**: Follow validate -> upload/generate -> optimize -> store
4. **Error Handling**: Handle errors at each step appropriately
5. **Resource Management**: Rely on singleton for efficient resource use
6. **Type Safety**: Use MediaAttachment and MediaPosition types
7. **Service Coordination**: Let service coordinate sub-operations

### Flashcard Creation Workflow

- **Step 1 - Get Instance**: `MultimediaFlashcardService.getInstance()`
- **Step 2 - Select File**: Pick file from device or camera
- **Step 3 - Validate**: Run validation, check results
- **Step 4 - Upload**: Upload if validation passes
- **Step 5 - Optimize** (Optional): Optimize if file is large
- **Step 6 - Store**: Save attachment with flashcard data
- **Step 7 - Handle Errors**: Provide feedback at each step

### Media Upload Workflow

- Use for user-selected media (images, audio, video)
- Always validate before uploading
- Consider compression for large files
- Set appropriate position if applicable
- Store returned attachment with flashcard
- Handle upload failures with user feedback

### AI Content Generation Workflow

- Use for text-to-image or text-to-audio generation
- Validate prompts before generation
- Check credit/balance availability
- Set appropriate options (language, voice, style)
- Handle generation failures gracefully
- Store successful attachments with flashcard

### Media Optimization Workflow

- Use when file size impacts performance
- Choose quality level based on use case
- Consider flashcard importance (front/back)
- Calculate expected size reduction
- Preserve attachments through optimization
- Update flashcard with optimized media

### Media Deletion Workflow

- Verify media ownership before deletion
- Check flashcard associations
- Confirm deletion with user if needed
- Delete from all storage locations
- Update flashcard references
- Handle missing files gracefully

### Batch Operations

- For multiple flashcards, use same service instance
- Process uploads/generations in sequence
- Collect results before saving
- Handle partial failures appropriately
- Consider parallel operations for independent media
- Track progress for user feedback

### Error Handling Patterns

- **Validation Errors**: Show to user, block upload
- **Upload Errors**: Retry or allow alternative file
- **Generation Errors**: Check credits, try different prompt
- **Optimization Errors**: Continue with original media
- **Deletion Errors**: Log error, notify user
- **Network Errors**: Show connection message, allow retry

### Service Coordination

The service automatically coordinates:
- UploadService handles file uploads
- GenerationService handles AI generation
- ValidationService checks file validity
- OptimizerService handles compression
- All services work together seamlessly

### Performance Considerations

- Singleton reduces memory footprint
- Single instance maintains state efficiently
- Sub-services initialized once
- All operations are asynchronous
- Consider lazy loading for large card sets
- Cache media URLs when possible

## Dependencies
- MediaUploadService for upload operations
- MediaGenerationService for AI generation
- MediaValidationService for validation
- MediaOptimizerService for optimization
- MediaAttachment type from domain layer
- MediaPosition type for media placement

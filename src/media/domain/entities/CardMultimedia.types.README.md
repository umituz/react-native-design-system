# CardMultimedia Types

## Purpose
Type definitions for flashcard-specific media operations. These types define the contract for media attachment, generation, and management within the card-based learning system.

## File Location
`src/domain/entities/CardMultimedia.types.ts`

## Strategy
- Define the contract for card-specific media operations
- Provide type-safe interfaces for flashcard media attachments
- Support AI-powered media generation for educational content
- Enable comprehensive media validation and optimization
- Maintain clear separation between card media and general media types
- Support upload progress tracking and compression
- Facilitate media download management for offline learning

## Forbidden
- **DO NOT** use these types for general-purpose media operations (use Multimedia types instead)
- **DO NOT** include UI components or presentation logic in type definitions
- **DO NOT** add business logic or implementation details to interfaces
- **DO NOT** create circular dependencies with other domain types
- **DO NOT** use `any` type or loose type definitions
- **DO NOT** modify existing type properties - extend interfaces for new features
- **DO NOT** assume specific storage backend or cloud provider
- **DO NOT** hardcode validation limits in type definitions
- **DO NOT** mix card media types with general multimedia types

## Rules
1. All card media types must be exported from this file
2. Type definitions must be framework-agnostic
3. Card media IDs must use "card_media_" prefix for uniqueness
4. Position types must explicitly define front/back/both placement
5. File size fields must use bytes as unit
6. Duration fields must use seconds as unit
7. Date fields must use ISO 8601 format
8. All generation requests must include input validation
9. Compression quality must be between 0.1 and 1.0
10. Upload progress must be tracked from 0-100
11. Validation results must separate errors, warnings, and recommendations
12. Service interfaces must return Promises for all async operations
13. Media type arrays must be automatically calculated, not manually set
14. Download status must be tracked per attachment
15. Estimated size must represent total of all attachments

## AI Agent Guidelines

When working with CardMultimedia types:

1. **Type Selection**: Use CardMediaAttachment for flashcard-specific media operations
2. **Generation Requests**: Always specify input parameters and options explicitly
3. **Validation**: Validate media files before upload and after generation
4. **Progress Tracking**: Monitor upload progress for user feedback
5. **Compression**: Apply compression options before upload to reduce bandwidth
6. **Download Management**: Check isDownloaded status before displaying media
7. **Position Logic**: Respect position field for front/back/both placement
8. **Size Estimation**: Calculate total size for all media before batch operations
9. **Error Handling**: Parse validation errors and warnings for user feedback
10. **Cost Tracking**: Monitor creditsUsed for AI generation operations

### Key Types Reference

- **CardMediaType**: "image" | "audio" | "video" - Media type classification for cards
- **CardMediaPosition**: "front" | "back" | "both" - Display placement on card faces
- **CardMediaAttachment**: Core interface for individual media items with metadata
- **CardMultimediaFlashcard**: Card entity with computed media properties
- **CardMediaGenerationRequest**: Input specification for AI media generation
- **CardMediaGenerationResult**: Output with cost tracking and performance metrics
- **CardMediaUploadProgress**: Real-time upload status tracking
- **CardMediaCompressionOptions**: Quality and size optimization settings
- **CardMediaValidation**: Comprehensive validation with recommendations
- **CardMultimediaFlashcardService**: Service interface for media operations

### Type Usage Patterns

1. **CardMediaAttachment**: Individual media item with position, URL, and metadata
2. **CardMultimediaFlashcard**: Card with computed properties (hasMedia, mediaType, isDownloaded)
3. **CardMediaGenerationRequest**: Three generation types (text_to_image, text_to_audio, image_search)
4. **CardMediaValidation**: Separate errors (blocking) from warnings and recommendations

### Validation Rules

1. Validate file size against upload limits before processing
2. Check MIME type matches CardMediaType
3. Ensure dimensions are within supported ranges
4. Verify URIs are properly formatted and accessible
5. Validate duration for audio/video files
6. Check compression quality is within 0.1-1.0 range
7. Ensure generation prompts are non-empty strings
8. Validate language codes for audio generation (e.g., "tr-TR", "en-US")

### Service Interface Guidelines

When implementing CardMultimediaFlashcardService:

1. **uploadMedia**: Accept file with optional compression, return attachment with URL
2. **generateMedia**: Process AI generation request, track credits and timing
3. **validateMedia**: Return comprehensive validation with errors, warnings, recommendations
4. **optimizeMedia**: Apply compression to existing attachment, preserve metadata
5. **deleteMedia**: Remove attachment and update card associations
6. **getMediaUrl**: Return accessible URL for downloaded or remote media
7. **downloadMedia**: Fetch remote media to local storage, update isDownloaded status

### Generation Type Specifics

1. **text_to_image**: Requires prompt, style (realistic/cartoon/artistic), quality, format
2. **text_to_audio**: Requires text, language, voice (male/female/neutral), format
3. **image_search**: Requires prompt, maxResults (no quality/format options)

### Position Logic

1. **front**: Media displayed only on card front face
2. **back**: Media displayed only on card back face
3. **both**: Media displayed on both card faces (e.g., background image)

### Download Management

1. Check isDownloaded before displaying media offline
2. Use localPath for offline access when available
3. Fall back to URL when media not downloaded
4. Track estimatedSize for storage management
5. Implement downloadMedia for offline caching

## Dependencies

- No external dependencies
- References domain types from Media.ts for base media concepts
- Must be usable by infrastructure and presentation layers without additional dependencies
- Service interfaces require async operation support

# useCardMediaGeneration

## Purpose
Card-specific React hook for AI-powered media generation (text-to-image, text-to-audio, image-search) for flashcards.

## File Location
`src/presentation/hooks/useCardMediaGeneration.ts`

## Strategy
- Provide card-specific interface for AI media generation
- Support text-to-image, text-to-audio, and image-search operations
- Return CardMediaAttachment with position property
- Track generation status and metadata
- Manage credit costs for card media generation
- Handle generation errors with proper feedback
- Support card-specific generation options

## Forbidden
- **DO NOT** start generation while previous is in progress
- **DO NOT** ignore credit costs before generation
- **DO NOT** mock generation in production without AI API
- **DO NOT** assume generation will succeed - check result.success
- **DO NOT** expose API keys or AI implementation details
- **DO NOT** allow unlimited concurrent generations
- **DO NOT** bypass timeout handling for long generations
- **DO NOT** store large results permanently in hook state
- **DO NOT** use empty or invalid prompts
- **DO NOT** mix with MediaAttachment (must use CardMediaAttachment)

## Rules
1. Always validate prompt text before generation
2. Check credit availability before operations
3. Track processing time for each request
4. Return CardMediaAttachment with position property
5. Return unique requestId for tracking
6. Include creditsUsed in result metadata
7. Support maxResults for multiple outputs
8. Clear generation state on new operations
9. Handle both success and failure gracefully
10. Support language, voice, speed options for audio

## AI Agent Guidelines

When working with useCardMediaGeneration hook:

1. **Type Specificity**: Use CardMediaAttachment (not MediaAttachment)
2. **Position Awareness**: Generated media has position property
3. **Prompt Quality**: Use descriptive prompts for better results
4. **Credit Tracking**: Monitor credit costs and balance
5. **Error Handling**: Always check result.success field

### Generation Types

**Text-to-Image** (type: 'text_to_image')
- Generates images from text descriptions
- Credit cost: 5 per generation
- Default maxResults: 1
- Returns CardMediaAttachment with position: 'both'
- Supports style customization

**Text-to-Audio** (type: 'text_to_audio')
- Generates audio from text (TTS)
- Credit cost: 3 per generation
- Default duration: 10 seconds
- Returns CardMediaAttachment with position: 'back'
- Supports voice, language, speed options

**Image Search** (type: 'image_search')
- Searches for existing images
- Credit cost: 2 per search
- Default maxResults: 5
- Returns CardMediaAttachment with position: 'both'
- Finds relevant images from database

### Generation Workflow

1. Validate prompt text quality
2. Check credit balance
3. Select generation type
4. Configure options (maxResults, voice, language, etc.)
5. Call generateMedia with request
6. Monitor isGenerating state
7. Process CardMediaGenerationResult
8. Handle success or error

### Result Structure

CardMediaGenerationResult includes:
- success: Boolean success/failure
- attachments: Array of CardMediaAttachment (with position)
- creditsUsed: Credits consumed
- processingTime: Duration in milliseconds
- requestId: Unique identifier
- error: Error message if failed

### CardMediaAttachment Features

Generated attachments include:
- id: Unique ID with card_media_ prefix
- type: CardMediaType (IMAGE, VIDEO, AUDIO)
- position: CardMediaPosition (front, back, or both)
- url: Generated media URL
- filename: Generated filename
- fileSize: Size in bytes
- mimeType: MIME type
- duration: Audio/video duration
- thumbnailUrl: Thumbnail for visual media
- isDownloaded: Download status
- createdAt: ISO timestamp

### Generation Options

**Image Options:**
- maxResults: Number of images (default: 1)
- style: Image style preset

**Audio Options:**
- voice: Voice type (male/female)
- language: Language code ('tr-TR', 'en-US')
- speed: Playback speed (default: 1.0)

**Image Search Options:**
- maxResults: Number of results (default: 5)

### Integration with Card Creation

Typical workflow:
1. Generate media with useCardMediaGeneration
2. Receive CardMediaAttachment objects
3. Use in createCardMultimedia call
4. Position is automatically assigned by generation type
5. Complete card with generated media

### Credit Costs

| Operation | Credits |
|-----------|---------|
| Text-to-Image | 5 |
| Text-to-Audio | 3 |
| Image Search | 2 |

### Error Scenarios

- Insufficient credits: Check balance before generation
- Invalid prompt: Validate text quality
- API timeout: Implement retry logic
- Content policy: Filter prompts appropriately
- Service unavailable: Graceful error handling

### Integration Requirements

- Configure AI service endpoints
- Implement authentication for AI APIs
- Handle rate limiting and quotas
- Implement retry logic for failures
- Cache results when appropriate
- Monitor credit usage

## Dependencies

- CardMediaGenerationService (infrastructure layer)
- Domain types: CardMediaGenerationRequest, CardMediaGenerationResult, CardMediaAttachment
- Credit tracking system
- AI service APIs (text-to-image, TTS, image search)

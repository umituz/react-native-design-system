# useMediaGeneration

## Purpose
React hook for AI-powered media generation (text-to-image, text-to-audio) with result tracking.

## File Location
`src/presentation/hooks/useMediaGeneration.ts`

## Strategy
- Provide unified interface for AI media generation operations
- Support multiple generation types (text-to-image, text-to-audio)
- Track generation status and progress
- Manage credit usage and balance tracking
- Handle generation errors gracefully
- Return structured results with metadata
- Support customizable generation options

## Forbidden
- **DO NOT** start new generation while previous is in progress
- **DO NOT** ignore credit costs before generation
- **DO NOT** mock generation process in production without API integration
- **DO NOT** assume generation will succeed - always check result.success
- **DO NOT** expose API keys or AI service implementation details
- **DO NOT** allow unlimited concurrent generations
- **DO NOT** bypass generation timeout handling
- **DO NOT** store large generation results permanently in hook state
- **DO NOT** use empty or invalid prompts for generation

## Rules
1. Always validate prompt text before generation
2. Check credit availability before generation operations
3. Track processing time for each generation request
4. Return unique requestId for each generation
5. Support maxResults parameter for multiple outputs
6. Generation state must be cleared on new operations
7. Include creditsUsed in result metadata
8. Handle both success and failure in result object
9. Support language and voice options for audio generation
10. Support style options for image generation

## AI Agent Guidelines

When working with useMediaGeneration hook:

1. **Prompt Quality**: Use descriptive, specific prompts for better results
2. **Credit Management**: Track credit costs and balance before operations
3. **Error Handling**: Always check result.success field
4. **Result Processing**: Validate attachments array before use
5. **Options**: Use appropriate options for generation type

### Generation Types

**Text-to-Image** (type: 'text_to_image')
- Generates images from text descriptions
- Credit cost: 5 per generation
- Default maxResults: 1
- Supports style customization

**Text-to-Audio** (type: 'text_to_audio')
- Generates audio from text (text-to-speech)
- Credit cost: 3 per generation
- Default duration: 10 seconds
- Supports voice, language, speed options

### Generation Workflow

1. Validate prompt text quality and length
2. Check available credits
3. Configure generation options
4. Call generateMedia with request
5. Monitor isGenerating state
6. Process generationResult on completion
7. Handle errors with user feedback

### Result Structure

GenerationResult includes:
- success: Boolean indicating success/failure
- attachments: Array of generated MediaAttachment
- creditsUsed: Number of credits consumed
- processingTime: Duration in milliseconds
- requestId: Unique request identifier
- error: Error message if failed

### Generation Options

**Image Options:**
- maxResults: Number of images to generate (default: 1)
- style: Image style preset

**Audio Options:**
- voice: Voice type (male/female)
- language: Language code (e.g., 'tr-TR', 'en-US')
- speed: Playback speed (default: 1.0)

### Integration Requirements

- Configure AI API endpoints
- Implement authentication for AI services
- Handle rate limiting and quotas
- Implement retry logic for failed generations
- Cache generation results when appropriate
- Monitor credit balance and usage

### Error Scenarios

- Insufficient credits: Check balance before generation
- Invalid prompt: Validate text quality and length
- API timeout: Implement retry with exponential backoff
- Content policy violations: Filter and validate prompts
- Service unavailable: Graceful degradation with error message

## Dependencies

- MediaGenerationService (infrastructure layer)
- Domain types: MediaGenerationRequest, MediaGenerationResult, MediaAttachment
- Credit/balance tracking system
- AI service APIs (text-to-image, text-to-speech)

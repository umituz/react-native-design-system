# CardMediaGenerationService

## Purpose
Service that performs AI-based media generation operations for flashcards, including text-to-image, text-to-audio, and image-search capabilities.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/CardMediaGenerationService`

## Strategy
- Generate media content using AI APIs for card applications
- Support multiple generation types (text-to-image, text-to-audio, image-search)
- Track processing time and credit/balance usage
- Return card-compatible media attachments with position support
- Provide detailed result information including success status and error messages
- Enable batch generation with multiple results
- Maintain unique request IDs for tracking and debugging

## Forbidden
- **DO NOT** generate media without checking available credits/balance
- **DO NOT** use empty or null prompts for generation
- **DO NOT** assume all generation requests will succeed
- **DO NOT** ignore generation timeout limits
- **DO NOT** generate inappropriate or copyrighted content
- **DO NOT** proceed without error handling for API failures
- **DO NOT** mix generation types in single requests
- **DO NOT** bypass request ID tracking

## Rules
1. All generation operations must include a valid prompt
2. Text-to-image generation requires prompt and optional style/maxResults
3. Text-to-audio generation requires prompt, language, and optional voice/speed
4. Image search requires keyword prompt and optional maxResults
5. Credit costs vary by type: text-to-image (5), text-to-audio (3), image-search (2)
6. All generated media must have position attribute set to 'both' by default
7. Processing time must be tracked and returned in milliseconds
8. Unique request IDs must be generated for each operation
9. Generation failures must return clear error messages
10. Audio files must be assigned a 10-second duration by default
11. maxResults defaults to 1 for text-to-image, 5 for image-search

## AI Agent Guidelines

When working with CardMediaGenerationService:

1. **Pre-generation Checks**: Always verify credit/balance before generation requests
2. **Prompt Quality**: Use clear, descriptive prompts for better results
3. **Type Selection**: Choose appropriate generation type for use case
4. **Result Validation**: Always check success flag before using results
5. **Error Handling**: Handle API failures, timeouts, and insufficient credits
6. **Position Assignment**: Set correct position (front/back/both) for card use
7. **Request Tracking**: Store request IDs for debugging and support

### Generation Type Guidelines

- **Text-to-Image**: Use for visual content on cards (front typically)
  - Specify style (realistic, artistic) for better results
  - Set maxResults to 1 unless multiple options needed
  - Images receive position='both' by default

- **Text-to-Audio**: Use for pronunciation or audio explanations
  - Specify language code (tr-TR, en-US, etc.)
  - Set voice type (male, female) if applicable
  - Adjust speed (0.5-2.0) for playback preferences
  - Audio receives 10-second duration by default

- **Image Search**: Use for finding relevant visuals
  - Use specific keywords for better results
  - Set maxResults for multiple options
  - Credits are cheaper than text-to-image

### Credit Management

- Calculate total credits before batch operations
- Text-to-image: 5 credits per request
- Text-to-audio: 3 credits per request
- Image search: 2 credits per request
- Handle insufficient credit errors gracefully
- Track credits used from generation results

### Error Handling Patterns

- Check success flag before accessing attachments
- Parse error messages for specific failure types:
  - "insufficient credits" - balance too low
  - "timeout" - operation took too long
  - "invalid prompt" - prompt validation failed
  - "api error" - underlying API failure

### Performance Considerations

- Generation operations are simulated (3 seconds delay)
- Batch multiple results in single request when possible
- Track processing time for performance monitoring
- Use request IDs for debugging slow operations

## Dependencies
- CardMediaAttachment type from domain layer
- AI generation APIs (simulated in development)
- Credit/balance management system

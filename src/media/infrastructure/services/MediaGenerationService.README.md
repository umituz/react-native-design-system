# MediaGenerationService

## Purpose
Provides AI-powered media generation capabilities including text-to-image and text-to-audio generation with credit/balance management.

## File Location
`/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-media/src/infrastructure/services/MediaGenerationService`

## Strategy

### Core Purpose
- Generate images from text descriptions (text-to-image)
- Generate audio from text (text-to-audio)
- Support multiple result generation
- Track processing time and performance
- Manage generation costs/credits

### Usage Scenarios
- AI-generated visual content for cards
- Text-to-speech conversion
- Creative content generation
- Localization and voice-over creation
- Dynamic asset generation

### Integration Points
- AI-powered content creation workflows
- Text-to-speech features
- Automated asset generation
- Creative assistance tools
- Educational content generation

## Forbidden

### MUST NOT
- Generate without sufficient credits/balance
- Assume generation always succeeds
- Generate inappropriate or harmful content
- Ignore rate limiting or API constraints
- Cache generated content without validation
- Generate without user prompt input

### MUST NEVER
- Expose API keys or credentials
- Allow unlimited free generation
- Ignore generation failures
- Bypass credit/balance checks
- Generate without proper error handling
- Assume instant generation results

## Rules

### Generation Operations
- MUST validate prompt before generation
- MUST check sufficient credits/balance
- MUST handle generation failures
- MUST track processing time
- MUST return unique request ID
- MUST respect result limits (maxResults)

### Text-to-Image Generation
- MUST support style options
- MUST support aspect ratio options
- MUST generate multiple results if requested
- MUST validate image generation parameters
- MUST handle generation timeouts

### Text-to-Audio Generation
- MUST support voice options
- MUST support language selection
- MUST support speed adjustment
- MUST return audio duration
- MUST validate audio parameters

### Credit Management
- MUST deduct credits per generation
- MUST track credit usage in results
- MUST validate credit availability
- MUST prevent generation with insufficient credits
- MUST report credits used in result

### Return Values
- MUST include success status
- MUST include generated media attachments
- MUST include credits used
- MUST include processing time
- MUST include unique request ID
- MUST include error details on failure

### Error Handling
- MUST handle insufficient credits
- MUST handle generation timeouts
- MUST handle invalid prompts
- MUST handle API failures
- MUST provide meaningful error messages
- MUST allow retry after appropriate delay

## AI Agent Guidelines

### When Implementing Generation Features
1. Always validate prompt input
2. Check credit/balance before generation
3. Set appropriate timeouts
4. Handle both success and failure cases
5. Track and report processing metrics

### When Working with Text-to-Image
- Support common aspect ratios (16:9, 4:3, 1:1)
- Provide style presets (realistic, artistic, etc.)
- Limit max results to reasonable number
- Validate image generation parameters

### When Working with Text-to-Audio
- Support common languages
- Provide voice options (male, female)
- Allow speed adjustment (0.5-2.0)
- Return accurate duration

### When Adding Features
- Add new generation types with validation
- Extend options without breaking compatibility
- Add new credit tiers carefully
- Support batch generation if needed
- Add content filtering if required

### When Refactoring
- Keep generation API stable
- Preserve credit calculation logic
- Maintain request ID generation
- Don't change result structure
- Add deprecation warnings for breaking changes

### Common Patterns to Follow
- Validate prompt -> Check credits -> Generate -> Return result
- Handle timeout -> Retry if appropriate -> Return error
- Calculate credits -> Deduct -> Track usage
- Always wrap in try-catch for unexpected errors
- Provide user feedback for generation status

## Dependencies

- Domain types: MediaAttachment, MediaGenerationRequest, MediaGenerationResult, MediaType, MediaPosition from MultimediaFlashcardTypes
- No external library dependencies (uses native APIs)

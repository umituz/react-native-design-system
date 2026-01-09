# useCardMultimediaFlashcard

## Purpose
Card-specific hook for creating and managing flashcards with media attachments using CardMediaAttachment types.

## File Location
`src/presentation/hooks/useCardMultimediaFlashcard.ts`

## Strategy
- Provide card-specific interface for flashcard creation with media
- Support CardMediaAttachment with position-aware media management
- Enable card-specific media operations (create, update, delete)
- Automatically analyze card media composition
- Calculate storage requirements for card media
- Track download status for offline card access
- Maintain card-specific ID prefixes and naming conventions

## Forbidden
- **DO NOT** create cards without required front/back content
- **DO NOT** add media without position assignment (front, back, both)
- **DO NOT** mix MediaAttachment with CardMediaAttachment types
- **DO NOT** use mock implementations in production
- **DO NOT** assume card media is downloaded without checking
- **DO NOT** modify card structure directly after creation
- **DO NOT** exceed practical media limits per card
- **DO NOT** bypass media size estimation
- **DO NOT** use incorrect ID prefixes (must use card_multimedia_)

## Rules
1. Always use CardMediaAttachment type (not MediaAttachment)
2. Always assign position (front, back, both) to each media
3. Use card_multimedia_ prefix for card IDs
4. Calculate estimatedSize from all card media
5. Populate mediaType array with unique types
6. Set hasMedia based on media array length
7. Check isDownloaded from all media attachments
8. Support empty media array for text-only cards
9. Return complete CardMultimediaFlashcard object
10. Clear processing state on completion

## AI Agent Guidelines

When working with useCardMultimediaFlashcard hook:

1. **Type Correctness**: Always use CardMediaAttachment (not MediaAttachment)
2. **Position Assignment**: Every media must have position (front, back, both)
3. **Media Upload**: Use useCardMediaUpload for proper type handling
4. **Card Analysis**: Leverage auto-generated hasMedia, mediaType, isDownloaded
5. **ID Prefixes**: Ensure card IDs use card_multimedia_ prefix

### Card Creation Workflow

1. Prepare card content (front, back, difficulty, tags)
2. Upload media using useCardMediaUpload (gets CardMediaAttachment)
3. Assign position to each media attachment
4. Call createCardMultimedia with data
5. Receive CardMultimediaFlashcard object
6. Store or display the completed card

### CardMultimediaFlashcard Structure

CardMultimediaFlashcard includes:
- id: Unique card ID (card_multimedia_ prefix)
- front: Front side content
- back: Back side content
- difficulty: easy/medium/hard
- tags: Topic tags array
- media: Array of CardMediaAttachment
- hasMedia: Boolean flag
- mediaType: Array of media types (image, audio, video)
- isDownloaded: Boolean (all media downloaded)
- estimatedSize: Total size in bytes
- createdAt: ISO timestamp

### CardMediaAttachment vs MediaAttachment

Key differences:
- CardMediaAttachment has position property (front, back, both)
- CardMediaAttachment IDs use card_media_ prefix
- CardMediaAttachment uses CardMediaPosition enum
- CardMediaAttachment uses CardMediaType enum

### Media Positioning Strategy

**front**: Media for front side of card
- Question images
- Prompt audio
- Instructional videos

**back**: Media for back side of card
- Answer images
- Explanation audio
- Solution videos

**both**: Media for both sides
- Background music
- Contextual images
- Reference materials

### Card Management Functions

**createCardMultimedia**: Create new card
- Requires front and back content
- Accepts CardMediaAttachment array
- Assigns unique card_multimedia_ ID
- Analyzes media composition
- Calculates storage requirements

**updateCardMedia**: Replace media on card
- Takes cardId and new media array
- Preserves card metadata
- Re-analyzes composition
- Updates size calculation

**deleteCardMedia**: Remove specific media
- Takes attachmentId (card_media_ prefix)
- Updates media array
- Recalculates size
- Updates analysis

### Integration with Card Hooks

Use with card-specific hooks:
- useCardMediaUpload: Upload with CardMediaAttachment type
- useCardMediaValidation: Validate with card-specific rules
- useCardMediaGeneration: Generate AI media for cards

### Card Media Analysis

**hasMedia**: True if media array length > 0
**mediaType**: Unique array ['image', 'audio', 'video'] based on media
**isDownloaded**: True if all media.isDownloaded are true
**estimatedSize**: Sum of all media.fileSize values

### Performance Guidelines

- Limit to 5-10 media items per card
- Warn if estimatedSize exceeds 25 MB
- Use position to organize media effectively
- Consider download status for offline usage
- Balance media types across card sides

### Best Practices

1. Always assign meaningful positions to media
2. Use tags for card organization and filtering
3. Set appropriate difficulty levels
4. Balance media between front and back
5. Consider offline usage patterns
6. Validate media before adding to cards

## Dependencies

- CardMultimediaFlashcardService (infrastructure layer)
- Domain types: CardMultimediaFlashcard, CardMediaAttachment
- useCardMediaUpload (for card-specific upload)
- useCardMediaValidation (for card-specific validation)
- useCardMediaGeneration (for card AI media)

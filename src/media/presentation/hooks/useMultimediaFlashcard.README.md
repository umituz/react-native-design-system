# useMultimediaFlashcard

## Purpose
Main hook for creating and managing flashcards with media attachments, providing all multimedia operations in one place.

## File Location
`src/presentation/hooks/useMultimediaFlashcard.ts`

## Strategy
- Provide unified interface for flashcard creation with media support
- Support adding, updating, and deleting media on flashcards
- Automatically analyze media composition (types, sizes, positions)
- Calculate estimated storage requirements
- Track download status for offline support
- Enable rich multimedia flashcard experiences
- Maintain separation between card data and media management

## Forbidden
- **DO NOT** create flashcards without required fields (front, back)
- **DO NOT** add media without proper validation first
- **DO NOT** allow duplicate media attachments with same ID
- **DO NOT** mock card operations in production without backend integration
- **DO NOT** assume all media is downloaded (check isDownloaded flag)
- **DO NOT** modify card structure after creation (use update functions)
- **DO NOT** exceed practical media limits per card (performance)
- **DO NOT** store large media directly in card object (use references)
- **DO NOT** bypass media analysis for size estimation

## Rules
1. Always validate media before adding to flashcard
2. Calculate estimatedSize from all media attachments
3. Generate unique ID for each flashcard
4. Analyze media types and populate mediaType array
5. Set hasMedia flag based on media array length
6. Set isDownloaded based on all media download status
7. Support front, back, and both positions for media
8. Return complete MultimediaFlashcard object
9. Clear processing state on completion or error
10. Support empty media array for text-only cards

## AI Agent Guidelines

When working with useMultimediaFlashcard hook:

1. **Media First**: Upload and validate media before creating card
2. **Size Awareness**: Monitor estimatedSize for performance implications
3. **Type Analysis**: Use mediaType array to determine card capabilities
4. **Download Status**: Check isDownloaded before displaying media
5. **Position Strategy**: Assign appropriate position (front, back, both)

### Card Creation Workflow

1. Prepare card content (front text, back text)
2. Upload and validate media files separately
3. Collect MediaAttachment objects
4. Call createMultimediaCard with data
5. Receive complete MultimediaFlashcard object
6. Use returned card for display and storage

### Flashcard Structure

MultimediaFlashcard includes:
- id: Unique card identifier
- front: Front side content (question/prompt)
- back: Back side content (answer/explanation)
- difficulty: easy/medium/hard
- tags: Array of topic tags
- media: Array of MediaAttachment objects
- hasMedia: Boolean flag for media presence
- mediaType: Array of unique media types present
- isDownloaded: Boolean (all media downloaded)
- estimatedSize: Total size in bytes
- createdAt: ISO timestamp

### Media Analysis

**hasMedia**: True if media array has items
**mediaType**: Unique array of media types (image, audio, video)
**isDownloaded**: True if all media.isDownloaded are true
**estimatedSize**: Sum of all media.fileSize values

### Media Positioning

Media can be assigned to:
- **front**: Displayed on front side of card
- **back**: Displayed on back side of card
- **both**: Displayed on both sides

### Card Management Operations

**createMultimediaCard**: Create new card with media
- Validates required fields (front, back)
- Processes media array
- Generates unique ID
- Analyzes media composition
- Calculates estimated size

**updateMedia**: Replace media on existing card
- Updates media array
- Re-analyzes composition
- Recalculates size
- Preserves card ID and metadata

**deleteMedia**: Remove specific media attachment
- Removes from media array by ID
- Updates analysis
- Recalculates size

### Integration with Other Hooks

Typical workflow combining multiple hooks:
1. useMedia: Select images/videos
2. useMediaUpload: Upload selected media
3. useMediaValidation: Validate before upload
4. useMediaGeneration: Generate AI media (optional)
5. useMultimediaFlashcard: Create card with media

### Performance Considerations

- Limit media count per card (recommend 5-10 items)
- Monitor estimatedSize (warn over 25 MB)
- Use thumbnails for previews
- Lazy load media when displaying cards
- Cache cards with downloaded media

### Best Practices

1. Always validate media before adding to cards
2. Use descriptive tags for card organization
3. Set appropriate difficulty levels
4. Balance media types (don't overload with videos)
5. Consider offline usage (isDownloaded flag)
6. Provide captions for accessibility

## Dependencies

- MultimediaFlashcardService (infrastructure layer)
- Domain types: MultimediaFlashcard, MediaAttachment
- useMediaUpload (for media upload)
- useMediaValidation (for media validation)
- useMediaGeneration (for AI media generation)

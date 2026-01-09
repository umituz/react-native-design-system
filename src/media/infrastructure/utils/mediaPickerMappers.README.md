# Media Picker Mappers

## Purpose
Mapper functions to convert between expo-image-picker types and domain types, maintaining abstraction layer.

## File Location
`src/infrastructure/utils/mediaPickerMappers.ts`

## Strategy
- Isolate expo-image-picker dependency to infrastructure layer
- Provide clean mapping between external and domain types
- Handle permission status conversion
- Convert media type enums to library-specific formats
- Transform picker results to domain entities
- Maintain compatibility with expo-image-picker API changes

## Forbidden
- **DO NOT** import expo-image-picker outside infrastructure layer
- **DO NOT** add business logic to mapping functions
- **DO NOT** modify input parameters during mapping
- **DO NOT** throw exceptions for invalid inputs (use defaults)
- **DO NOT** add side effects to mapping functions
- **DO NOT** directly use mapped types in domain or presentation layers
- **DO NOT** create circular dependencies with picker implementation

## Rules
1. All mapping functions must be pure transformations
2. Permission status must map UNDETERMINED to DENIED
3. MediaType must convert to array format for expo-image-picker
4. Asset properties must use fallback values for undefined fields
5. All mappers must handle null/undefined inputs gracefully
6. Mapped types must match domain type contracts exactly
7. Must preserve all original data during transformation
8. Type conversion must be reversible where possible
9. Must handle all enum values explicitly
10. Default values must be documented

## AI Agent Guidelines

When working with media picker mappers:

1. **Layer Isolation**: Only use mappers in infrastructure layer, never in domain/presentation
2. **Type Conversion**: Always use provided mappers, never manually convert types
3. **Permission Handling**: Check mapped permission status, not raw expo-image-picker values
4. **Media Types**: Use domain MediaType enum, then map to expo format when calling picker
5. **Result Processing**: Always map picker results before passing to other layers
6. **Fallback Values**: Be aware that asset properties may have default values
7. **Null Safety**: Handle undefined optional properties in mapped results
8. **Version Compatibility**: Update mappers when upgrading expo-image-picker

### Permission Status Mapping

- **GRANTED** → GRANTED (full access)
- **DENIED** → DENIED (no access)
- **UNDETERMINED** → DENIED (treat as denied, request again)

**Strategy**: Convert undetermined to denied to force explicit permission request

### MediaType Mapping

| Domain MediaType | expo-image-picker Format |
|-----------------|------------------------|
| IMAGE | ["images"] |
| VIDEO | ["videos"] |
| ALL | ["images", "videos"] |
| undefined | ["images"] (default) |

**Strategy**: Convert domain enum to array format required by library

### Asset Transformation

All asset fields are mapped with fallback values:
- **uri**: Required, no fallback
- **width**: Number, fallback 0
- **height**: Number, fallback 0
- **type**: MediaType enum (IMAGE or VIDEO)
- **fileSize**: Number, fallback 0
- **fileName**: String or undefined
- **duration**: Number or undefined (video only)
- **base64**: String or undefined (only when requested)
- **mimeType**: String or undefined

### Picker Result Structure

**Input Structure (expo-image-picker)**:
- A boolean `canceled` field indicating whether the user cancelled the operation
- An optional `assets` array containing Asset objects from expo-image-picker

**Output Structure (MediaPickerResult)**:
- A boolean `canceled` field (same as input)
- An optional `assets` array containing MediaAsset domain objects
- All Asset fields are transformed to MediaAsset fields with appropriate fallback values

### Integration Patterns

1. **Before Picker**: Convert domain types to picker types
2. **After Picker**: Convert picker results to domain types
3. **Permission Check**: Map permission status before domain layer access
4. **Error Handling**: Check canceled flag before processing assets
5. **Type Safety**: Use domain types throughout application logic

### Common Workflows

1. **Permission Request**: Check status → Map → Request → Map result
2. **Media Selection**: Map MediaType → Launch picker → Map result
3. **Multiple Selection**: Handle array of assets in mapper
4. **Camera vs Library**: Use same mappers for both picker types

### Validation Rules

1. Always check `canceled` flag before accessing assets
2. Validate assets array exists and has length > 0
3. Handle undefined optional properties gracefully
4. Check permission status before launching picker
5. Handle null asset properties with fallback values

### Error Handling

1. Cancelled operations return `{ canceled: true }`
2. Missing assets return empty array or undefined
3. Invalid types use default fallback values
4. Permission denied operations should be handled at application level
5. Never throw exceptions from mapping functions

## Dependencies

- expo-image-picker (external library)
- Domain layer types (MediaAsset, MediaPickerResult, MediaType, MediaLibraryPermission)
- Infrastructure layer only

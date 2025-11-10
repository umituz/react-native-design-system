export const getListItemStyles = (tokens) => ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: tokens.spacing.md,
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.borders.radius.lg,
        marginBottom: tokens.spacing.sm,
    },
    disabled: { opacity: 0.6 },
    iconContainer: { marginHorizontal: tokens.spacing.sm },
    content: { flex: 1 },
    subtitle: { marginTop: tokens.spacing.xs },
});

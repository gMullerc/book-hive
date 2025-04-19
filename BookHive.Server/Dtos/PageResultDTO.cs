namespace BookHive.Server.Dtos
{
    public record PagedResultDto<T>(
        int PageNumber,
        int PageSize,
        int TotalItems,
        int TotalPages,
        IEnumerable<T> Items
    );
}

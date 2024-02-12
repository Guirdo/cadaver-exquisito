const ITEMS_PER_PAGE = 9

export default function getFromAndTo(page) {
    let from = page * ITEMS_PER_PAGE
    let to = from + ITEMS_PER_PAGE

    if (page > 0)
        from += 1

    return { from, to }
}

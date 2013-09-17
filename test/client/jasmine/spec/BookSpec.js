describe('Tests for book model', function() {
    /**
     *  title: 'No title',
        author: 'Unknown',
        releaseDate: 'Unknown',
        keywords: 'None'
     */
    it('Is created with default values for its attributes.', function() {
        var book = new app.Book();
        expect(book.get('title')).toBe('No title');
        expect(book.get('author')).toBe('Unknown');
        expect(book.get('releaseDate')).toBe('Unknown');
        expect(book.get('keywords')).toBe('None');
    });
    /**
     * Update
     */
    it('Successfully updates values.', function() {
        var book = new app.Book();
        book.set('title', 'Dave');
        expect(book.get('title')).toBe('Dave');
        expect(book.get('author')).toBe('Unknown');
        expect(book.get('releaseDate')).toBe('Unknown');
        expect(book.get('keywords')).toBe('None');
    });
});
class BooksController < ApplicationController
  def index
    @books = Book.all
  end

  def search
    if params[:search].present?
      @response = OpenSearchClient.search(
        body: query(params[:search]).to_json,
        index: 'books'
      )
    end
    render :index

  end

  private

  def query(q)
    {
      'size': 10,
      'query': {
        'multi_match': {
          'query': q,
          'fields': ['name', 'publisher', 'description', 'genre', 'author']
        }
      }
    }
  end
end

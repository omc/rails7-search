class BooksController < ApplicationController
  def index
    @books = Book.all
  end

  def search
    @target = params[:target]
    if params[:q].present?
      @response = OpenSearchClient.search(
        body: query(params[:q]).to_json,
        index: 'books'
      )
    end
    respond_to do |format|
      format.turbo_stream
      format.html { render :index }
    end
  end

  def show
    @book = Book.find_by(id: params[:id])
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
      },
      "highlight": {
        "fields": {
          "description": {}
        }
      }
    }
  end
end

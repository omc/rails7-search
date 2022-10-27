class Book < ApplicationRecord
  include SearchModel
  belongs_to :author
  belongs_to :genre

  def index_features
    {
      name: name,
      published_at: published_at,
      description: description,
      publisher: publisher,
      genre: genre&.name,
      author: author&.name
    }
  end

  def index_action
    {
      index: {
        _index: 'books',
        _id: id,
        data: index_features
      }
    }
  end
end

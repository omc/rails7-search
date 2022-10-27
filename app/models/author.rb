class Author < ApplicationRecord
  include SearchModel
  has_many :books
end

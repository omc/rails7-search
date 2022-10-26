class Book < ApplicationRecord
  belongs_to :author
  belongs_to :genre
end

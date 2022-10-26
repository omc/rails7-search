# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'faker'

puts 'Seeding the database...'

BOOKS = 500
AUTHORS = 160
GENRES = 10

if Author.count < AUTHORS
  n = AUTHORS - Author.count
  puts "Creating #{n} Authors..."
  n.times do
    Author.create(
      name: Faker::Book.author
    )
  end
end

if Genre.count < GENRES
  n = GENRES - Genre.count
  puts "Creating #{n} Genres..."
  n.times do
    Genre.create(
      name: Faker::Book.genre
    )
  end
end


if Book.count < BOOKS
  n = BOOKS - Book.count
  puts "Creating #{n} Books..."
  n.times do
    Book.create(
      name: Faker::Book.title,
      author: Author.all.sample,
      genre: Genre.all.sample,
      description: Faker::Quote.matz,
      published_at: Faker::Date.between(from: '1564-04-23', to: '2022-04-29')
    )
  end
end
